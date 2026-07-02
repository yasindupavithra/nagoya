'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { fetchVehicles, fetchInquiries, deleteInquiry } from '../../lib/firestore';
import type { Vehicle, Inquiry } from '../../lib/types';

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    fetchVehicles().then(setVehicles).catch(console.error);
    fetchInquiries().then(setInquiries).catch(console.error);
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <main>
        <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <div className="loading-spinner" />
          <p className="text-muted" style={{ marginTop: 16 }}>Loading dashboard...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="auth-page">
        <div className="container auth-container">
          <div className="card panel auth-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔐</div>
            <h2>Admin Access Required</h2>
            <p className="text-muted" style={{ margin: '12px 0 24px' }}>
              Please sign in with your owner account to access the dashboard.
            </p>
            <a href="/admin/login" className="button danger lg full-width">Sign In →</a>
          </div>
        </div>
      </main>
    );
  }

  const activeCount = vehicles.filter((v) => !v.isSold).length;
  const soldCount = vehicles.filter((v) => v.isSold).length;
  const totalRevenue = vehicles.filter((v) => v.isSold).reduce((sum, v) => sum + v.price, 0);

  return (
    <main>
      <div className="container">
        <section className="section">
          {/* Header */}
          <div className="admin-header">
            <div>
              <span className="tag">Admin Dashboard</span>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0 0' }}>Welcome back, Owner</h1>
              <p className="text-muted">{user.email}</p>
            </div>
            <div className="flex" style={{ gap: 10 }}>
              <button
                className="button outline"
                onClick={() => signOut(auth).then(() => setUser(null))}
              >
                Sign Out
              </button>
              <a href="/admin/inventory/add" className="button danger">+ Add Vehicle</a>
            </div>
          </div>

          {/* Stats */}
          <div className="admin-stats">
            <div className="admin-stat-card">
              <h3>Active Listings</h3>
              <div className="stat-value">{activeCount}</div>
            </div>
            <div className="admin-stat-card">
              <h3>Sold Vehicles</h3>
              <div className="stat-value">{soldCount}</div>
            </div>
            <div className="admin-stat-card">
              <h3>Total Inquiries</h3>
              <div className="stat-value">{inquiries.length}</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-2" style={{ gap: 20 }}>
            {/* Recent Inquiries */}
            <div className="card panel">
              <div className="flex-between" style={{ marginBottom: 16 }}>
                <h3 style={{ margin: 0 }}>Recent Inquiries</h3>
                <span className="tag-pill">{inquiries.length} total</span>
              </div>
              {inquiries.length === 0 ? (
                <p className="text-muted" style={{ padding: '24px 0', textAlign: 'center' }}>No inquiries yet</p>
              ) : (
                <div style={{ display: 'grid', gap: 8 }}>
                  {inquiries.slice(0, 5).map((inq) => {
                    const v = vehicles.find(veh => veh.id === inq.vehicleId);
                    const vehicleName = v ? `${v.brand} ${v.model} ${v.year}` : `Vehicle ID: ${inq.vehicleId}`;
                    return (
                    <div key={inq.id || inq.vehicleId + inq.buyerName} className="flex-between" style={{ padding: '12px 14px', background: 'var(--surface-alt)', borderRadius: 'var(--radius-sm)' }}>
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: '#111' }}>{inq.buyerName}</strong>
                        <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>{inq.buyerPhone}</p>
                        <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: '#e50000', fontWeight: 600 }}>{vehicleName}</p>
                        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#444' }}>{inq.message}</p>
                      </div>
                      {inq.id && (
                        <button
                          className="button sm outline"
                          onClick={() => {
                            deleteInquiry(inq.id!).then(() => {
                              setInquiries((prev) => prev.filter((i) => i.id !== inq.id));
                            }).catch(console.error);
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="card panel">
              <h3 style={{ margin: '0 0 16px' }}>Quick Actions</h3>
              <div style={{ display: 'grid', gap: 10 }}>
                {[
                  { icon: '📋', label: 'Manage Inventory', href: '/admin/inventory', desc: 'View, edit, and delete vehicle listings' },
                  { icon: '➕', label: 'Add New Vehicle', href: '/admin/inventory/add', desc: 'Create a new vehicle listing with images' },
                  { icon: '🌐', label: 'View Website', href: '/', desc: 'See your website as customers see it' },
                  { icon: '📊', label: 'View Inventory Page', href: '/inventory', desc: 'Browse all vehicles with filters' },
                ].map((a) => (
                  <a
                    key={a.label}
                    href={a.href}
                    className="contact-info-card"
                    style={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    <div className="contact-info-icon">{a.icon}</div>
                    <div>
                      <h4 style={{ margin: '0 0 2px', fontSize: '0.92rem' }}>{a.label}</h4>
                      <p className="text-muted" style={{ margin: 0, fontSize: '0.78rem' }}>{a.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
