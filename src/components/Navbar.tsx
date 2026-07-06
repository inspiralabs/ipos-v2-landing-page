'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const LINKS = [
  { href: '/produk/offline', label: 'iPOS Offline' },
  { href: '/produk/umkm', label: 'iPOS Cloud' },
  { href: '/produk/fnb', label: 'F&B / Resto' },
  { href: '/#faq', label: 'FAQ' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-surface/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/inspirapos-icon.jpeg" alt="" width={32} height={32} className="rounded-lg" />
          <span className="font-extrabold text-maroon-deep text-lg">Inspira POS</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 flex-1">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-charcoal/70 hover:text-maroon-deep transition">{l.label}</Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <Link href="/kontak" className="text-sm text-charcoal/70 hover:text-maroon-deep">Hubungi Kami</Link>
          <Link href="/demo" className="btn-gold !min-h-9 !px-4 !text-xs">Coba Gratis 14 Hari</Link>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="md:hidden ml-auto p-2 min-h-11 text-charcoal/70" aria-label="menu">
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-surface px-4 py-4 space-y-3">
          {LINKS.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-charcoal/80 min-h-11 flex items-center">{l.label}</Link>)}
          <Link href="/kontak" onClick={() => setOpen(false)} className="block text-sm text-charcoal/80 min-h-11 flex items-center">Hubungi Kami</Link>
          <Link href="/demo" onClick={() => setOpen(false)} className="btn-gold w-full">Coba Gratis 14 Hari</Link>
        </div>
      )}
    </nav>
  );
}
