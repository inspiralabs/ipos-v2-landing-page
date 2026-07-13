import { kontakLink } from '@/lib/site';
import { OFFLINE_ROWS, planFeaturesFromRows } from '@/components/Compare';
import type { PricingPlan } from '@/components/PricingSection';

export const FEATURES = [
  { title: 'Tanpa Internet', desc: 'Semua data tersimpan di perangkat. Tidak ada koneksi = tidak ada masalah.' },
  { title: 'Sekali Bayar per Perangkat', desc: 'Beli sekali, pakai selamanya di perangkat yang sama. Tidak ada langganan bulanan.' },
  { title: 'Cepat & Ringan', desc: 'Aplikasi ringan, bisa di-install di HP/tablet Android maupun laptop.' },
  { title: 'Laporan di Perangkat', desc: 'Omzet harian, menu terlaris, sampai laba rugi, langsung di HP kamu.' },
];

export const PLANS: PricingPlan[] = [
  {
    key: 'lite',
    name: 'Offline Lite',
    tagline: 'Buat kamu yang jualan sendirian, sinyal susah, dan nggak mau bayar bulanan.',
    badge: 'Paling Terjangkau',
    price: { oneTime: 'Rp 299.000' },
    ctaLabel: 'Beli Lite',
    ctaHref: kontakLink('Halo, saya mau beli lisensi iPOS Offline Lite (Rp 299.000).'),
    features: planFeaturesFromRows(OFFLINE_ROWS, 1, 0),
  },
  {
    key: 'pro',
    name: 'Offline Pro',
    tagline: 'Buat usaha yang sudah punya kasir/staf dan butuh kontrol penuh.',
    badge: 'Terlaris',
    featured: true,
    price: { oneTime: 'Rp 499.000' },
    ctaLabel: 'Beli Pro',
    ctaHref: kontakLink('Halo, saya mau beli lisensi iPOS Offline Pro (Rp 499.000).'),
    features: planFeaturesFromRows(OFFLINE_ROWS, 1, 1),
  },
];
