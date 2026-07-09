import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Mail, Globe } from 'lucide-react';
import { CONTACT, kontakLink } from '@/lib/site';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = { title: 'Kontak' };

export default function KontakPage() {
  return (
    <main className="py-14 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <h1 className="text-3xl font-extrabold text-charcoal mb-3">Hubungi Kami</h1>
          <p className="text-charcoal/60 mb-10">Mau tanya paket, minta demo, atau beli lisensi? Tim kami siap bantu — bukan bot.</p>
        </Reveal>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6" stagger={0.06}>
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
          <RevealItem>
            <Card asChild className="card-brand p-6 text-left block">
              <a href={`mailto:${CONTACT.email}`}>
                <div className="icon-box mb-3"><Mail className="w-6 h-6" aria-hidden /></div>
                <h3 className="font-bold text-charcoal mb-1">Email</h3>
                <p className="text-sm text-charcoal/60">Untuk pertanyaan detail & kerjasama</p>
                <p className="text-sm text-maroon-deep font-semibold mt-2">{CONTACT.email}</p>
              </a>
            </Card>
          </RevealItem>
          <RevealItem>
            <Card asChild className="card-brand p-6 text-left block">
              <a href={CONTACT.website} target="_blank" rel="noreferrer">
                <div className="icon-box mb-3"><Globe className="w-6 h-6" aria-hidden /></div>
                <h3 className="font-bold text-charcoal mb-1">Website</h3>
                <p className="text-sm text-charcoal/60">Kenali InspiraLabs lebih jauh</p>
                <p className="text-sm text-maroon-deep font-semibold mt-2">{CONTACT.websiteDisplay}</p>
              </a>
            </Card>
          </RevealItem>
        </RevealGroup>
        <Reveal>
          <p className="mt-10 text-sm text-charcoal/50">
            Atau langsung <Link href="/demo" className="text-maroon-deep font-semibold hover:underline">daftar trial gratis</Link> dan tim kami yang akan menghubungi kamu.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
