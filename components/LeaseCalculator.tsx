'use client';
import { useMemo } from 'react';

export default function LeaseCalculator({ price, downPayment, years, onDownPaymentChange, onYearsChange }: {
  price: number;
  downPayment: number;
  years: number;
  onDownPaymentChange: (value: number) => void;
  onYearsChange: (value: number) => void;
}) {
  const monthlyInstallment = useMemo(() => {
    const loan = Math.max(price - downPayment, 0);
    const months = Math.max(years * 12, 1);
    const interestRate = 0.12 / 12;
    if (interestRate === 0) return Math.round(loan / months);
    const emi = loan * interestRate * Math.pow(1 + interestRate, months) / (Math.pow(1 + interestRate, months) - 1);
    return Math.round(emi);
  }, [price, downPayment, years]);

  const totalPayment = monthlyInstallment * years * 12 + downPayment;

  return (
    <div style={{ marginTop: 24 }}>
      <div className="flex-between" style={{ marginBottom: 16 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Lease Calculator</h3>
          <p className="text-muted" style={{ marginTop: 4 }}>Estimate your monthly payment</p>
        </div>
      </div>

      <div className="lease-result" style={{ marginTop: 0, marginBottom: 20 }}>
        <p style={{ marginBottom: 4, fontSize: '0.82rem' }}>Monthly Payment</p>
        <div className="big-number">₨{monthlyInstallment.toLocaleString('en-LK')}</div>
        <p style={{ marginTop: 8, fontSize: '0.78rem' }}>Total: ₨{totalPayment.toLocaleString('en-LK')} over {years} year(s)</p>
      </div>

      <div className="field" style={{ marginTop: 8 }}>
        <label>Down Payment (LKR)</label>
        <input
          type="number"
          value={downPayment}
          min={0}
          max={price}
          onChange={(e) => onDownPaymentChange(Number(e.target.value))}
        />
        <p className="field-hint">₨{downPayment.toLocaleString('en-LK')}</p>
      </div>

      <div className="field">
        <label>Tenor: {years} year(s) — {years * 12} months</label>
        <input
          type="range"
          min={1}
          max={7}
          value={years}
          onChange={(e) => onYearsChange(Number(e.target.value))}
        />
        <div className="flex-between" style={{ fontSize: '0.75rem', color: 'var(--text-hint)', marginTop: 4 }}>
          <span>1 yr</span>
          <span>7 yrs</span>
        </div>
      </div>
    </div>
  );
}
