import Link from 'next/link';
import type { Metadata } from 'next';
import { WifiOff, KeyRound, Smartphone, BarChart3 } from 'lucide-react';
import { SegmentHeader, OFFLINE_ROWS, planFeaturesFromRows } from '@/components/Compare';
import { kontakLink } from '@/lib/site';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { PricingSection, type PricingPlan } from '@/components/PricingSection';

export const metadata: Metadata = {
  title: 'iPOS Offline — Kasir Tanpa Internet, Sekali Bayar',
  description: 'Bayar sekali, pakai selamanya. Aplikasi kasir offline untuk Android — tidak butuh internet untuk operasi harian. Lite Rp 299.000, Pro Rp 499.000.',
};

const FEATURES = [
  { icon: WifiOff, title: 'Tanpa Internet', desc: 'Semua data tersimpan di perangkat. Tidak ada koneksi = tidak ada masalah.' },
  { icon: KeyRound, title: 'Sekali Bayar per Perangkat', desc: 'Beli sekali, pakai selamanya di perangkat yang sama. Tidak ada langganan bulanan.' },
  { icon: Smartphone, title: 'Cepat & Ringan', desc: 'Aplikasi ringan, bisa di-install di HP/tablet Android maupun laptop.' },
  { icon: BarChart3, title: 'Laporan di Perangkat', desc: 'Omzet harian, menu terlaris, sampai laba rugi — langsung di HP kamu.' },
];

const PLANS: PricingPlan[] = [
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

export default function OfflinePage() {
  return (
    <main className="py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-10">
          <div className="icon-box !p-4 mb-4 mx-auto w-fit"><WifiOff className="w-8 h-8" aria-hidden /></div>
          <span className="inline-block bg-gold-bright/30 text-maroon-deep text-xs font-bold px-3 py-1 rounded-full mb-4">iPOS Offline</span>
          <h1 className="text-3xl font-extrabold text-charcoal mb-3">Tetap Berjalan Tanpa Internet</h1>
          <p className="text-charcoal/60 max-w-xl mx-auto">iPOS Offline adalah aplikasi kasir yang bekerja 100% di perangkat kamu. Cocok untuk warung, kios, dan usaha di area sinyal lemah.</p>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-6 mb-14">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <RevealItem key={f.title} className="card-brand p-4 sm:p-6">
                <div className="icon-box mb-3 !p-2 sm:!p-3"><Icon className="w-5 h-5" aria-hidden /></div>
                <h3 className="font-bold text-charcoal mb-1 text-sm sm:text-base">{f.title}</h3>
                <p className="text-xs sm:text-sm text-charcoal/60">{f.desc}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Harga & perbandingan langsung di halaman produk */}
        <Reveal>
          <SegmentHeader
            badge="Harga · sekali bayar, bukan langganan"
            title="Offline Lite vs Offline Pro — apa bedanya?"
            desc="Dua-duanya jalan 100% tanpa internet. Pro menambah kontrol untuk usaha yang mulai ramai: multi-kasir, hutang pelanggan, laba rugi, dan export laporan."
          />
        </Reveal>
        <PricingSection
          plans={PLANS}
          note="Sudah pakai Lite? Upgrade ke Pro cukup bayar selisih Rp 199.000 — data kamu tetap utuh."
        />

        <Reveal className="card-gold p-6 sm:p-8 text-center mt-10">
          <h2 className="font-extrabold text-xl text-charcoal mb-2">Belum yakin? Coba dulu gratis</h2>
          <p className="text-charcoal/60 mb-6">Trial gratis 14 hari: semua fitur terbuka, maksimal 20 menu & 50 transaksi. Data kamu tidak hilang setelah trial.</p>
          <Link href="/demo" className="btn-gold">Coba Gratis 14 Hari</Link>
        </Reveal>
      </div>
    </main>
  );
}
