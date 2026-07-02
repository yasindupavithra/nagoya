import './globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Nagoya Auto Auction — Sri Lanka\'s Largest Auto Auction',
  description: 'Find certified Japanese cars with transparent pricing. Browse inventory, calculate leases, and get verified inspection reports.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <a
          href="https://wa.me/94714495632"
          className="whatsapp-fab"
          aria-label="WhatsApp inquiry"
          target="_blank"
          rel="noreferrer"
        >
          💬
        </a>
      </body>
    </html>
  );
}
