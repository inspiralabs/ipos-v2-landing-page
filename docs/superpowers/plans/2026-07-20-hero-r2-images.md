# Hero R2 Images + AppShowcase Screenshots Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tambah slide hero ke-4 (`ipos-offline.webp` + copy A) dan ganti skeleton AppShowcase dengan screenshot R2.

**Architecture:** Data-driven — `Hero.content.ts` menambah satu entry di `SLIDES` dan memindahkan semua image ke CDN. `AppShowcase.tsx` mengganti skeleton dengan `next/image` di dalam frame device yang sudah ada. Tidak mengubah `Hero.tsx`.

**Tech Stack:** Next.js App Router, `next/image`, TypeScript, Framer Motion (Hero existing).

## Global Constraints

- Base CDN: `https://assets.inspirapos.biz.id/hero-images/`
- Copy slide 4 wajib: headline1 `Bayar Sekali.` / headline2 `Pakai Selamanya.` / sub sesuai spec / ctaHref `/produk/offline`
- Hero slide 1–3 copy tidak diubah; hanya URL image ke CDN
- Jangan hapus file lokal `public/hero-images/` di change ini
- Jangan ubah ProductHero FnB/UMKM
- Commit hanya jika user meminta secara eksplisit

## File map

| File | Responsibility |
|------|----------------|
| `landing-page/src/components/Hero.content.ts` | Data 4 slides + CDN URLs |
| `landing-page/src/components/AppShowcase.tsx` | 3 row showcase dengan screenshot nyata |
| `landing-page/src/components/Hero.tsx` | Tidak diubah (sudah map `SLIDES`) |
| `landing-page/next.config.ts` | Tidak diubah (remotePatterns sudah ada) |

---

### Task 1: Hero — 4 slides + CDN URLs

**Files:**
- Modify: `landing-page/src/components/Hero.content.ts`

**Interfaces:**
- Consumes: type `Slide` existing
- Produces: `SLIDES` length 4; index 3 = copy A + `ipos-offline.webp`

- [ ] **Step 1: Ganti isi `Hero.content.ts` menjadi**

```ts
export type Slide = {
  headline1: string;
  headline2: string;
  sub: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  overlay: string;
};

const CDN = 'https://assets.inspirapos.biz.id/hero-images';

export const SLIDES: Slide[] = [
  {
    headline1: 'Kasir yang Tetap Jalan',
    headline2: 'Walau Internet Mati',
    sub: 'Inspira POS - kasir pintar untuk UMKM kuliner dan restoran Indonesia. Catat jualan, kelola stok, lihat untung. Mulai Rp 149 ribu/bulan atau sekali bayar Rp 299 ribu.',
    ctaHref: '/demo',
    image: `${CDN}/ipos-offline-hero.webp`,
    imageAlt: 'Pemilik warung memakai iPOS Offline di tablet',
    overlay: 'from-charcoal/85 via-charcoal/45',
  },
  {
    headline1: 'Pantau Warung Dari Mana Saja',
    headline2: 'Laporan Real-Time di HP',
    sub: 'Kelola satu warung atau kafe tanpa harus di tempat. Cek omzet, stok, dan laba kapan saja - mulai Rp 149 ribu/bulan.',
    ctaHref: '/demo?product=umkm',
    image: `${CDN}/ipos-umkm-hero.webp`,
    imageAlt: 'Pemilik kafe memantau laporan iPOS Cloud dari HP',
    overlay: 'from-charcoal/85 via-charcoal/45',
  },
  {
    headline1: 'Satu Sistem untuk',
    headline2: 'Semua Cabang Resto',
    sub: 'Dapur, meja, dan laporan tiap outlet terhubung dalam satu dashboard. Cocok untuk resto dan kafe yang mulai berkembang.',
    ctaHref: '/demo?product=fnb',
    image: `${CDN}/ipos-fnb-hero.webp`,
    imageAlt: 'Dapur restoran memakai kitchen display system iPOS FnB',
    overlay: 'from-charcoal/90 via-charcoal/55',
  },
  {
    headline1: 'Bayar Sekali.',
    headline2: 'Pakai Selamanya.',
    sub: 'Kasir offline Inspira POS: stok, struk thermal, laporan harian — tanpa tagihan bulanan. Cukup Rp 299 ribu, data aman di perangkat kamu.',
    ctaHref: '/produk/offline',
    image: `${CDN}/ipos-offline.webp`,
    imageAlt: 'Tampilan aplikasi iPos Offline di perangkat',
    overlay: 'from-charcoal/85 via-charcoal/45',
  },
];
```

- [ ] **Step 2: Verifikasi di browser**

Pastikan `npm run dev` jalan di `landing-page`. Buka homepage. Expected:
- Ada 4 dot indikator di hero
- Slide ke-4 menampilkan headline "Bayar Sekali. Pakai Selamanya."
- Gambar slide 1–4 load dari `assets.inspirapos.biz.id` (tidak broken)

---

### Task 2: AppShowcase — ganti skeleton dengan screenshot R2

**Files:**
- Modify: `landing-page/src/components/AppShowcase.tsx` (rewrite isi file)

**Interfaces:**
- Consumes: `Reveal` dari `@/components/Reveal`; `next/image`
- Produces: section dengan 3 row; tiap row punya `image` CDN + frame device

- [ ] **Step 1: Ganti seluruh isi `AppShowcase.tsx` menjadi**

```tsx
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';

const CDN = 'https://assets.inspirapos.biz.id/hero-images';

type Row = {
  title: string;
  desc: string;
  device: 'desktop' | 'phone';
  image: string;
  imageAlt: string;
};

const ROWS: Row[] = [
  {
    title: 'Laporan untung, bukan cuma omzet',
    desc: 'Lihat laba rugi, menu terlaris, dan tren penjualan harian - langsung dari layar kasir atau HP kamu.',
    device: 'desktop',
    image: `${CDN}/laporan.webp`,
    imageAlt: 'Tampilan laporan penjualan Inspira POS',
  },
  {
    title: 'Kasir tinggal tap, transaksi langsung jalan',
    desc: 'Pilih menu dari grid, keranjang dan total kebentuk otomatis - jualan jadi cepat tanpa ribet.',
    device: 'phone',
    image: `${CDN}/kasir.webp`,
    imageAlt: 'Tampilan kasir Inspira POS di ponsel',
  },
  {
    title: 'Struk thermal, siap cetak langsung',
    desc: 'Sambungkan printer Bluetooth 58/80mm, struk keluar lengkap dengan logo toko kamu.',
    device: 'desktop',
    image: `${CDN}/struk-kasir.webp`,
    imageAlt: 'Tampilan struk thermal Inspira POS',
  },
];

function DeviceFrame({ device, image, imageAlt }: { device: Row['device']; image: string; imageAlt: string }) {
  if (device === 'phone') {
    return (
      <div className="mx-auto w-[220px] rounded-[2rem] border-8 border-charcoal bg-charcoal p-1 shadow-[0_16px_40px_rgba(110,21,15,0.18)]">
        <div className="relative rounded-[1.5rem] overflow-hidden bg-cream aspect-[9/19]">
          <Image src={image} alt={imageAlt} fill className="object-cover" sizes="220px" />
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-line bg-surface shadow-[0_16px_40px_rgba(110,21,15,0.14)] overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-cream border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-line" />
        <span className="w-2.5 h-2.5 rounded-full bg-line" />
        <span className="w-2.5 h-2.5 rounded-full bg-line" />
      </div>
      <div className="relative aspect-[16/10] bg-cream">
        <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 560px" />
      </div>
    </div>
  );
}

export function AppShowcase() {
  return (
    <section className="py-12 lg:py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {ROWS.map((row, i) => {
          const imageFirst = i % 2 === 1;
          return (
            <Reveal key={row.title} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className={imageFirst ? 'lg:order-2' : ''}>
                <h3 className="text-xl sm:text-2xl font-extrabold text-charcoal mb-2">{row.title}</h3>
                <p className="text-charcoal/60">{row.desc}</p>
              </div>
              <div className={imageFirst ? 'lg:order-1' : ''}>
                <DeviceFrame device={row.device} image={row.image} imageAlt={row.imageAlt} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verifikasi di browser**

Scroll ke section AppShowcase di homepage. Expected:
- Tidak ada bar chart / grid menu / struk skeleton palsu
- Tiga screenshot CDN tampil di dalam frame desktop/phone
- Tidak ada error Next.js Image / hostname di console

- [ ] **Step 3: Typecheck (opsional cepat)**

Run (dari folder `landing-page`):

```bash
npx tsc --noEmit
```

Expected: exit 0 (atau tidak ada error baru terkait file yang diubah).

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Slide 4 + copy A + `ipos-offline.webp` | Task 1 |
| Hero 1–3 URL ke CDN | Task 1 |
| AppShowcase laporan/kasir/struk | Task 2 |
| Hapus skeleton | Task 2 |
| Frame device tetap | Task 2 |
| Tidak ubah ProductHero / hapus lokal | dihormati (out of scope) |

## Placeholder scan

Tidak ada TBD/TODO. Kode lengkap di tiap step. Commit tidak diwajibkan (user rule).
