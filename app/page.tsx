'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { fetchVehicles } from '../lib/firestore';
import type { Vehicle } from '../lib/types';
import LatestArrivalCard from '../components/LatestArrivalCard';

const brands = ['Toyota', 'Nissan', 'Honda', 'Mitsubishi', 'Suzuki', 'Mazda', 'Subaru', 'Daihatsu', 'Lexus', 'Mercedes-Benz', 'BMW', 'Audi', 'Kia', 'Hyundai', 'Peugeot', 'Ford', 'Land Rover', 'Range Rover', 'MG', 'DFSK', 'Tata', 'Mahindra', 'Micro', 'Renault', 'Volvo', 'Jeep', 'Porsche', 'Chevrolet', 'Isuzu'];

const sampleVehicles: Vehicle[] = [
  {
    id: 'demo-1', brand: 'Toyota', model: 'Vitz', year: 2018, price: 1265000, mileage: 25256,
    fuelType: 'Petrol', transmission: 'Auto', bodyType: 'Hatchback',
    imageUrls: ['https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80'],
    registeredStatus: 'Registered', location: 'Malabe', inspectionScore: 92, isSold: false, createdAt: null,
  },
  {
    id: 'demo-2', brand: 'Nissan', model: 'Dayz', year: 2019, price: 1290000, mileage: 23585,
    fuelType: 'Petrol', transmission: 'Auto', bodyType: 'Compact',
    imageUrls: ['https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80'],
    registeredStatus: 'Registered', location: 'Horana', inspectionScore: 88, isSold: false, createdAt: null,
  },
  {
    id: 'demo-3', brand: 'Honda', model: 'Fit', year: 2020, price: 1115000, mileage: 23432,
    fuelType: 'Hybrid', transmission: 'Auto', bodyType: 'Hatchback',
    imageUrls: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80'],
    registeredStatus: 'Registered', location: 'Malabe', inspectionScore: 90, isSold: false, createdAt: null,
  },
  {
    id: 'demo-4', brand: 'Toyota', model: 'Aqua', year: 2021, price: 1320000, mileage: 18600,
    fuelType: 'Hybrid', transmission: 'Auto', bodyType: 'Sedan',
    imageUrls: ['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80'],
    registeredStatus: 'Registered', location: 'Horana', inspectionScore: 94, isSold: false, createdAt: null,
  },
  {
    id: 'demo-5', brand: 'Nissan', model: 'Note', year: 2018, price: 1260000, mileage: 23581,
    fuelType: 'Petrol', transmission: 'Manual', bodyType: 'Hatchback',
    imageUrls: ['https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80'],
    registeredStatus: 'Registered', location: 'Malabe', inspectionScore: 86, isSold: false, createdAt: null,
  },
  {
    id: 'demo-6', brand: 'Toyota', model: 'Premio', year: 2019, price: 1550000, mileage: 32000,
    fuelType: 'Petrol', transmission: 'Auto', bodyType: 'Sedan',
    imageUrls: ['https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80'],
    registeredStatus: 'Registered', location: 'Colombo', inspectionScore: 91, isSold: false, createdAt: null,
  },
];

export default function HomePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [brandFilter, setBrandFilter] = useState('');
  const [budget, setBudget] = useState(99999999);
  const [typeFilter, setTypeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');

  // Hero section scroll-reveal
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const heroImages = [
    '/Gemini_Generated_Image_q6r8fnq6r8fnq6r8.png',
    '/Gemini_Generated_Image_i862oii862oii862.png',
    '/Gemini_Generated_Image_ep6d0mep6d0mep6d.png'
  ];
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    // Trigger hero entrance after first paint
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoadingVehicles(true);
    fetchVehicles()
      .then(setVehicles)
      .catch(console.error)
      .finally(() => setIsLoadingVehicles(false));
  }, []);



  // Always show Firestore vehicles if loaded; fallback to sample only while loading
  const displayVehicles = isLoadingVehicles ? sampleVehicles : vehicles;

  const filteredVehicles = useMemo(() => {
    return displayVehicles.filter((v) => {
      return v.price <= budget
        && (!brandFilter || v.brand === brandFilter)
        && (!yearFilter || v.year === Number(yearFilter))
        && (!typeFilter || v.bodyType === typeFilter)
        && (!conditionFilter || v.registeredStatus === conditionFilter);
    });
  }, [displayVehicles, brandFilter, budget, yearFilter, typeFilter, conditionFilter]);

  return (
    <main>
      {/* ══════ HERO ══════ */}
      <div style={{ position: 'relative' }}>
        <section
          className={`hero-section${heroVisible ? ' hero-visible' : ''}`}
          style={{ '--scroll-y': `${scrollY}px` } as React.CSSProperties}
        >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          {heroImages.map((src, idx) => (
            <div
              key={src}
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translateX(${(idx - currentSlide) * 100}%)`,
                transition: 'transform 1s ease-in-out',
                willChange: 'transform'
              }}
            >
              <Image
                src={src}
                alt={`Nagoya Auto Hero Banner ${idx + 1}`}
                fill
                priority={idx === 0}
                quality={100}
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          ))}
        </div>

        <div className="hero-text-container" style={{ position: 'absolute', bottom: '18%', left: '4%', zIndex: 2 }}>
          <div style={{ display: 'inline-block' }}>
            <p style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 500, margin: 0, textShadow: '0 4px 8px rgba(0,0,0,0.8)' }}>
              For All Your Vehicle Solutions
            </p>
            <h1 style={{ color: '#fff', fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', lineHeight: 1.1, fontWeight: 800, margin: '0', textShadow: '0 4px 12px rgba(0,0,0,0.8)', letterSpacing: '-1px' }}>
              Nagoya <span style={{ color: '#E52329' }}>Auto Auction</span>
            </h1>
          </div>
        </div>

        </section>

        {/* Right Side Floating Banner */}
        <div className="hero-floating-banner" style={{
          position: 'absolute',
          bottom: '22%',
          right: '5%',
          width: 'clamp(250px, 22vw, 320px)',
          height: 'clamp(460px, 60vh, 680px)',
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          zIndex: 10,
          border: '4px solid rgba(255, 255, 255, 0.9)',
          animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both'
        }}>
          <Image
            src="/Gemini_Generated_Image_ewmootewmootewmo.png"
            alt="Promotional Banner"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* ══════ SEARCH PANEL ══════ */}
      <section className="search-panel container">
        <div className="search-card">
          <div className="search-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2>Quick Search</h2>
              <p>Find your perfect vehicle in seconds</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', background: 'var(--surface-alt)', padding: '6px', borderRadius: '12px' }}>
              <button
                className={`button ${conditionFilter === '' ? 'danger' : 'outline'}`}
                style={{ padding: '8px 16px', fontSize: '0.9rem', ...(conditionFilter === '' ? {} : { border: 'none' }) }}
                onClick={() => setConditionFilter('')}>All</button>
              <button
                className={`button ${conditionFilter === 'Unregistered' ? 'danger' : 'outline'}`}
                style={{ padding: '8px 16px', fontSize: '0.9rem', ...(conditionFilter === 'Unregistered' ? {} : { border: 'none' }) }}
                onClick={() => setConditionFilter('Unregistered')}>Brand New</button>
              <button
                className={`button ${conditionFilter === 'Registered' ? 'danger' : 'outline'}`}
                style={{ padding: '8px 16px', fontSize: '0.9rem', ...(conditionFilter === 'Registered' ? {} : { border: 'none' }) }}
                onClick={() => setConditionFilter('Registered')}>Used</button>
            </div>
          </div>
          <div className="search-fields">
            <div className="field">
              <label>Brand</label>
              <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                <option value="">All Brands</option>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Budget</label>
              <select value={budget} onChange={(e) => setBudget(Number(e.target.value))}>
                <option value={2500000}>Up to LKR 2.5M</option>
                <option value={5000000}>Up to LKR 5M</option>
                <option value={8000000}>Up to LKR 8M</option>
                <option value={12000000}>Up to LKR 12M</option>
                <option value={99999999}>Any Budget</option>
              </select>
            </div>
            <div className="field">
              <label>Vehicle Type</label>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="">All Types</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Compact">Compact</option>
                <option value="Van">Van</option>
              </select>
            </div>
            <div className="field">
              <label>Year</label>
              <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
                <option value="">Any Year</option>
                {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="search-actions">
            <a href="/inventory" className="button danger lg" style={{ flex: 1 }}>
              🔍 Find Your Perfect Car
            </a>
          </div>
        </div>
      </section>

      {/* ══════ LATEST ARRIVALS ══════ */}
      <section id="latest-arrivals" style={{ backgroundColor: '#ffffff', padding: '64px 0', color: '#111' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eaeaea', paddingBottom: '16px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', margin: 0, display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ display: 'inline-block', width: '4px', height: '1.2em', backgroundColor: '#e50000' }}></span>
              LATEST ARRIVALS
            </h2>
            <a href="/inventory" style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              VIEW FULL INVENTORY <span style={{ fontSize: '1.2rem' }}>➔</span>
            </a>
          </div>

          <div className="grid grid-4" style={{ gap: '16px' }}>
            {isLoadingVehicles ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0' }}>
                <p style={{ color: '#888' }}>Loading latest arrivals...</p>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0', color: '#888' }}>
                <p>No vehicles match your current filters. Try adjusting your search.</p>
              </div>
            ) : (
              filteredVehicles.slice(0, 8).map((vehicle) => (
                <LatestArrivalCard key={vehicle.id} vehicle={vehicle} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ══════ POPULAR BRANDS GRID ══════ */}
      <section style={{ backgroundColor: '#fdfdfd', padding: '64px 0', borderTop: '1px solid #eaeaea' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Browse by Brand</h2>
            <p style={{ color: '#666', marginTop: '12px', fontSize: '1.1rem' }}>Find your perfect vehicle from top global manufacturers</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            {['All', 'Toyota', 'Honda', 'Nissan', 'Suzuki', 'Mazda', 'Ford', 'Mitsubishi', 'Audi', 'BMW', 'Volkswagen', 'Mercedes-Benz', 'Kia', 'Lexus', 'Foton'].map(brand => {
              const isActive = brandFilter === (brand === 'All' ? '' : brand);
              const brandLogos: Record<string, string> = {
                'Toyota': '/logos/toyota.svg',
                'Nissan': '/logos/nissan.svg',
                'Honda': '/logos/honda.svg',
                'Suzuki': '/logos/suzuki.svg',
                'Mitsubishi': '/logos/mitsubishi.svg',
                'Mazda': '/logos/mazda.svg',
                'BMW': '/logos/bmw.svg',
                'Audi': '/logos/audi.svg',
                'Kia': '/logos/kia.svg',
                'Ford': '/logos/ford.svg',
                'Volkswagen': '/logos/volkswagen.svg'
              };
              
              return (
              <button 
                key={brand}
                onClick={() => {
                  setBrandFilter(brand === 'All' ? '' : brand);
                  document.getElementById('latest-arrivals')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  width: '130px',
                  height: '110px',
                  borderRadius: '16px',
                  border: isActive ? '2px solid #e50000' : '1px solid #eaeaea',
                  backgroundColor: isActive ? '#fffaf1' : '#fff',
                  color: isActive ? '#e50000' : '#444',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 8px 24px rgba(229,0,0,0.12)' : '0 4px 12px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease',
                  transform: isActive ? 'translateY(-4px)' : 'none'
                }}
              >
                {brand !== 'All' && brandLogos[brand] && (
                  <img 
                    src={brandLogos[brand]} 
                    alt={brand} 
                    style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                {brand === 'All' && <span style={{ fontSize: '24px' }}>🌐</span>}
                {brand}
              </button>
            )})}
          </div>
        </div>
      </section>

      {/* ══════ STATS ══════ */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stats-card animate-fade-in-up stagger-1">
              <div className="stat-number">1,200+</div>
              <h3>Cars Sold</h3>
            </div>
            <div className="stats-card animate-fade-in-up stagger-2">
              <div className="stat-number">10,000+</div>
              <h3>Happy Customers</h3>
            </div>
            <div className="stats-card animate-fade-in-up stagger-3">
              <div className="stat-number">10+</div>
              <h3>Years of Trust</h3>
            </div>
            <div className="stats-card animate-fade-in-up stagger-4">
              <div className="stat-number">98%</div>
              <h3>Customer Satisfaction</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ WHY CHOOSE US ══════ */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Why Choose Nagoya</span>
            <h2>We Make Car Buying Simple</h2>
            <p>From selection to delivery, experience a seamless car buying journey</p>
          </div>
          <div className="grid grid-4">
            {[
              { icon: '🔍', title: 'Transparent Pricing', desc: 'No hidden fees. The price you see is the price you pay.' },
              { icon: '📋', title: 'Auction Sheets', desc: 'Original Japanese auction sheets provided for every vehicle.' },
              { icon: '🔧', title: 'Full Inspection', desc: 'Every car undergoes a 150-point inspection before listing.' },
              { icon: '🚚', title: 'Island Delivery', desc: 'We deliver your vehicle anywhere in Sri Lanka.' },
            ].map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SINHALA BRAND BANNER ══════ */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #e50000 0%, #800000 100%)', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Noto Sans Sinhala', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, margin: 0, textShadow: '0 4px 20px rgba(0,0,0,0.3)', lineHeight: 1.2 }}>
            ඔබගේ සිහින වාහනය<br />විශ්වාසයෙන් යුතුව මිලදී ගන්න
          </h2>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#fff', margin: '24px auto', borderRadius: '2px', opacity: 0.8 }} />
          <p style={{ fontFamily: "'Noto Sans Sinhala', sans-serif", marginTop: '16px', fontSize: '1.2rem', opacity: 0.9, fontWeight: 500 }}>
            ශ්‍රී ලංකාවේ ප්‍රමුඛතම සහ විශ්වාසවන්තම වාහන ආනයනකරුවෝ
          </p>
        </div>
      </section>

      {/* ══════ HAPPY CUSTOMERS SLIDER ══════ */}
      <section className="section bg-light" style={{ overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="tag">Nagoya Family</span>
          <h2>Happy Customers</h2>
        </div>
        <div className="customer-slider-container">
          <div className="customer-slider-track">
            {/* First Set of Images */}
            {[1, 2, 3, 4].map((num) => (
              <div key={`customer-a-${num}`} className="customer-slide">
                <div className="customer-image-wrapper">
                  <img src={`/customers/c${num}.jpg`} alt={`Happy Customer ${num}`} className="customer-image" />
                </div>
              </div>
            ))}
            {/* Second Set of Images for Infinite Loop */}
            {[1, 2, 3, 4].map((num) => (
              <div key={`customer-b-${num}`} className="customer-slide">
                <div className="customer-image-wrapper">
                  <img src={`/customers/c${num}.jpg`} alt={`Happy Customer ${num}`} className="customer-image" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Customer Reviews</span>
            <h2>What Our Customers Say</h2>
          </div>
          <div className="grid grid-3">
            {[
              { name: 'Kasun Perera', loc: 'Colombo', text: 'Best car buying experience in Sri Lanka! The inspection report gave me complete confidence.', initial: 'K' },
              { name: 'Amali Fernando', loc: 'Kandy', text: 'I got my Toyota Aqua at a great price. Excellent service and transparent process throughout.', initial: 'A' },
              { name: 'Ruwan Silva', loc: 'Galle', text: 'The leasing calculator helped me plan my budget perfectly. Highly recommend Nagoya Auto!', initial: 'R' },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <blockquote>&ldquo;{t.text}&rdquo;</blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initial}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA BANNER ══════ */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Find Your Dream Car?</h2>
            <p>Browse our verified inventory or contact us for a personalized recommendation</p>
            <a href="/inventory" className="button lg">Browse All Vehicles →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
