'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditVehicleRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/inventory');
  }, [router]);

  return (
    <main>
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div className="loading-spinner" />
        <p className="text-muted" style={{ marginTop: 16 }}>Redirecting to inventory...</p>
      </div>
    </main>
  );
}
