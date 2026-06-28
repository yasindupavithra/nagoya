import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  limit,
  startAfter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Inquiry, Vehicle } from './types';

const vehiclesRef = collection(db, 'vehicles');
const inquiriesRef = collection(db, 'inquiries');

export async function fetchVehicles(): Promise<Vehicle[]> {
  const snapshot = await getDocs(query(vehiclesRef, orderBy('createdAt', 'desc')));
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt ? { seconds: data.createdAt.seconds } : null
    } as Vehicle;
  });
}

export async function fetchVehiclesPaginated(
  pageSize: number = 9,
  lastDoc?: QueryDocumentSnapshot
): Promise<{ vehicles: Vehicle[]; lastVisible: QueryDocumentSnapshot | null }> {
  let q;
  if (lastDoc) {
    q = query(vehiclesRef, orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(pageSize));
  } else {
    q = query(vehiclesRef, orderBy('createdAt', 'desc'), limit(pageSize));
  }
  const snapshot = await getDocs(q);
  const vehicles = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as any) }));
  const lastVisible = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
  return { vehicles, lastVisible };
}

export async function fetchVehicleById(id: string): Promise<Vehicle | null> {
  const docRef = doc(db, 'vehicles', id);
  const result = await getDoc(docRef);
  return result.exists() ? ({ id: result.id, ...(result.data() as any) } as Vehicle) : null;
}

export async function fetchActiveVehicles(): Promise<Vehicle[]> {
  const q = query(vehiclesRef, where('isSold', '==', false), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as any) }));
}

export async function fetchInquiries(): Promise<Inquiry[]> {
  const snapshot = await getDocs(query(inquiriesRef, orderBy('createdAt', 'desc')));
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as any) }));
}

export async function createInquiry(inquiry: Omit<Inquiry, 'createdAt' | 'id'>) {
  return addDoc(inquiriesRef, { ...inquiry, createdAt: serverTimestamp() });
}

export async function deleteInquiry(id: string) {
  return deleteDoc(doc(db, 'inquiries', id));
}

export async function createVehicle(vehicle: Omit<Vehicle, 'id' | 'createdAt'>) {
  return addDoc(vehiclesRef, { ...vehicle, createdAt: serverTimestamp() });
}

export async function updateVehicle(id: string, data: Partial<Vehicle>) {
  const vehicleDoc = doc(db, 'vehicles', id);
  return updateDoc(vehicleDoc, data);
}

export async function deleteVehicle(id: string) {
  return deleteDoc(doc(db, 'vehicles', id));
}
