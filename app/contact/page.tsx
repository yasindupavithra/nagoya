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
    <main style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Premium Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
        color: '#fff',
        padding: '80px 0 160px',
        textAlign: 'center',
        position: 'relative',
        borderBottom: '4px solid #e50000'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', backgroundColor: 'rgba(229,0,0,0.15)', color: '#ff4d4d', borderRadius: '30px', fontWeight: 800, fontSize: '0.9rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1.5px', border: '1px solid rgba(229,0,0,0.3)' }}>
            Contact Us
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.8rem)', fontWeight: 900, margin: '0 0 20px', letterSpacing: '-1.5px' }}>Let&apos;s Get In Touch</h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#aaa', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            Have questions? We&apos;re here to help. Reach out through any of our channels and our team will assist you immediately.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 2 }}>
        
        {/* Contact Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {[
            { icon: '📞', title: 'Call Us', info: '071 449 5632', sub: 'Mon-Sat, 8AM-6PM', href: 'tel:+94714495632', color: '#007AFF' },
            { icon: '💬', title: 'WhatsApp', info: '+94 71 449 5632', sub: 'Instant response', href: 'https://wa.me/94714495632', color: '#25D366' },
            { icon: 'f', title: 'Facebook', info: 'Nagoya Auto', sub: 'Follow our updates', href: 'https://www.facebook.com/share/1Eo4ruhviG/?mibextid=qi2Omg', color: '#1877F2' },
            { icon: '📍', title: 'Visit Us', info: 'Munagama, Horana', sub: 'Main Showroom', href: '#map', color: '#e50000' },
            { icon: '🕐', title: 'Business Hours', info: 'Mon - Sat', sub: '8:00 AM - 6:00 PM', href: '#', color: '#F5A623' },
          ].map((c) => (
            <a key={c.title} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ textDecoration: 'none', backgroundColor: '#fff', padding: '32px 24px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.3s ease' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: `${c.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: c.icon === 'f' ? '2.5rem' : '2rem', fontWeight: c.icon === 'f' ? 900 : 'normal', color: c.icon === 'f' ? c.color : 'inherit', marginBottom: '20px', fontFamily: c.icon === 'f' ? 'sans-serif' : 'inherit' }}>
                {c.icon}
              </div>
              <h4 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 800, color: '#111' }}>{c.title}</h4>
              <p style={{ margin: '0 0 4px', fontWeight: 700, color: c.color, fontSize: '1.05rem' }}>{c.info}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#888', fontWeight: 500 }}>{c.sub}</p>
            </a>
          ))}
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            <div id="map" style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', color: '#111' }}>Our Location</h3>
              <div style={{
                height: '350px',
                borderRadius: '16px',
                background: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80") center/cover no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
                <div style={{ position: 'relative', zIndex: 1, backgroundColor: '#fff', padding: '16px 24px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📍</div>
                  <h4 style={{ margin: '0 0 4px', fontWeight: 800, color: '#111' }}>Nagoya Auto Auction</h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Munagama, Horana</p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', color: '#111' }}>Follow Us</h3>
              <p style={{ color: '#666', marginBottom: '24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Stay updated with our latest arrivals and offers on social media.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="https://www.facebook.com/share/1Eo4ruhviG/?mibextid=qi2Omg" target="_blank" rel="noreferrer" style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#1877F2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s ease', textDecoration: 'none' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>
                </a>
                <a href="https://wa.me/94714495632" target="_blank" rel="noreferrer" style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s ease', textDecoration: 'none' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
                </a>
              </div>
            </div>
        </div>
      </div>
    </main>
  );
}
