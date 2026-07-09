// Tabel perbandingan paket — tersemat di tiap halaman produk.
// Sumber angka: docs/PRICING.md (trial 14 hari, harga serba-9).

import { Reveal } from './Reveal';

// CompareTable dipisah ke file client tersendiri (pakai hook framer-motion) supaya file ini
// (data + planFeaturesFromRows) tetap bisa dipanggil dari server component halaman produk.
export { CompareTable } from './CompareTable';

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
  ['Grafik 30 hari + laporan per kasir', N, Y],
  ['Laporan laba rugi', N, Y],
  ['Export laporan ke Excel & PDF', N, Y],
  ['Manajemen supplier', N, Y],
];

export const UMKM_ROWS: string[][] = [
  ['Langganan per bulan', 'Rp 149.000', 'Rp 299.000'],
  ['Biaya setup (sekali)', 'Rp 199.000', 'Rp 399.000'],
  ['Atau beli putus', 'Rp 2.999.000', 'Rp 4.999.000'],
  ['Outlet / kasir', '1 outlet, 1 kasir', '1 outlet, sampai 5 kasir'],
  ['Jumlah menu + foto', 'Sampai 50', 'Tanpa batas'],
  ['Tunai + QRIS', Y, Y],
  ['Struk cetak & kirim via WhatsApp', Y, Y],
  ['Tetap jalan saat internet putus', Y, Y],
  ['Tombol "habis" per menu', Y, Y],
  ['Diskon per item', Y, Y],
  ['Laporan harian', Y, Y],
  ['Modifier menu (topping, ukuran, level)', N, Y],
  ['Batalkan transaksi dengan otorisasi', N, Y],
  ['Split bill', N, Y],
  ['Shift kasir', N, Y],
  ['Stok per menu + peringatan menipis', N, Y],
  ['Laporan mingguan, bulanan, per kasir/shift', N, Y],
  ['Export PDF & Excel', N, Y],
];

export const RESTO_ROWS: string[][] = [
  ['Langganan per bulan', 'Rp 999.000', 'Rp 2.499.000', 'Rp 4.999.000'],
  ['Biaya setup (sekali)', 'Rp 1.499.000', 'Rp 2.999.000', 'Rp 4.999.000'],
  ['Atau beli putus', 'Rp 29.999.000', 'Rp 64.999.000', 'Rp 79.999.000'],
  ['Jumlah outlet', '1 – 3', 'Sampai 5', 'Sampai 10'],
  ['Semua fitur iPOS Cloud Pro', Y, Y, Y],
  ['Table management (denah meja)', Y, Y, Y],
  ['Kitchen display + timer pesanan', Y, Y, Y],
  ['QR self-order per meja', Y, Y, Y],
  ['Resep/BOM — stok bahan berkurang otomatis', Y, Y, Y],
  ['Dashboard stok real-time', Y, Y, Y],
  ['Menu nonaktif otomatis saat bahan habis', Y, Y, Y],
  ['Absensi karyawan', Y, Y, Y],
  ['Cetak QR meja + kartu QR waiter', Y, Y, Y],
  ['Dashboard terpusat multi-cabang', N, Y, Y],
  ['Transfer stok antar cabang', N, Y, Y],
  ['Loyalty program (poin member)', N, Y, Y],
  ['Food cost per menu + peringatan rasio', N, Y, Y],
  ['Laporan laba rugi & arus kas', N, Y, Y],
];

// Turunkan checklist fitur kartu harga langsung dari baris tabel perbandingan (satu sumber data,
// supaya kartu & tabel detail tidak pernah beda). skip = jumlah baris harga di awal (sebelum baris
// fitur mulai): 1 untuk Offline (cuma "Harga"), 3 untuk UMKM/Resto (Langganan, Setup, Beli putus).
export function planFeaturesFromRows(rows: string[][], skip: number, col: number) {
  return rows.slice(skip).map(([label, ...vals]) => {
    const v = vals[col];
    const isYesNo = v === '✓' || v === '—';
    return { label: isYesNo ? label : `${label}: ${v}`, included: v !== '—' };
  });
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

