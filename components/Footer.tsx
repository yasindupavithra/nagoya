export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand" style={{ marginBottom: '16px' }}>
              <img 
                src="/logo.png" 
                alt="Nagoya Auto Auction" 
                style={{ 
                  height: '52px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  background: 'white',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)'
                }} 
              />
            </div>
            <p className="footer-desc">
              Sri Lanka&apos;s largest auto auction platform. We bring transparency,
              trust, and the best Japanese vehicles directly to you with verified
              inspection reports and secured transactions.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/inventory">Browse Inventory</a>
              <a href="/leasing">Leasing Options</a>
              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <div className="footer-links">
              <a href="/inventory">Vehicle Purchase</a>
              <a href="/leasing">Lease Calculator</a>
              <a href="/contact">Get a Quote</a>
            </div>
          </div>
          <div>
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <a href="tel:+94714495632" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#007AFF" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>
                <span style={{ fontSize: '1.05rem' }}>071 449 5632</span>
              </a>
            </div>
            <div className="footer-contact-item">
              <a href="https://wa.me/94714495632" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#25D366" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
                <span style={{ fontSize: '1.05rem' }}>WhatsApp Us</span>
              </a>
            </div>
            <div className="footer-contact-item">
              <a href="https://www.facebook.com/share/1Eo4ruhviG/?mibextid=qi2Omg" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1877F2" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>
                <span style={{ fontSize: '1.05rem' }}>Follow on Facebook</span>
              </a>
            </div>
            <div className="footer-contact-item">📍 Munagama, Horana, Sri Lanka</div>
            <div className="footer-contact-item">🕐 Mon-Sat: 8AM - 6PM</div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Nagoya Auto Auction. All rights reserved. Trusted Sri Lanka auto sourcing.</p>
        </div>
      </div>
    </footer>
  );
}
