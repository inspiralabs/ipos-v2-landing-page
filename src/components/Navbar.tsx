'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetClose } from '@/components/ui/sheet';

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
          <Image src="/inspirapos-icon.svg" alt="" width={32} height={32} className="rounded-lg" />
          <span className="font-extrabold text-maroon-deep text-lg">Inspira POS</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 flex-1">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-charcoal/70 hover:text-maroon-deep transition">{l.label}</Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <Link href="/kontak" className="text-sm text-charcoal/70 hover:text-maroon-deep">Hubungi Kami</Link>
          <Button asChild variant="gold" className="!min-h-9 !px-4 !text-xs">
            <Link href="/demo">Coba Gratis 14 Hari</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden ml-auto p-2 min-h-11 text-charcoal/70" aria-label="Buka menu">
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Menu navigasi</SheetTitle>
            <div className="mt-8 flex flex-col gap-1">
              {LINKS.map((l) => (
                <SheetClose asChild key={l.href}>
                  <Link href={l.href} className="block min-h-11 flex items-center text-sm text-charcoal/80">{l.label}</Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link href="/kontak" className="block min-h-11 flex items-center text-sm text-charcoal/80">Hubungi Kami</Link>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild variant="gold" className="w-full mt-2">
                  <Link href="/demo">Coba Gratis 14 Hari</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
