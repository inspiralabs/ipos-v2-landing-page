'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { waLink } from '@/lib/site';

const VALID_INTERESTS = ['offline', 'umkm', 'fnb'] as const;

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  umkm: 'UMKM / Warung',
  kafe: 'Kafe / Coffee Shop',
  restoran: 'Restoran',
  fnb_lain: 'F&B Lainnya',
  lainnya: 'Lainnya',
};

const PRODUCT_INTEREST_LABELS: Record<string, string> = {
  unknown: 'Belum tahu, bantu pilihkan',
  offline: 'Kasir Offline (sekali bayar)',
  umkm: 'UMKM Cloud (langganan)',
  fnb: 'F&B / Resto',
};

type FormState = {
  name: string;
  business_name: string;
  phone: string;
  email: string;
  business_type: string;
  business_type_other: string;
  product_interest: string;
  notes: string;
};

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (form.name.trim().length < 3) errors.name = 'Nama lengkap minimal 3 karakter.';
  if (form.business_name.trim().length < 3) errors.business_name = 'Nama usaha minimal 3 karakter.';
  // 12 digit format domestik (contoh 081234567899) = 11 digit setelah 0 dibuang otomatis di field +62.
  if (!/^\d{11}$/.test(form.phone)) errors.phone = 'Nomor WhatsApp harus 12 digit, contoh 081234567899 (ketik 81234567899 di sini).';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Format email tidak valid.';
  if (form.business_type === 'lainnya' && form.business_type_other.trim().length === 0) {
    errors.business_type_other = 'Isi jenis usaha kamu.';
  }
  if (form.product_interest === 'unknown' && form.notes.trim().length === 0) {
    errors.notes = 'Ceritakan sedikit kebutuhan usahamu, biar admin bisa bantu pilihkan.';
  }
  return errors;
}

function DemoForm() {
  const params = useSearchParams();
  const preselect = params.get('product');
  const initialInterest = (VALID_INTERESTS as readonly string[]).includes(preselect ?? '') ? preselect! : 'unknown';
  const [form, setForm] = useState<FormState>({
    name: '', business_name: '', phone: '', email: '',
    business_type: 'umkm', business_type_other: '',
    product_interest: initialInterest, notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [website, setWebsite] = useState(''); // honeypot — harus kosong
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  const fullPhone = `62${form.phone}`; // form.phone cuma digit setelah +62 (lihat field Nomor WhatsApp)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_TENANT_SERVICE_URL}/api/v1/public/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, phone: fullPhone, source: 'landing_demo', website }),
      });
      if (!res.ok) throw new Error('request failed');

      // "Belum tahu" — klien sendiri yang menghubungi admin via WA (bukan admin yang menghubungi
      // klien), pesan sudah terisi otomatis dari data form supaya admin langsung punya konteks.
      if (form.product_interest === 'unknown') {
        const jenisUsaha = form.business_type === 'lainnya' ? form.business_type_other : BUSINESS_TYPE_LABELS[form.business_type];
        const message = `Halo admin, saya ingin mendaftar Coba Gratis 14 Hari Inspira POS.
Berikut data saya: Nama Lengkap: ${form.name},
Nama Usaha: ${form.business_name},
Nomor WhatsApp: ${fullPhone},
Email: ${form.email || '-'},
Jenis Usaha: ${jenisUsaha},
Produk yang Diminati: ${PRODUCT_INTEREST_LABELS.unknown}
Catatan: ${form.notes}`;
        window.location.href = waLink(message);
        return;
      }

      setSent(true);
    } catch (err: any) {
      setError('Gagal mengirim. Silakan coba lagi atau hubungi kami via WhatsApp.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    // Offline: bisa langsung coba sendiri (app-nya self-serve) — tidak perlu nunggu WA.
    // Data tetap masuk ke leads (admin tetap tahu toko mana yang daftar) DAN ke
    // offline_clients begitu form onboarding di app selesai diisi.
    if (form.product_interest === 'offline') {
      const appUrl = new URL(process.env.NEXT_PUBLIC_OFFLINE_APP_URL || 'http://localhost:5173');
      appUrl.searchParams.set('store', form.business_name);
      appUrl.searchParams.set('phone', fullPhone);
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
  }

  return (
    <main className="py-16 px-4">
      <div className="max-w-lg mx-auto">
        <Reveal className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-charcoal mb-2">Coba Gratis 14 Hari</h1>
          <p className="text-gray-500">Tidak perlu kartu kredit. Tim kami siap bantu setup.</p>
        </Reveal>
        <form onSubmit={handleSubmit} noValidate className="bg-surface rounded-2xl border border-gold-antique/20 shadow p-8 space-y-4">
          <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)}
            style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />
          <RevealGroup className="space-y-4" stagger={0.05}>
            <RevealItem>
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" type="text" value={form.name} onChange={(e) => set('name', e.target.value)} />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </RevealItem>
            <RevealItem>
              <Label htmlFor="business_name">Nama Usaha</Label>
              <Input id="business_name" type="text" value={form.business_name} onChange={(e) => set('business_name', e.target.value)} />
              {errors.business_name && <p className="mt-1 text-xs text-red-500">{errors.business_name}</p>}
            </RevealItem>
            <RevealItem>
              <Label htmlFor="phone">Nomor WhatsApp</Label>
              <div className="flex">
                <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                  +62
                </span>
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
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </RevealItem>
            <RevealItem>
              <Label htmlFor="email">Email (opsional)</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </RevealItem>
            <RevealItem>
              <Label htmlFor="business_type">Jenis Usaha</Label>
              <Select value={form.business_type} onValueChange={(v) => set('business_type', v)}>
                <SelectTrigger id="business_type"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="umkm">UMKM / Warung</SelectItem>
                  <SelectItem value="kafe">Kafe / Coffee Shop</SelectItem>
                  <SelectItem value="restoran">Restoran</SelectItem>
                  <SelectItem value="fnb_lain">F&B Lainnya</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </RevealItem>
            {form.business_type === 'lainnya' && (
              <RevealItem>
                <Label htmlFor="business_type_other">Jenis Usaha Lainnya</Label>
                <Input id="business_type_other" type="text" value={form.business_type_other} onChange={(e) => set('business_type_other', e.target.value)} />
                {errors.business_type_other && <p className="mt-1 text-xs text-red-500">{errors.business_type_other}</p>}
              </RevealItem>
            )}
            <RevealItem>
              <Label htmlFor="product_interest">Produk yang Diminati</Label>
              <Select value={form.product_interest} onValueChange={(v) => set('product_interest', v)}>
                <SelectTrigger id="product_interest"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="unknown">Belum tahu, bantu pilihkan</SelectItem>
                  <SelectItem value="offline">Kasir Offline (sekali bayar)</SelectItem>
                  <SelectItem value="umkm">UMKM Cloud (langganan)</SelectItem>
                  <SelectItem value="fnb">F&B / Resto</SelectItem>
                </SelectContent>
              </Select>
            </RevealItem>
            {form.product_interest === 'unknown' && (
              <RevealItem>
                <Label htmlFor="notes">Catatan</Label>
                <Textarea id="notes" rows={3} placeholder="Ceritakan usahamu, biar admin bisa bantu pilihkan produk yang cocok." value={form.notes} onChange={(e) => set('notes', e.target.value)} />
                {errors.notes && <p className="mt-1 text-xs text-red-500">{errors.notes}</p>}
              </RevealItem>
            )}
          </RevealGroup>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button type="submit" variant="gold" disabled={loading} className="w-full">
            {loading ? 'Mengirim...' : form.product_interest === 'unknown' ? 'Lanjut ke WhatsApp Admin' : 'Daftar Sekarang, Gratis'}
          </Button>
        </form>
      </div>
    </main>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={null}>
      <DemoForm />
    </Suspense>
  );
}
