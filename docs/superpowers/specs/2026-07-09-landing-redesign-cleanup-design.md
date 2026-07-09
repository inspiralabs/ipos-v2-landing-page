# Landing Page Redesign & Cleanup — Design

## Context

Homepage Inspira POS terlihat buruk setelah beberapa penambahan efek: **cursor-trail**
(gambar beterbangan ikut kursor, `fixed inset-0 z-40`) menutupi hero & mengalihkan dari CTA,
dan **AppShowcase** menampilkan device-frame besar berisi placeholder krem kosong dengan spacing
vertikal berlebihan — terlihat seperti wireframe belum jadi. Keduanya melanggar anti-reference
brand di `PRODUCT.md` ("aesthetic AI-generic").

Diagnosis dari screenshot langsung (dev server + Playwright, bukan tebakan):
- Semua section **ada** di DOM (tidak ada bug render); blok putih di screenshot fullPage cuma
  artefak `Reveal` (`whileInView` belum ter-trigger di luar viewport).
- Bug nyata: warning `useScroll` "container non-static position" → scroll-zoom di `Hero.tsx` &
  `ProductHero.tsx` tidak terkalkulasi benar karena `containerRef` belum `position: relative`.
- Yang sudah solid & TIDAK disentuh: design system (`globals.css`), `Navbar`, `Footer`,
  `PricingSection`, `Compare`/`CompareTable`, hero markup itu sendiri.

Keputusan lingkup (hasil brainstorming): **perbaiki layout & bersihkan**, pertahankan identitas
brand (palet maroon/gold/krem, DM Sans, kartu). Bukan redesign visual besar-besaran.

## Scope — Fase 1 (dikerjakan sekarang: layout & refactor)

1. **Buang CursorTrail total.** Hapus `src/components/CursorTrail.tsx` + import & pemakaian di
   `src/app/page.tsx`. Tidak dipindah ke section lain — efek cursor-follow secara desain harus
   fullscreen; mengurungnya ke satu section justru makin aneh, dan tidak ada tempat di landing
   ini yang tidak merugikan konversi. Gambar `cursor-trail/*.webp` di R2 tetap tersedia untuk
   dipakai ulang di tempat lain nanti.

2. **Fix bug `useScroll`.** Tambahkan `className="relative"` (atau `position: relative`) pada
   container ber-`ref` di `Hero.tsx` dan `ProductHero.tsx` agar scroll offset terhitung benar
   dan warning hilang.

3. **Rapikan AppShowcase** (`src/components/AppShowcase.tsx`) — dipertahankan strukturnya
   (3 baris fitur bergantian), tapi:
   - Perkecil spacing vertikal antar baris (`space-y-14 lg:space-y-20` → lebih rapat, mis.
     `space-y-12`), rapikan agar tidak ada ruang kosong menganga.
   - Ganti placeholder krem kosong dengan **skeleton UI "sengaja"**: mockup tampilan app
     sederhana digambar via CSS/Tailwind di dalam device-frame (mini bar-chart untuk baris
     "laporan", list baris angka/stok untuk baris "stok", struk/receipt lines untuk baris
     "struk"). Tidak butuh file gambar; konsisten dengan konteks kasir. Ganti ke screenshot app
     asli cukup dengan menukar isi frame nanti.
   - Frame tetap CSS/SVG (phone notch, desktop browser-bar) yang sudah ada — hanya isinya yang
     berubah dari `<img placeholder>` jadi skeleton markup.

4. **Audit spacing & hierarki homepage** (`src/app/page.tsx`) — pass ringan:
   - Pastikan urutan section tetap logis (hero → showcase → pilih paket → cara mulai → fitur →
     trust → FAQ → CTA) sesuai prinsip "scroll adalah argumen berurutan".
   - Samakan ritme padding antar-section (`py-12 lg:py-16` konsisten), pastikan alternating
     `bg-surface`/`bg-cream` tetap enak dibaca tanpa dua section polos beruntun.

5. **Verifikasi**: dev server + Playwright screenshot per-viewport (bukan fullPage, agar Reveal
   ter-trigger) untuk home + 3 halaman produk + demo + kontak. Cek `console --errors` bersih
   (warning useScroll harus hilang). Cek mobile viewport. Build + typecheck + lint hijau.

## Scope — Fase 2 (SETELAH Fase 1: audit copy menyeluruh)

Fase terpisah, tidak dikerjakan bareng Fase 1 (dua kerja besar sekaligus = berisiko). Pakai
skill `copywriting` + `marketing-psychology`. Review semua copy (hero, tiap section, CTA, 3
halaman produk) → usulkan revisi before/after → **tunggu approval user sebelum menerapkan**.
Tidak mengubah harga/fakta/angka. Voice tetap "warung, bukan enterprise" (`PRODUCT.md`).

## Yang TIDAK diubah

Design system `globals.css`, `Navbar`, `Footer`, `PricingSection`, `Compare`/`CompareTable`,
palet warna, tipografi, `ProductHero` (selain fix `relative`), alur form `demo`, Confetti.

## Non-goals

- Bukan ganti palet/font/gaya kartu.
- Bukan tambah dependency baru (framer-motion sudah cukup).
- Bukan mengubah konten harga atau fakta produk.
