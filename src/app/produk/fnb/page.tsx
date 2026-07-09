import Link from 'next/link';
import type { Metadata } from 'next';
import { Armchair, ChefHat, Building2, ClipboardList, UtensilsCrossed } from 'lucide-react';
import { SegmentHeader, RESTO_ROWS, planFeaturesFromRows } from '@/components/Compare';
import { kontakLink } from '@/lib/site';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { ProductHero } from '@/components/ProductHero';
import { PricingSection, type PricingPlan } from '@/components/PricingSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'iPOS FnB — Sistem POS untuk Restoran',
  description: 'Satu sistem untuk semua cabang. KDS dapur, denah meja, QR order, laporan P&L dan food cost — khusus bisnis FnB Indonesia. Mulai Rp 999.000/bulan.',
};

const FEATURES = [
  { icon: Armchair, title: 'Table Management', desc: 'Kelola meja, nomor antrian, dan status pesanan dengan mudah.' },
  { icon: ChefHat, title: 'Kitchen Display', desc: 'Antrian pesanan langsung tampil di layar dapur, tanpa nota kertas.' },
  { icon: Building2, title: 'Multi-Outlet', desc: 'Kelola sampai 10 cabang dari satu dashboard terpusat.' },
  { icon: ClipboardList, title: 'BOM & Resep', desc: 'Hitung harga pokok (HPP) dan kendalikan penggunaan bahan.' },
];

const PLANS: PricingPlan[] = [
  {
    key: 'starter',
    name: 'Resto Starter',
    tagline: 'Untuk resto/kafe 1–3 outlet yang baru mulai sistemasi.',
    badge: 'Paling Terjangkau',
    price: { monthly: 'Rp 999.000/bln', buyout: 'Rp 29.999.000', setup: 'Rp 1.499.000' },
    ctaLabel: 'Konsultasi Starter',
    ctaHref: kontakLink('Halo, saya mau konsultasi iPOS FnB Starter untuk restoran saya.'),
    features: planFeaturesFromRows(RESTO_ROWS, 3, 0),
  },
  {
    key: 'pro',
    name: 'Resto Pro',
    tagline: 'Untuk resto sampai 5 outlet yang butuh dashboard terpusat.',
    badge: 'Terlaris',
    featured: true,
    price: { monthly: 'Rp 2.499.000/bln', buyout: 'Rp 64.999.000', setup: 'Rp 2.999.000' },
    ctaLabel: 'Konsultasi Pro',
    ctaHref: kontakLink('Halo, saya mau konsultasi iPOS FnB Pro untuk restoran saya.'),
    features: planFeaturesFromRows(RESTO_ROWS, 3, 1),
  },
  {
    key: 'business',
    name: 'Resto Business',
    tagline: 'Untuk chain FnB sampai 10 outlet dengan kebutuhan konsolidasi penuh.',
    price: { monthly: 'Rp 4.999.000/bln', buyout: 'Rp 79.999.000', setup: 'Rp 4.999.000' },
    ctaLabel: 'Konsultasi Business',
    ctaHref: kontakLink('Halo, saya mau konsultasi iPOS FnB Business untuk restoran saya.'),
    features: planFeaturesFromRows(RESTO_ROWS, 3, 2),
  },
];

export default function FnbPage() {
  return (
    <main className="py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <ProductHero
          icon={<UtensilsCrossed className="w-8 h-8" aria-hidden />}
          badge="iPOS FnB · Resto"
          title="Sistem POS Lengkap untuk Restoran & Kafe"
          description="Dari denah meja hingga layar dapur, iPOS FnB menyiapkan semua yang kamu butuhkan untuk operasional restoran yang lancar."
          image="https://assets.inspirapos.biz.id/hero-images/ipos-fnb-hero.webp"
          imageAlt="Tampilan aplikasi iPOS FnB"
        />

        <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-6 mb-14 max-w-3xl mx-auto">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <RevealItem key={f.title}>
                <Card className="card-brand p-4 sm:p-6">
                  <div className="icon-box mb-3 !p-2 sm:!p-3"><Icon className="w-5 h-5" aria-hidden /></div>
                  <h3 className="font-bold text-charcoal mb-1 text-sm sm:text-base">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-charcoal/60">{f.desc}</p>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Harga & perbandingan langsung di halaman produk */}
        <Reveal>
          <SegmentHeader
            badge="Harga · langganan bulanan atau beli putus"
            title="Starter vs Pro vs Business — apa bedanya?"
            desc="Semua paket sudah termasuk dapur (KDS), denah meja, dan QR order per meja. Naik paket kalau cabang bertambah atau butuh laporan keuangan konsolidasi."
          />
        </Reveal>
        <PricingSection plans={PLANS} billing />

        <Reveal className="mt-10">
          <Card className="card-gold p-6 sm:p-8 text-center">
            <h2 className="font-extrabold text-xl text-charcoal mb-2">Belum yakin? Jadwalkan demo gratis</h2>
            <p className="text-charcoal/60 mb-6">Termasuk kitchen display & table management. Trial gratis 14 hari — semua fitur terbuka, maksimal 20 menu & 50 transaksi.</p>
            <Button asChild variant="gold"><Link href="/demo?product=fnb">Jadwalkan Demo Gratis</Link></Button>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
