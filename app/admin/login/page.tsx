'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/admin');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setAuthLoading(true);
    setStatus('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setStatus('Successfully signed in. Redirecting...');
      router.push('/admin');
    } catch (error: any) {
      console.error(error);
      setAuthLoading(false);
      setStatus('Unable to sign in. Please check your credentials.');
    }
  }

  if (loading) {
    return (
      <main className="auth-page" style={{ display: 'grid', placeItems: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" />
          <p className="text-muted" style={{ marginTop: 16 }}>Checking authorization status...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div className="container auth-container" style={{ maxWidth: 460, width: '100%' }}>
        <div className="card panel auth-card" style={{ borderTop: '4px solid var(--brand-red)', boxShadow: 'var(--shadow-xl)', padding: '40px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <span className="tag-pill" style={{ marginBottom: 12 }}>Owner Console</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Admin Login</h2>
            <p className="text-muted" style={{ fontSize: '0.88rem', marginTop: 8 }}>
              Sign in to manage listings, inspect inquiries, and edit details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" style={{ display: 'grid', gap: 20 }}>
            <div className="field" style={{ marginTop: 0 }}>
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(event) => setEmail(event.target.value)} 
                placeholder="owner@nagoyaauto.com"
                required 
                disabled={authLoading}
              />
            </div>
            
            <div className="field" style={{ marginTop: 0, position: 'relative' }}>
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(event) => setPassword(event.target.value)} 
                  placeholder="••••••••"
                  required 
                  disabled={authLoading}
                  style={{ paddingRight: 50 }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ 
                    position: 'absolute', 
                    right: 14, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--text-muted)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    padding: '4px 8px'
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="button danger full-width" 
              style={{ marginTop: 8, height: 48 }}
              disabled={authLoading}
            >
              {authLoading ? (
                <div className="flex" style={{ gap: 8, alignItems: 'center', justifyContent: 'center' }}>
                  <div className="loading-spinner" style={{ width: 18, height: 18, borderTopColor: '#fff', borderLeftColor: 'transparent', margin: 0 }} />
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {status && (
            <p 
              className="status-message animate-fade-in" 
              style={{ 
                marginTop: 20, 
                padding: '12px 16px', 
                borderRadius: 'var(--radius-sm)', 
                background: status.includes('Successfully') ? 'rgba(34, 197, 94, 0.08)' : 'rgba(211, 47, 47, 0.08)',
                color: status.includes('Successfully') ? '#16a34a' : 'var(--brand-red)',
                fontSize: '0.85rem',
                textAlign: 'center',
                fontWeight: 500
              }}
            >
              {status}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
