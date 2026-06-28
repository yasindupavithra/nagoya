import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImages(files: File[]) {
  const urls: string[] = [];
  for (const file of files) {
    const storageRef = ref(storage, `vehicles/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytesResumable(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    urls.push(downloadUrl);
  }
  return urls;
}
