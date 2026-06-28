'use client';

export default function AboutPage() {
  return (
    <main>
      <div className="container">
        {/* Hero */}
        <section className="about-hero section">
          <span className="tag" style={{ justifyContent: 'center' }}>About Us</span>
          <h1>Sri Lanka&apos;s Most Trusted<br />Auto Auction Platform</h1>
          <p>Since 2014, Nagoya Auto Auction has been connecting Sri Lankan buyers with certified Japanese vehicles through transparent pricing and verified inspections.</p>
        </section>

        {/* Stats */}
        <section style={{ paddingBottom: 48 }}>
          <div className="grid grid-4">
            {[
              { number: '1200+', label: 'Vehicles Sold' },
              { number: '10000+', label: 'Happy Customers' },
              { number: '10+', label: 'Years Experience' },
              { number: '98%', label: 'Satisfaction Rate' },
            ].map((s) => (
              <div key={s.label} className="card panel" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--brand-red)', marginBottom: 4 }}>{s.number}</div>
                <p className="text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="grid grid-2" style={{ gap: 48, alignItems: 'center' }}>
            <div>
              <span className="tag">Our Story</span>
              <h2 style={{ fontSize: '1.8rem', margin: '12px 0 16px' }}>From Passion to Sri Lanka&apos;s Largest</h2>
              <p className="text-muted" style={{ lineHeight: 1.8, marginBottom: 16 }}>
                Nagoya Auto Auction started with a simple vision — to make buying Japanese vehicles in Sri Lanka transparent,
                trustworthy, and affordable. What began as a small operation in Horana has grown into the island&apos;s most
                trusted auto auction platform.
              </p>
              <p className="text-muted" style={{ lineHeight: 1.8, marginBottom: 16 }}>
                We directly source vehicles from Japanese auctions and provide complete documentation including original
                auction sheets, inspection reports, and verified service histories. Every vehicle undergoes our rigorous
                150-point inspection before being listed.
              </p>
              <p className="text-muted" style={{ lineHeight: 1.8 }}>
                Our commitment to transparency means no hidden fees, no surprises — just honest pricing and quality vehicles
                backed by our reputation and your trust.
              </p>
            </div>
            <div className="card" style={{ overflow: 'hidden', borderRadius: 'var(--radius-xl)' }}>
              <img
                src="https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&w=800&q=80"
                alt="Nagoya Auto Auction showroom"
                style={{ width: '100%', height: 400, objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="section section-alt" style={{ borderRadius: 'var(--radius-xl)', padding: '48px 32px', marginBottom: 48 }}>
          <div className="section-header" style={{ textAlign: 'left', maxWidth: 'none', margin: '0 0 32px' }}>
            <span className="tag">Our Journey</span>
            <h2>Key Milestones</h2>
          </div>
          <div className="timeline">
            {[
              { year: '2014', title: 'Founded in Horana', desc: 'Started our journey with a vision to bring transparent auto trading to Sri Lanka.' },
              { year: '2017', title: 'Expanded to Malabe', desc: 'Opened our second showroom to serve more customers across the island.' },
              { year: '2020', title: 'Digital Transformation', desc: 'Launched our online platform for remote browsing and bidding.' },
              { year: '2023', title: '1200+ Cars Milestone', desc: 'Celebrated selling over 1200 verified vehicles with a 98% customer satisfaction rate.' },
              { year: '2024', title: 'Island-wide Delivery', desc: 'Introduced doorstep delivery service anywhere in Sri Lanka.' },
            ].map((m) => (
              <div key={m.year} className="timeline-item">
                <div className="timeline-marker">{m.year}</div>
                <div className="timeline-content">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <span className="tag">Why Nagoya</span>
            <h2>What Sets Us Apart</h2>
          </div>
          <div className="grid grid-3">
            {[
              { icon: '🔍', title: 'Full Transparency', desc: 'Every vehicle comes with original auction sheets, inspection reports, and complete documentation.' },
              { icon: '🛡️', title: 'Quality Guarantee', desc: 'Our 150-point inspection ensures only the best vehicles make it to our listings.' },
              { icon: '💰', title: 'Fair Pricing', desc: 'No hidden fees or markups. What you see is what you pay, backed by market-competitive rates.' },
              { icon: '🚚', title: 'Island Delivery', desc: 'We deliver your vehicle to your doorstep anywhere in Sri Lanka.' },
              { icon: '🏦', title: 'Leasing Support', desc: 'Partnered with major banks to offer flexible leasing options with competitive rates.' },
              { icon: '🤝', title: 'After-Sale Care', desc: 'Our relationship doesn\'t end at sale. We provide ongoing support and maintenance guidance.' },
            ].map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="cta-banner">
            <h2>Ready to Experience the Nagoya Difference?</h2>
            <p>Browse our verified inventory or visit our showroom today</p>
            <div className="flex" style={{ justifyContent: 'center', gap: 14 }}>
              <a href="/inventory" className="button lg" style={{ background: 'white', color: 'var(--brand-red)' }}>Browse Inventory</a>
              <a href="/contact" className="button lg" style={{ background: 'transparent', border: '2px solid white', color: 'white' }}>Contact Us</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
