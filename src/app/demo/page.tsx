'use client';

import { useState } from 'react';

export default function DemoPage() {
  const [form, setForm] = useState({ name: '', business_name: '', phone: '', email: '', business_type: 'umkm', product_interest: 'unknown' });
  const [website, setWebsite] = useState(''); // honeypot — harus kosong
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_TENANT_SERVICE_URL}/api/v1/public/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'landing_demo', website }),
      });
      if (!res.ok) throw new Error('request failed');
      setSent(true);
    } catch (err: any) {
      setError('Gagal mengirim. Silakan coba lagi atau hubungi kami via WhatsApp.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-extrabold text-charcoal mb-2">Terima Kasih!</h1>
          <p className="text-gray-500">Tim kami akan menghubungi kamu via WhatsApp dalam 1×24 jam untuk proses onboarding gratis.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="py-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-charcoal mb-2">Coba Gratis 14 Hari</h1>
          <p className="text-gray-500">Tidak perlu kartu kredit. Tim kami siap bantu setup.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-gold-antique/20 shadow p-8 space-y-4">
          <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)}
            style={{ display: 'none' }} tabIndex={-1} autoComplete="new-password" aria-hidden="true" />
          {([
            { name: 'name', label: 'Nama Lengkap', type: 'text' },
            { name: 'business_name', label: 'Nama Usaha', type: 'text' },
            { name: 'phone', label: 'Nomor WhatsApp', type: 'tel' },
            { name: 'email', label: 'Email', type: 'email' },
          ] as const).map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input type={f.type} required value={(form as any)[f.name]}
                onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Usaha</label>
            <select value={form.business_type} onChange={(e) => setForm((s) => ({ ...s, business_type: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="umkm">UMKM / Warung</option>
              <option value="kafe">Kafe / Coffee Shop</option>
              <option value="restoran">Restoran</option>
              <option value="fnb_lain">F&B Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Produk yang Diminati</label>
            <select value={form.product_interest} onChange={(e) => setForm((s) => ({ ...s, product_interest: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="unknown">Belum tahu — bantu pilihkan</option>
              <option value="offline">Kasir Offline (sekali bayar)</option>
              <option value="umkm">UMKM Cloud (langganan)</option>
              <option value="fnb">F&B / Resto</option>
            </select>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm">
            {loading ? 'Mengirim...' : 'Daftar Sekarang — Gratis'}
          </button>
        </form>
      </div>
    </main>
  );
}
