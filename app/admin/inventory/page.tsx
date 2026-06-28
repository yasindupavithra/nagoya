'use client';
import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { deleteVehicle, fetchVehicles, updateVehicle } from '../../../lib/firestore';
import type { Vehicle } from '../../../lib/types';
import { useRouter } from 'next/navigation';

export default function AdminInventoryPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Delete confirmation modal state
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchVehicles()
          .then((data) => {
            setVehicles(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const term = search.toLowerCase();
      return (
        vehicle.brand.toLowerCase().includes(term) ||
        vehicle.model.toLowerCase().includes(term) ||
        vehicle.id.toLowerCase().includes(term)
      );
    });
  }, [vehicles, search]);

  async function handleToggleSold(vehicle: Vehicle) {
    try {
      const newSoldState = !vehicle.isSold;
      await updateVehicle(vehicle.id, { isSold: newSoldState });
      setVehicles((prev) =>
        prev.map((item) =>
          item.id === vehicle.id ? { ...item, isSold: newSoldState } : item
        )
      );
    } catch (error) {
      console.error('Error updating vehicle status:', error);
    }
  }

  async function handleDeleteConfirm() {
    if (!vehicleToDelete) return;
    setDeleting(true);
    try {
      await deleteVehicle(vehicleToDelete.id);
      setVehicles((prev) => prev.filter((item) => item.id !== vehicleToDelete.id));
      setVehicleToDelete(null);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <main>
        <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <div className="loading-spinner" />
          <p className="text-muted" style={{ marginTop: 16 }}>Loading inventory data...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="auth-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="container auth-container" style={{ maxWidth: 560 }}>
          <div className="card panel auth-card" style={{ textAlign: 'center', borderTop: '4px solid var(--brand-red)', padding: '40px 32px' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔐</div>
            <h2>Admin Access Required</h2>
            <p className="text-muted" style={{ margin: '12px 0 24px' }}>
              Please sign in to your owner account to manage inventory.
            </p>
            <a href="/admin/login" className="button danger lg full-width">Sign In →</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container admin-inventory-page" style={{ paddingBottom: 60 }}>
        <section className="section" style={{ paddingTop: 30 }}>
          {/* Header Section */}
          <div className="inventory-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, gap: 16, flexWrap: 'wrap' }}>
            <div>
              <span className="tag">Inventory Management</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0 0' }}>Vehicle Listings ({vehicles.length})</h2>
              <p className="text-muted">Manage active and sold vehicles on Nagoya Auto Auction.</p>
            </div>
            <div className="flex" style={{ gap: 12 }}>
              <a href="/admin" className="button outline">← Dashboard</a>
              <a href="/admin/inventory/add" className="button danger">+ Add New Vehicle</a>
            </div>
          </div>

          {/* Search bar */}
          <div className="card panel" style={{ padding: 20, marginBottom: 24 }}>
            <div className="field" style={{ marginTop: 0 }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Search listings</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="search" 
                  value={search} 
                  onChange={(event) => setSearch(event.target.value)} 
                  placeholder="Search by brand, model, year, or vehicle ID..." 
                  style={{ paddingRight: 40 }}
                />
                {search && (
                  <button 
                    onClick={() => setSearch('')}
                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-hint)' }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Listings Table */}
          <div className="table-wrapper" style={{ boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--surface-alt)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 600 }}>Vehicle</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 600 }}>Price</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 600 }}>Location</th>
                  <th style={{ padding: '16px 20px', textAlign: 'right', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                    {/* Vehicle column (thumbnail + text) */}
                    <td style={{ padding: '16px 20px' }}>
                      <div className="flex" style={{ gap: 14, alignItems: 'center' }}>
                        <div style={{ width: 64, height: 44, borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--surface-alt)', border: '1px solid var(--border)', flexShrink: 0, position: 'relative' }}>
                          <img 
                            src={vehicle.imageUrls?.[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=200&auto=format&fit=crop'} 
                            alt={vehicle.model}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.95rem' }}>{vehicle.brand} {vehicle.model}</strong>
                          <p className="text-muted" style={{ margin: '2px 0 0', fontSize: '0.78rem' }}>Year: {vehicle.year} · ID: {vehicle.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    {/* Price */}
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>
                      ₨{vehicle.price.toLocaleString('en-LK')}
                    </td>
                    {/* Status Pill */}
                    <td style={{ padding: '16px 20px' }}>
                      {vehicle.isSold ? (
                        <span className="tag-pill danger" style={{ background: 'rgba(211, 47, 47, 0.08)', color: 'var(--brand-red)', padding: '4px 10px', fontSize: '0.75rem' }}>SOLD</span>
                      ) : (
                        <span className="tag-pill success" style={{ background: 'rgba(34, 197, 94, 0.08)', color: '#16a34a', padding: '4px 10px', fontSize: '0.75rem' }}>ACTIVE</span>
                      )}
                    </td>
                    {/* Location */}
                    <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {vehicle.location}
                    </td>

                    {/* Action buttons */}
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div className="flex" style={{ gap: 8, justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
                        <a href={`/admin/inventory/edit/${vehicle.id}`} className="button outline sm" style={{ padding: '8px 14px' }}>
                          Edit
                        </a>
                        <button 
                          className="button secondary sm" 
                          onClick={() => handleToggleSold(vehicle)}
                          style={{ padding: '8px 14px' }}
                        >
                          {vehicle.isSold ? 'Set Active' : 'Set SOLD'}
                        </button>
                        <button 
                          className="button danger sm" 
                          onClick={() => setVehicleToDelete(vehicle)}
                          style={{ padding: '8px 14px', background: 'rgba(211,47,47,0.1)', color: 'var(--brand-red)', border: 'none' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredVehicles.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No vehicles found. Try adding a vehicle or changing your search filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {vehicleToDelete && (
        <div className="confirm-overlay">
          <div className="confirm-dialog" style={{ padding: '32px 28px', maxWidth: 440 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 12 }}>Confirm Deletion</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: 24 }}>
              Are you sure you want to permanently delete the <strong>{vehicleToDelete.brand} {vehicleToDelete.model} ({vehicleToDelete.year})</strong>? This action cannot be undone.
            </p>
            <div className="flex" style={{ gap: 12, justifyContent: 'flex-end' }}>
              <button 
                className="button outline" 
                onClick={() => setVehicleToDelete(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button 
                className="button danger" 
                onClick={handleDeleteConfirm}
                disabled={deleting}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                {deleting ? (
                  <>
                    <div className="loading-spinner" style={{ width: 14, height: 14, borderTopColor: '#fff', borderLeftColor: 'transparent', margin: 0 }} />
                    <span>Deleting...</span>
                  </>
                ) : (
                  'Delete Vehicle'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
