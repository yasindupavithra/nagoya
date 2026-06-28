'use client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { fetchVehicleById, createInquiry } from '../../../lib/firestore';
import type { Vehicle } from '../../../lib/types';
import LeaseCalculator from '../../../components/LeaseCalculator';

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [downPayment, setDownPayment] = useState(250000);
  const [tenorYears, setTenorYears] = useState(3);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('WhatsApp');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchVehicleById(params.id).then((result) => {
      if (!result) { router.push('/inventory'); return; }
      setVehicle(result);
      setSelectedImage(result.imageUrls[0] ?? '');
    }).catch(console.error);
  }, [params.id, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!vehicle) return;
    setStatus('Sending inquiry...');
    try {
      await createInquiry({ vehicleId: vehicle.id, buyerName, buyerPhone, type: inquiryType, message });
      setStatus('✅ Inquiry submitted successfully!');
      setBuyerName(''); setBuyerPhone(''); setMessage('');
    } catch {
      setStatus('❌ Could not submit. Please try again.');
    }
  }

  function handleShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!vehicle) {
    return (
      <main>
        <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <div className="loading-spinner" />
          <p className="text-muted" style={{ marginTop: 16 }}>Loading vehicle details...</p>
        </div>
      </main>
    );
  }

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model} (₨${vehicle.price.toLocaleString('en-LK')}). Vehicle ID: ${vehicle.id}. Is it still available?`
  );

  return (
    <main>
      <div className="container">
        <section className="section">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <a href="/inventory">Inventory</a>
            <span>›</span>
            <span style={{ color: 'var(--text-primary)' }}>{vehicle.brand} {vehicle.model}</span>
          </div>

          {/* Header */}
          <div className="flex-between" style={{ marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>
                {vehicle.brand} {vehicle.model}
              </h1>
              {vehicle.tagline && (
                <p style={{ margin: '8px 0 0 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--brand-red)', letterSpacing: '0.5px' }}>
                  {vehicle.tagline}
                </p>
              )}
              <div className="flex" style={{ gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                <span className="badge">{vehicle.year}</span>
                <span className="badge">{vehicle.fuelType}</span>
                <span className="badge">{vehicle.transmission}</span>
                <span className="badge">{vehicle.registeredStatus}</span>
                <span className="badge">📍 {vehicle.location}</span>
              </div>
            </div>
            <div className="flex" style={{ gap: 10 }}>
              <a href={`https://wa.me/94714495632?text=${whatsappMsg}`} target="_blank" rel="noreferrer" className="button danger">
                💬 WhatsApp
              </a>
              <a href="tel:+94714495632" className="button outline">📞 Call</a>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-2" style={{ gap: 32 }}>
            {/* Gallery */}
            <div>
              <div className="image-gallery">
                <div className="image-gallery-main">
                  <img
                    src={selectedImage || 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80'}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    style={{ width: '100%', height: 420, objectFit: 'cover' }}
                  />
                </div>
                {vehicle.imageUrls.length > 1 && (
                  <div className="image-thumbs">
                    {vehicle.imageUrls.map((url) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setSelectedImage(url)}
                        className={selectedImage === url ? 'active' : ''}
                      >
                        <img src={url} alt="Thumbnail" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Share */}
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>Share:</span>
                <div className="share-buttons">
                  <a href={`https://wa.me/?text=${whatsappMsg}`} target="_blank" rel="noreferrer" className="share-btn">💬</a>
                  <button className="share-btn" onClick={handleShare} title="Copy link">
                    {copied ? '✅' : '🔗'}
                  </button>
                </div>
              </div>
            </div>

            {/* Details Panel */}
            <div className="card panel" style={{ border: 'none', boxShadow: 'var(--shadow-xl)', padding: '32px' }}>

              {/* Main Description */}
              {vehicle.description && (
                <div style={{ marginBottom: 32 }}>
                  <p style={{ lineHeight: 1.8, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    {vehicle.description}
                  </p>
                </div>
              )}
              {/* Price */}
              <div style={{ marginBottom: 24 }}>
                <p className="text-muted" style={{ margin: '0 0 8px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Vehicle Price</p>
                <strong style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--brand-red)', lineHeight: 1, display: 'block' }}>
                  ₨ {vehicle.price.toLocaleString('en-LK')}
                </strong>
              </div>

              <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid var(--border-light)' }} />

              {/* Premium Specs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {[
                  { icon: '🛣️', label: 'Mileage', value: `${vehicle.mileage.toLocaleString('en-LK')} km` },
                  { icon: '📍', label: 'Location', value: vehicle.location },
                  { icon: '⭐', label: 'Auction Grade', value: vehicle.auctionGrade || 'N/A' },
                  { icon: '💎', label: 'Condition', value: vehicle.condition || 'Used' },
                  { icon: '⚙️', label: 'Transmission', value: vehicle.transmission },
                  { icon: '⛽', label: 'Fuel Type', value: vehicle.fuelType },
                  { icon: '🚗', label: 'Body Type', value: vehicle.bodyType || 'N/A' },
                  { icon: '📄', label: 'Registration', value: vehicle.registeredStatus },
                ].map((s) => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: 'var(--surface-alt)', borderRadius: '12px', transition: 'transform 0.2s ease', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: 'var(--shadow-sm)' }}>
                      {s.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-hint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Engine & Color */}
              <div style={{ display: 'flex', gap: '24px', marginTop: '24px', padding: '20px', backgroundColor: '#fcfcfc', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                {vehicle.cc && <div style={{ flex: 1 }}><div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px' }}>Engine</div> <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{vehicle.cc} cc</strong></div>}
                {vehicle.color && <div style={{ flex: 1 }}><div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px' }}>Color</div> <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{vehicle.color}</strong></div>}
              </div>

              {/* Premium Features List */}
              {vehicle.features && vehicle.features.length > 0 && (
                <div style={{ marginTop: '32px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🌟 Premium Features & Equipment
                  </h3>
                  <ul style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px', padding: 0 }}>
                    {vehicle.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                        <span style={{ marginTop: '2px', fontSize: '1.1rem' }}>✨</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Why Choose Us */}
              {vehicle.whyChooseUs && vehicle.whyChooseUs.length > 0 && (
                <div style={{ marginTop: '32px', backgroundColor: 'var(--surface-alt)', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    💯 Why Choose This {vehicle.brand} {vehicle.model}?
                  </h3>
                  <ul style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px', padding: 0 }}>
                    {vehicle.whyChooseUs.map((w) => (
                      <li key={w} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--text-primary)', fontWeight: 600 }}>
                        <span style={{ marginTop: '2px', fontSize: '1.1rem' }}>✔️</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Verification */}
              <div className="banner" style={{ marginTop: 20 }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '0.95rem' }}>✅ Verified Documentation</h4>
                <p className="text-muted" style={{ fontSize: '0.82rem' }}>
                  All documentation, customs clearance papers, and vehicle registration are verified and clear.
                </p>
              </div>

              {/* Lease Calculator */}
              <LeaseCalculator
                price={vehicle.price}
                downPayment={downPayment}
                years={tenorYears}
                onDownPaymentChange={setDownPayment}
                onYearsChange={setTenorYears}
              />

              <div style={{ marginTop: 20 }}>
                <a
                  href={`https://wa.me/94714495632?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="button danger full-width lg"
                >
                  💬 Inquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="grid grid-2" style={{ gap: 32 }}>
            {/* Specs Card */}
            <div className="card panel">
              <h3 style={{ marginBottom: 20 }}>Full Specifications</h3>
              <div className="grid grid-2" style={{ gap: 16 }}>
                {[
                  { label: 'Brand', value: vehicle.brand },
                  { label: 'Model', value: vehicle.model },
                  { label: 'Year', value: vehicle.year },
                  { label: 'Fuel Type', value: vehicle.fuelType },
                  { label: 'Transmission', value: vehicle.transmission },
                  { label: 'Body Type', value: vehicle.bodyType || 'N/A' },
                  { label: 'Mileage', value: `${vehicle.mileage.toLocaleString('en-LK')} km` },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-muted" style={{ fontSize: '0.78rem', margin: 0 }}>{s.label}</p>
                    <p style={{ fontWeight: 600, margin: '2px 0 0' }}>{s.value}</p>
                  </div>
                ))}
              </div>
              {/* Description already moved to top, keeping this section for fallback or extra details if needed, but it's redundant now so we'll remove it. */}
            </div>

            {/* Inquiry Form */}
            <div className="card panel">
              <h3 style={{ marginBottom: 6 }}>Contact the Owner</h3>
              <p className="text-muted" style={{ marginBottom: 20 }}>Submit your inquiry and our team will respond immediately.</p>
              <form onSubmit={handleSubmit}>
                <div className="field" style={{ marginTop: 0 }}>
                  <label>Your Name</label>
                  <input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} required placeholder="Enter your full name" />
                </div>
                <div className="field">
                  <label>Phone Number</label>
                  <input value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} required placeholder="07X XXX XXXX" />
                </div>
                <div className="field">
                  <label>Inquiry Type</label>
                  <select value={inquiryType} onChange={(e) => setInquiryType(e.target.value)}>
                    <option value="WhatsApp">WhatsApp Inquiry</option>
                    <option value="Lease">Lease Quote</option>
                    <option value="Visit">Schedule Visit</option>
                  </select>
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Tell us what you need..." />
                </div>
                <button type="submit" className="button danger full-width" style={{ marginTop: 16 }}>
                  Send Inquiry
                </button>
              </form>
              {status && <p className="status-message">{status}</p>}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
