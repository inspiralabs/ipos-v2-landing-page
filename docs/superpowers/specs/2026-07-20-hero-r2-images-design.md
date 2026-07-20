# Design: Hero R2 Images + AppShowcase Real Screenshots

**Date:** 2026-07-20  
**Scope:** `landing-page` — Hero carousel + AppShowcase  
**Status:** Approved (copy A)

## Goal

Sesuaikan landing page dengan aset baru di Cloudflare R2 (`inspirapos-assets/hero-images/`):

1. Tambah slide hero ke-4 memakai `ipos-offline.webp` + copywriting A.
2. Ganti skeleton palsu di AppShowcase dengan screenshot nyata (`laporan`, `kasir`, `struk-kasir`).

## Assets (CDN)

Base: `https://assets.inspirapos.biz.id/hero-images/`

| File | Penggunaan |
|------|------------|
| `ipos-offline.webp` | Hero slide baru (ke-4) |
| `laporan.webp` | AppShowcase row laporan |
| `kasir.webp` | AppShowcase row kasir |
| `struk-kasir.webp` | AppShowcase row struk |
| `ipos-offline-hero.webp` | Hero slide 1 (tetap) |
| `ipos-umkm-hero.webp` | Hero slide 2 (tetap) |
| `ipos-fnb-hero.webp` | Hero slide 3 (tetap) |

`next.config.ts` sudah mengizinkan hostname `assets.inspirapos.biz.id`.

## Hero — 4 slides

Urutan:

1. Offline (internet mati) — existing, path lokal atau samakan ke CDN
2. UMKM Cloud — existing
3. FnB — existing
4. **Baru — Bayar sekali / pakai selamanya**

### Slide 4 (copy A — approved)

- `headline1`: `Bayar Sekali.`
- `headline2`: `Pakai Selamanya.`
- `sub`: `Kasir offline Inspira POS: stok, struk thermal, laporan harian — tanpa tagihan bulanan. Cukup Rp 299 ribu, data aman di perangkat kamu.`
- `ctaHref`: `/produk/offline`
- `image`: `https://assets.inspirapos.biz.id/hero-images/ipos-offline.webp`
- `imageAlt`: `Tampilan aplikasi iPos Offline di perangkat`
- `overlay`: sama pola slide lain (`from-charcoal/85 via-charcoal/45`)

### Path consistency

Semua URL gambar Hero diarahkan ke CDN (`assets.inspirapos.biz.id`), agar konsisten dengan halaman produk dan aset R2 terbaru. File lokal di `public/hero-images/` tidak wajib dihapus di change ini.

## AppShowcase

- Hapus komponen skeleton (`ChartSkeleton`, `PosSkeleton`, `ReceiptSkeleton`) dan data dummy terkait.
- Tiap row punya `image` (CDN URL) + `imageAlt`.
- Frame desktop/phone tetap; isi = `next/image` dengan `object-cover` / `object-contain` sesuai rasio screenshot (prefer `object-cover` di dalam frame).
- Mapping:
  - Laporan → `laporan.webp`, device `desktop`
  - Kasir → `kasir.webp`, device `phone`
  - Struk → `struk-kasir.webp`, device `desktop`

## Out of scope

- Mengganti atau menghapus slide hero 1–3 (konten copy).
- Mengubah gambar ProductHero FnB/UMKM (tetap `*-hero.webp`).
- Optimasi kompresi file R2 (ukuran file sudah di bucket).

## Files to touch

- `src/components/Hero.content.ts` — slide ke-4 + CDN URLs
- `src/components/AppShowcase.tsx` — real images, buang skeleton
- Tidak perlu ubah `Hero.tsx` (sudah render dari `SLIDES`)

## Success criteria

- Homepage menampilkan 4 slide hero; slide terakhir pakai copy A + `ipos-offline.webp`.
- AppShowcase menampilkan 3 screenshot R2, bukan bar/pos/receipt skeleton.
- Tidak ada broken image (hostname remote sudah dikonfigurasi).
