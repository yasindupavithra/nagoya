'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const whatsappMsg = encodeURIComponent(
      `Hi Nagoya Auto! \n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nSubject: ${subject}\n\nMessage: ${message}`
    );
    window.open(`https://wa.me/94714495632?text=${whatsappMsg}`, '_blank');
    setStatus('✅ Redirecting to WhatsApp...');
  }

  return (
    <main>
      <div className="container">
        <section className="section">
          <div className="section-header" style={{ textAlign: 'left', margin: '0 0 36px', maxWidth: 'none' }}>
            <span className="tag">Contact Us</span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '8px 0' }}>Get in Touch</h1>
            <p className="text-muted">Have questions? We&apos;re here to help. Reach out through any of our channels.</p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-4" style={{ marginBottom: 40 }}>
            {[
              { icon: '📞', title: 'Call Us', info: '071 449 5632', sub: 'Mon-Sat, 8AM-6PM', href: 'tel:+94714495632' },
              { icon: '💬', title: 'WhatsApp', info: '+94 71 449 5632', sub: 'Instant response', href: 'https://wa.me/94714495632' },
              { icon: '📍', title: 'Visit Us', info: 'Munagama, Horana', sub: 'Main Showroom', href: '#map' },
              { icon: '🕐', title: 'Business Hours', info: 'Mon - Sat', sub: '8:00 AM - 6:00 PM', href: '#' },
            ].map((c) => (
              <a key={c.title} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="contact-info-card" style={{ textDecoration: 'none' }}>
                <div className="contact-info-icon">{c.icon}</div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '0.95rem' }}>{c.title}</h4>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>{c.info}</p>
                  <p className="text-muted" style={{ margin: '2px 0 0', fontSize: '0.78rem' }}>{c.sub}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form + Map */}
          <div className="contact-grid">
            <div className="card panel">
              <h3 style={{ marginBottom: 6 }}>Send us a Message</h3>
              <p className="text-muted" style={{ marginBottom: 20, fontSize: '0.88rem' }}>
                Fill out the form and we&apos;ll redirect you to WhatsApp for instant communication.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-2">
                  <div className="field" style={{ marginTop: 0 }}>
                    <label>Your Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your name" />
                  </div>
                  <div className="field" style={{ marginTop: 0 }}>
                    <label>Phone Number</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="07X XXX XXXX" />
                  </div>
                </div>
                <div className="field">
                  <label>Email (Optional)</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                </div>
                <div className="field">
                  <label>Subject</label>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option>General Inquiry</option>
                    <option>Vehicle Purchase</option>
                    <option>Leasing Information</option>
                    <option>Auction Registration</option>
                    <option>After-Sale Support</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="How can we help you?" />
                </div>
                <button type="submit" className="button danger full-width lg" style={{ marginTop: 16 }}>
                  💬 Send via WhatsApp
                </button>
              </form>
              {status && <p className="status-message">{status}</p>}
            </div>

            <div>
              {/* Map placeholder */}
              <div className="card" id="map" style={{ overflow: 'hidden', marginBottom: 20 }}>
                <div style={{
                  height: 300,
                  background: 'linear-gradient(135deg, var(--surface-alt), var(--border-light))',
                  display: 'grid',
                  placeItems: 'center',
                  textAlign: 'center',
                  padding: 24,
                }}>
                  <div>
                    <p style={{ fontSize: '3rem', marginBottom: 12 }}>📍</p>
                    <h3 style={{ marginBottom: 6 }}>Nagoya Auto Auction</h3>
                    <p className="text-muted">Munagama, Horana, Sri Lanka</p>
                    <a
                      href="https://www.google.com/maps/search/Nagoya+Auto+Auction+Munagama+Horana"
                      target="_blank"
                      rel="noreferrer"
                      className="button danger sm"
                      style={{ marginTop: 12 }}
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Showroom Locations */}
              <div className="card panel">
                <h3 style={{ marginBottom: 16 }}>Our Showrooms</h3>
                {[
                  { name: 'Horana Showroom', address: 'Munagama, Horana, Western Province', hours: 'Mon-Sat: 8AM-6PM', main: true },
                  { name: 'Malabe Branch', address: 'Malabe, Western Province', hours: 'Mon-Sat: 8AM-5PM', main: false },
                ].map((loc) => (
                  <div key={loc.name} className="contact-info-card" style={{ marginBottom: 10, background: loc.main ? 'rgba(211,47,47,0.04)' : 'var(--surface-alt)' }}>
                    <div className="contact-info-icon">{loc.main ? '🏢' : '🏬'}</div>
                    <div>
                      <h4 style={{ margin: '0 0 2px', fontSize: '0.92rem' }}>
                        {loc.name}
                        {loc.main && <span className="tag-pill" style={{ marginLeft: 8, padding: '2px 8px', fontSize: '0.68rem' }}>Main</span>}
                      </h4>
                      <p className="text-muted" style={{ margin: 0, fontSize: '0.82rem' }}>{loc.address}</p>
                      <p className="text-muted" style={{ margin: '2px 0 0', fontSize: '0.78rem' }}>🕐 {loc.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
