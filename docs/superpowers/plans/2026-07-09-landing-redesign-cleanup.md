# Landing Page Redesign & Cleanup Implementation Plan

> **For agentic workers:** This is a small UI cleanup plan (4 tasks, no
> backend/business logic). Execute inline task-by-task; no subagent dispatch
> needed. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the homepage regressions caused by CursorTrail (covers the hero)
and AppShowcase (empty placeholder frames, excessive spacing), and fix a
`useScroll` positioning bug in both hero components — without touching the
design system, Navbar, Footer, PricingSection, or Compare components.

**Architecture:** Delete one component (CursorTrail), patch two existing
components (Hero, ProductHero) with one CSS class each, and replace the
placeholder image logic in AppShowcase with inline SVG-based skeleton mockups
that render directly in the device frames (no new image assets, no new
dependencies).

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind v4, framer-motion
(already installed), lucide-react icons.

## Global Constraints

- No new npm dependencies (framer-motion already covers all animation needs).
- No changes to `globals.css`, `Navbar.tsx`, `Footer.tsx`, `PricingSection.tsx`,
  `Compare.tsx`/`CompareTable.tsx`, color palette, typography, or copy text.
- Preserve `prefers-reduced-motion` handling — do not bypass the global CSS
  override with manual JS animation.
- Voice/copy: do not change any Indonesian copy strings in this plan (that's
  Fase 2, a separate approval cycle).
- Verify with real browser screenshots (Playwright) per viewport section, not
  `fullPage` (Reveal's `whileInView` won't have triggered outside the initial
  viewport, producing false "blank" screenshots — this was already confirmed
  during diagnosis).

---

### Task 1: Remove CursorTrail entirely

**Files:**
- Delete: `src/components/CursorTrail.tsx`
- Modify: `src/app/page.tsx:13` (remove import), `src/app/page.tsx:71` (remove usage)

**Interfaces:**
- Consumes: nothing (deletion task).
- Produces: nothing — no other file imports `CursorTrail`.

- [ ] **Step 1: Delete the component file**

Delete `src/components/CursorTrail.tsx`.

- [ ] **Step 2: Remove the import in page.tsx**

In `src/app/page.tsx`, remove this line:
```tsx
import { CursorTrail } from '@/components/CursorTrail';
```

- [ ] **Step 3: Remove the usage in the JSX**

In `src/app/page.tsx`, change:
```tsx
export default function HomePage() {
  return (
    <main>
      <CursorTrail />
      <Hero />
```
to:
```tsx
export default function HomePage() {
  return (
    <main>
      <Hero />
```

- [ ] **Step 4: Verify no dangling references**

Run: `grep -r "CursorTrail" src/`
Expected: no output (no matches).

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: `TypeScript: No errors found`

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git rm src/components/CursorTrail.tsx
git commit -m "fix: remove CursorTrail — covered hero and hurt conversion focus"
```

---

### Task 2: Fix useScroll container positioning bug

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/ProductHero.tsx`

**Interfaces:**
- Consumes: nothing new — both files already use `useScroll({ target: containerRef })`.
- Produces: nothing new — this is a bugfix, no signature changes.

**Context:** Browser console currently shows: `Please ensure that the
container has a non-static position, like 'relative', 'fixed', or 'absolute'
to ensure scroll offset is calculated correctly.` This is because the
`<section ref={containerRef}>` in `Hero.tsx` and `<div ref={containerRef}>` in
`ProductHero.tsx` have no explicit `position`, so framer-motion's `useScroll`
cannot reliably compute scroll offset relative to that container — the
scroll-zoom effect on the hero image is silently unreliable.

- [ ] **Step 1: Add `relative` to Hero.tsx's scroll container**

In `src/components/Hero.tsx`, find:
```tsx
    <section ref={containerRef} className="py-14 lg:py-20 px-4">
```
Change to:
```tsx
    <section ref={containerRef} className="relative py-14 lg:py-20 px-4">
```

- [ ] **Step 2: Add `relative` to ProductHero.tsx's scroll container**

In `src/components/ProductHero.tsx`, find:
```tsx
    <div ref={containerRef} className="max-w-4xl mx-auto mb-10">
```
Change to:
```tsx
    <div ref={containerRef} className="relative max-w-4xl mx-auto mb-10">
```

- [ ] **Step 3: Verify the warning is gone**

Start the dev server (`npx next dev -p 3210`, wait for it to respond on
`http://localhost:3210`), then run a Playwright script that opens `/` and
`/produk/offline` and asserts no console warning contains "non-static
position":

```js
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
const warnings = [];
page.on('console', (m) => { if (m.type() === 'warning') warnings.push(m.text()); });
await page.goto('http://localhost:3210/', { waitUntil: 'networkidle' });
await page.goto('http://localhost:3210/produk/offline', { waitUntil: 'networkidle' });
const hasBug = warnings.some((w) => w.includes('non-static position'));
console.log('BUG_WARNING_PRESENT:', hasBug);
await browser.close();
```
Expected output: `BUG_WARNING_PRESENT: false`

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: `TypeScript: No errors found`

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/ProductHero.tsx
git commit -m "fix: add position:relative to useScroll containers so scroll-zoom offset calculates correctly"
```

---

### Task 3: Replace AppShowcase placeholders with skeleton UI mockups

**Files:**
- Modify: `src/components/AppShowcase.tsx`

**Interfaces:**
- Consumes: nothing external — self-contained component, already exported as
  `AppShowcase` and already used in `src/app/page.tsx`.
- Produces: same export signature (`export function AppShowcase()`), no props
  — callers unaffected.

**Context:** Current `DeviceFrame` renders an `<img>` pointing at a
`PLACEHOLDER` data-URI of a flat cream rectangle — this is what produced the
"empty wireframe" look in the diagnosis screenshot. Replace the image-based
placeholder with three purpose-built skeleton mockups (one per row: a bar
chart for "laporan", a stock list for "stok", a receipt for "struk"), built
from plain divs/Tailwind classes — no image files, no new dependencies. Also
tighten the vertical spacing between rows.

- [ ] **Step 1: Replace the whole file**

Replace `src/components/AppShowcase.tsx` with:

```tsx
import { BarChart3, PackageSearch, Printer } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

type Row = {
  icon: typeof BarChart3;
  title: string;
  desc: string;
  device: 'desktop' | 'phone';
  skeleton: 'chart' | 'stock' | 'receipt';
};

const ROWS: Row[] = [
  {
    icon: BarChart3,
    title: 'Laporan untung, bukan cuma omzet',
    desc: 'Lihat laba rugi, menu terlaris, dan tren penjualan harian - langsung dari layar kasir atau HP kamu.',
    device: 'desktop',
    skeleton: 'chart',
  },
  {
    icon: PackageSearch,
    title: 'Stok jalan sendiri tiap ada transaksi',
    desc: 'Nggak perlu hitung manual - stok otomatis berkurang tiap jualan, ada alert kalau mulai menipis.',
    device: 'phone',
    skeleton: 'stock',
  },
  {
    icon: Printer,
    title: 'Struk thermal, siap cetak langsung',
    desc: 'Sambungkan printer Bluetooth 58/80mm, struk keluar lengkap dengan logo toko kamu.',
    device: 'desktop',
    skeleton: 'receipt',
  },
];

const BAR_HEIGHTS = ['40%', '65%', '35%', '80%', '55%', '70%'];
const STOCK_ITEMS = [
  { name: 'Es Teh Manis', pct: 82 },
  { name: 'Nasi Goreng', pct: 64 },
  { name: 'Ayam Geprek', pct: 21 },
  { name: 'Kerupuk', pct: 8 },
];
const RECEIPT_LINES = [
  { label: 'Nasi Goreng x2', value: 'Rp 30.000' },
  { label: 'Es Teh Manis x2', value: 'Rp 10.000' },
  { label: 'Kerupuk x1', value: 'Rp 3.000' },
];

function ChartSkeleton() {
  return (
    <div className="h-full w-full flex items-end justify-around gap-2 p-6">
      {BAR_HEIGHTS.map((h, i) => (
        <div key={i} className="flex-1 rounded-t-md bg-maroon-deep/15" style={{ height: h }} />
      ))}
    </div>
  );
}

function StockSkeleton() {
  return (
    <div className="h-full w-full p-4 space-y-3">
      {STOCK_ITEMS.map((item) => (
        <div key={item.name}>
          <div className="flex justify-between text-[10px] text-charcoal/50 mb-1">
            <span>{item.name}</span>
            <span>{item.pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-line overflow-hidden">
            <div className={`h-full rounded-full ${item.pct < 15 ? 'bg-maroon-vibrant' : 'bg-gold-antique'}`} style={{ width: `${item.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ReceiptSkeleton() {
  return (
    <div className="h-full w-full p-6 flex flex-col gap-2 font-mono text-[10px] text-charcoal/60">
      <div className="text-center font-bold text-charcoal/70 mb-1">STRUK PENJUALAN</div>
      <div className="border-t border-dashed border-line" />
      {RECEIPT_LINES.map((l) => (
        <div key={l.label} className="flex justify-between">
          <span>{l.label}</span>
          <span>{l.value}</span>
        </div>
      ))}
      <div className="border-t border-dashed border-line" />
      <div className="flex justify-between font-bold text-charcoal/80">
        <span>TOTAL</span>
        <span>Rp 43.000</span>
      </div>
    </div>
  );
}

function Skeleton({ kind }: { kind: Row['skeleton'] }) {
  if (kind === 'chart') return <ChartSkeleton />;
  if (kind === 'stock') return <StockSkeleton />;
  return <ReceiptSkeleton />;
}

function DeviceFrame({ device, skeleton }: { device: 'desktop' | 'phone'; skeleton: Row['skeleton'] }) {
  if (device === 'phone') {
    return (
      <div className="mx-auto w-[220px] rounded-[2rem] border-8 border-charcoal bg-charcoal p-1 shadow-[0_16px_40px_rgba(110,21,15,0.18)]">
        <div className="rounded-[1.5rem] overflow-hidden bg-cream aspect-[9/19]">
          <Skeleton kind={skeleton} />
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
      <div className="aspect-[16/10] bg-cream">
        <Skeleton kind={skeleton} />
      </div>
    </div>
  );
}

export function AppShowcase() {
  return (
    <section className="py-12 lg:py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {ROWS.map((row, i) => {
          const Icon = row.icon;
          const imageFirst = i % 2 === 1;
          return (
            <Reveal key={row.title} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className={imageFirst ? 'lg:order-2' : ''}>
                <div className="icon-box w-fit mb-3">
                  <Icon className="w-6 h-6" aria-hidden />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-charcoal mb-2">{row.title}</h3>
                <p className="text-charcoal/60">{row.desc}</p>
              </div>
              <div className={imageFirst ? 'lg:order-1' : ''}>
                <DeviceFrame device={row.device} skeleton={row.skeleton} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: `TypeScript: No errors found`

- [ ] **Step 3: Lint**

Run: `npx next lint`
Expected: `Errors: 0 | Warnings: 0`

- [ ] **Step 4: Visual verification**

Start dev server, screenshot the AppShowcase section (scroll to ~y=700 on
`/`), confirm all 3 rows show a distinct, non-empty skeleton (bar chart,
stock list with progress bars, receipt lines) instead of a flat cream
rectangle.

- [ ] **Step 5: Commit**

```bash
git add src/components/AppShowcase.tsx
git commit -m "fix: replace empty AppShowcase placeholders with skeleton UI mockups"
```

---

### Task 4: Full verification pass

**Files:** none (verification only).

**Interfaces:** N/A.

- [ ] **Step 1: Build**

Run: `npx next build`
Expected: `Errors: 0 | Warnings: 0`

- [ ] **Step 2: Start dev server**

```bash
npx next dev -p 3210 &
```
Wait until `curl -sf http://localhost:3210/` succeeds (poll, don't sleep-guess).

- [ ] **Step 3: Screenshot homepage section-by-section (not fullPage)**

```js
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:3210/', { waitUntil: 'networkidle' });
const total = await page.evaluate(() => document.body.scrollHeight);
let y = 0, i = 0;
while (y < total) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `verify-home-${i}.png` });
  y += 850; i++;
}
await browser.close();
```
Read each `verify-home-N.png` and confirm: no cursor-trail images anywhere,
hero fully legible, AppShowcase rows show skeleton content (not blank cream),
no section looks broken.

- [ ] **Step 4: Screenshot the 3 product pages**

```js
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
for (const p of ['/produk/offline', '/produk/umkm', '/produk/fnb']) {
  await page.goto(`http://localhost:3210${p}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `verify-${p.split('/').pop()}.png` });
}
await browser.close();
```
Read each screenshot, confirm hero image renders (scroll-zoom container fix
from Task 2 didn't break image display).

- [ ] **Step 5: Mobile viewport check**

```js
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
await page.goto('http://localhost:3210/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.screenshot({ path: 'verify-mobile-home.png', fullPage: true });
await browser.close();
```
Read the screenshot, confirm no cursor-trail artifacts, AppShowcase rows
stack cleanly on narrow width.

- [ ] **Step 6: Stop dev server**

```bash
pkill -f "next dev" 2>/dev/null || true
```
(On Windows/Git Bash, use `powershell -NoProfile -Command "Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force"` if `pkill` is unavailable.)

- [ ] **Step 7: Final commit (only if any cleanup files were touched)**

If Task 4 required no code changes (pure verification), skip committing —
there's nothing to commit. If verification uncovered a real bug requiring a
fix, fix it, re-run the relevant step, and commit with a message describing
what verification caught.

---

## Self-Review Notes

- **Spec coverage:** Item 1 (remove CursorTrail) → Task 1. Item 2 (fix
  useScroll) → Task 2. Item 3 (rapikan AppShowcase: spacing + placeholder) →
  Task 3 (both spacing `space-y-14 lg:space-y-20` → `space-y-12`, and
  placeholder → skeleton, done in the same task since they're the same file
  and same review unit). Item 4 (audit spacing/hierarchy of homepage) →
  confirmed during planning that `page.tsx`'s existing rhythm
  (`py-12 lg:py-16`, alternating `bg-surface`/no-bg) already matches the
  spec's own description of "consistent" — no separate task needed, folded
  into Task 4's visual verification instead of inventing busywork.
- **Placeholder scan:** no TBD/TODO; every step has literal code or literal
  commands with expected output.
- **Type consistency:** `AppShowcase`'s exported function signature
  (`export function AppShowcase()`) is unchanged from the current file, so
  `src/app/page.tsx:74`'s existing `<AppShowcase />` usage keeps working with
  no edits needed there.
