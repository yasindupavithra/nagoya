'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, storage } from '../../../lib/firebase';
import { fetchVehicles, updateVehicle } from '../../../lib/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function MigrateImagesPage() {
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState<string>('Checking authentication...');
  const [isMigrating, setIsMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setStatus(currentUser ? 'Ready to migrate.' : 'Please log in as admin.');
    });
    return () => unsubscribe();
  }, []);

  const addLog = (msg: string) => {
    setLog(prev => [...prev, msg]);
  };

  const startMigration = async () => {
    if (!user) return;
    setIsMigrating(true);
    setStatus('Fetching vehicles...');
    setLog([]);

    try {
      const vehicles = await fetchVehicles();
      const vehiclesToMigrate = vehicles.filter(v => v.imageUrls && v.imageUrls.some(url => url.startsWith('data:image')));
      
      setTotal(vehiclesToMigrate.length);
      setProgress(0);

      if (vehiclesToMigrate.length === 0) {
        setStatus('No vehicles found with Base64 images! All good.');
        setIsMigrating(false);
        return;
      }

      setStatus(`Found ${vehiclesToMigrate.length} vehicles to migrate.`);

      for (let i = 0; i < vehiclesToMigrate.length; i++) {
        const vehicle = vehiclesToMigrate[i];
        addLog(`Migrating vehicle ${vehicle.brand} ${vehicle.model} (ID: ${vehicle.id})...`);
        
        let newImageUrls = [];
        
        for (let j = 0; j < vehicle.imageUrls.length; j++) {
          const url = vehicle.imageUrls[j];
          if (url.startsWith('data:image')) {
            addLog(`  Uploading image ${j + 1}/${vehicle.imageUrls.length}...`);
            // Convert base64 to blob
            const res = await fetch(url);
            const blob = await res.blob();
            
            // Upload to Cloudinary
            const formData = new FormData();
            formData.append('file', blob);
            formData.append('upload_preset', 'mco1ctsd');

            const uploadRes = await fetch('https://api.cloudinary.com/v1_1/hubh1wiy/image/upload', {
              method: 'POST',
              body: formData,
            });

            if (!uploadRes.ok) {
              throw new Error('Cloudinary upload failed');
            }

            const data = await uploadRes.json();
            newImageUrls.push(data.secure_url);
          } else {
            // Already a valid URL
            newImageUrls.push(url);
          }
        }
        
        // Update document
        addLog(`  Saving new URLs to database...`);
        await updateVehicle(vehicle.id, { imageUrls: newImageUrls });
        
        setProgress(i + 1);
        addLog(`✅ Completed vehicle ${vehicle.id}.`);
      }

      setStatus('Migration complete!');
    } catch (err: any) {
      console.error(err);
      setStatus(`Error during migration: ${err.message}`);
    } finally {
      setIsMigrating(false);
    }
  };

  if (!user) {
    return (
      <main className="auth-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="container auth-container" style={{ maxWidth: 560 }}>
          <div className="card panel auth-card" style={{ textAlign: 'center', borderTop: '4px solid var(--brand-red)', padding: '40px 32px' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔐</div>
            <h2>Admin Access Required</h2>
            <a href="/admin/login" className="button danger lg full-width">Sign In →</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container" style={{ padding: '80px 24px', maxWidth: 800 }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>Migrate Base64 Images</h2>
        <p className="text-muted" style={{ marginBottom: 32 }}>This tool finds all vehicles with Base64 images, uploads them to Firebase Storage, and updates the database links.</p>
        
        <div className="card panel">
          <h3 style={{ fontSize: '1.2rem', marginBottom: 16 }}>Status: <span style={{ color: status.includes('complete') ? '#22c55e' : 'inherit' }}>{status}</span></h3>
          
          {total > 0 && (
            <div style={{ margin: '20px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem', fontWeight: 600 }}>
                <span>Progress</span>
                <span>{progress} / {total} vehicles migrated</span>
              </div>
              <div style={{ width: '100%', height: '24px', background: 'var(--surface-alt)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ width: `${(progress / total) * 100}%`, height: '100%', background: 'var(--brand-red)', transition: 'width 0.3s ease' }} />
              </div>
            </div>
          )}

          <button 
            className="button danger" 
            onClick={startMigration} 
            disabled={isMigrating}
            style={{ marginTop: 24, width: '100%', padding: '16px', fontSize: '1.1rem' }}
          >
            {isMigrating ? (
              <div className="flex" style={{ gap: 12, alignItems: 'center', justifyContent: 'center' }}>
                <div className="loading-spinner" style={{ width: 18, height: 18, borderTopColor: '#fff', borderLeftColor: 'transparent', margin: 0 }} />
                <span>Migrating Database... Do not close this page.</span>
              </div>
            ) : (
              '🚀 Start Migration'
            )}
          </button>
        </div>

        {log.length > 0 && (
          <div style={{ marginTop: 32, padding: 24, background: '#0a0a0a', color: '#4ade80', fontFamily: 'monospace', borderRadius: 'var(--radius-lg)', maxHeight: 500, overflowY: 'auto', border: '1px solid #222', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {log.map((line, idx) => <div key={idx} style={{ opacity: line.includes('✅') ? 1 : 0.8 }}>{line}</div>)}
          </div>
        )}
      </div>
    </main>
  );
}
