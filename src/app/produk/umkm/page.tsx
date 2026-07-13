import Link from 'next/link';
import type { Metadata } from 'next';
import { SegmentHeader } from '@/components/Compare';
import { kontakLink } from '@/lib/site';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { ProductHero } from '@/components/ProductHero';
import { PricingSection } from '@/components/PricingSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FEATURES, ADDONS, PLANS } from './page.content';

export const metadata: Metadata = {
  title: 'iPOS Cloud: Aplikasi kasir online, memudahkan kelola toko & kafe',
  description: 'Kelola toko dari mana saja mulai Rp 149.000/bulan. Laporan real-time, stok otomatis, struk digital via WhatsApp.',
};

export default function UmkmPage() {
  return (
    <main className="py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <ProductHero
          badge="iPOS Cloud"
          title="Kasir online untuk UMKM Kuliner"
          description="Kelola warung, kedai, atau toko makanan kamu dari mana saja, dengan aplikasi kasir online memudahkan penjualan dan proses operasional usaha Anda."
          image="https://assets.inspirapos.biz.id/hero-images/ipos-umkm-hero.webp"
          imageAlt="Tampilan aplikasi iPOS Cloud UMKM"
          features={FEATURES}
          ctaHref="/demo?product=umkm"
          ctaLabel="Coba Gratis 14 Hari"
        />

        {/* Harga & perbandingan langsung di halaman produk */}
        <Reveal>
          <SegmentHeader
            badge="Harga · langganan bulanan atau tahunan"
            title="iPOS Cloud Lite vs Pro: apa bedanya?"
            desc="Untuk warung dan kafe 1 outlet. Pro cocok kalau kasir kamu lebih dari satu orang dan butuh shift kasir, split bill, serta otorisasi pembatalan transaksi."
          />
        </Reveal>
        <PricingSection plans={PLANS} billing />

        {/* Add-on — pasang yang dibutuhkan saja, kapan saja */}
        <div className="mt-14">
          <Reveal>
            <SegmentHeader
              badge="Add-On · opsional"
              title="Butuh Lebih? Pasang Add-On, Bukan Ganti Paket"
              desc="Tambahkan fitur satu-satu sesuai kebutuhan. Bisa dipasang atau dilepas kapan saja, tanpa mengubah paket utama kamu."
            />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-3" stagger={0.04}>
            {ADDONS.map((a) => {
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
            <a href={kontakLink('Halo, saya mau tanya add-on iPOS Cloud yang cocok untuk usaha saya.')} target="_blank" rel="noreferrer" className="text-maroon-deep font-semibold hover:underline">
              Ceritakan usahamu ke admin
            </a>, kami sarankan yang benar-benar kepakai saja.
          </p>
        </div>

        <Reveal className="mt-10">
          <Card className="card-gold p-6 sm:p-8 text-center">
            <h2 className="font-extrabold text-xl text-charcoal mb-2">Belum yakin? Coba dulu gratis</h2>
            <p className="text-charcoal/60 mb-6">Trial gratis 14 hari, semua fitur terbuka, maksimal 20 menu & 50 transaksi. Tidak perlu kartu kredit.</p>
            <Button asChild variant="gold"><Link href="/demo?product=umkm">Coba Gratis 14 Hari</Link></Button>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
