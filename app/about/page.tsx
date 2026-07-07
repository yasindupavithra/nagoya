'use client';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: '#fff' }}>
      
      {/* Premium Hero Section */}
      <section style={{
        position: 'relative',
        height: '70vh',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image 
            src="/images/nagoya_about_hero.png" 
            alt="Nagoya Auto Auction Premium Showroom" 
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          {/* Dark Overlay for better text readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 100%)' }}></div>
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 24px' }}>
          <span style={{ display: 'inline-block', padding: '6px 20px', backgroundColor: 'rgba(229,0,0,0.8)', color: '#fff', borderRadius: '30px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            About Us
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, margin: '0 0 24px', letterSpacing: '-2px', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            Sri Lanka&apos;s Most Trusted<br />
            <span style={{ color: '#ff4d4d' }}>Auto Auction Platform</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: '#e0e0e0', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Since 2014, Nagoya Auto Auction has been connecting Sri Lankan buyers with certified Japanese vehicles through transparent pricing and verified inspections.
          </p>
        </div>
      </section>

      {/* Floating Stats Section */}
      <section style={{ marginTop: '-60px', position: 'relative', zIndex: 10, paddingBottom: '80px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            backgroundColor: '#fff',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '1px solid #f0f0f0'
          }}>
            {[
              { number: '1,200+', label: 'Vehicles Sold' },
              { number: '10,000+', label: 'Happy Customers' },
              { number: '10+', label: 'Years Experience' },
              { number: '98%', label: 'Satisfaction Rate' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '16px' }}>
                <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#111', marginBottom: '8px', letterSpacing: '-1px' }}>{s.number}</div>
                <p style={{ color: '#e50000', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section with Second Image */}
      <section className="section" style={{ padding: '40px 0 100px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
            {/* Story Text */}
            <div>
              <span style={{ color: '#e50000', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.9rem', display: 'block', marginBottom: '16px' }}>Our Story</span>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 900, color: '#111', marginBottom: '24px', lineHeight: 1.2, letterSpacing: '-1px' }}>From Passion to<br />Sri Lanka&apos;s Largest</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#555', fontSize: '1rem', lineHeight: 1.8 }}>
                <p>
                  Nagoya Auto Auction started with a simple vision — to make buying Japanese vehicles in Sri Lanka transparent,
                  trustworthy, and affordable. What began as a small operation in Horana has grown into the island&apos;s most
                  trusted auto auction platform.
                </p>
                <p>
                  We directly source vehicles from Japanese auctions and provide complete documentation including original
                  auction sheets, inspection reports, and verified service histories. Every vehicle undergoes our rigorous
                  150-point inspection before being listed.
                </p>
                <div style={{ fontWeight: 600, color: '#111', borderLeft: '4px solid #e50000', paddingLeft: '24px', fontStyle: 'italic', marginTop: '12px' }}>
                  &quot;Our commitment to transparency means no hidden fees, no surprises — just honest pricing and quality vehicles
                  backed by our reputation and your trust.&quot;
                </div>
              </div>
            </div>

            {/* Story Image */}
            <div style={{ position: 'relative', height: '600px', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.15), 0 0 0 8px rgba(255,255,255,0.8)', border: '1px solid #eaeaea' }}>
              <Image 
                src="/Owner/WhatsApp Image 2026-07-06 at 11.04.55 PM.jpeg" 
                alt="Nagoya Auto Auction Owner" 
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 20%', filter: 'contrast(1.05) saturate(1.1)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(229,0,0,0.15) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)', mixBlendMode: 'overlay' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ backgroundColor: '#f9fafb', padding: '100px 0', borderTop: '1px solid #eaeaea' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ color: '#e50000', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.9rem', display: 'block', marginBottom: '16px' }}>Why Nagoya</span>
            <h2 style={{ fontSize: '3.2rem', fontWeight: 900, color: '#111', letterSpacing: '-1px' }}>What Sets Us Apart</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {[
              { icon: '🔍', title: 'Full Transparency', desc: 'Every vehicle comes with original auction sheets, inspection reports, and complete documentation.' },
              { icon: '🛡️', title: 'Quality Guarantee', desc: 'Our 150-point inspection ensures only the best vehicles make it to our listings.' },
              { icon: '💰', title: 'Fair Pricing', desc: 'No hidden fees or markups. What you see is what you pay, backed by market-competitive rates.' },
              { icon: '🚚', title: 'Island Delivery', desc: 'We deliver your vehicle to your doorstep anywhere in Sri Lanka.' },
              { icon: '🏦', title: 'Leasing Support', desc: 'Partnered with major banks to offer flexible leasing options with competitive rates.' },
              { icon: '🤝', title: 'After-Sale Care', desc: 'Our relationship doesn\'t end at sale. We provide a FREE 2-Year / 100,000 km Warranty with every vehicle.' },
            ].map((feature, i) => (
              <div key={i} style={{ backgroundColor: '#fff', padding: '48px 40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #f0f0f0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '24px', background: 'rgba(229,0,0,0.05)', display: 'inline-flex', padding: '16px', borderRadius: '20px' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111', marginBottom: '16px' }}>{feature.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.7, fontSize: '1.05rem' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Banner */}
      <section style={{ padding: '60px 0', backgroundColor: '#e50000', color: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px', background: '#fff', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e50000', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>✅</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, margin: 0, letterSpacing: '-1px' }}>FREE 2-Year / 100,000 km Warranty</h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
              Enjoy peace of mind with every vehicle you purchase from us.<br />
              2-Year or 100,000 km Warranty (whichever comes first).
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section style={{ padding: '100px 0', backgroundColor: '#111', color: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{ color: '#ff4d4d', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.9rem', display: 'block', marginBottom: '16px' }}>Our Journey</span>
            <h2 style={{ fontSize: '3.2rem', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>Key Milestones</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>
            {[
              { year: '2014', title: 'Founded in Horana', desc: 'Started our journey with a vision to bring transparent auto trading to Sri Lanka.' },
              { year: '2017', title: 'Expanded to Malabe', desc: 'Opened our second showroom to serve more customers across the island.' },
              { year: '2020', title: 'Digital Transformation', desc: 'Launched our online platform for remote browsing and bidding.' },
              { year: '2024', title: 'Island-wide Delivery', desc: 'Introduced doorstep delivery service anywhere in Sri Lanka.' },
            ].map((m, i) => (
              <div key={i} style={{ position: 'relative', paddingLeft: '40px', borderLeft: '2px solid rgba(229,0,0,0.3)' }}>
                <div style={{ position: 'absolute', left: '-11px', top: '0', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#e50000', border: '4px solid #111' }}></div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#e50000', marginBottom: '12px', fontFamily: 'monospace' }}>{m.year}</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>{m.title}</h3>
                <p style={{ color: '#aaa', lineHeight: 1.7, fontSize: '1.05rem' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
