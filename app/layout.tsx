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
  metadataBase: new URL('https://nagoya-phi.vercel.app'),
  title: {
    template: '%s | Nagoya Auto Auction',
    default: 'Nagoya Auto Auction — Sri Lanka\'s Largest Auto Auction',
  },
  description: 'Find certified Japanese cars with transparent pricing. Browse inventory, calculate leases, and get verified inspection reports.',
  keywords: ['auto auction sri lanka', 'japanese cars sri lanka', 'buy vehicles colombo', 'nagoya auto'],
  authors: [{ name: 'Nagoya Auto' }],
  openGraph: {
    title: 'Nagoya Auto Auction — Sri Lanka\'s Largest Auto Auction',
    description: 'Find certified Japanese cars with transparent pricing. Browse inventory, calculate leases, and get verified inspection reports.',
    url: 'https://nagoya-phi.vercel.app',
    siteName: 'Nagoya Auto Auction',
    images: [
      {
        url: '/Gemini_Generated_Image_ewmootewmootewmo.png',
        width: 1200,
        height: 630,
        alt: 'Nagoya Auto Auction',
      },
    ],
    locale: 'en_LK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nagoya Auto Auction',
    description: 'Find certified Japanese cars with transparent pricing. Browse inventory, calculate leases, and get verified inspection reports.',
    images: ['/Gemini_Generated_Image_ewmootewmootewmo.png'],
  },
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
