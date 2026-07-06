import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

const font = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: { default: 'Inspira POS — Kasir Modern untuk UMKM & Restoran', template: '%s | Inspira POS' },
  description: 'Sistem kasir (POS) berbasis cloud dan offline-first untuk UMKM kuliner & restoran Indonesia. Coba gratis 14 hari.',
  keywords: ['kasir', 'pos', 'umkm', 'restoran', 'aplikasi kasir', 'kasir offline', 'inspira pos'],
  metadataBase: new URL('https://inspirapos.biz.id'),
  icons: {
    icon: [
      { url: '/favicon-16x16.jpg', sizes: '16x16', type: 'image/jpeg' },
      { url: '/favicon-32x-32.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/inspirapos-icon.ico' },
    ],
    apple: '/apple-touch-icon.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://inspirapos.biz.id',
    siteName: 'Inspira POS',
    images: [{ url: '/og-image.jpeg', width: 1200, height: 630, alt: 'Inspira POS — kasir untuk UMKM & restoran' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${font.variable} ${font.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
