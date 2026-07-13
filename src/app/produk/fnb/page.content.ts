import { ClipboardList, Gauge, Gift, Wallet, CalendarClock, Building2, Megaphone, GraduationCap } from 'lucide-react';
import { kontakLink } from '@/lib/site';
import { RESTO_ROWS, planFeaturesFromRows } from '@/components/Compare';
import type { PricingPlan } from '@/components/PricingSection';

export const FEATURES = [
  { title: 'Table Management', desc: 'Kelola meja, nomor antrian, dan status pesanan dengan mudah.' },
  { title: 'Kitchen Display', desc: 'Antrian pesanan langsung tampil di layar dapur, tanpa nota kertas.' },
  { title: 'Multi-Outlet', desc: 'Kelola sampai 10 cabang dari satu dashboard terpusat.' },
  { title: 'BOM & Resep', desc: 'Hitung harga pokok (HPP) dan kendalikan penggunaan bahan.' },
];

// Add-on Resto — docs/PRICING.md §3. Kelompok 1 khusus Resto Basic (sudah bundled gratis
// mulai Starter ke atas). Kelompok 2 berlaku di semua tier.
export const ADDONS_BASIC: { icon: typeof ClipboardList; name: string; desc: string; price: string }[] = [
  { icon: ClipboardList, name: 'BOM resep otomatis + auto-disable menu', desc: 'Stok bahan berkurang otomatis, menu nonaktif saat habis', price: 'Rp 99.000/bln' },
  { icon: Gauge, name: 'Dashboard stok real-time', desc: 'Pantau pergerakan stok detik itu juga', price: 'Rp 99.000/bln' },
  { icon: Gift, name: 'Loyalty program', desc: 'Poin & redeem untuk pelanggan setia', price: 'Rp 149.000/bln' },
  { icon: Wallet, name: 'Dashboard keuangan', desc: 'Laba rugi & arus kas lengkap', price: 'Rp 299.000/bln' },
  { icon: CalendarClock, name: 'Absensi karyawan', desc: 'Jam masuk-pulang karyawan tercatat', price: 'Rp 499.000/bln' },
];
export const ADDONS_ALL: { icon: typeof Building2; name: string; desc: string; price: string }[] = [
  { icon: Building2, name: 'Outlet tambahan di atas cap tier', desc: 'Buka cabang tanpa naik ke tier berikutnya', price: 'Rp 399.000/outlet/bln' },
  { icon: Megaphone, name: 'WA Broadcast promo', desc: 'Kirim promo ke pelanggan via WhatsApp', price: 'Rp 199.000/bln' },
  { icon: GraduationCap, name: 'Training kasir on-site', desc: 'Pelatihan 2 jam di lokasi kamu', price: 'Rp 399.000/sesi' },
];

export const PLANS: PricingPlan[] = [
  {
    key: 'basic',
    name: 'Resto Basic',
    badge: 'Paling Terjangkau',
    tagline: 'Untuk resto/kafe 1 outlet yang baru mulai sistemasi dapur & meja.',
    price: { monthly: 'Rp 599.000/bln', yearly: 'Rp 5.999.000/thn', setup: 'Rp 799.000', setupYearly: 'Rp 399.500' },
    ctaLabel: 'Konsultasi Basic',
    ctaHref: kontakLink('Halo, saya mau konsultasi iPOS FnB Basic untuk restoran saya.'),
    features: planFeaturesFromRows(RESTO_ROWS, 3, 0),
  },
  {
    key: 'starter',
    name: 'Resto Starter',
    tagline: 'Untuk resto/kafe 1–3 outlet yang butuh stok & BOM otomatis.',
    price: { monthly: 'Rp 999.000/bln', yearly: 'Rp 9.999.000/thn', setup: 'Rp 1.499.000', setupYearly: 'Rp 749.500' },
    ctaLabel: 'Konsultasi Starter',
    ctaHref: kontakLink('Halo, saya mau konsultasi iPOS FnB Starter untuk restoran saya.'),
    features: planFeaturesFromRows(RESTO_ROWS, 3, 1),
  },
  {
    key: 'pro',
    name: 'Resto Pro',
    tagline: 'Untuk resto sampai 5 outlet yang butuh dashboard terpusat.',
    badge: 'Terlaris',
    featured: true,
    price: { monthly: 'Rp 2.499.000/bln', yearly: 'Rp 24.999.000/thn', setup: 'Rp 2.999.000', setupYearly: 'Rp 1.499.500' },
    ctaLabel: 'Konsultasi Pro',
    ctaHref: kontakLink('Halo, saya mau konsultasi iPOS FnB Pro untuk restoran saya.'),
    features: planFeaturesFromRows(RESTO_ROWS, 3, 2),
  },
  {
    key: 'business',
    name: 'Resto Business',
    tagline: 'Untuk chain FnB sampai 10 outlet dengan kebutuhan konsolidasi penuh.',
    price: { monthly: 'Rp 4.999.000/bln', yearly: 'Rp 49.999.000/thn', setup: 'Rp 4.999.000', setupYearly: 'Rp 2.499.500' },
    ctaLabel: 'Konsultasi Business',
    ctaHref: kontakLink('Halo, saya mau konsultasi iPOS FnB Business untuk restoran saya.'),
    features: planFeaturesFromRows(RESTO_ROWS, 3, 3),
  },
];
