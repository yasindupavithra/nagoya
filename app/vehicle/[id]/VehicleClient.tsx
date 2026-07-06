'use client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { fetchVehicleById, createInquiry } from '../../../lib/firestore';
import type { Vehicle } from '../../../lib/types';
import LeaseCalculator from '../../../components/LeaseCalculator';

export default function VehicleClient({ initialVehicle }: { initialVehicle: Vehicle }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(initialVehicle);
  const [selectedImage, setSelectedImage] = useState(initialVehicle.imageUrls?.[0] ?? '');
  const [downPayment, setDownPayment] = useState(250000);
  const [tenorYears, setTenorYears] = useState(3);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('WhatsApp');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!vehicle) return;
    setStatus('Sending inquiry...');
    try {
      await createInquiry({ vehicleId: vehicle.id, buyerName, buyerPhone, type: inquiryType, message });
      setStatus('✅ Inquiry submitted! Redirecting to WhatsApp...');
      
      const whatsappText = `Hi Nagoya Auto! I'm ${buyerName} (${buyerPhone}). I am interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model} (ID: ${vehicle.id}).\n\nMessage: ${message}`;
      const whatsappUrl = `https://wa.me/94714495632?text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappUrl, '_blank');
      
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
    <main style={{ backgroundColor: '#fafafa', color: '#111', minHeight: '100vh', paddingBottom: '120px' }}>
      <div className="container" style={{ maxWidth: '1100px', paddingTop: '40px' }}>
        
        {/* Breadcrumb (Light) */}
        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '32px', display: 'flex', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
          <a href="/" style={{ color: '#555', textDecoration: 'none' }}>Home</a>
          <span>/</span>
          <a href="/inventory" style={{ color: '#555', textDecoration: 'none' }}>Inventory</a>
          <span>/</span>
          <span style={{ color: '#111' }}>{vehicle.brand} {vehicle.model}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '-0.5px', color: '#111' }}>
            {vehicle.model} {vehicle.auctionGrade ? `- ${vehicle.auctionGrade}` : ''} {vehicle.year}
          </h1>
          <div style={{ fontSize: '0.95rem', color: '#666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {vehicle.tagline ? vehicle.tagline : `POSTED BY: ${new Date(vehicle.createdAt ? vehicle.createdAt.seconds * 1000 : Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}`}
          </div>
        </div>

        {/* Main Gallery */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', position: 'relative', border: '1px solid #eaeaea' }}>
          <img
            src={selectedImage || 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80'}
            alt={`${vehicle.brand} ${vehicle.model}`}
            style={{ width: '100%', height: '560px', objectFit: 'contain', backgroundColor: '#f5f5f5' }}
          />
          {/* Status Badge Overlays */}
          <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', gap: '10px' }}>
             <span style={{ backgroundColor: 'var(--brand-red)', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontWeight: 800, fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(229,0,0,0.4)' }}>
               {vehicle.isSold ? 'SOLD OUT' : 'AVAILABLE NOW'}
             </span>
          </div>
        </div>

        {/* Thumbnails */}
        {vehicle.imageUrls.length > 1 && (
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px' }} className="hide-scrollbar">
            <style>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            {vehicle.imageUrls.map((url) => (
              <button
                key={url}
                type="button"
                onClick={() => setSelectedImage(url)}
                style={{
                  width: '140px',
                  height: '90px',
                  flexShrink: 0,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: selectedImage === url ? '3px solid #e50000' : '2px solid transparent',
                  cursor: 'pointer',
                  padding: 0,
                  backgroundColor: '#fff',
                  transition: 'all 0.2s ease'
                }}
              >
                <img src={url} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: selectedImage === url ? 1 : 0.6, transition: 'opacity 0.2s' }} />
              </button>
            ))}
          </div>
        )}

        <div className="vehicle-details-grid">
          
          {/* Left Column (Description & Specs) */}
          <div>
            {/* Initial Payment Prominent Banner */}
            {vehicle.initialPayment && (
              <div style={{
                background: 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)',
                color: '#fff',
                borderRadius: '16px',
                padding: '24px 32px',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(212,175,55,0.2)',
                position: 'relative',
                overflow: 'hidden',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }}></div>
                <div style={{ position: 'absolute', bottom: '-20%', right: '-5%', opacity: 0.03, fontSize: '16rem', pointerEvents: 'none', userSelect: 'none' }}>
                  🚘
                </div>
                <div style={{ position: 'relative', zIndex: 1, flex: '1 1 300px' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 800, color: '#d4af37', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#d4af37', borderRadius: '50%', boxShadow: '0 0 10px #d4af37' }}></span>
                    Premium Financing
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, margin: '0 0 12px 0', lineHeight: 1.3, letterSpacing: '-0.5px', color: '#fff' }}>
                    අතින් ලක්ෂ <span style={{ color: '#d4af37' }}>{vehicle.initialPayment.toLocaleString('en-LK', { maximumFractionDigits: 1 })}ක්</span> <br/> 
                    දීලා අරගෙන යන්න!
                  </h3>
                  {vehicle.monthlyPayment && (
                    <div style={{ marginBottom: '16px', fontSize: '1.2rem', color: '#fff', fontWeight: 600, lineHeight: 1.5 }}>
                      මාසික වාරිකය රු. <span style={{ color: '#d4af37', fontSize: '1.4rem', fontWeight: 800 }}>{vehicle.monthlyPayment.toLocaleString('en-LK')}</span> පමණයි.<br/>
                      <span style={{ fontSize: '1rem', color: '#aaa', fontWeight: 500 }}>(කාලය අවුරුදු 5ක් සඳහා)</span>
                    </div>
                  )}
                  <p style={{ fontSize: '1.1rem', margin: 0, color: '#999', fontWeight: 400, lineHeight: 1.6 }}>
                    Experience luxury effortlessly. Pay the minimum initial amount today and drive away with your dream vehicle. Easy financing available!
                  </p>
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <a href={`https://wa.me/94714495632?text=${whatsappMsg}`} target="_blank" rel="noreferrer" style={{ 
                    display: 'inline-block',
                    background: 'linear-gradient(90deg, #d4af37 0%, #aa8c2c 100%)', 
                    color: '#000', 
                    padding: '18px 40px', 
                    borderRadius: '50px', 
                    fontWeight: 800, 
                    fontSize: '1.1rem', 
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 10px 30px rgba(212,175,55,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(212,175,55,0.5)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(212,175,55,0.3)';
                    e.currentTarget.style.filter = 'none';
                  }}>
                    Inquire Now
                  </a>
                </div>
              </div>
            )}
            {/* Description */}
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid #eaeaea', color: '#111' }}>
                Description
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#444' }}>
                {vehicle.description || `The ${vehicle.brand} ${vehicle.model} is a practical and highly efficient vehicle, well known for its excellent design and superior interior space. Despite its compact exterior size, it offers a roomy cabin with good headroom, comfortable seating, and flexible cargo space, making it ideal for city driving and daily use. It is easy to maneuver, economical to run, and highly reliable, which makes it a popular choice for families, first-time car owners, and urban commuters.`}
              </p>
            </div>

            {/* Specifications */}
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid #eaeaea', color: '#111' }}>
                Specifications
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px 24px' }}>
                {[
                  { icon: '🚗', label: 'Brand', value: vehicle.brand },
                  { icon: '🚙', label: 'Model', value: vehicle.model },
                  { icon: '⏱️', label: 'Grade', value: vehicle.auctionGrade || 'N/A' },
                  { icon: '🕹️', label: 'Transmission', value: vehicle.transmission },
                  { icon: '📅', label: 'Year', value: vehicle.year },
                  { icon: '⛽', label: 'Fuel', value: vehicle.fuelType },
                  { icon: '⚙️', label: 'Engine Capacity', value: vehicle.cc ? `${vehicle.cc} CC` : 'N/A' },
                  { icon: '🚘', label: 'Body Type', value: vehicle.bodyType || 'CAR' },
                  { icon: '🛣️', label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} KM` },
                  { icon: '📋', label: 'Condition', value: vehicle.registeredStatus },
                  { icon: '📍', label: 'Location', value: vehicle.location }
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', borderBottom: '1px solid #eaeaea', paddingBottom: '20px' }}>
                    <div style={{ fontSize: '2.2rem', filter: 'sepia(1) hue-rotate(-50deg) saturate(3)', opacity: 0.9 }}>
                       {s.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '4px' }}>{s.label}</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111', textTransform: 'uppercase' }}>{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features (if any) */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid #eaeaea', color: '#111' }}>
                  Features
                </h2>
                <ul style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                  gap: '20px', 
                  listStyle: 'none', 
                  padding: 0 
                }}>
                  {vehicle.features
                    .join(' ')
                    .split(/✔️|✓|✅|,/)
                    .map(f => f.trim())
                    .filter(f => f.length > 0)
                    .map((f, i) => (
                      <li key={i} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px', 
                        backgroundColor: '#fff', 
                        padding: '16px 20px', 
                        borderRadius: '16px', 
                        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                        border: '1px solid #f0f0f0',
                        color: '#333', 
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(229,0,0,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(229,0,0,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                        e.currentTarget.style.borderColor = '#f0f0f0';
                      }}
                      >
                        <div style={{ 
                          width: '28px', 
                          height: '28px', 
                          borderRadius: '50%', 
                          backgroundColor: 'rgba(229,0,0,0.1)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: '#e50000',
                          fontSize: '1rem',
                          flexShrink: 0
                        }}>✓</div>
                        <span style={{ lineHeight: 1.4 }}>{f}</span>
                      </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Why Choose Us (if any) */}
            {vehicle.whyChooseUs && vehicle.whyChooseUs.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid #eaeaea', color: '#111' }}>
                  Why Choose This Vehicle
                </h2>
                <ul style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                  gap: '20px', 
                  listStyle: 'none', 
                  padding: 0 
                }}>
                  {vehicle.whyChooseUs
                    .map((w, i) => (
                      <li key={i} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px', 
                        backgroundColor: '#fff', 
                        padding: '16px 20px', 
                        borderRadius: '16px', 
                        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                        border: '1px solid #f0f0f0',
                        color: '#333', 
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(229,0,0,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(229,0,0,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                        e.currentTarget.style.borderColor = '#f0f0f0';
                      }}
                      >
                        <div style={{ 
                          width: '28px', 
                          height: '28px', 
                          borderRadius: '50%', 
                          backgroundColor: 'rgba(229,0,0,0.1)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: '#e50000',
                          fontSize: '1rem',
                          flexShrink: 0
                        }}>⭐</div>
                        <span style={{ lineHeight: 1.4 }}>{w}</span>
                      </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column (Sticky Actions Panel) */}
          <div>
            <div style={{ position: 'sticky', top: '100px', backgroundColor: '#fff', padding: '40px 32px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: '12px' }}>Vehicle Price</div>
              <div style={{ fontSize: '3.2rem', fontWeight: 900, color: '#e50000', lineHeight: 1, marginBottom: vehicle.initialPayment ? '16px' : '40px' }}>
                 Rs {vehicle.price.toLocaleString('en-LK')}
              </div>



              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                <a href={`https://wa.me/94714495632?text=${whatsappMsg}`} target="_blank" rel="noreferrer" style={{ width: '100%', backgroundColor: '#25D366', color: '#fff', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: 800, textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontSize: '1.15rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                   💬 WhatsApp Inquiry
                </a>
                <a href="tel:+94714495632" style={{ width: '100%', backgroundColor: '#f9f9f9', color: '#111', border: '1px solid #ddd', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: 800, textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontSize: '1.15rem', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}>
                   📞 Call Seller
                </a>
              </div>

              <hr style={{ borderColor: '#eaeaea', margin: '40px 0', borderStyle: 'solid', borderWidth: '1px 0 0 0' }} />

              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#111', fontWeight: 800 }}>Quick Inquiry</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '24px' }}>Fill details and we will get back to you immediately.</p>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} required placeholder="Your Name" style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fafafa', color: '#111', fontSize: '1rem' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <input value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} required placeholder="Phone Number" style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fafafa', color: '#111', fontSize: '1rem' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="I'm interested in this vehicle..." style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fafafa', color: '#111', minHeight: '120px', fontSize: '1rem', fontFamily: 'inherit' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '18px', backgroundColor: '#e50000', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#cc0000'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e50000'}>
                  Submit Details
                </button>
              </form>
              {status && <p style={{ marginTop: '20px', color: status.includes('✅') ? '#4ade80' : '#f87171', textAlign: 'center', fontWeight: 600 }}>{status}</p>}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
