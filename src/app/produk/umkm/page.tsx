import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Cloud, MonitorSmartphone, PackageSearch, Users,
  UserPlus, Gauge, Calculator, QrCode, ChefHat, Gift, Megaphone, Building2, Wallet, GraduationCap, ArrowLeftRight, CalendarClock,
} from 'lucide-react';
import { SegmentHeader, UMKM_ROWS, planFeaturesFromRows } from '@/components/Compare';
import { kontakLink } from '@/lib/site';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { PricingSection, type PricingPlan } from '@/components/PricingSection';

export const metadata: Metadata = {
  title: 'iPOS Cloud — Kasir Cloud untuk Toko & Kafe',
  description: 'Kelola toko dari mana saja mulai Rp 149.000/bulan. Laporan real-time, stok otomatis, struk digital via WhatsApp.',
};

const FEATURES = [
  { icon: MonitorSmartphone, title: 'Multi-Device', desc: 'Akses dari HP, tablet, atau laptop. Data tersinkron otomatis.' },
  { icon: PackageSearch, title: 'Manajemen Stok', desc: 'Pantau stok bahan dan produk. Ada peringatan saat hampir habis.' },
  { icon: Users, title: 'Multi-Kasir', desc: 'Buka shift kasir, pantau siapa yang melayani tiap transaksi.' },
];

// Add-on iPOS Cloud — docs/PRICING.md §2 (PRD §5.1). Hanya untuk paket Cloud;
// iPOS FnB sudah termasuk sebagian besar fitur ini di paketnya.
const ADDONS = [
  { icon: UserPlus, name: 'Role tambahan', desc: 'Tambah jenis akses di luar owner & kasir', price: 'Rp 49.000/bln' },
  { icon: Gauge, name: 'Dashboard stok real-time', desc: 'Pantau pergerakan stok detik itu juga', price: 'Rp 99.000/bln' },
  { icon: Calculator, name: 'Food cost / HPP otomatis', desc: 'Modal per menu dihitung otomatis', price: 'Rp 99.000/bln' },
  { icon: QrCode, name: 'QR Self-Order', desc: 'Pelanggan scan QR, pesan sendiri, order masuk kasir', price: 'Rp 109.000/bln' },
  { icon: ChefHat, name: 'KDS Dapur', desc: 'Pesanan tampil di layar dapur', price: 'Rp 149.000/bln' },
  { icon: Gift, name: 'Loyalty program', desc: 'Poin & redeem untuk pelanggan setia', price: 'Rp 149.000/bln' },
  { icon: Megaphone, name: 'WA Broadcast promo', desc: 'Kirim promo ke pelanggan via WhatsApp', price: 'Rp 199.000/bln' },
  { icon: Building2, name: 'Outlet tambahan', desc: 'Buka cabang tanpa ganti paket', price: 'Rp 299.000/outlet/bln' },
  { icon: Wallet, name: 'Dashboard keuangan', desc: 'Laba rugi & arus kas lengkap', price: 'Rp 299.000/bln' },
  { icon: GraduationCap, name: 'Training kasir on-site', desc: 'Pelatihan 2 jam di lokasi kamu', price: 'Rp 399.000/sesi' },
  { icon: ArrowLeftRight, name: 'Inter-branch transfer', desc: 'Pindah stok antar cabang tercatat', price: 'Rp 499.000/bln' },
  { icon: CalendarClock, name: 'Absensi karyawan', desc: 'Jam masuk-pulang karyawan tercatat', price: 'Rp 499.000/bln' },
];

const PLANS: PricingPlan[] = [
  {
    key: 'lite',
    name: 'UMKM Lite',
    tagline: 'Untuk warung/kafe 1 outlet, kasir dipegang sendiri.',
    badge: 'Paling Terjangkau',
    price: { monthly: 'Rp 149.000/bln', buyout: 'Rp 2.999.000', setup: 'Rp 199.000' },
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
    price: { monthly: 'Rp 299.000/bln', buyout: 'Rp 4.999.000', setup: 'Rp 399.000' },
    ctaLabel: 'Konsultasi Pro',
    ctaHref: kontakLink('Halo, saya tertarik iPOS Cloud UMKM Pro untuk usaha saya.'),
    features: planFeaturesFromRows(UMKM_ROWS, 3, 1),
  },
];

export default function UmkmPage() {
  return (
    <main className="py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-10">
          <div className="icon-box !p-4 mb-4 mx-auto w-fit"><Cloud className="w-8 h-8" aria-hidden /></div>
          <span className="inline-block bg-gold-bright/30 text-maroon-deep text-xs font-bold px-3 py-1 rounded-full mb-4">iPOS Cloud · UMKM</span>
          <h1 className="text-3xl font-extrabold text-charcoal mb-3">Kasir Cloud untuk UMKM Kuliner</h1>
          <p className="text-charcoal/60 max-w-xl mx-auto">Kelola warung, kedai, atau toko makanan kamu dari mana saja — dengan sistem kasir cloud yang mudah dipakai dan terjangkau.</p>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-14">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <RevealItem key={f.title} className="card-brand p-4 sm:p-6 flex sm:block items-start gap-4">
                <div className="icon-box mb-0 sm:mb-3 shrink-0"><Icon className="w-5 h-5" aria-hidden /></div>
                <div>
                  <h3 className="font-bold text-charcoal mb-1 text-sm sm:text-base">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-charcoal/60">{f.desc}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Harga & perbandingan langsung di halaman produk */}
        <Reveal>
          <SegmentHeader
            badge="Harga · langganan bulanan atau beli putus"
            title="iPOS Cloud Lite vs Pro — apa bedanya?"
            desc="Untuk warung dan kafe 1 outlet. Pro cocok kalau kasir kamu lebih dari satu orang dan butuh stok + laporan lengkap."
          />
        </Reveal>
        <PricingSection plans={PLANS} billing />

        {/* Add-on — pasang yang dibutuhkan saja, kapan saja */}
        <div className="mt-14">
          <Reveal>
            <SegmentHeader
              badge="Add-On · opsional"
              title="Butuh Lebih? Pasang Add-On, Bukan Ganti Paket"
              desc="Tambahkan fitur satu-satu sesuai kebutuhan — bisa dipasang atau dilepas kapan saja, tanpa mengubah paket utama kamu."
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3" stagger={0.04}>
            {ADDONS.map((a) => {
              const Icon = a.icon;
              return (
                <RevealItem key={a.name} className="card-brand p-4 flex items-center gap-3">
                  <div className="icon-box !p-2.5 shrink-0"><Icon className="w-5 h-5" aria-hidden /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-charcoal text-sm">{a.name}</p>
                    <p className="text-xs text-charcoal/60">{a.desc}</p>
                  </div>
                  <p className="text-sm font-extrabold text-maroon-deep shrink-0 text-right">{a.price}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
          <p className="text-sm text-charcoal/60 text-center mt-4">
            Belum yakin add-on mana yang perlu?{' '}
            <a href={kontakLink('Halo, saya mau tanya add-on iPOS Cloud yang cocok untuk usaha saya.')} target="_blank" rel="noreferrer" className="text-maroon-deep font-semibold hover:underline">
              Ceritakan usahamu ke admin
            </a> — kami sarankan yang benar-benar kepakai saja.
          </p>
        </div>

        <Reveal className="card-gold p-6 sm:p-8 text-center mt-10">
          <h2 className="font-extrabold text-xl text-charcoal mb-2">Belum yakin? Coba dulu gratis</h2>
          <p className="text-charcoal/60 mb-6">Trial gratis 14 hari — semua fitur terbuka, maksimal 20 menu & 50 transaksi. Tidak perlu kartu kredit.</p>
          <Link href="/demo" className="btn-gold">Coba Gratis 14 Hari</Link>
        </Reveal>
      </div>
    </main>
  );
}
