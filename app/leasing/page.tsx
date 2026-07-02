'use client';
import { useMemo, useState } from 'react';

export default function LeasingPage() {
  const [vehiclePrice, setVehiclePrice] = useState(100000000);
  const [downPayment, setDownPayment] = useState(20000000);
  const [years, setYears] = useState(3);
  const [interestRate, setInterestRate] = useState(12);

  const monthlyPayment = useMemo(() => {
    const loan = Math.max(vehiclePrice - downPayment, 0);
    const months = years * 12;
    const r = interestRate / 100 / 12;
    if (r === 0) return Math.round(loan / months);
    return Math.round(loan * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1));
  }, [vehiclePrice, downPayment, years, interestRate]);

  const totalPayment = monthlyPayment * years * 12 + downPayment;
  const totalInterest = totalPayment - vehiclePrice;

  return (
    <main style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Premium Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
        color: '#fff',
        padding: '80px 0 140px',
        textAlign: 'center',
        position: 'relative',
        borderBottom: '4px solid #e50000'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', backgroundColor: 'rgba(229,0,0,0.15)', color: '#ff4d4d', borderRadius: '30px', fontWeight: 800, fontSize: '0.9rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1.5px', border: '1px solid rgba(229,0,0,0.3)' }}>
            Financial Services
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.8rem)', fontWeight: 900, margin: '0 0 20px', letterSpacing: '-1.5px' }}>Vehicle Leasing Calculator</h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#aaa', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            Plan your purchase with our advanced leasing calculator. Find the perfect balance between your down payment and monthly installments.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '-70px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'start' }}>
          
          {/* Left: Calculator Settings */}
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '48px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid #eaeaea' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '40px', color: '#111', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '4px', height: '24px', backgroundColor: '#e50000', borderRadius: '4px' }}></span>
              Customize Your Plan
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {/* Field 1 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <label style={{ fontWeight: 700, color: '#555', fontSize: '1.1rem' }}>Vehicle Price</label>
                  <span style={{ fontWeight: 900, color: '#111', fontSize: '1.3rem' }}>₨ {vehiclePrice.toLocaleString('en-LK')}</span>
                </div>
                <input type="range" min={500000} max={100000000} step={500000} value={vehiclePrice} onChange={(e) => setVehiclePrice(Number(e.target.value))} style={{ width: '100%', accentColor: '#e50000', height: '8px', borderRadius: '4px', cursor: 'pointer' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#999', marginTop: '10px', fontWeight: 600 }}>
                  <span>₨ 500K</span><span>₨ 100M</span>
                </div>
              </div>

              {/* Field 2 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <label style={{ fontWeight: 700, color: '#555', fontSize: '1.1rem' }}>Down Payment</label>
                  <span style={{ fontWeight: 900, color: '#111', fontSize: '1.3rem' }}>₨ {downPayment.toLocaleString('en-LK')}</span>
                </div>
                <input type="range" min={0} max={vehiclePrice * 0.7} step={100000} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} style={{ width: '100%', accentColor: '#e50000', height: '8px', borderRadius: '4px', cursor: 'pointer' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#999', marginTop: '10px', fontWeight: 600 }}>
                  <span>0%</span><span>70% Max</span>
                </div>
              </div>

              {/* Field 3 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <label style={{ fontWeight: 700, color: '#555', fontSize: '1.1rem' }}>Lease Period</label>
                  <span style={{ fontWeight: 900, color: '#111', fontSize: '1.3rem' }}>{years} Year{years > 1 ? 's' : ''} ({years * 12} mo)</span>
                </div>
                <input type="range" min={1} max={7} value={years} onChange={(e) => setYears(Number(e.target.value))} style={{ width: '100%', accentColor: '#e50000', height: '8px', borderRadius: '4px', cursor: 'pointer' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#999', marginTop: '10px', fontWeight: 600 }}>
                  <span>1 Year</span><span>7 Years</span>
                </div>
              </div>

              {/* Field 4 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <label style={{ fontWeight: 700, color: '#555', fontSize: '1.1rem' }}>Interest Rate</label>
                  <span style={{ fontWeight: 900, color: '#111', fontSize: '1.3rem' }}>{interestRate}%</span>
                </div>
                <input type="range" min={6} max={24} step={0.5} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={{ width: '100%', accentColor: '#e50000', height: '8px', borderRadius: '4px', cursor: 'pointer' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#999', marginTop: '10px', fontWeight: 600 }}>
                  <span>6%</span><span>24%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results & Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Dark Premium Result Card */}
            <div style={{
              background: 'linear-gradient(135deg, #111 0%, #222 100%)',
              borderRadius: '24px',
              padding: '48px',
              color: '#fff',
              boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid #333'
            }}>
              <div style={{ position: 'absolute', top: '-50%', right: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(229,0,0,0.15) 0%, transparent 70%)', borderRadius: '50%' }}></div>
              <p style={{ margin: 0, fontSize: '1.1rem', color: '#aaa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Estimated Monthly Payment</p>
              <div style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, margin: '20px 0', color: '#fff', letterSpacing: '-1.5px', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                <span style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', color: '#e50000', verticalAlign: 'top', marginRight: '8px' }}>₨</span>
                {monthlyPayment.toLocaleString('en-LK')}
              </div>
              <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '32px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#888', fontWeight: 500, fontSize: '1.1rem' }}>Duration</span>
                <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#eee' }}>{years * 12} Months</span>
              </div>
            </div>

            {/* Detailed Summary Card */}
            <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '28px', color: '#111' }}>Payment Breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666', fontWeight: 600 }}>Vehicle Price</span>
                  <span style={{ fontWeight: 800, color: '#111' }}>₨ {vehiclePrice.toLocaleString('en-LK')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666', fontWeight: 600 }}>Down Payment</span>
                  <span style={{ fontWeight: 800, color: '#111' }}>- ₨ {downPayment.toLocaleString('en-LK')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px dashed #ccc' }}>
                  <span style={{ color: '#666', fontWeight: 600 }}>Loan Amount</span>
                  <span style={{ fontWeight: 900, color: '#111' }}>₨ {(vehiclePrice - downPayment).toLocaleString('en-LK')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666', fontWeight: 600 }}>Total Interest</span>
                  <span style={{ fontWeight: 800, color: '#e50000' }}>+ ₨ {Math.max(totalInterest, 0).toLocaleString('en-LK')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', borderTop: '2px solid #eaeaea', marginTop: '4px' }}>
                  <span style={{ color: '#111', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase' }}>Total Cost</span>
                  <span style={{ fontWeight: 900, color: '#111', fontSize: '1.4rem' }}>₨ {totalPayment.toLocaleString('en-LK')}</span>
                </div>
              </div>
            </div>

            {/* Partners */}
            <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: '#111' }}>Trusted Financial Partners</h3>
              <p style={{ color: '#777', marginBottom: '24px', fontSize: '1rem', lineHeight: 1.5 }}>
                We work with Sri Lanka&apos;s leading financial institutions to offer you the best rates.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {['Bank of Ceylon', "People's Bank", 'Commercial Bank', 'HNB', 'Sampath Bank'].map(bank => (
                  <div key={bank} style={{ padding: '10px 20px', backgroundColor: '#f8f8f8', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 700, color: '#333', border: '1px solid #eee' }}>
                    {bank}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
