import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  WifiOff, Cloud, UtensilsCrossed, Rocket, Store, BadgeCheck,
  Printer, PackageSearch, BarChart3, Users, HandCoins, DatabaseBackup, QrCode, ChefHat,
  MessageCircle, Mail, Globe, Check,
} from 'lucide-react';
import { CONTACT, waLink, kontakLink } from '@/lib/site';
import { Faq } from '@/components/Faq';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Inspira POS - Kasir untuk UMKM & Restoran, Tetap Jalan Tanpa Internet',
};

// Harga: docs/PRICING.md (trial 14 hari, harga serba-9)

const PRODUCTS = [
  {
    badge: 'iPos Offline',
    icon: WifiOff,
    featured: true,
    q: 'Pengen punya sistem kasir offline? Nggak mau bayar bulanan?',
    title: 'Sekali bayar Rp 299 ribu, jalan selamanya',
    points: ['100% tanpa internet - data aman di HP kamu', 'Tanpa langganan, tanpa biaya tersembunyi', 'Stok, struk thermal, laporan harian - lengkap'],
    href: '/produk/offline',
  },
  {
    badge: 'iPos Cloud',
    icon: Cloud,
    q: 'Punya satu warung atau kafe, ingin pantau omzet dari HP?',
    title: 'Mulai Rp 149 ribu/bulan, laporan real-time',
    points: ['Cek penjualan dari mana saja, kapan saja', 'Struk dikirim via WhatsApp, terima QRIS', 'Tetap bisa jualan saat internet putus'],
    href: '/produk/umkm',
  },
  {
    badge: 'F&B / Resto',
    icon: UtensilsCrossed,
    q: 'Restoran dengan dapur, meja, atau banyak cabang?',
    title: 'Mulai Rp 999 ribu/bulan, sistem lengkap',
    points: ['Pesanan langsung tampil di layar dapur (KDS)', 'Pelanggan pesan sendiri lewat QR di meja', 'Kelola sampai 10 cabang dari satu dashboard'],
    href: '/produk/fnb',
  },
];

const STEPS = [
  { icon: Rocket, t: 'Coba gratis 14 hari', d: 'Tanpa kartu kredit. Semua fitur terbuka - dibatasi 20 menu & 50 transaksi biar cukup untuk menilai.' },
  { icon: Store, t: 'Jualan seperti biasa', d: 'Pakai contoh menu siap pakai, terima pembayaran, lihat laporan. Tim kami siap bantu via WhatsApp.' },
  { icon: BadgeCheck, t: 'Cocok? Pilih paket', d: 'Offline: bayar sekali, dapat kode aktivasi, data lanjut. Cloud: upgrade akun, data trial ikut pindah.' },
];

const FEATURES = [
  { icon: WifiOff, t: 'Anti mati gaya', d: 'Internet putus, kasir tetap jalan' },
  { icon: Printer, t: 'Struk thermal', d: 'Printer Bluetooth 58/80mm + logo toko' },
  { icon: PackageSearch, t: 'Stok otomatis', d: 'Berkurang tiap jualan, ada alert menipis' },
  { icon: BarChart3, t: 'Laporan untung', d: 'Omzet, menu terlaris, laba rugi' },
  { icon: Users, t: 'Multi-kasir', d: 'Tiap kasir punya PIN sendiri' },
  { icon: HandCoins, t: 'Catatan hutang', d: 'Piutang pelanggan + cicilan tercatat' },
  { icon: QrCode, t: 'QRIS & QR order', d: 'Terima QRIS, pelanggan pesan dari meja' },
  { icon: DatabaseBackup, t: 'Data aman', d: 'Backup satu ketuk, pulihkan kapan saja' },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero — teks kiri, visual kanan (design system: grid 12) */}
      <section className="py-14 lg:py-20 px-4">
        <Reveal className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-charcoal mb-4 leading-tight">
              Kasir yang Tetap Jalan <span className="text-maroon-deep">Walau Internet Mati</span>
            </h1>
            <p className="text-lg text-charcoal/60 mb-8 max-w-2xl mx-auto lg:mx-0">
              Inspira POS - kasir pintar untuk UMKM kuliner dan restoran Indonesia.
              Catat jualan, kelola stok, lihat untung. Mulai Rp 149 ribu/bulan atau sekali bayar Rp 299 ribu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/demo" className="btn-gold">Coba Gratis 14 Hari</Link>
              <a href={kontakLink('Halo, saya mau tanya tentang Inspira POS.')} target="_blank" rel="noreferrer" className="btn-outline">
                <MessageCircle className="w-4 h-4" aria-hidden /> Tanya Dulu via WA
              </a>
            </div>
            <p className="text-xs text-charcoal/50 mt-3">Coba 14 hari gratis, tanpa kartu kredit.</p>
          </div>
          <div className="hidden lg:block lg:col-span-5">
            <Image
              src="/og-image.jpeg"
              alt="Tampilan aplikasi kasir Inspira POS"
              width={1200}
              height={630}
              priority
              className="rounded-xl border border-line shadow-[0_8px_32px_rgba(110,21,15,0.14)] w-full h-auto"
            />
          </div>
        </Reveal>
      </section>

      {/* Pilih jalur */}
      <section className="py-12 lg:py-16 px-4 bg-surface border-y border-line">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-center text-charcoal mb-2">Usaha Kamu yang Mana?</h2>
            <p className="text-center text-charcoal/60 mb-8">Tiga produk, tiga kebutuhan berbeda. Geser dan pilih yang paling mirip dengan situasi kamu.</p>
          </Reveal>
          <RevealGroup className="snap-row md:grid-cols-3">
            {PRODUCTS.map((p) => {
              const Icon = p.icon;
              const dark = p.featured;
              return (
                <RevealItem key={p.badge} className={`${dark ? 'card-dark' : 'card-brand'} p-6 flex flex-col`}>
                  <div className={`${dark ? 'rounded-xl bg-white/10 p-3 text-gold-bright' : 'icon-box'} w-fit mb-3`}>
                    <Icon className="w-6 h-6" aria-hidden />
                  </div>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit ${dark ? 'bg-white/10 text-white/80' : 'bg-gold-bright/30 text-maroon-deep'}`}>
                    {p.badge}
                  </span>
                  <p className={`text-sm mb-2 ${dark ? 'text-white/60' : 'text-charcoal/60'}`}>{p.q}</p>
                  <h3 className={`font-extrabold text-lg mb-3 ${dark ? 'text-white' : 'text-charcoal'}`}>{p.title}</h3>
                  <ul className="space-y-2 flex-1 mb-4">
                    {p.points.map((pt) => (
                      <li key={pt} className={`text-sm flex items-start gap-2 ${dark ? 'text-white/75' : 'text-charcoal/70'}`}>
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? 'text-gold-bright' : 'text-maroon-deep'}`} aria-hidden /> {pt}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={p.href}
                    className={dark
                      ? 'rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-maroon-deep text-center hover:scale-105 transition-transform min-h-11 flex items-center justify-center'
                      : 'btn-gold text-center'}
                  >
                    Lihat Fitur & Harga
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Cara mulai */}
      <section className="py-12 lg:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-center text-charcoal mb-2">Mulainya Gampang, Nggak Pakai Ribet</h2>
            <p className="text-center text-charcoal/60 mb-8">Dari coba sampai jualan, cuma tiga langkah.</p>
          </Reveal>
          <RevealGroup className="grid gap-3 sm:gap-6 sm:grid-cols-3">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <RevealItem key={s.t} className="card-brand p-5 flex sm:block items-start gap-4">
                  <div className="icon-box mb-0 sm:mb-3 shrink-0"><Icon className="w-5 h-5" aria-hidden /></div>
                  <div>
                    <h3 className="font-bold text-charcoal mb-1">{i + 1}. {s.t}</h3>
                    <p className="text-sm text-charcoal/60 leading-relaxed">{s.d}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Fitur lengkap — 2 kolom di HP biar pendek */}
      <section className="py-12 lg:py-16 px-4 bg-surface border-y border-line">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-center text-charcoal mb-2">Semua yang Warung & Resto Butuhkan</h2>
            <p className="text-center text-charcoal/60 mb-8">Fitur lengkap tanpa bikin pusing. Detail per paket ada di halaman produk.</p>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" stagger={0.05}>
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <RevealItem key={f.t} className="card-brand p-4 sm:p-5">
                  <div className="icon-box mb-2.5 !p-2"><Icon className="w-5 h-5" aria-hidden /></div>
                  <h3 className="font-bold text-charcoal text-sm mb-0.5">{f.t}</h3>
                  <p className="text-xs sm:text-sm text-charcoal/60 leading-relaxed">{f.d}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Trust — klien nyata, tanpa kutipan karangan */}
      <section className="py-12 lg:py-16 px-4">
        <Reveal className="max-w-4xl mx-auto">
          <div className="card-gold p-6 sm:p-8 text-center">
            <ChefHat className="w-8 h-8 text-maroon-deep mx-auto mb-3" aria-hidden />
            <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal mb-2">
              Sudah Dipakai Jualan Beneran, Setiap Hari
            </h2>
            <p className="text-sm sm:text-base text-charcoal/70 max-w-2xl mx-auto mb-4">
              Dari <b>D kriuk Fried Chicken Jatiluhur</b> sampai <b>Mie Jebew Jontor</b> - warung-warung ini
              mencatat penjualan hariannya dengan Inspira POS. Bukan aplikasi percobaan; kasir yang dipakai kerja.
            </p>
            <p className="text-xs text-charcoal/50">
              Sudah pakai Inspira POS dan mau ceritamu tampil di sini? <a className="text-maroon-deep font-semibold hover:underline" href={waLink('Halo, saya pengguna Inspira POS dan mau berbagi pengalaman.')} target="_blank" rel="noreferrer">Kabari kami</a>.
            </p>
          </div>
        </Reveal>
      </section>

      {/* FAQ — dipindah ke homepage */}
      <section id="faq" className="py-12 lg:py-16 px-4 bg-surface border-y border-line scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-charcoal text-center mb-8">Pertanyaan yang Sering Ditanyakan</h2>
          </Reveal>
          <Faq />
        </div>
      </section>

      {/* CTA penutup — kontak nyata, tanpa whitespace kosong */}
      <section className="py-16 lg:py-20 px-4 section-maroon">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Coba Dulu 14 Hari. Gratis, Tanpa Syarat.</h2>
          <p className="text-white/70 mb-8">Kalau cocok, lanjut. Kalau tidak, data kamu tetap milik kamu. Masih ragu? Ngobrol dulu saja - kami bantu pilihkan, bukan jualan paket paling mahal.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link href="/demo" className="btn-gold">Coba Gratis 14 Hari</Link>
            <a href={kontakLink('Halo, saya mau konsultasi paket Inspira POS untuk usaha saya.')} target="_blank" rel="noreferrer" className="btn-wa">
              <MessageCircle className="w-4 h-4" aria-hidden /> Chat WhatsApp
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 justify-center text-sm text-white/70">
            <a href={kontakLink('Halo, saya mau tanya tentang Inspira POS.')} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 hover:text-gold-bright min-h-11">
              <MessageCircle className="w-4 h-4" aria-hidden /> {CONTACT.waDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center justify-center gap-2 hover:text-gold-bright min-h-11">
              <Mail className="w-4 h-4" aria-hidden /> {CONTACT.email}
            </a>
            <a href={CONTACT.website} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 hover:text-gold-bright min-h-11">
              <Globe className="w-4 h-4" aria-hidden /> {CONTACT.websiteDisplay}
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
