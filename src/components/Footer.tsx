import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Mail, Globe } from 'lucide-react';
import { CONTACT, kontakLink } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/inspirapos-icon.svg" alt="" width={28} height={28} className="rounded-md" />
            <p className="font-extrabold text-cream text-lg">Inspira POS</p>
          </div>
          <p className="text-sm">Kasir untuk UMKM & restoran Indonesia — tetap jalan walau tanpa internet.</p>
          <p className="text-xs mt-3 text-cream/40">PT Nawa Inspira Digital · InspiraLabs</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-cream mb-3">Produk</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/produk/offline" className="hover:text-gold-bright">iPOS Offline</Link></li>
            <li><Link href="/produk/umkm" className="hover:text-gold-bright">iPOS Cloud (UMKM)</Link></li>
            <li><Link href="/produk/fnb" className="hover:text-gold-bright">iPOS FnB / Resto</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-cream mb-3">Navigasi</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#faq" className="hover:text-gold-bright">FAQ</Link></li>
            <li><Link href="/demo" className="hover:text-gold-bright">Coba Gratis 14 Hari</Link></li>
            <li><Link href="/kontak" className="hover:text-gold-bright">Hubungi Kami</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-cream mb-3">Kontak</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={kontakLink('Halo, saya mau tanya tentang Inspira POS.')} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold-bright">
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden /> {CONTACT.waDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-gold-bright">
                <Mail className="w-4 h-4 shrink-0" aria-hidden /> {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold-bright">
                <Globe className="w-4 h-4 shrink-0" aria-hidden /> {CONTACT.websiteDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 text-center py-4 text-xs">
        © {new Date().getFullYear()} PT Nawa Inspira Digital. All rights reserved.
      </div>
    </footer>
  );
}
