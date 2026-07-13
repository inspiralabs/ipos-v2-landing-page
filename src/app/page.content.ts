import {
  WifiOff, Cloud, UtensilsCrossed, Rocket, Store, BadgeCheck,
  Printer, PackageSearch, BarChart3, Users, HandCoins, DatabaseBackup, QrCode,
} from 'lucide-react';

// Harga: docs/PRICING.md (trial 14 hari, harga serba-9)

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

export const STEPS = [
  { icon: Rocket, t: 'Coba gratis 14 hari', d: 'Tanpa kartu kredit. Semua fitur terbuka - dibatasi 20 menu & 50 transaksi biar cukup untuk menilai.' },
  { icon: Store, t: 'Jualan seperti biasa', d: 'Pakai contoh menu siap pakai, terima pembayaran, lihat laporan. Tim kami siap bantu via WhatsApp.' },
  { icon: BadgeCheck, t: 'Cocok? Pilih paket', d: 'Offline: bayar sekali, dapat kode aktivasi, data lanjut. Cloud: upgrade akun, data trial ikut pindah.' },
];

export const FEATURES = [
  { icon: WifiOff, t: 'Anti mati gaya', d: 'Internet putus, kasir tetap jalan' },
  { icon: Printer, t: 'Struk thermal', d: 'Printer Bluetooth 58/80mm + logo toko' },
  { icon: PackageSearch, t: 'Stok otomatis', d: 'Berkurang tiap jualan, ada alert menipis' },
  { icon: BarChart3, t: 'Laporan untung', d: 'Omzet, menu terlaris, laba rugi' },
  { icon: Users, t: 'Multi-kasir', d: 'Tiap kasir punya PIN sendiri' },
  { icon: HandCoins, t: 'Catatan hutang', d: 'Piutang pelanggan + cicilan tercatat' },
  { icon: QrCode, t: 'QRIS & QR order', d: 'Terima QRIS, pelanggan pesan dari meja' },
  { icon: DatabaseBackup, t: 'Data aman', d: 'Backup satu tap, pulihkan kapan saja' },
];
