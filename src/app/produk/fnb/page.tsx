import Link from 'next/link';
import type { Metadata } from 'next';
import { SegmentHeader, CompareTable, RESTO_ROWS } from '@/components/Compare';
import { kontakLink } from '@/lib/site';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { ProductHero } from '@/components/ProductHero';
import { PricingSection } from '@/components/PricingSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FEATURES, ADDONS_BASIC, ADDONS_ALL, PLANS } from './page.content';

export const metadata: Metadata = {
  title: 'iPOS FnB: Sistem POS untuk Restoran',
  description: 'Satu sistem untuk semua cabang. KDS dapur, denah meja, QR order, laporan P&L dan food cost, khusus bisnis FnB Indonesia. Mulai Rp 599.000/bulan.',
};

export default function FnbPage() {
  return (
    <main className="py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <ProductHero
          badge="iPOS FnB · Resto"
          title="Sistem POS Lengkap untuk Restoran & Kafe"
          description="Dari denah meja hingga layar dapur, iPOS FnB menyiapkan semua yang kamu butuhkan untuk operasional restoran yang lancar."
          image="https://assets.inspirapos.biz.id/hero-images/ipos-fnb-hero.webp"
          imageAlt="Tampilan aplikasi iPOS FnB"
          features={FEATURES}
          ctaHref="/demo?product=fnb"
          ctaLabel="Coba Gratis 14 Hari"
        />

        {/* Harga & perbandingan langsung di halaman produk */}
        <Reveal>
          <SegmentHeader
            badge="Harga · langganan bulanan atau tahunan"
            title="Basic vs Starter vs Pro vs Business: apa bedanya?"
            desc="Semua paket sudah termasuk dapur (KDS), denah meja, dan QR order per meja. Basic cocok untuk 1 outlet yang baru mulai; Starter ke atas menambah stok bahan & BOM otomatis; naik paket lagi kalau cabang bertambah atau butuh laporan keuangan konsolidasi."
          />
        </Reveal>
        <PricingSection plans={PLANS} billing />

        {/* Tabel ringkas - pelengkap card di atas untuk yang mau bandingkan semua baris fitur sekaligus */}
        <div className="mt-10">
          <p className="text-sm font-bold text-charcoal text-center mb-4">Atau Bandingkan Semua Fitur Sekaligus</p>
          <CompareTable
            headers={PLANS.map((p) => p.name)}
            rows={RESTO_ROWS.slice(3)}
          />
        </div>

        {/* Add-on — untuk Resto Basic yang butuh fitur individual, atau semua tier yang butuh outlet/promo/training tambahan */}
        <div className="mt-14">
          <Reveal>
            <SegmentHeader
              badge="Add-On · opsional"
              title="Butuh Lebih? Pasang Add-On, Bukan Naik Tier"
              desc="Buat Resto Basic: pasang satu-satu fitur yang benar-benar kepakai. Buat semua tier: tambah outlet, promo, atau training kapan saja."
            />
          </Reveal>
          <p className="text-sm font-bold text-charcoal mb-3">Untuk Resto Basic</p>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8" stagger={0.04}>
            {ADDONS_BASIC.map((a) => {
              const Icon = a.icon;
              return (
                <RevealItem key={a.name}>
                  <Card className="card-brand p-4 flex items-center gap-3">
                    <div className="icon-box !p-2.5 shrink-0"><Icon className="w-5 h-5" aria-hidden /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-charcoal text-sm">{a.name}</p>
                      <p className="text-xs text-charcoal/60">{a.desc}</p>
                    </div>
                    <p className="text-sm font-extrabold text-maroon-deep shrink-0 text-right">{a.price}</p>
                  </Card>
                </RevealItem>
              );
            })}
          </RevealGroup>
          <p className="text-sm font-bold text-charcoal mb-3">Berlaku Semua Tier</p>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3" stagger={0.04}>
            {ADDONS_ALL.map((a) => {
              const Icon = a.icon;
              return (
                <RevealItem key={a.name}>
                  <Card className="card-brand p-4 flex items-center gap-3">
                    <div className="icon-box !p-2.5 shrink-0"><Icon className="w-5 h-5" aria-hidden /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-charcoal text-sm">{a.name}</p>
                      <p className="text-xs text-charcoal/60">{a.desc}</p>
                    </div>
                    <p className="text-sm font-extrabold text-maroon-deep shrink-0 text-right">{a.price}</p>
                  </Card>
                </RevealItem>
              );
            })}
          </RevealGroup>
          <p className="text-sm text-charcoal/60 text-center mt-4">
            Belum yakin add-on mana yang perlu?{' '}
            <a href={kontakLink('Halo, saya mau tanya add-on iPOS FnB yang cocok untuk restoran saya.')} target="_blank" rel="noreferrer" className="text-maroon-deep font-semibold hover:underline">
              Ceritakan usahamu ke admin
            </a>, kami sarankan yang benar-benar kepakai saja.
          </p>
        </div>

        <Reveal className="mt-10">
          <Card className="card-gold p-6 sm:p-8 text-center">
            <h2 className="font-extrabold text-xl text-charcoal mb-2">Belum yakin? Jadwalkan demo gratis</h2>
            <p className="text-charcoal/60 mb-6">Termasuk kitchen display & table management. Trial gratis 14 hari, semua fitur terbuka, maksimal 20 menu & 50 transaksi.</p>
            <Button asChild variant="gold"><Link href="/demo?product=fnb">Jadwalkan Demo Gratis</Link></Button>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
