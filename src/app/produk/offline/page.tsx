import Link from 'next/link';
import type { Metadata } from 'next';
import { SegmentHeader } from '@/components/Compare';
import { Reveal } from '@/components/Reveal';
import { ProductHero } from '@/components/ProductHero';
import { PricingSection } from '@/components/PricingSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FEATURES, PLANS } from './page.content';

export const metadata: Metadata = {
  title: 'iPOS Offline: Kasir Tanpa Internet, Sekali Bayar',
  description: 'Bayar sekali, pakai selamanya. Aplikasi kasir offline untuk Android, tidak butuh internet untuk operasi harian. Lite Rp 299.000, Pro Rp 499.000.',
};

export default function OfflinePage() {
  return (
    <main className="py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <ProductHero
          badge="iPOS Offline"
          title="Tetap Berjalan Tanpa Internet"
          description="iPOS Offline adalah aplikasi kasir yang bekerja 100% di perangkat kamu. Cocok untuk warung, kios, dan usaha di area sinyal lemah."
          image="https://assets.inspirapos.biz.id/hero-images/ipos-offline-hero.webp"
          imageAlt="Tampilan aplikasi iPOS Offline"
          features={FEATURES}
          ctaHref="/demo?product=offline"
          ctaLabel="Coba Gratis 14 Hari"
        />

        {/* Harga & perbandingan langsung di halaman produk */}
        <Reveal>
          <SegmentHeader
            badge="Harga · sekali bayar, bukan langganan"
            title="Offline Lite vs Offline Pro: apa bedanya?"
            desc="Dua-duanya jalan 100% tanpa internet. Pro menambah kontrol untuk usaha yang mulai ramai: multi-kasir, hutang pelanggan, pencatatan pengeluaran toko, dan manajemen supplier."
          />
        </Reveal>
        <PricingSection
          plans={PLANS}
          note="Sudah pakai Lite? Upgrade ke Pro cukup bayar selisih Rp 199.000, data kamu tetap utuh."
        />

        <Reveal className="mt-10">
          <Card className="card-gold p-6 sm:p-8 text-center">
            <h2 className="font-extrabold text-xl text-charcoal mb-2">Belum yakin? Coba dulu gratis</h2>
            <p className="text-charcoal/60 mb-6">Trial gratis 14 hari: semua fitur terbuka, maksimal 20 menu & 50 transaksi. Data kamu tidak hilang setelah trial.</p>
            <Button asChild variant="gold"><Link href="/demo?product=offline">Coba Gratis 14 Hari</Link></Button>
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
