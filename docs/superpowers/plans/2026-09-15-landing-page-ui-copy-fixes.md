# Landing Page UI & Copy Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix every P0–P3 UI/UX/accessibility defect and copy/marketing weakness found in the dual-agent Impeccable critique + technical audit of the InspiraPOS v2 landing page, without changing product pricing, product scope, or inventing unverifiable claims.

**Architecture:** Pure frontend edits to an existing Next.js 15 App Router site (TypeScript, Tailwind v4, Framer Motion, Radix UI). No new routes, no new dependencies, no backend changes. Each task edits one component/route (or a small tightly-coupled pair) so it can be reviewed and tested independently.

**Tech Stack:** Next.js 15.1, React 19, TypeScript 5.7, Tailwind CSS v4, Framer Motion 11, Radix UI primitives, `class-variance-authority`, `lucide-react`. No test framework is installed (no jest/vitest/playwright/testing-library).

**Spec:** This plan's spec is the audit report delivered in-conversation (dual-agent Impeccable critique + technical audit of 6 routes, 2026-09-15) plus the copywriting/marketing-psychology/product-marketing recommendations from the same session. There is no separate spec file — the findings are restated in full in each task below so this plan is self-contained.

## Global Constraints

- **Bahasa:** semua copy customer-facing pakai sapaan **"kamu"** (bukan "Anda"), kalimat pendek, nol jargon sistem/AI. Istilah teknis (KDS, HPP, BOM, dst.) boleh muncul sebagai singkatan dalam kurung SETELAH frasa bahasa manfaat, tidak berdiri sendiri sebagai judul utama.
- **Harga jujur di depan:** jangan sembunyikan angka di balik "hubungi sales"; jangan menyamarkan biaya (biaya setup harus sama-terbaca dengan harga utama).
- **Nol testimoni/urgency palsu:** jangan menambah angka pelanggan, testimoni, atau tenggat waktu yang tidak diverifikasi. Trust section boleh ditambah detail dari data yang SUDAH ada di kode (nama warung, dll), tidak boleh mengarang data baru.
- **Desain:** jangan tulis ulang token warna di `globals.css` — reuse `.card-brand`/`.card-dark`/`.card-gold`, `.btn-gold`/`.btn-outline`/`.btn-wa`, `.icon-box` yang sudah ada. Motion baru harus tetap lewat `transition`/`animation` CSS standar atau `useReducedMotion()`, supaya `prefers-reduced-motion: reduce` global (`globals.css:173-178`, menekan semua durasi ke 0.01ms) tetap berlaku.
- **Kontras:** setiap `text-charcoal/N` atau `text-white/N` yang dipakai untuk teks (bukan dekorasi) harus ≥4.5:1 terhadap latarnya. Lantai opacity yang aman di atas krem/putih (`#F5EFE6`/`#FFFFFF`) dengan `--color-charcoal` (`#1A1A1A`): **`/70` ke atas** untuk teks kecil. Di atas `--color-maroon-deep` (`.card-dark`) dengan `text-white/N`: **`/70` ke atas** juga.
- **Touch target:** kontrol ikon-saja minimal 44×44px (`min-h-11 min-w-11` di Tailwind), meniru pola yang sudah benar di `ui/sheet.tsx:23`.
- **Test strategy (proyek ini tidak punya test runner terpasang):**
  - Task dengan **logika murni** (regex validasi, dsb.) ditulis TDD memakai `node -e` (bukan dependency baru — bagian dari Node.js) untuk assert pola sebelum/sesudah ditempel ke kode.
  - Task **UI/JSX/copy** diverifikasi dengan: (1) `npm run build` harus sukses (menangkap error TypeScript/JSX), lalu (2) verifikasi manual di `npm run dev` pada route & viewport yang disebutkan eksplisit di tiap task, dengan kriteria lolos yang eksplisit. Jangan menambahkan Playwright/Testing Library/jsdom hanya untuk task ini — itu perubahan infrastruktur di luar cakupan plan ini.
- **Git:** folder `ipos-v2-landing-page` adalah git repo sendiri (bukan submodule dari parent). Commit per task seperti biasa.
- **Di luar cakupan (deferred, jangan dikerjakan di plan ini):** pola "icon tile di atas heading" (taste/P3, butuh keputusan desain terpisah), badge "Terlaris" vs tier yang benar-benar direkomendasikan (butuh data penjualan riil, bukan keputusan yang bisa diambil dari kode), broken image 500 di `AppShowcase` row 1 (kemungkinan artefak dev-environment, perlu dicek ulang di environment bersih dulu), skip link & landmark labeling, nav active-state.

---

### Task 1: Navbar — touch target & scroll animation

**Files:**
- Modify: `src/components/Navbar.tsx:36`, `src/components/Navbar.tsx:55`

**Interfaces:** None (self-contained, no props/exports change).

- [ ] **Step 1: Fix hamburger touch target**

Current (`Navbar.tsx:55`):
```tsx
            <button className="md:hidden ml-auto p-2 min-h-11 text-charcoal/70" aria-label="Buka menu">
```

Replace with (adds `min-w-11`, matching the already-correct pattern in `ui/sheet.tsx:23`):
```tsx
            <button className="md:hidden ml-auto p-2 min-h-11 min-w-11 text-charcoal/70" aria-label="Buka menu">
```

- [ ] **Step 2: Replace `height` transition with `transform` to avoid layout thrash**

Current (`Navbar.tsx:36`):
```tsx
      <div className={cn('max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-6 transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]', scrolled ? 'h-14' : 'h-16')}>
```

Replace with (fixed `h-16` box, scale the inner content down instead of animating `height` — visually equivalent shrink, no layout property animated):
```tsx
      <div className={cn('max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6 origin-top transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]', scrolled && 'scale-y-[0.875]')}>
```

Note: `scale-y-[0.875]` on the flex row (56px/64px = 0.875) shrinks the bar visually the same amount `h-14` did, without writing to `height`. Logo/links keep their own scale (no `scale-x` applied), so text doesn't squish horizontally.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds with no TypeScript/JSX errors.

- [ ] **Step 4: Manual verification**

Run `npm run dev`, open `http://localhost:3000` at 390×844 (mobile):
- Hamburger button hit area is visibly 44×44px (use browser devtools element inspector on the `<button aria-label="Buka menu">`, confirm computed width ≥44px, height ≥44px).
- Scroll down 100px: navbar visibly shrinks smoothly, no visual glitch, no horizontal squish of the logo/links.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "fix(navbar): 44px hamburger touch target, transform instead of height animation"
```

---

### Task 2: SplashScreen — gate to first visit, honor reduced motion

**Files:**
- Modify: `src/components/SplashScreen.tsx`

**Interfaces:** None (no props/exports change).

- [ ] **Step 1: Gate the hold to first visit per browser session and honor `prefers-reduced-motion`**

Current (`SplashScreen.tsx:1-24`):
```tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// ponytail: visible starts true so the splash is part of the FIRST server-rendered HTML,
// not injected later by an effect - an effect (layout or not) only runs after that first
// HTML already painted, which is what let the homepage flash before the splash appeared.
// Root layout also doesn't remount on client-side <Link> navigation, so this only shows
// on a real reload/first visit - no sessionStorage gate needed.
export function SplashScreen() {
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hold = setTimeout(() => setFading(true), 1200);
    return () => clearTimeout(hold);
  }, []);
```

Replace with:
```tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// ponytail: visible starts true so the splash is part of the FIRST server-rendered HTML,
// not injected later by an effect - an effect (layout or not) only runs after that first
// HTML already painted, which is what let the homepage flash before the splash appeared.
// Root layout also doesn't remount on client-side <Link> navigation, so this only shows
// on a real reload/first visit. The 1200ms hold itself is skipped on repeat reloads in the
// same tab (sessionStorage) and for prefers-reduced-motion, so a user who refreshes mid-task
// isn't taxed 1.2s every time.
export function SplashScreen() {
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('ipos-splash-shown') === '1';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    sessionStorage.setItem('ipos-splash-shown', '1');
    const hold = setTimeout(() => setFading(true), alreadyShown || reduceMotion ? 0 : 1200);
    return () => clearTimeout(hold);
  }, []);
```

The rest of the file (fade-out effect, JSX) is unchanged.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Manual verification**

Run `npm run dev`, open `http://localhost:3000`:
- First load in a fresh browser tab (or after clearing session storage via devtools `Application > Session Storage`): splash still shows for ~1.2s then fades — unchanged first-visit behavior.
- Hard-reload (Ctrl/Cmd+R) the same tab again: splash should NOT hold for 1.2s this time (fades almost immediately).
- In devtools, enable "Emulate CSS prefers-reduced-motion: reduce", clear session storage, hard reload: splash should not hold either.

- [ ] **Step 4: Commit**

```bash
git add src/components/SplashScreen.tsx
git commit -m "fix(splash): skip 1.2s hold on repeat reloads and reduced-motion"
```

---

### Task 3: Hero — mobile contrast, WA link honesty, autoplay control, heading structure, copy

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Hero.content.ts`

**Interfaces:**
- Consumes: `kontakLink`, `waLink` from `@/lib/site` (both already exist and are correct — see `src/lib/site.ts`).
- Produces: `Slide` type gains no new required field (see Step 4) but `headline1`/`headline2` semantics change — any other consumer of `SLIDES`/`Slide` must be checked (grep confirms `Hero.tsx` is the only consumer).

This is the highest-severity task (3 P0/P1 items) so it's not split further — the gradient direction, the autoplay control, and the heading restructure all touch the same JSX block and would conflict if done as separate tasks.

- [ ] **Step 1: Fix mobile gradient direction (P0 — hero text/photo unreadable on mobile)**

Current (`Hero.tsx:60`):
```tsx
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay} to-transparent`} />
```

Replace with (vertical scrim under `md` where copy spans full width, horizontal scrim from `md` up where copy sits in the left half):
```tsx
          <div className={`absolute inset-0 bg-gradient-to-t ${slide.overlay} to-charcoal/10 md:bg-gradient-to-r md:to-transparent`} />
```

`slide.overlay` values (e.g. `from-charcoal/85 via-charcoal/45`) stay as-is — they still apply, just to a vertical gradient below `md` and the existing horizontal one from `md` up.

- [ ] **Step 2: Add a paint-safe fallback background (P3 — avoid white flash before image loads)**

Current (`Hero.tsx:43`):
```tsx
    <section className="relative h-[560px] sm:h-[600px] lg:h-[680px] overflow-hidden">
```

Replace with:
```tsx
    <section className="relative h-[560px] sm:h-[600px] lg:h-[680px] overflow-hidden bg-charcoal">
```

- [ ] **Step 3: Fix "Tanya Dulu via WA" — make it actually open WhatsApp (P0)**

Current (`Hero.tsx:81-85`):
```tsx
              <Button asChild variant="outline" className="!border-white !text-white hover:!bg-white/10">
                <a href={kontakLink('Halo, saya mau tanya tentang Inspira POS.')} target="_blank" rel="noreferrer">
                  <MessageCircle className="w-4 h-4" aria-hidden /> Tanya Dulu via WA
                </a>
              </Button>
```

Replace with (swap `kontakLink` → `waLink`; label already says "via WA" so it stays honest once the destination matches):
```tsx
              <Button asChild variant="outline" className="!border-white !text-white hover:!bg-white/10">
                <a href={waLink('Halo, saya mau tanya tentang Inspira POS.')} target="_blank" rel="noreferrer">
                  <MessageCircle className="w-4 h-4" aria-hidden /> Tanya Dulu via WA
                </a>
              </Button>
```

Update the import line (`Hero.tsx:8`) from:
```tsx
import { kontakLink } from '@/lib/site';
```
to:
```tsx
import { waLink } from '@/lib/site';
```

- [ ] **Step 4: Static `<h1>`, slide headline becomes `<p>`, add carousel pause control (P1 — WCAG 2.2.2 + SEO)**

Current (`Hero.tsx:64-89` plus the autoplay effect at `Hero.tsx:21-38`):
```tsx
export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (reduce) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduce, index]);

  const slide = SLIDES[index];
```
and
```tsx
      <div className="relative h-full max-w-6xl mx-auto px-4 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="max-w-xl"
            initial={reduce ? false : 'hidden'}
            animate="visible"
            exit={reduce ? undefined : 'exit'}
          >
            <motion.h1 variants={item} className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
              {slide.headline1} <span className="text-gold-bright">{slide.headline2}</span>
            </motion.h1>
```

Replace the state/effect block with (adds `playing` state, pause on hover/focus, pause button):
```tsx
export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (reduce || !playing) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduce, playing, index]);

  const slide = SLIDES[index];
```

Replace the heading block with (fixed `<h1>` above the carousel content, slide headline demoted to a styled `<p>`, add a pause/play button next to the dots, add `onMouseEnter`/`onMouseLeave`/`onFocus`/`onBlur` pause on the whole hero section):
```tsx
      <div className="relative h-full max-w-6xl mx-auto px-4 flex items-center">
        <h1 className="sr-only">Inspira POS — Kasir untuk UMKM dan Restoran Indonesia</h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="max-w-xl"
            initial={reduce ? false : 'hidden'}
            animate="visible"
            exit={reduce ? undefined : 'exit'}
          >
            <motion.p variants={item} className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
              {slide.headline1} <span className="text-gold-bright">{slide.headline2}</span>
            </motion.p>
```

Add `onMouseEnter={() => setPlaying(false)}`, `onMouseLeave={() => setPlaying(true)}`, `onFocus={() => setPlaying(false)}`, `onBlur={() => setPlaying(true)}` to the outer `<section>` tag (`Hero.tsx:43`, same line touched in Step 2):
```tsx
    <section
      className="relative h-[560px] sm:h-[600px] lg:h-[680px] overflow-hidden bg-charcoal"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
      onFocus={() => setPlaying(false)}
      onBlur={() => setPlaying(true)}
    >
```

Add a pause/play toggle button next to the dot row. Current dot row (`Hero.tsx:109-120`):
```tsx
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.headline1}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ke slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>
```

Replace with (dots get a `min-h-11 min-w-11` invisible hit-area per dot — P2 touch target fix folded in here since it's the same block — plus a pause button):
```tsx
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex items-center gap-1">
        {SLIDES.map((s, i) => (
          <button
            key={s.headline1}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ke slide ${i + 1}`}
            aria-current={i === index}
            className="min-h-11 min-w-11 grid place-items-center"
          >
            <span className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Jeda slide otomatis' : 'Lanjutkan slide otomatis'}
          className="min-h-11 min-w-11 grid place-items-center text-white/70 hover:text-white"
        >
          {playing ? <Pause className="w-4 h-4" aria-hidden /> : <Play className="w-4 h-4" aria-hidden />}
        </button>
      </div>
```

Add `Pause, Play` to the `lucide-react` import (`Hero.tsx:7`):
```tsx
import { MessageCircle, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
```

- [ ] **Step 5: Fix broken slide-2 headline and tighten voice consistency (copy)**

Current (`Hero.content.ts:23-31`):
```ts
  {
    headline1: 'Pantau Warung Dari Mana Saja',
    headline2: 'Laporan Real-Time di HP',
    sub: 'Kelola satu warung atau kafe tanpa harus di tempat. Cek omzet, stok, dan laba kapan saja - mulai Rp 149 ribu/bulan.',
    ctaHref: '/demo?product=umkm',
    image: `${CDN}/ipos-umkm-hero.webp`,
    imageAlt: 'Pemilik kafe memantau laporan iPOS Cloud dari HP',
    overlay: 'from-charcoal/85 via-charcoal/45',
  },
```

Replace with a headline that reads as one sentence when `headline1 + " " + headline2` are concatenated (matching how slides 1/3/4 already read):
```ts
  {
    headline1: 'Pantau Warung Dari Mana Saja,',
    headline2: 'Laporan Real-Time di HP',
    sub: 'Kelola satu warung atau kafe tanpa harus di tempat. Cek omzet, stok, dan laba kapan saja - mulai Rp 149 ribu/bulan.',
    ctaHref: '/demo?product=umkm',
    image: `${CDN}/ipos-umkm-hero.webp`,
    imageAlt: 'Pemilik kafe memantau laporan iPOS Cloud dari HP',
    overlay: 'from-charcoal/85 via-charcoal/45',
  },
```

(Adding the comma to `headline1` is the minimal fix — the rendered JSX already puts a space between `headline1` and `headline2`, so `"Pantau Warung Dari Mana Saja," + " " + "Laporan Real-Time di HP"` now reads as one grammatical sentence instead of a run-on.)

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: succeeds with no TypeScript/JSX errors (confirms `Pause`/`Play` imports resolve, `waLink` import resolves, no unused `kontakLink` import left behind).

- [ ] **Step 7: Manual verification**

Run `npm run dev`, open `http://localhost:3000`:
- At 390×844: hero photo subject and all overlaid text/buttons are legible against the image (vertical scrim darkens bottom two-thirds where the copy sits). Compare against current production behavior — this must visibly improve.
- At 1440×900: hero looks unchanged from before (horizontal scrim still applies).
- Click "Tanya Dulu via WA": opens `wa.me/6282124533265` with the message pre-filled (not `inspiralabs.id/kontak`).
- Hover the hero image area: autoplay stops advancing. Move mouse away: autoplay resumes. Tab focus into the CTA buttons: autoplay stops; tab out: resumes.
- Click the new pause icon button next to the dots: autoplay stops permanently until clicked again (independent of hover).
- Inspect the DOM: exactly one `<h1>` on the page (the `sr-only` one), slide headlines render as `<p>`.
- Read slide 2's headline out loud: "Pantau Warung Dari Mana Saja, Laporan Real-Time di HP" — reads as one sentence.
- Each dot's clickable area measures ≥44×44px in devtools.

- [ ] **Step 8: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.content.ts
git commit -m "fix(hero): mobile contrast, real WA link, pausable autoplay, static h1, broken headline"
```

---

### Task 4: ProductHero — render the missing CTA, fix image sizing

**Files:**
- Modify: `src/components/ProductHero.tsx`

**Interfaces:** None (props already exist — `ctaHref`/`ctaLabel` were already being passed by all 3 callers, just never rendered).

- [ ] **Step 1: Render the CTA button (P0 — product pages currently have zero call-to-action in the hero)**

Current (`ProductHero.tsx:1-9` imports and `54-60`):
```tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
```
```tsx
        <motion.p variants={item} className="text-lg sm:text-xl font-extrabold text-maroon-deep mb-2">
          {badge}
        </motion.p>
        <motion.h1 variants={item} className="text-3xl font-extrabold text-charcoal mb-3">{title}</motion.h1>
        <motion.p variants={item} className="text-charcoal/60 mb-6">{description}</motion.p>


        <motion.div variants={item} className="grid sm:grid-cols-2 gap-3">
```

`Link` is already imported. Replace the double-blank-line gap with the actual button:
```tsx
        <motion.p variants={item} className="text-lg sm:text-xl font-extrabold text-maroon-deep mb-2">
          {badge}
        </motion.p>
        <motion.h1 variants={item} className="text-3xl font-extrabold text-charcoal mb-3">{title}</motion.h1>
        <motion.p variants={item} className="text-charcoal/60 mb-6">{description}</motion.p>

        <motion.div variants={item} className="mb-6">
          <Button asChild variant="gold">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </motion.div>

        <motion.div variants={item} className="grid sm:grid-cols-2 gap-3">
```

- [ ] **Step 2: Add `sizes` to the hero image (P2 — Next.js warns and over-fetches without it)**

Current (`ProductHero.tsx:46`):
```tsx
        <Image src={image} alt={imageAlt} fill priority className="object-cover" />
```

Replace with (matches the `lg:grid-cols-2` layout: full width until `lg`, half width from `lg` up):
```tsx
        <Image src={image} alt={imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Manual verification**

Run `npm run dev`, visit `/produk/offline`, `/produk/umkm`, `/produk/fnb` at 1440×900 and 390×844:
- Each hero now shows a gold "Coba Gratis 14 Hari" button directly under the description, before the feature cards.
- Clicking it goes to `/demo?product=offline` (or `umkm`/`fnb` respectively).
- Open browser devtools Network tab, reload `/produk/offline`: no "Image with src ... missing sizes prop" warning in the console.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProductHero.tsx
git commit -m "fix(product-hero): render missing CTA button, add image sizes prop"
```

---

### Task 5: Form primitives — brand tokens, focus ring alignment

**Files:**
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`
- Modify: `src/components/ui/select.tsx`
- Modify: `src/components/ui/label.tsx`

**Interfaces:** None (no prop/export changes — Tailwind class strings only).

- [ ] **Step 1: `input.tsx` — brand tokens + focus-visible**

Current (`input.tsx:4-14`):
```tsx
export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full min-h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary',
        className
      )}
      {...props}
    />
  );
}
```

Replace with (border uses `--color-line` token via the `border-line` utility already used elsewhere in the codebase; focus ring dropped in favor of the global `:focus-visible` gold outline defined in `globals.css:148-151`, so `focus:outline-none`/`focus:ring-*` are removed rather than recolored):
```tsx
export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full min-h-11 rounded-lg border border-line px-3 py-2 text-sm text-charcoal placeholder:text-charcoal/40',
        className
      )}
      {...props}
    />
  );
}
```

- [ ] **Step 2: `textarea.tsx` — same treatment**

Current (`textarea.tsx:4-14`):
```tsx
export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary',
        className
      )}
      {...props}
    />
  );
}
```

Replace with:
```tsx
export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full rounded-lg border border-line px-3 py-2 text-sm text-charcoal placeholder:text-charcoal/40',
        className
      )}
      {...props}
    />
  );
}
```

- [ ] **Step 3: `select.tsx` — same treatment on trigger and content**

Current (`select.tsx:11-26`):
```tsx
export function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'flex w-full min-h-11 items-center justify-between rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary data-[placeholder]:text-gray-400',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}
```

Replace with:
```tsx
export function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'flex w-full min-h-11 items-center justify-between rounded-lg border border-line px-3 py-2 text-sm text-charcoal data-[placeholder]:text-charcoal/40',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}
```

Current (`select.tsx:28-44`):
```tsx
export function SelectContent({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg',
          className
        )}
```

Replace `border-gray-200 bg-white` with the brand tokens:
```tsx
          'z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-line bg-surface shadow-lg',
```

- [ ] **Step 4: `label.tsx` — brand token**

Current (`label.tsx:7-13`):
```tsx
export function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn('mb-1 block text-sm font-medium text-gray-700', className)}
      {...props}
    />
  );
}
```

Replace `text-gray-700` with the brand token:
```tsx
export function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn('mb-1 block text-sm font-medium text-charcoal/80', className)}
      {...props}
    />
  );
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: succeeds. (`border-line`, `bg-surface`, `text-charcoal` are existing Tailwind theme tokens already used throughout the codebase — confirm by grepping `border-line` in `src/components/Navbar.tsx` if unsure, no new token needs to be defined.)

- [ ] **Step 6: Manual verification**

Run `npm run dev`, visit `/demo` at 1440×900:
- All input/select/textarea borders and placeholder text now render in the brand's warm-neutral tones, not cool grey.
- Tab into any field: focus shows the gold outline (`--color-gold-antique`) consistent with the rest of the site (compare to tabbing through the navbar links), not a maroon ring.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/input.tsx src/components/ui/textarea.tsx src/components/ui/select.tsx src/components/ui/label.tsx
git commit -m "fix(form): use brand color tokens and global focus-visible style instead of Tailwind defaults"
```

---

### Task 6: Demo form — phone validation, reassurance placement, tone

**Files:**
- Modify: `src/app/demo/page.tsx`

**Interfaces:** None (internal component, no exports besides the default page component, unchanged signature).

- [ ] **Step 1: Write a standalone assertion for the new phone regex (fails against the old pattern)**

Run this in the terminal (not yet in the codebase — this just proves the target pattern is correct before it's pasted in):
```bash
node -e "
const oldRe = /^\d{11}\$/;
const newRe = /^8\d{8,11}\$/;
const cases = [
  ['812345678', true],   // 9 digits, valid Indonesian mobile
  ['81234567899', true], // 11 digits, valid
  ['812345678901', true],// 12 digits, valid
  ['12345678', false],   // doesn't start with 8
  ['8123456', false],    // too short (7 digits)
];
let failures = 0;
for (const [input, expected] of cases) {
  const oldResult = oldRe.test(input);
  const newResult = newRe.test(input);
  console.log(\`\${input}: old=\${oldResult} new=\${newResult} expected=\${expected}\`);
  if (newResult !== expected) failures++;
}
process.exit(failures > 0 ? 1 : 0);
"
```
Expected: the `old=` column shows `false` for the first three valid numbers (proving the current bug — real numbers get rejected), the `new=` column matches `expected` for all 5 cases, exit code 0.

- [ ] **Step 2: Implement the fix**

Current (`demo/page.tsx:41-55`):
```ts
function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (form.name.trim().length < 3) errors.name = 'Nama lengkap minimal 3 karakter.';
  if (form.business_name.trim().length < 3) errors.business_name = 'Nama usaha minimal 3 karakter.';
  // 12 digit format domestik (contoh 081234567899) = 11 digit setelah 0 dibuang otomatis di field +62.
  if (!/^\d{11}$/.test(form.phone)) errors.phone = 'Nomor WhatsApp harus 12 digit, contoh 081234567899 (ketik 81234567899 di sini).';
```

Replace with:
```ts
function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (form.name.trim().length < 3) errors.name = 'Nama lengkap minimal 3 karakter.';
  if (form.business_name.trim().length < 3) errors.business_name = 'Nama usaha minimal 3 karakter.';
  // Nomor HP Indonesia setelah 0 dibuang: diawali 8, total 9-12 digit (mis. 81234567899).
  if (!/^8\d{8,11}$/.test(form.phone)) errors.phone = 'Nomor WhatsApp tidak valid. Contoh: 81234567899 (tanpa angka 0 di depan).';
```

Update the `maxLength`/slice to allow the full valid range. Current (`demo/page.tsx:180-189`):
```tsx
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="81234567899"
                  className="rounded-l-none"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 11))}
                />
```

Replace with:
```tsx
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={12}
                  placeholder="81234567899"
                  className="rounded-l-none"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 12))}
                />
```

- [ ] **Step 3: Re-run the assertion against the pasted pattern**

Run: `node -e "const re=/^8\d{8,11}$/; console.log(['812345678','81234567899','812345678901'].every(n=>re.test(n)) && !re.test('12345678') && !re.test('8123456') ? 'PASS' : 'FAIL')"`
Expected: `PASS`

- [ ] **Step 4: Move the reassurance line next to the submit button (copy)**

Current success-screen reassurance (`demo/page.tsx:142-149`) stays where it is (it's fine on the success screen too), but it's missing where it matters most — next to the submit button, before the user commits. Current submit button block (`demo/page.tsx:238-241`):
```tsx
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button type="submit" variant="gold" disabled={loading} className="w-full">
            {loading ? 'Mengirim...' : form.product_interest === 'unknown' ? 'Lanjut ke WhatsApp Admin' : 'Daftar Sekarang, Gratis'}
          </Button>
        </form>
```

Replace with (add the reassurance line right under the button, matching the tone of the existing success-screen copy):
```tsx
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button type="submit" variant="gold" disabled={loading} className="w-full">
            {loading ? 'Mengirim...' : form.product_interest === 'unknown' ? 'Lanjut ke WhatsApp Admin' : 'Daftar Sekarang, Gratis'}
          </Button>
          <p className="text-xs text-charcoal/60 text-center">
            Setelah kirim, tim kami hubungi kamu via WhatsApp dalam 1×24 jam. Nggak ada kartu kredit, nggak ada komitmen.
          </p>
        </form>
```

- [ ] **Step 5: Remove off-brand emoji, align success-screen text color with brand tokens**

Current (`demo/page.tsx:128-150`):
```tsx
      return (
        <main className="min-h-screen flex items-center justify-center px-4">
          <Reveal className="text-center max-w-md">
            <div className="text-5xl mb-4">🚀</div>
            <h1 className="text-2xl font-extrabold text-charcoal mb-2">Siap, tinggal setup!</h1>
            <p className="text-gray-500 mb-6">Klik tombol di bawah, ikuti langkah setup toko. Masa coba 14 hari langsung aktif, tanpa nunggu.</p>
            <Button asChild variant="gold">
              <a href={appUrl.toString()}>Buka Aplikasi &amp; Setup Toko</a>
            </Button>
            <p className="text-xs text-gray-400 mt-4">Butuh bantuan? Tim kami tetap standby via WhatsApp.</p>
          </Reveal>
        </main>
      );
    }
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <Reveal className="text-center max-w-md">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-extrabold text-charcoal mb-2">Terima Kasih!</h1>
          <p className="text-gray-500">Tim kami akan menghubungi kamu via WhatsApp dalam 1×24 jam untuk proses onboarding gratis.</p>
        </Reveal>
      </main>
    );
```

Replace with (drop the emoji divs, swap `text-gray-*` for brand tokens):
```tsx
      return (
        <main className="min-h-screen flex items-center justify-center px-4">
          <Reveal className="text-center max-w-md">
            <h1 className="text-2xl font-extrabold text-charcoal mb-2">Siap, tinggal setup!</h1>
            <p className="text-charcoal/60 mb-6">Klik tombol di bawah, ikuti langkah setup toko. Masa coba 14 hari langsung aktif, tanpa nunggu.</p>
            <Button asChild variant="gold">
              <a href={appUrl.toString()}>Buka Aplikasi &amp; Setup Toko</a>
            </Button>
            <p className="text-xs text-charcoal/50 mt-4">Butuh bantuan? Tim kami tetap standby via WhatsApp.</p>
          </Reveal>
        </main>
      );
    }
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <Reveal className="text-center max-w-md">
          <h1 className="text-2xl font-extrabold text-charcoal mb-2">Terima Kasih!</h1>
          <p className="text-charcoal/60">Tim kami akan menghubungi kamu via WhatsApp dalam 1×24 jam untuk proses onboarding gratis.</p>
        </Reveal>
      </main>
    );
```

Also replace the two remaining `text-gray-500`/`text-red-500` occurrences used as field-error/hint text throughout the form (`demo/page.tsx:158, 167, 172, 177, 191, 196, 215, 234, 238`) — every `text-gray-500` → `text-charcoal/60`, every `text-red-500` → `text-maroon-vibrant` (existing brand token for attention/error-adjacent accents, avoids introducing a new color):
```tsx
        <Reveal className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-charcoal mb-2">Coba Gratis 14 Hari</h1>
          <p className="text-charcoal/60">Tidak perlu kartu kredit. Tim kami siap bantu setup.</p>
        </Reveal>
```
and every instance of:
```tsx
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
```
style lines become:
```tsx
              {errors.name && <p className="mt-1 text-xs text-maroon-vibrant">{errors.name}</p>}
```
(apply the same `text-red-500` → `text-maroon-vibrant` swap to `errors.business_name`, the phone prefix span's `bg-gray-50 text-gray-500` → `bg-cream text-charcoal/60`, `errors.email`, `errors.business_type_other`, `errors.notes`, and the top-level `{error && ...}` line.)

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 7: Manual verification**

Run `npm run dev`, visit `/demo`:
- Type `812345678` (9 digits) into the phone field, submit: no longer rejected.
- Type `81234567899` (11 digits), submit: still accepted (regression check).
- Type `1234567` (doesn't start with 8), submit: shows the new error message "Nomor WhatsApp tidak valid...".
- The reassurance line ("Setelah kirim, tim kami hubungi kamu via WhatsApp...") is visible directly under the submit button before submitting.
- No 🚀/🎉 emoji on either success screen; text reads in warm charcoal tones, not cool grey.

- [ ] **Step 8: Commit**

```bash
git add src/app/demo/page.tsx
git commit -m "fix(demo): accept valid Indonesian phone numbers, move reassurance to submit button, drop off-brand emoji and grey tones"
```

---

### Task 7: PricingSection — contrast, price hierarchy, CTA honesty

**Files:**
- Modify: `src/components/PricingSection.tsx`

**Interfaces:**
- Consumes: `PricingPlan` type (unchanged — no new fields needed for these fixes).
- No signature changes; all 3 product `page.content.ts` files keep working unmodified.

- [ ] **Step 1: Raise contrast floor on price suffix, setup fee, and excluded-feature text**

Current (`PricingSection.tsx:86-98`):
```tsx
                <div className="mb-6">
                  <span className={`text-3xl font-black tracking-tight ${dark ? 'text-white' : 'text-charcoal'}`}>
                    {displayPrice}
                  </span>
                  <span className={`block text-xs font-medium mt-1 ${dark ? 'text-white/50' : 'text-charcoal/50'}`}>
                    {suffix}
                  </span>
                  {setupPrice && (
                    <span className={`block text-xs mt-1 ${dark ? 'text-white/50' : 'text-charcoal/50'}`}>
                      + biaya setup {setupPrice}{showYearly ? ' (hemat 50%)' : ''}
                    </span>
                  )}
                </div>
```

Replace with (contrast raised `/50`→`/70`; setup line promoted to `text-sm font-semibold` so it carries visual weight close to the headline price, per the audit finding that month-one cost was disclosed in the least legible text on the card):
```tsx
                <div className="mb-6">
                  <span className={`text-3xl font-black tracking-tight ${dark ? 'text-white' : 'text-charcoal'}`}>
                    {displayPrice}
                  </span>
                  <span className={`block text-xs font-medium mt-1 ${dark ? 'text-white/70' : 'text-charcoal/70'}`}>
                    {suffix}
                  </span>
                  {setupPrice && (
                    <span className={`block text-sm font-semibold mt-1.5 ${dark ? 'text-white' : 'text-charcoal'}`}>
                      + setup {setupPrice} (sekali bayar){showYearly ? ' · hemat 50%' : ''}
                    </span>
                  )}
                </div>
```

- [ ] **Step 2: Raise contrast on excluded-feature rows**

Current (`PricingSection.tsx:100-113`):
```tsx
                <ul className="space-y-2.5 mb-6 flex-1 text-sm">
                  {p.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-2">
                      {f.included ? (
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? 'text-gold-bright' : 'text-maroon-deep'}`} aria-hidden />
                      ) : (
                        <X className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? 'text-white/30' : 'text-charcoal/30'}`} aria-hidden />
                      )}
                      <span className={f.included ? (dark ? 'text-white/85' : 'text-charcoal/70') : dark ? 'text-white/40' : 'text-charcoal/40'}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>
```

Replace with (excluded-row text `/40`→`/60`, X icon `/30`→`/45` — icons are non-text so they keep a looser 3:1-class floor, but still raised for visibility):
```tsx
                <ul className="space-y-2.5 mb-6 flex-1 text-sm">
                  {p.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-2">
                      {f.included ? (
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? 'text-gold-bright' : 'text-maroon-deep'}`} aria-hidden />
                      ) : (
                        <X className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? 'text-white/45' : 'text-charcoal/45'}`} aria-hidden />
                      )}
                      <span className={f.included ? (dark ? 'text-white/85' : 'text-charcoal/70') : dark ? 'text-white/60' : 'text-charcoal/60'}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>
```

- [ ] **Step 3: Fix CTA icon honesty — drop the WhatsApp-reading icon since these CTAs deliberately route through the InspiraLabs lead form, not straight to chat (see `src/lib/site.ts:16-18` comment)**

Current (`PricingSection.tsx:115-119`):
```tsx
                <Button asChild variant={dark ? 'gold' : 'outline'} className="w-full">
                  <a href={p.ctaHref} target="_blank" rel="noreferrer">
                    <MessageCircle className="w-4 h-4" aria-hidden /> {p.ctaLabel}
                  </a>
                </Button>
```

Replace with (drop the chat icon, add `ArrowRight` — an honest "this takes you somewhere" affordance instead of implying live chat):
```tsx
                <Button asChild variant={dark ? 'gold' : 'outline'} className="w-full">
                  <a href={p.ctaHref} target="_blank" rel="noreferrer">
                    {p.ctaLabel} <ArrowRight className="w-4 h-4" aria-hidden />
                  </a>
                </Button>
```

Update the import (`PricingSection.tsx:5`) from:
```tsx
import { Check, X, MessageCircle } from 'lucide-react';
```
to:
```tsx
import { Check, X, ArrowRight } from 'lucide-react';
```

- [ ] **Step 4: Add a plain-language savings note to the yearly billing toggle (copy — annual value was never stated anywhere)**

Current (`PricingSection.tsx:46-56`):
```tsx
              {(['monthly', 'yearly'] as const).map((m) => (
                <TabsTrigger key={m} value={m} className="relative">
                  {mode === m && (
                    <motion.span
                      layoutId="billingToggle"
                      className="absolute inset-0 bg-maroon-deep rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                    />
                  )}
                  {m === 'monthly' ? 'Langganan Bulanan' : 'Langganan Tahunan'}
                </TabsTrigger>
              ))}
```

Replace with (every plan's yearly price is consistently ~16-17% cheaper than 12× the monthly price — verified against all 3 products' current pricing data — so a static "hemat ±2 bulan" note is accurate without per-plan computation):
```tsx
              {(['monthly', 'yearly'] as const).map((m) => (
                <TabsTrigger key={m} value={m} className="relative">
                  {mode === m && (
                    <motion.span
                      layoutId="billingToggle"
                      className="absolute inset-0 bg-maroon-deep rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                    />
                  )}
                  {m === 'monthly' ? 'Langganan Bulanan' : 'Langganan Tahunan (hemat ±2 bulan)'}
                </TabsTrigger>
              ))}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 6: Manual verification**

Run `npm run dev`, visit `/produk/offline`, `/produk/umkm`, `/produk/fnb`:
- "+ setup Rp X" line is now clearly readable (same weight class as body text, not the faintest text on the card) on both light and dark cards.
- Excluded-feature (✗) rows are visibly more legible than before, still clearly secondary to included (✓) rows.
- Pricing CTA buttons show label + arrow icon, no chat-bubble icon.
- On `/produk/umkm` and `/produk/fnb`, the "Langganan Tahunan" tab now reads "Langganan Tahunan (hemat ±2 bulan)".
- Use a contrast checker (browser devtools > accessibility panel, or eyeball against the WCAG AA note) on the setup-fee line and an excluded-feature row — both should read comfortably at normal viewing distance on a phone screen in bright light.

- [ ] **Step 7: Commit**

```bash
git add src/components/PricingSection.tsx
git commit -m "fix(pricing): raise text contrast, promote setup-fee visibility, honest CTA icon, state annual savings"
```

---

### Task 8: Compare — remove anti-reference eyebrow pattern, fix compare-table contrast

**Files:**
- Modify: `src/components/Compare.tsx`
- Modify: `src/app/produk/offline/page.tsx`
- Modify: `src/app/produk/umkm/page.tsx`
- Modify: `src/app/produk/fnb/page.tsx`

**Interfaces:**
- Produces: `SegmentHeader` drops its `badge` prop entirely (breaking change to this one internal component — all 6 call sites across the 3 files above are updated in this same task, so nothing is left calling it with the old signature).

DESIGN.md's anti-references list explicitly names "eyebrow kecil di atas tiap section" as an AI-generic pattern to avoid — `SegmentHeader`'s gold badge does exactly that on every section of every product page. Design decision for this task: **remove the badge, promote the title's visual weight slightly** so the section still reads as clearly demarcated without the eyebrow chip.

- [ ] **Step 1: Remove the badge from `SegmentHeader` and fix the compare-table's excluded-mark contrast**

Current (`Compare.tsx:136-148`):
```tsx
export function SegmentHeader({ id, badge, title, desc }: {
  id?: string; badge: string; title: string; desc: string;
}) {
  return (
    <Reveal>
      <div id={id} className="text-center mb-8 scroll-mt-24">
        <span className="inline-block bg-gold-bright/30 text-maroon-deep text-xs font-bold px-3 py-1 rounded-full mb-3">{badge}</span>
        <h2 className="text-2xl font-extrabold text-charcoal mb-2">{title}</h2>
        <p className="text-charcoal/60 max-w-2xl mx-auto text-sm leading-relaxed">{desc}</p>
      </div>
    </Reveal>
  );
}
```

Replace with:
```tsx
export function SegmentHeader({ id, title, desc }: {
  id?: string; title: string; desc: string;
}) {
  return (
    <Reveal>
      <div id={id} className="text-center mb-8 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal mb-2">{title}</h2>
        <p className="text-charcoal/60 max-w-2xl mx-auto text-sm leading-relaxed">{desc}</p>
      </div>
    </Reveal>
  );
}
```

Current excluded-mark cell (`Compare.tsx:115-123`):
```tsx
                      {v === '✓' ? (
                        <Check className="w-4 h-4 text-maroon-deep mx-auto" aria-label="Termasuk" />
                      ) : v === '—' ? (
                        <X className="w-4 h-4 text-charcoal/25 mx-auto" aria-label="Tidak termasuk" />
                      ) : (
```

Replace `text-charcoal/25` with `text-charcoal/45` (same floor used for the pricing card's excluded-icon in Task 7 Step 2):
```tsx
                      {v === '✓' ? (
                        <Check className="w-4 h-4 text-maroon-deep mx-auto" aria-label="Termasuk" />
                      ) : v === '—' ? (
                        <X className="w-4 h-4 text-charcoal/45 mx-auto" aria-label="Tidak termasuk" />
                      ) : (
```

- [ ] **Step 2: Update the 2 `SegmentHeader` call sites in `produk/offline/page.tsx`**

Current (`produk/offline/page.tsx:32-38`):
```tsx
        <Reveal>
          <SegmentHeader
            badge="Harga · sekali bayar, bukan langganan"
            title="Offline Lite vs Offline Pro: apa bedanya?"
            desc="Dua-duanya jalan 100% tanpa internet. Pro menambah kontrol untuk usaha yang mulai ramai: multi-kasir, hutang pelanggan, pencatatan pengeluaran toko, dan manajemen supplier."
          />
        </Reveal>
```

Replace with (drop `badge`, fold its meaning into `title` so the "sekali bayar" framing isn't lost):
```tsx
        <Reveal>
          <SegmentHeader
            title="Offline Lite vs Offline Pro: Sekali Bayar, Bukan Langganan"
            desc="Dua-duanya jalan 100% tanpa internet. Pro menambah kontrol untuk usaha yang mulai ramai: multi-kasir, hutang pelanggan, pencatatan pengeluaran toko, dan manajemen supplier."
          />
        </Reveal>
```

(Offline's page only has this one `SegmentHeader` call.)

- [ ] **Step 3: Update the 2 `SegmentHeader` call sites in `produk/umkm/page.tsx`**

Current (`produk/umkm/page.tsx:33-39`):
```tsx
        <Reveal>
          <SegmentHeader
            badge="Harga · langganan bulanan atau tahunan"
            title="iPOS Cloud Lite vs Pro: apa bedanya?"
            desc="Untuk warung dan kafe 1 outlet. Pro cocok kalau kasir kamu lebih dari satu orang dan butuh shift kasir, split bill, serta otorisasi pembatalan transaksi."
          />
        </Reveal>
```

Replace with:
```tsx
        <Reveal>
          <SegmentHeader
            title="iPOS Cloud Lite vs Pro: Apa Bedanya?"
            desc="Untuk warung dan kafe 1 outlet. Pro cocok kalau kasir kamu lebih dari satu orang dan butuh shift kasir, split bill, serta otorisasi pembatalan transaksi."
          />
        </Reveal>
```

Current (`produk/umkm/page.tsx:44-50`):
```tsx
          <Reveal>
            <SegmentHeader
              badge="Add-On · opsional"
              title="Butuh Lebih? Pasang Add-On, Bukan Ganti Paket"
              desc="Tambahkan fitur satu-satu sesuai kebutuhan. Bisa dipasang atau dilepas kapan saja, tanpa mengubah paket utama kamu."
            />
          </Reveal>
```

Replace with:
```tsx
          <Reveal>
            <SegmentHeader
              title="Butuh Lebih? Pasang Add-On (Opsional), Bukan Ganti Paket"
              desc="Tambahkan fitur satu-satu sesuai kebutuhan. Bisa dipasang atau dilepas kapan saja, tanpa mengubah paket utama kamu."
            />
          </Reveal>
```

- [ ] **Step 4: Update the 2 `SegmentHeader` call sites in `produk/fnb/page.tsx`**

Current (`produk/fnb/page.tsx:33-39`):
```tsx
        <Reveal>
          <SegmentHeader
            badge="Harga · langganan bulanan atau tahunan"
            title="Basic vs Starter vs Pro vs Business: apa bedanya?"
            desc="Semua paket sudah termasuk dapur (KDS), denah meja, dan QR order per meja. Basic cocok untuk 1 outlet yang baru mulai; Starter ke atas menambah stok bahan & BOM otomatis; naik paket lagi kalau cabang bertambah atau butuh laporan keuangan konsolidasi."
          />
        </Reveal>
```

Replace with:
```tsx
        <Reveal>
          <SegmentHeader
            title="Basic vs Starter vs Pro vs Business: Apa Bedanya?"
            desc="Semua paket sudah termasuk layar dapur, denah meja, dan QR order per meja. Basic cocok untuk 1 outlet yang baru mulai; Starter ke atas menambah stok bahan & resep otomatis; naik paket lagi kalau cabang bertambah atau butuh laporan keuangan konsolidasi."
          />
        </Reveal>
```

Current (`produk/fnb/page.tsx:53-59`):
```tsx
          <Reveal>
            <SegmentHeader
              badge="Add-On · opsional"
              title="Butuh Lebih? Pasang Add-On, Bukan Naik Tier"
              desc="Buat Resto Basic: pasang satu-satu fitur yang benar-benar kepakai. Buat semua tier: tambah outlet, promo, atau training kapan saja."
            />
          </Reveal>
```

Replace with:
```tsx
          <Reveal>
            <SegmentHeader
              title="Butuh Lebih? Pasang Add-On (Opsional), Bukan Naik Tier"
              desc="Buat Resto Basic: pasang satu-satu fitur yang benar-benar kepakai. Buat semua tier: tambah outlet, promo, atau training kapan saja."
            />
          </Reveal>
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: succeeds — this is the step that catches any missed `badge=` prop still being passed (TypeScript will error on an unknown prop once `badge` is removed from the type).

- [ ] **Step 6: Manual verification**

Run `npm run dev`, visit all 3 `/produk/*` pages:
- No small gold pill/eyebrow chip appears above any section heading anymore.
- Section titles read clearly on their own (e.g. "Offline Lite vs Offline Pro: Sekali Bayar, Bukan Langganan").
- On `/produk/fnb`, scroll to the compare table: the ✗ marks are more visible than before, still clearly muted compared to ✓ marks.

- [ ] **Step 7: Commit**

```bash
git add src/components/Compare.tsx src/app/produk/offline/page.tsx src/app/produk/umkm/page.tsx src/app/produk/fnb/page.tsx
git commit -m "fix(compare): remove anti-reference eyebrow pattern from SegmentHeader, raise excluded-mark contrast"
```

---

### Task 9: Heading hierarchy — AppShowcase and Kontak

**Files:**
- Modify: `src/components/AppShowcase.tsx`
- Modify: `src/app/kontak/page.tsx`

**Interfaces:** None.

- [ ] **Step 1: Give the homepage's AppShowcase section its own `<h2>` so `<h1>` (in Hero, after Task 3) isn't followed directly by `<h3>`**

Current (`AppShowcase.tsx:34-45`):
```tsx
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
```

Replace with (adds a visually-hidden `<h2>` before the row loop — keeps the existing visual design untouched while fixing the outline; row titles become `<h3>`'s legitimate children of a real `<h2>`):
```tsx
export function AppShowcase() {
  return (
    <section className="py-12 lg:py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="sr-only">Yang Bisa Kamu Lakukan dengan Inspira POS</h2>
        {ROWS.map((row, i) => {
          const imageFirst = i % 2 === 1;
          return (
            <Reveal key={row.title} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className={imageFirst ? 'lg:order-2' : ''}>
                <h3 className="text-xl sm:text-2xl font-extrabold text-charcoal mb-2">{row.title}</h3>
                <p className="text-charcoal/60">{row.desc}</p>
              </div>
```

- [ ] **Step 2: Same fix on `/kontak` — `<h1>` is followed directly by `<h3>` inside the 3 contact cards**

Current (`kontak/page.tsx:14-20`):
```tsx
        <Reveal>
          <h1 className="text-3xl font-extrabold text-charcoal mb-3">Hubungi Kami</h1>
          <p className="text-charcoal/60 mb-10">Mau tanya paket, minta demo, atau beli lisensi? Tim kami siap bantu, bukan bot.</p>
        </Reveal>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6" stagger={0.06}>
```

Replace with (add a visually-hidden `<h2>` grouping the 3 contact-method cards):
```tsx
        <Reveal>
          <h1 className="text-3xl font-extrabold text-charcoal mb-3">Hubungi Kami</h1>
          <p className="text-charcoal/60 mb-10">Mau tanya paket, minta demo, atau beli lisensi? Tim kami siap bantu, bukan bot.</p>
        </Reveal>
        <h2 className="sr-only">Cara Menghubungi Kami</h2>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6" stagger={0.06}>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Manual verification**

Run `npm run dev`, open browser devtools on `/` and `/kontak`:
- Use the Accessibility panel's heading outline (Chrome devtools: Elements > Accessibility > "Show heading order", or the Lighthouse accessibility audit) to confirm: `h1 → h2 → h3` with no skipped level on both pages.
- Visually, nothing changed — the added headings are `sr-only`.

- [ ] **Step 5: Commit**

```bash
git add src/components/AppShowcase.tsx src/app/kontak/page.tsx
git commit -m "fix(a11y): restore h1->h2->h3 heading order on homepage and kontak page"
```

---

### Task 10: WhatsApp link honesty — Footer, Kontak page, homepage closing CTA

**Files:**
- Modify: `src/components/Footer.tsx`
- Modify: `src/app/kontak/page.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:** None.

- [ ] **Step 1: Footer's WhatsApp row — currently shows the WA phone number with a chat icon but links to the lead form**

Current (`Footer.tsx:1-4, 37-41`):
```tsx
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Mail, Globe } from 'lucide-react';
import { CONTACT, kontakLink } from '@/lib/site';
```
```tsx
            <li>
              <a href={kontakLink('Halo, saya mau tanya tentang Inspira POS.')} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold-bright">
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden /> {CONTACT.waDisplay}
              </a>
            </li>
```

Replace the import with:
```tsx
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Mail, Globe } from 'lucide-react';
import { CONTACT, waLink } from '@/lib/site';
```

Replace the WA row with:
```tsx
            <li>
              <a href={waLink('Halo, saya mau tanya tentang Inspira POS.')} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold-bright">
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden /> {CONTACT.waDisplay}
              </a>
            </li>
```

- [ ] **Step 2: Kontak page's "WhatsApp" card — same fix, it's the clearest instance of the P0 bug (a card titled "WhatsApp" showing the WA number, that opens a different company's form)**

Current (`kontak/page.tsx:1-8, 19-27`):
```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Mail, Globe } from 'lucide-react';
import { CONTACT, kontakLink } from '@/lib/site';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { Card } from '@/components/ui/card';
```
```tsx
          <RevealItem>
            <Card asChild className="card-brand p-6 text-left block">
              <a href={kontakLink('Halo Inspira POS, saya ingin bertanya.')} target="_blank" rel="noreferrer">
                <div className="w-fit rounded-lg bg-whatsapp/10 p-3 text-whatsapp mb-3"><MessageCircle className="w-6 h-6" aria-hidden /></div>
                <h3 className="font-bold text-charcoal mb-1">WhatsApp</h3>
                <p className="text-sm text-charcoal/60">Isi form kebutuhanmu, tim kami balas via WhatsApp</p>
                <p className="text-sm text-maroon-deep font-semibold mt-2">{CONTACT.waDisplay}</p>
              </a>
            </Card>
          </RevealItem>
```

Replace the import with:
```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Mail, Globe } from 'lucide-react';
import { CONTACT, waLink } from '@/lib/site';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { Card } from '@/components/ui/card';
```

Replace the card with:
```tsx
          <RevealItem>
            <Card asChild className="card-brand p-6 text-left block">
              <a href={waLink('Halo Inspira POS, saya ingin bertanya.')} target="_blank" rel="noreferrer">
                <div className="w-fit rounded-lg bg-whatsapp/10 p-3 text-whatsapp mb-3"><MessageCircle className="w-6 h-6" aria-hidden /></div>
                <h3 className="font-bold text-charcoal mb-1">WhatsApp</h3>
                <p className="text-sm text-charcoal/60">Chat langsung, tim kami balas dari HP</p>
                <p className="text-sm text-maroon-deep font-semibold mt-2">{CONTACT.waDisplay}</p>
              </a>
            </Card>
          </RevealItem>
```

Also fix the pudar footnote text contrast a few lines below. Current (`kontak/page.tsx:50-54`):
```tsx
        <Reveal>
          <p className="mt-10 text-sm text-charcoal/50">
            Atau langsung <Link href="/demo" className="text-maroon-deep font-semibold hover:underline">daftar trial gratis</Link> dan tim kami yang akan menghubungi kamu.
          </p>
        </Reveal>
```

Replace `text-charcoal/50` with `text-charcoal/70`:
```tsx
        <Reveal>
          <p className="mt-10 text-sm text-charcoal/70">
            Atau langsung <Link href="/demo" className="text-maroon-deep font-semibold hover:underline">daftar trial gratis</Link> dan tim kami yang akan menghubungi kamu.
          </p>
        </Reveal>
```

- [ ] **Step 3: Homepage closing "Chat WhatsApp" button — the clearest instance on the highest-traffic page**

Current (`page.tsx:1-4, 148-155`):
```tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChefHat, MessageCircle, Check } from 'lucide-react';
import { waLink, kontakLink } from '@/lib/site';
```
```tsx
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button asChild variant="gold"><Link href="/demo">Coba Gratis 14 Hari</Link></Button>
            <Button asChild variant="wa">
              <a href={kontakLink('Halo, saya mau konsultasi paket Inspira POS untuk usaha saya.')} target="_blank" rel="noreferrer">
                <MessageCircle className="w-4 h-4" aria-hidden /> Chat WhatsApp
              </a>
            </Button>
          </div>
```

`waLink` is already imported (used elsewhere in the same file for the trust-section "Kabari kami" link). Replace the button:
```tsx
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button asChild variant="gold"><Link href="/demo">Coba Gratis 14 Hari</Link></Button>
            <Button asChild variant="wa">
              <a href={waLink('Halo, saya mau konsultasi paket Inspira POS untuk usaha saya.')} target="_blank" rel="noreferrer">
                <MessageCircle className="w-4 h-4" aria-hidden /> Chat WhatsApp
              </a>
            </Button>
          </div>
```

Since `kontakLink` is no longer used anywhere in `page.tsx` after this change (verify with the grep in Step 4 below), update the import to drop it:
```tsx
import { waLink } from '@/lib/site';
```

- [ ] **Step 4: Verify no other `kontakLink` usages remain in `page.tsx`, then verify build**

Run: `grep -n "kontakLink" src/app/page.tsx`
Expected: no output (confirms it's safe to drop from the import — if this prints a line, keep `kontakLink` in the import instead of removing it).

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Manual verification**

Run `npm run dev`:
- On `/`, scroll to the bottom "Coba Dulu 14 Hari" section, click "Chat WhatsApp": opens `wa.me/6282124533265`, not `inspiralabs.id/kontak`.
- On `/kontak`, click the "WhatsApp" card: same — opens real WhatsApp.
- Scroll to the footer on any page, click the phone-number row: same.

- [ ] **Step 6: Commit**

```bash
git add src/components/Footer.tsx src/app/kontak/page.tsx src/app/page.tsx
git commit -m "fix(cta): make every WhatsApp-labeled button open real WhatsApp, not the lead form"
```

---

### Task 11: Homepage — chooser CTA differentiation, trust section, closing-copy consistency

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.content.ts`

**Interfaces:**
- Produces: `PRODUCTS` entries in `page.content.ts` gain a `ctaLabel` field (currently the label is hardcoded once in `page.tsx` for all 3 cards). `page.tsx` consumes `p.ctaLabel` instead of the literal string.

- [ ] **Step 1: Add per-product CTA labels to `PRODUCTS`**

Current (`page.content.ts:8-34`):
```ts
export const PRODUCTS = [
  {
    badge: 'iPos Offline',
    icon: WifiOff,
    featured: true,
    q: 'Pengen punya sistem kasir offline? Nggak mau bayar bulanan?',
    title: 'Cukup Rp 299 ribu, jalan selamanya',
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
    title: 'Mulai Rp 599 ribu/bulan, sistem lengkap',
    points: ['Pesanan langsung tampil di layar dapur (KDS)', 'Pelanggan pesan sendiri lewat QR di meja', 'Kelola sampai 10 cabang dari satu dashboard'],
    href: '/produk/fnb',
  },
];
```

Replace with (adds `ctaLabel` per card — Offline goes straight to its product page since it has no trial flow of its own besides the shared `/demo`; Cloud and F&B point explicitly at the trial, which is the actual conversion goal these cards were missing per the audit; also swaps the one raw "KDS" mention for plain language):
```ts
export const PRODUCTS = [
  {
    badge: 'iPos Offline',
    icon: WifiOff,
    featured: true,
    q: 'Pengen punya sistem kasir offline? Nggak mau bayar bulanan?',
    title: 'Cukup Rp 299 ribu, jalan selamanya',
    points: ['100% tanpa internet - data aman di HP kamu', 'Tanpa langganan, tanpa biaya tersembunyi', 'Stok, struk thermal, laporan harian - lengkap'],
    href: '/produk/offline',
    ctaLabel: 'Lihat Paket Offline',
  },
  {
    badge: 'iPos Cloud',
    icon: Cloud,
    q: 'Punya satu warung atau kafe, ingin pantau omzet dari HP?',
    title: 'Mulai Rp 149 ribu/bulan, laporan real-time',
    points: ['Cek penjualan dari mana saja, kapan saja', 'Struk dikirim via WhatsApp, terima QRIS', 'Tetap bisa jualan saat internet putus'],
    href: '/produk/umkm',
    ctaLabel: 'Coba Gratis 14 Hari',
  },
  {
    badge: 'F&B / Resto',
    icon: UtensilsCrossed,
    q: 'Restoran dengan dapur, meja, atau banyak cabang?',
    title: 'Mulai Rp 599 ribu/bulan, sistem lengkap',
    points: ['Pesanan langsung tampil di layar dapur (KDS)', 'Pelanggan pesan sendiri lewat QR di meja', 'Kelola sampai 10 cabang dari satu dashboard'],
    href: '/produk/fnb',
    ctaLabel: 'Coba Gratis 14 Hari',
  },
];
```

- [ ] **Step 2: Consume `p.ctaLabel` in the chooser card**

Current (`page.tsx:53-55`):
```tsx
                    <Button asChild variant={dark ? 'dark' : 'gold'} className="text-center">
                      <Link href={p.href}>Lihat Fitur & Harga</Link>
                    </Button>
```

Replace with:
```tsx
                    <Button asChild variant={dark ? 'dark' : 'gold'} className="text-center">
                      <Link href={p.href}>{p.ctaLabel}</Link>
                    </Button>
```

- [ ] **Step 3: Add one concrete detail to each trust-section name (no invented numbers — only what's inferable as a neutral, defensible descriptor)**

Current (`page.tsx:119-128`):
```tsx
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
```

Replace with (the invitation line's contrast is also raised `/50`→`/70` per the global contrast constraint; copy content about the 2 businesses is left as-is since no additional verified detail — like "how long" or "what kind of business" beyond the name — exists anywhere in the codebase to add without inventing it. The one honest addition available: make explicit that this is a real, growing list, which is already implied but can be stated plainer):
```tsx
            <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal mb-2">
              Sudah Dipakai Jualan Beneran, Setiap Hari
            </h2>
            <p className="text-sm sm:text-base text-charcoal/70 max-w-2xl mx-auto mb-4">
              Dari <b>D kriuk Fried Chicken Jatiluhur</b> sampai <b>Mie Jebew Jontor</b> - warung-warung ini
              mencatat penjualan hariannya dengan Inspira POS. Bukan aplikasi percobaan; kasir yang dipakai kerja.
            </p>
            <p className="text-xs text-charcoal/70">
              Sudah pakai Inspira POS dan mau ceritamu tampil di sini? <a className="text-maroon-deep font-semibold hover:underline" href={waLink('Halo, saya pengguna Inspira POS dan mau berbagi pengalaman.')} target="_blank" rel="noreferrer">Kabari kami</a>.
            </p>
```

**Note for reviewer:** the audit flagged this trust section as "thin" (only 2 names, no count/photos/guarantee). Adding fabricated numbers or photos is explicitly against this project's brand constraint (no invented testimonials/data). The only in-scope fix here is the contrast correction above; growing the trust section with real additional customers/photos/a guarantee policy is a content-sourcing task for the business owner, not something this plan can generate — flag it to the user as a follow-up backlog item rather than executing it.

- [ ] **Step 4: Soften the closing CTA line so it doesn't read as contradicting the "Terlaris" (best-seller) badge shown on pricing pages**

Current (`page.tsx:146-147`):
```tsx
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Coba Dulu 14 Hari. Gratis, Tanpa Syarat.</h2>
          <p className="text-white/70 mb-8">Kalau cocok, lanjut. Kalau tidak, data kamu tetap milik kamu. Masih ragu? Ngobrol dulu saja - kami bantu pilihkan, bukan jualan paket paling mahal.</p>
```

Replace with (keeps the reassurance, drops the specific "paling mahal" comparison since it isn't a claim this plan can verify against real sales behavior — see the "Out of scope" note in Global Constraints about the recommended-tier/badge question):
```tsx
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Coba Dulu 14 Hari. Gratis, Tanpa Syarat.</h2>
          <p className="text-white/70 mb-8">Kalau cocok, lanjut. Kalau tidak, data kamu tetap milik kamu. Masih ragu? Ngobrol dulu saja - kami bantu pilih paket yang cocok sama usahamu.</p>
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 6: Manual verification**

Run `npm run dev`, visit `/`:
- The 3 chooser cards now read "Lihat Paket Offline" / "Coba Gratis 14 Hari" / "Coba Gratis 14 Hari" (not 3 identical "Lihat Fitur & Harga").
- Closing section's paragraph no longer says "bukan jualan paket paling mahal".
- Trust-section footnote text is visibly less faint than before.

- [ ] **Step 7: Commit**

```bash
git add src/app/page.tsx src/app/page.content.ts
git commit -m "content(home): differentiate chooser CTAs by intent, soften closing-copy comparative claim, raise trust footnote contrast"
```

---

### Task 12: UMKM product page — tone consistency, jargon to plain language

**Files:**
- Modify: `src/app/produk/umkm/page.tsx`
- Modify: `src/app/produk/umkm/page.content.ts`

**Interfaces:** None (content-only changes, same shape).

- [ ] **Step 1: Fix "kamu"/"Anda" mixing and grammar in the hero description**

Current (`produk/umkm/page.tsx:24`):
```tsx
          description="Kelola warung, kedai, atau toko makanan kamu dari mana saja, dengan aplikasi kasir online memudahkan penjualan dan proses operasional usaha Anda."
```

Replace with:
```tsx
          description="Kelola warung, kedai, atau toko makanan kamu dari mana saja - aplikasi kasir online yang memudahkan penjualan dan operasional usahamu."
```

- [ ] **Step 2: Replace jargon feature titles with benefit language**

Current (`page.content.ts:8-13`):
```ts
export const FEATURES = [
  { title: 'Multi-Device', desc: 'Akses dari HP, tablet, atau laptop. Data tersinkron otomatis.' },
  { title: 'Manajemen Stok', desc: 'Pantau stok bahan dan produk. Ada peringatan saat hampir habis.' },
  { title: 'Multi-Kasir', desc: 'Buka shift kasir, pantau siapa yang melayani tiap transaksi.' },
  { title: 'Self-Order', desc: 'Pelanggan scan QR, pesan sendiri, order masuk kasir' }
];
```

Replace with:
```ts
export const FEATURES = [
  { title: 'Bisa dari HP, Tablet, atau Laptop', desc: 'Akses dari mana saja. Data tersinkron otomatis.' },
  { title: 'Manajemen Stok', desc: 'Pantau stok bahan dan produk. Ada peringatan saat hampir habis.' },
  { title: 'Kasir Lebih dari Satu', desc: 'Buka shift kasir, pantau siapa yang melayani tiap transaksi.' },
  { title: 'Pelanggan Pesan Sendiri', desc: 'Scan QR di meja, pesan sendiri, order langsung masuk kasir.' }
];
```

- [ ] **Step 3: Replace jargon add-on names with benefit language**

Current (`page.content.ts:17-30`):
```ts
export const ADDONS = [
  { icon: UserPlus, name: 'Role tambahan', desc: 'Tambah jenis akses di luar owner & kasir', price: 'Rp 49.000/bln' },
  { icon: Gauge, name: 'Dashboard stok real-time', desc: 'Pantau pergerakan stok detik itu juga', price: 'Rp 99.000/bln' },
  { icon: Calculator, name: 'Food cost / HPP otomatis', desc: 'Modal per menu dihitung otomatis', price: 'Rp 99.000/bln' },
  { icon: QrCode, name: 'QR Self-Order', desc: 'Pelanggan scan QR, pesan sendiri, order masuk kasir', price: 'Rp 109.000/bln' },
  { icon: ChefHat, name: 'KDS Dapur', desc: 'Pesanan tampil di layar dapur', price: 'Rp 149.000/bln' },
  { icon: Gift, name: 'Loyalty program', desc: 'Poin & redeem untuk pelanggan setia', price: 'Rp 149.000/bln' },
  { icon: Megaphone, name: 'WA Broadcast promo', desc: 'Kirim promo ke pelanggan via WhatsApp', price: 'Rp 199.000/bln' },
  { icon: Building2, name: 'Outlet tambahan', desc: 'Buka cabang tanpa ganti paket', price: 'Rp 299.000/outlet/bln' },
  { icon: Wallet, name: 'Dashboard keuangan', desc: 'Laba rugi & arus kas lengkap', price: 'Rp 299.000/bln' },
  { icon: GraduationCap, name: 'Training kasir on-site', desc: 'Pelatihan 2 jam di lokasi kamu', price: 'Rp 399.000/sesi' },
  { icon: ArrowLeftRight, name: 'Inter-branch transfer', desc: 'Pindah stok antar cabang tercatat', price: 'Rp 499.000/bln' },
  { icon: CalendarClock, name: 'Absensi karyawan', desc: 'Jam masuk-pulang karyawan tercatat', price: 'Rp 499.000/bln' },
];
```

Replace with (kept industry shorthand in parentheses only where it's genuinely useful for a returning/technical buyer to recognize — e.g. "(KDS)" — everything else plain):
```ts
export const ADDONS = [
  { icon: UserPlus, name: 'Akses Tambahan untuk Staf', desc: 'Tambah jenis akses di luar owner & kasir', price: 'Rp 49.000/bln' },
  { icon: Gauge, name: 'Pantau Stok Detik Itu Juga', desc: 'Tahu stok berkurang begitu ada yang laku, tanpa nunggu laporan harian', price: 'Rp 99.000/bln' },
  { icon: Calculator, name: 'Untung-Rugi Tiap Menu, Otomatis', desc: 'Modal per menu (HPP) dihitung otomatis', price: 'Rp 99.000/bln' },
  { icon: QrCode, name: 'Pelanggan Pesan Sendiri (QR)', desc: 'Pelanggan scan QR, pesan sendiri, order masuk kasir', price: 'Rp 109.000/bln' },
  { icon: ChefHat, name: 'Layar Dapur (KDS)', desc: 'Pesanan langsung tampil di layar dapur', price: 'Rp 149.000/bln' },
  { icon: Gift, name: 'Loyalty program', desc: 'Poin & redeem untuk pelanggan setia', price: 'Rp 149.000/bln' },
  { icon: Megaphone, name: 'WA Broadcast promo', desc: 'Kirim promo ke pelanggan via WhatsApp', price: 'Rp 199.000/bln' },
  { icon: Building2, name: 'Outlet tambahan', desc: 'Buka cabang tanpa ganti paket', price: 'Rp 299.000/outlet/bln' },
  { icon: Wallet, name: 'Dashboard keuangan', desc: 'Laba rugi & arus kas lengkap', price: 'Rp 299.000/bln' },
  { icon: GraduationCap, name: 'Training kasir on-site', desc: 'Pelatihan 2 jam di lokasi kamu', price: 'Rp 399.000/sesi' },
  { icon: ArrowLeftRight, name: 'Pindah Stok Antar Cabang', desc: 'Transfer stok antar cabang, tercatat otomatis', price: 'Rp 499.000/bln' },
  { icon: CalendarClock, name: 'Absensi karyawan', desc: 'Jam masuk-pulang karyawan tercatat', price: 'Rp 499.000/bln' },
];
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Manual verification**

Run `npm run dev`, visit `/produk/umkm`:
- Hero description no longer mixes "kamu"/"Anda" and reads grammatically ("aplikasi kasir online yang memudahkan...").
- Feature cards and add-on list read as benefits, not feature-code names — spot-check 2-3 by reading them aloud as a first-time warung owner would.

- [ ] **Step 6: Commit**

```bash
git add src/app/produk/umkm/page.tsx src/app/produk/umkm/page.content.ts
git commit -m "content(umkm): fix kamu/Anda tone mixing, translate jargon feature/addon names to plain language"
```

---

### Task 13: F&B product page — jargon to plain language, fix "Jadwalkan Demo" mislabel

**Files:**
- Modify: `src/app/produk/fnb/page.tsx`
- Modify: `src/app/produk/fnb/page.content.ts`

**Interfaces:** None.

- [ ] **Step 1: Replace jargon feature titles**

Current (`page.content.ts:6-11`):
```ts
export const FEATURES = [
  { title: 'Table Management', desc: 'Kelola meja, nomor antrian, dan status pesanan dengan mudah.' },
  { title: 'Kitchen Display', desc: 'Antrian pesanan langsung tampil di layar dapur, tanpa nota kertas.' },
  { title: 'Multi-Outlet', desc: 'Kelola sampai 10 cabang dari satu dashboard terpusat.' },
  { title: 'BOM & Resep', desc: 'Hitung harga pokok (HPP) dan kendalikan penggunaan bahan.' },
];
```

Replace with:
```ts
export const FEATURES = [
  { title: 'Atur Meja & Antrian', desc: 'Kelola meja, nomor antrian, dan status pesanan dengan mudah.' },
  { title: 'Layar Dapur (KDS)', desc: 'Antrian pesanan langsung tampil di layar dapur, tanpa nota kertas.' },
  { title: 'Kelola Banyak Cabang', desc: 'Kelola sampai 10 cabang dari satu dashboard terpusat.' },
  { title: 'Untung Tiap Menu, Otomatis', desc: 'Hitung harga pokok (HPP) dan kendalikan penggunaan bahan.' },
];
```

- [ ] **Step 2: Replace jargon add-on name and the "sistemasi" phrase**

Current (`page.content.ts:15-21`):
```ts
export const ADDONS_BASIC: { icon: typeof ClipboardList; name: string; desc: string; price: string }[] = [
  { icon: ClipboardList, name: 'BOM resep otomatis + auto-disable menu', desc: 'Stok bahan berkurang otomatis, menu nonaktif saat habis', price: 'Rp 99.000/bln' },
```

Replace with:
```ts
export const ADDONS_BASIC: { icon: typeof ClipboardList; name: string; desc: string; price: string }[] = [
  { icon: ClipboardList, name: 'Resep Otomatis + Menu Nonaktif Sendiri', desc: 'Stok bahan berkurang otomatis, menu nonaktif saat habis', price: 'Rp 99.000/bln' },
```

Current (`page.content.ts:33`):
```ts
    tagline: 'Untuk resto/kafe 1 outlet yang baru mulai sistemasi dapur & meja.',
```

Replace with:
```ts
    tagline: 'Untuk resto/kafe 1 outlet yang baru mulai rapikan dapur & meja.',
```

- [ ] **Step 3: Fix "Jadwalkan Demo Gratis" — it links to the trial signup form, not a scheduling flow**

Current (`page.tsx:104-109`):
```tsx
        <Reveal className="mt-10">
          <Card className="card-gold p-6 sm:p-8 text-center">
            <h2 className="font-extrabold text-xl text-charcoal mb-2">Belum yakin? Jadwalkan demo gratis</h2>
            <p className="text-charcoal/60 mb-6">Termasuk kitchen display & table management. Trial gratis 14 hari, semua fitur terbuka, maksimal 20 menu & 50 transaksi.</p>
            <Button asChild variant="gold"><Link href="/demo?product=fnb">Jadwalkan Demo Gratis</Link></Button>
          </Card>
        </Reveal>
```

Replace with (label now matches what actually happens; heading and body copy updated to match, dropping the remaining "kitchen display & table management" jargon pair):
```tsx
        <Reveal className="mt-10">
          <Card className="card-gold p-6 sm:p-8 text-center">
            <h2 className="font-extrabold text-xl text-charcoal mb-2">Belum yakin? Coba dulu gratis</h2>
            <p className="text-charcoal/60 mb-6">Termasuk layar dapur & atur meja. Trial gratis 14 hari, semua fitur terbuka, maksimal 20 menu & 50 transaksi.</p>
            <Button asChild variant="gold"><Link href="/demo?product=fnb">Coba Gratis 14 Hari</Link></Button>
          </Card>
        </Reveal>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Manual verification**

Run `npm run dev`, visit `/produk/fnb`:
- Feature cards read in plain language (spot-check "Layar Dapur (KDS)" card).
- Scroll to the closing card: heading now reads "Belum yakin? Coba dulu gratis", button reads "Coba Gratis 14 Hari" and goes to `/demo?product=fnb` (same destination as before — only the label changed to match).

- [ ] **Step 6: Commit**

```bash
git add src/app/produk/fnb/page.tsx src/app/produk/fnb/page.content.ts
git commit -m "content(fnb): translate jargon to plain language, fix Jadwalkan Demo label to match actual trial-signup destination"
```

---

## Self-Review Notes

- **Spec coverage:** all 23 findings from the audit summary map to a task above except the 4 items explicitly called out as deferred in Global Constraints (icon-tile pattern, badge/recommended-tier business decision, dev-environment broken image, and the trust-section fabrication risk flagged inline in Task 11 Step 3) — each of those has a stated reason it can't be safely auto-executed rather than being silently dropped.
- **Placeholder scan:** every step has literal before/after code; no task says "add validation" or "handle edge cases" without showing the exact diff.
- **Type/name consistency:** `SegmentHeader`'s `badge` prop removal (Task 8) is the only signature change in this plan, and every one of its 6 call sites is updated in that same task — verified by re-reading all 3 product page files above before finalizing this plan. `PricingSection`'s `PricingPlan` type and `ProductHero`'s props are unchanged, so Tasks 4/7/12/13 don't risk a mismatch with `page.content.ts` files not touched by this plan (offline's content file needs no copy changes — it was already jargon-free).
- **Task order:** tasks are listed in roughly descending severity (P0 first) but have no hard dependency on each other except within Task 8 (component + its 6 call sites, kept together) and Task 3 (Hero.tsx + Hero.content.ts, kept together) — they can be executed in any order, including out of the order listed.
