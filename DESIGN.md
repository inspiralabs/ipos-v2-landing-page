# Design

Sistem visual landing page Inspira POS — identitas brand sudah committed di `src/app/globals.css`
(bukan palet baru), diwarisi dari brand Inspira POS keseluruhan.

## Theme

Light. Krem hangat sebagai dasar, bukan putih steril — selaras posisi brand "warung", bukan SaaS.

## Color Palette

| Token | Value | Pemakaian |
|---|---|---|
| `--color-maroon-deep` | `#6e150f` | Warna utama — teks tombol, heading aksen, nav aktif |
| `--color-maroon-vibrant` | `#b92a1c` | Gradient section maroon, hover state |
| `--color-gold-antique` | `#d0a139` | Aksen premium, badge "Terlaris", focus ring |
| `--color-gold-bright` | `#fad64a` | Gradient tombol utama (`btn-gold`) |
| `--color-cream` | `#f5efe6` | Latar halaman |
| `--color-surface` | `#ffffff` | Kartu, panel |
| `--color-charcoal` | `#1a1a1a` | Teks utama |
| `--color-line` | `#e5e0d5` | Border kartu |
| `--color-whatsapp` | `#25d366` | Tombol WhatsApp |

Strategi warna: **Restrained** — krem + putih dominan, maroon untuk aksi utama, emas untuk
status premium/terlaris saja.

## Typography

- Family: **DM Sans** (`--font-sans`), satu family semua ukuran.
- `text-wrap: balance` di h1-h3, `text-wrap: pretty` di paragraf — sudah aktif global.

## Shape & Space

- Radius: `0.75rem` kartu (`card-brand`/`card-gold`/`card-dark`), `0.5rem` tombol.
- Shadow: maroon lembut (`rgba(110,21,15,0.08)`), naik saat hover — tidak ada glassmorphism.

## Components

Sudah ada di `globals.css`, reuse ini alih-alih bikin baru:

- `.card-brand` / `.card-gold` / `.card-dark` — varian kartu.
- `.btn-gold` / `.btn-outline` / `.btn-wa` — tombol utama/sekunder/WhatsApp.
- `.section-maroon` — section CTA gradient maroon.
- `.icon-box` — kontainer ikon krem di dalam kartu.
- `.snap-row` — carousel geser di mobile, jadi grid di `md+`.

## Motion

Transisi hover yang sudah ada pakai `300ms cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart) —
pola ini yang dipakai untuk motion baru juga. `prefers-reduced-motion: reduce` sudah di-handle
global (animation/transition duration → 0.01ms) — animasi scroll-reveal baru harus tetap lewat
jalur `transition`/`animation` CSS standar (atau matikan lewat `useReducedMotion()` di
framer-motion) supaya override global ini tetap berlaku, tidak dibuat manual dengan JS yang
mem-bypass CSS transition.

## Voice (UX copy)

Sapaan "kamu", kalimat pendek, harga & angka jujur di depan (lihat contoh di seluruh halaman
`/produk/*` dan `/`). Tidak ada istilah teknis di copy publik.
