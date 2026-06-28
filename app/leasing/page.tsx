'use client';
import { useMemo, useState } from 'react';

export default function LeasingPage() {
  const [vehiclePrice, setVehiclePrice] = useState(3500000);
  const [downPayment, setDownPayment] = useState(500000);
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
    <main>
      <div className="container">
        <section className="section">
          <div className="section-header" style={{ textAlign: 'left', margin: '0 0 36px', maxWidth: 'none' }}>
            <span className="tag">Leasing</span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '8px 0' }}>Vehicle Leasing Calculator</h1>
            <p className="text-muted">Calculate your monthly payments and find the best leasing option for your budget</p>
          </div>

          <div className="grid grid-2" style={{ gap: 32 }}>
            {/* Calculator */}
            <div className="lease-calculator-full">
              <h3 style={{ marginBottom: 20 }}>Calculate Your Lease</h3>

              <div className="field" style={{ marginTop: 0 }}>
                <label>Vehicle Price: ₨{vehiclePrice.toLocaleString('en-LK')}</label>
                <input type="range" min={500000} max={15000000} step={100000} value={vehiclePrice} onChange={(e) => setVehiclePrice(Number(e.target.value))} />
                <div className="flex-between" style={{ fontSize: '0.75rem', color: 'var(--text-hint)', marginTop: 4 }}>
                  <span>₨500K</span><span>₨15M</span>
                </div>
              </div>

              <div className="field">
                <label>Down Payment: ₨{downPayment.toLocaleString('en-LK')}</label>
                <input type="range" min={0} max={vehiclePrice * 0.7} step={50000} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
              </div>

              <div className="field">
                <label>Lease Period: {years} year(s) — {years * 12} months</label>
                <input type="range" min={1} max={7} value={years} onChange={(e) => setYears(Number(e.target.value))} />
                <div className="flex-between" style={{ fontSize: '0.75rem', color: 'var(--text-hint)', marginTop: 4 }}>
                  <span>1 yr</span><span>7 yrs</span>
                </div>
              </div>

              <div className="field">
                <label>Interest Rate: {interestRate}%</label>
                <input type="range" min={6} max={24} step={0.5} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
                <div className="flex-between" style={{ fontSize: '0.75rem', color: 'var(--text-hint)', marginTop: 4 }}>
                  <span>6%</span><span>24%</span>
                </div>
              </div>

              {/* Result */}
              <div className="lease-result">
                <p style={{ marginBottom: 4, fontSize: '0.85rem', opacity: 0.85 }}>Your Monthly Payment</p>
                <div className="big-number">₨{monthlyPayment.toLocaleString('en-LK')}</div>
                <p style={{ marginTop: 8, fontSize: '0.82rem' }}>per month for {years * 12} months</p>
              </div>
            </div>

            {/* Summary & Info */}
            <div>
              <div className="card panel" style={{ marginBottom: 20 }}>
                <h3 style={{ marginBottom: 16 }}>Payment Summary</h3>
                <div style={{ display: 'grid', gap: 14 }}>
                  {[
                    { label: 'Vehicle Price', value: `₨${vehiclePrice.toLocaleString('en-LK')}` },
                    { label: 'Down Payment', value: `₨${downPayment.toLocaleString('en-LK')}` },
                    { label: 'Loan Amount', value: `₨${(vehiclePrice - downPayment).toLocaleString('en-LK')}` },
                    { label: 'Monthly Payment', value: `₨${monthlyPayment.toLocaleString('en-LK')}`, highlight: true },
                    { label: 'Total Interest', value: `₨${Math.max(totalInterest, 0).toLocaleString('en-LK')}` },
                    { label: 'Total Cost', value: `₨${totalPayment.toLocaleString('en-LK')}`, highlight: true },
                  ].map((r) => (
                    <div key={r.label} className="flex-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                      <span className="text-muted">{r.label}</span>
                      <strong style={{ color: r.highlight ? 'var(--brand-red)' : 'var(--text-primary)' }}>{r.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card panel">
                <h3 style={{ marginBottom: 12 }}>Leasing Partners</h3>
                <p className="text-muted" style={{ marginBottom: 16, fontSize: '0.88rem' }}>
                  We work with Sri Lanka&apos;s leading financial institutions to offer you the best rates.
                </p>
                <div style={{ display: 'grid', gap: 10 }}>
                  {['Bank of Ceylon', 'People\'s Bank', 'Commercial Bank', 'HNB', 'Sampath Bank'].map((b) => (
                    <div key={b} className="badge" style={{ padding: '12px 16px' }}>
                      🏦 {b}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <a href="/contact" className="button danger full-width lg">Apply for Leasing →</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
