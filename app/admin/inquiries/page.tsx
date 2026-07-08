'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { fetchInquiries, deleteInquiry, fetchVehicles } from '../../../lib/firestore';
import type { Inquiry, Vehicle } from '../../../lib/types';
import Link from 'next/link';

export default function ManageInquiriesPage() {
  const [user, setUser] = useState<any>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    fetchInquiries().then(setInquiries).catch(console.error);
    fetchVehicles().then(setVehicles).catch(console.error);
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <main>
        <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <div className="loading-spinner" />
          <p className="text-muted" style={{ marginTop: 16 }}>Loading inquiries...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="auth-page">
        <div className="container auth-container">
          <div className="card panel auth-card" style={{ textAlign: 'center' }}>
            <h2>Admin Access Required</h2>
            <Link href="/admin/login" className="button danger lg full-width" style={{ marginTop: 24 }}>Sign In →</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <div className="flex-between" style={{ marginBottom: 32 }}>
          <div>
            <Link href="/admin" className="text-muted" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', marginBottom: 12 }}>
              ← Back to Dashboard
            </Link>
            <h1 style={{ margin: 0, fontSize: '2rem' }}>All Inquiries</h1>
            <p className="text-muted" style={{ margin: '4px 0 0' }}>Manage customer inquiries and requests</p>
          </div>
        </div>

        <div className="card panel">
          {inquiries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '3rem', opacity: 0.2, marginBottom: 16 }}>📨</div>
              <h3 style={{ margin: '0 0 8px' }}>No inquiries yet</h3>
              <p className="text-muted" style={{ margin: 0 }}>When customers contact you, their messages will appear here.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {inquiries.map((inq) => {
                const v = vehicles.find((veh) => veh.id === inq.vehicleId);
                const vehicleName = v ? `${v.brand} ${v.model} ${v.year}` : `Vehicle ID: ${inq.vehicleId}`;
                return (
                  <div key={inq.id || inq.vehicleId + inq.buyerName} style={{ 
                    padding: '20px', 
                    background: 'var(--surface-alt)', 
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12
                  }}>
                    <div className="flex-between" style={{ alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem' }}>{inq.buyerName}</h3>
                        <p style={{ margin: 0, fontWeight: 500 }}>
                          <a href={`tel:${inq.buyerPhone}`} style={{ color: 'var(--brand-red)', textDecoration: 'none' }}>
                            {inq.buyerPhone}
                          </a>
                        </p>
                        <div style={{ margin: '8px 0', padding: '6px 12px', background: 'rgba(211,47,47,0.1)', color: 'var(--brand-red)', borderRadius: 4, display: 'inline-block', fontSize: '0.85rem', fontWeight: 600 }}>
                          {vehicleName}
                        </div>
                      </div>
                      {inq.id && (
                        <button
                          className="button outline"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this inquiry?')) {
                              deleteInquiry(inq.id!).then(() => {
                                setInquiries((prev) => prev.filter((i) => i.id !== inq.id));
                              }).catch((err) => {
                                console.error(err);
                                alert('Failed to delete inquiry. Make sure you have permission.');
                              });
                            }
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <div style={{ background: '#fff', padding: '16px', borderRadius: 6, border: '1px solid #eee' }}>
                      <p style={{ margin: 0, color: '#333', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                        {inq.message || <span className="text-muted italic">No message provided</span>}
                      </p>
                    </div>
                    {inq.createdAt && (
                      <div className="text-muted" style={{ fontSize: '0.8rem', textAlign: 'right' }}>
                        Received: {new Date((inq as any).createdAt?.seconds ? (inq as any).createdAt.seconds * 1000 : Date.now()).toLocaleString()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
