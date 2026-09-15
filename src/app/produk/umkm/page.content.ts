import {
  UserPlus, Gauge, Calculator, QrCode, ChefHat, Gift, Megaphone, Building2, Wallet, GraduationCap, ArrowLeftRight, CalendarClock,
} from 'lucide-react';
import { kontakLink } from '@/lib/site';
import { UMKM_ROWS, planFeaturesFromRows } from '@/components/Compare';
import type { PricingPlan } from '@/components/PricingSection';

export const FEATURES = [
  { title: 'Bisa dari HP, Tablet, atau Laptop', desc: 'Akses dari mana saja. Data tersinkron otomatis.' },
  { title: 'Manajemen Stok', desc: 'Pantau stok bahan dan produk. Ada peringatan saat hampir habis.' },
  { title: 'Kasir Lebih dari Satu', desc: 'Buka shift kasir, pantau siapa yang melayani tiap transaksi.' },
  { title: 'Pelanggan Pesan Sendiri', desc: 'Scan QR di meja, pesan sendiri, order langsung masuk kasir.' }
];

// Add-on iPOS Cloud — docs/PRICING.md §2 (PRD §5.1). Hanya untuk paket Cloud;
// iPOS FnB sudah termasuk sebagian besar fitur ini di paketnya.
export const ADDONS = [
  { icon: UserPlus, name: 'Akses Tambahan untuk Staf', desc: 'Tambah jenis akses di luar owner & kasir', price: 'Rp 49.000/bln' },
  { icon: Gauge, name: 'Pantau Stok Detik Itu Juga', desc: 'Tahu stok berkurang begitu ada yang laku, tanpa nunggu laporan harian', price: 'Rp 99.000/bln' },
  { icon: Calculator, name: 'Untung-Rugi Tiap Menu, Otomatis', desc: 'Modal per menu (HPP) dihitung otomatis', price: 'Rp 99.000/bln' },
  { icon: QrCode, name: 'Pelanggan Pesan Sendiri (QR)', desc: 'Pelanggan scan QR, pesan sendiri, order masuk kasir', price: 'Rp 109.000/bln' },
  { icon: ChefHat, name: 'Layar Dapur (KDS)', desc: 'Pesanan langsung tampil di layar dapur', price: 'Rp 149.000/bln' },
  { icon: Gift, name: 'Loyalty program', desc: 'Poin & redeem untuk pelanggan setia', price: 'Rp 149.000/bln' },
  { icon: Megaphone, name: 'WA Broadcast promo', desc: 'Kirim promo ke pelanggan via WhatsApp', price: 'Rp 199.000/bln' },
  { icon: Building2, name: 'Outlet tambahan', desc: 'Buka cabang tanpa ganti paket', price: 'Rp 299.000/outlet/bln' },
  { icon: Wallet, name: 'Dashboard keuangan', desc: 'Laba rugi & arus kas lengkap', price: 'Rp 299.000/bln' },
  { icon: GraduationCap, name: 'Training kasir on-site', desc: 'Pelatihan 2 jam di lokasi kamu', price: 'Rp 399.000/sesi' },
  { icon: ArrowLeftRight, name: 'Pindah Stok Antar Cabang', desc: 'Transfer stok antar cabang, tercatat otomatis', price: 'Rp 499.000/bln' },
  { icon: CalendarClock, name: 'Absensi karyawan', desc: 'Jam masuk-pulang karyawan tercatat', price: 'Rp 499.000/bln' },
];

export const PLANS: PricingPlan[] = [
  {
    key: 'lite',
    name: 'UMKM Lite',
    tagline: 'Untuk warung/kafe 1 outlet, kasir dipegang sendiri.',
    badge: 'Paling Terjangkau',
    price: { monthly: 'Rp 149.000/bln', yearly: 'Rp 1.499.000/thn', setup: 'Rp 199.000', setupYearly: 'Rp 99.500' },
    ctaLabel: 'Konsultasi Lite',
    ctaHref: kontakLink('Halo, saya tertarik iPOS Cloud UMKM Lite untuk usaha saya.'),
    features: planFeaturesFromRows(UMKM_ROWS, 3, 0),
  },
  {
    key: 'pro',
    name: 'UMKM Pro',
    tagline: 'Untuk kafe dengan beberapa kasir dan butuh laporan lengkap.',
    badge: 'Terlaris',
    featured: true,
    price: { monthly: 'Rp 299.000/bln', yearly: 'Rp 2.999.000/thn', setup: 'Rp 399.000', setupYearly: 'Rp 199.500' },
    ctaLabel: 'Konsultasi Pro',
    ctaHref: kontakLink('Halo, saya tertarik iPOS Cloud UMKM Pro untuk usaha saya.'),
    features: planFeaturesFromRows(UMKM_ROWS, 3, 1),
  },
];
