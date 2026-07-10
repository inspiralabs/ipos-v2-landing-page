// Tabel perbandingan paket — tersemat di tiap halaman produk.
// Sumber angka: docs/PRICING.md (trial 14 hari, harga serba-9).

import { Check, X } from 'lucide-react';
import { Reveal } from './Reveal';

const Y = '✓';
const N = '—';

export const OFFLINE_ROWS: string[][] = [
  ['Harga (sekali bayar, per perangkat)', 'Rp 299.000', 'Rp 499.000'],
  ['Jumlah produk & transaksi', 'Tanpa batas', 'Tanpa batas'],
  ['Diskon per item & per transaksi', Y, Y],
  ['Variasi menu (topping, level, ukuran)', Y, Y],
  ['Open bill (simpan tagihan sementara)', Y, Y],
  ['Stok otomatis + modal (HPP) rata-rata', Y, Y],
  ['Struk thermal 58/80mm + logo toko', Y, Y],
  ['Laporan harian + grafik 7 hari', Y, Y],
  ['Backup & pulihkan data (file JSON)', Y, Y],
  ['Batalkan transaksi dengan PIN owner', N, Y],
  ['Split bill (pisah tagihan)', N, Y],
  ['Multi-kasir dengan PIN masing-masing', N, Y],
  ['Catatan hutang pelanggan + cicilan', N, Y],
  ['Pencatatan pengeluaran toko', N, Y],
  ['Grafik 30 hari + laporan per kasir', Y, Y],
  ['Laporan laba rugi', Y, Y],
  ['Export laporan ke Excel & PDF', Y, Y],
  ['Manajemen supplier', N, Y],
];

export const UMKM_ROWS: string[][] = [
  ['Langganan per bulan', 'Rp 149.000', 'Rp 299.000'],
  ['Langganan per tahun', 'Rp 1.499.000', 'Rp 2.999.000'],
  ['Biaya setup (tahunan hemat 50%)', 'Rp 199.000', 'Rp 399.000'],
  ['Outlet / kasir', '1 outlet, 1 kasir', '1 outlet, sampai 5 kasir'],
  ['Jumlah menu + foto', 'Sampai 50', 'Tanpa batas'],
  ['Tunai + QRIS', Y, Y],
  ['Struk cetak & kirim via WhatsApp', Y, Y],
  ['Tetap jalan saat internet putus', Y, Y],
  ['Tombol "habis" per menu', Y, Y],
  ['Diskon per item', Y, Y],
  ['Laporan harian', Y, Y],
  ['Modifier menu (topping, ukuran, level)', Y, Y],
  ['Batalkan transaksi dengan otorisasi', N, Y],
  ['Split bill', N, Y],
  ['Shift kasir', N, Y],
  ['Stok per menu + peringatan menipis', Y, Y],
  ['Laporan mingguan, bulanan, per kasir/shift', Y, Y],
  ['Export PDF & Excel', Y, Y],
];

export const RESTO_ROWS: string[][] = [
  ['Langganan per bulan', 'Rp 599.000', 'Rp 999.000', 'Rp 2.499.000', 'Rp 4.999.000'],
  ['Langganan per tahun', 'Rp 5.999.000', 'Rp 9.999.000', 'Rp 24.999.000', 'Rp 49.999.000'],
  ['Biaya setup (tahunan hemat 50%)', 'Rp 799.000', 'Rp 1.499.000', 'Rp 2.999.000', 'Rp 4.999.000'],
  ['Jumlah outlet', '1', '1 – 3', 'Sampai 5', 'Sampai 10'],
  ['Semua fitur iPOS Cloud Pro', Y, Y, Y, Y],
  ['Table management (denah meja)', Y, Y, Y, Y],
  ['Kitchen display + timer pesanan', Y, Y, Y, Y],
  ['QR self-order per meja', Y, Y, Y, Y],
  ['Cetak QR meja + kartu QR waiter', Y, Y, Y, Y],
  ['Resep/BOM, stok bahan berkurang otomatis', N, Y, Y, Y],
  ['Dashboard stok real-time', N, Y, Y, Y],
  ['Menu nonaktif otomatis saat bahan habis', N, Y, Y, Y],
  ['Absensi karyawan', N, Y, Y, Y],
  ['Loyalty program (poin member)', N, N, Y, Y],
  ['Dashboard terpusat multi-cabang', N, N, Y, Y],
  ['Transfer stok antar cabang', N, N, Y, Y],
  ['Food cost per menu + peringatan rasio', N, N, Y, Y],
  ['Laporan laba rugi & arus kas', N, N, Y, Y],
];

// Turunkan checklist fitur kartu harga langsung dari baris tabel perbandingan (satu sumber data,
// supaya kartu & tabel detail tidak pernah beda). skip = jumlah baris harga di awal (sebelum baris
// fitur mulai): 1 untuk Offline (cuma "Harga"), 3 untuk UMKM/Resto (Bulanan, Tahunan, Setup).
export function planFeaturesFromRows(rows: string[][], skip: number, col: number) {
  return rows.slice(skip).map(([label, ...vals]) => {
    const v = vals[col];
    const isYesNo = v === '✓' || v === '—';
    return { label: isYesNo ? label : `${label}: ${v}`, included: v !== '—' };
  });
}

/**
 * Tabel perbandingan ringkas - pelengkap kartu harga, bukan pengganti.
 * Header & kolom pertama sticky supaya tetap terbaca saat scroll baris panjang;
 * overflow-x-auto di mobile (data table adalah salah satu kasus sah untuk scroll
 * horizontal, beda dengan konten utama yang harus fit viewport).
 */
export function CompareTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <Reveal className="max-w-7xl mx-auto">
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-cream text-left font-bold text-charcoal px-4 py-3 min-w-[180px] sm:min-w-[220px] border-r border-line">
                Fitur
              </th>
              {headers.map((h) => (
                <th key={h} className="bg-cream text-center font-bold text-charcoal px-4 py-3 min-w-[140px] whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, ...vals], i) => {
              const rowBg = i % 2 === 1 ? 'bg-cream/40' : 'bg-surface';
              return (
                <tr key={label}>
                  <td className={`sticky left-0 z-10 ${rowBg} text-charcoal/80 px-4 py-3 border-t border-r border-line`}>
                    {label}
                  </td>
                  {vals.map((v, j) => (
                    <td key={j} className={`${rowBg} text-center px-4 py-3 border-t border-line`}>
                      {v === '✓' ? (
                        <Check className="w-4 h-4 text-maroon-deep mx-auto" aria-label="Termasuk" />
                      ) : v === '—' ? (
                        <X className="w-4 h-4 text-charcoal/25 mx-auto" aria-label="Tidak termasuk" />
                      ) : (
                        <span className="text-charcoal/80">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

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

