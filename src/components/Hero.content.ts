export type Slide = {
  headline1: string;
  headline2: string;
  sub: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  overlay: string;
};

export const SLIDES: Slide[] = [
  {
    headline1: 'Kasir yang Tetap Jalan',
    headline2: 'Walau Internet Mati',
    sub: 'Inspira POS - kasir pintar untuk UMKM kuliner dan restoran Indonesia. Catat jualan, kelola stok, lihat untung. Mulai Rp 149 ribu/bulan atau sekali bayar Rp 299 ribu.',
    ctaHref: '/demo',
    image: '/hero-images/ipos-offline-hero.webp',
    imageAlt: 'Pemilik warung memakai iPOS Offline di tablet',
    overlay: 'from-charcoal/85 via-charcoal/45',
  },
  {
    headline1: 'Pantau Warung Dari Mana Saja',
    headline2: 'Laporan Real-Time di HP',
    sub: 'Kelola satu warung atau kafe tanpa harus di tempat. Cek omzet, stok, dan laba kapan saja - mulai Rp 149 ribu/bulan.',
    ctaHref: '/demo?product=umkm',
    image: '/hero-images/ipos-umkm-hero.webp',
    imageAlt: 'Pemilik kafe memantau laporan iPOS Cloud dari HP',
    overlay: 'from-charcoal/85 via-charcoal/45',
  },
  {
    headline1: 'Satu Sistem untuk',
    headline2: 'Semua Cabang Resto',
    sub: 'Dapur, meja, dan laporan tiap outlet terhubung dalam satu dashboard. Cocok untuk resto dan kafe yang mulai berkembang.',
    ctaHref: '/demo?product=fnb',
    image: '/hero-images/ipos-fnb-hero.webp',
    imageAlt: 'Dapur restoran memakai kitchen display system iPOS FnB',
    overlay: 'from-charcoal/90 via-charcoal/55',
  },
];
