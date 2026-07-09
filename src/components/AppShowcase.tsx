import { BarChart3, PackageSearch, Printer } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

type Row = {
  icon: typeof BarChart3;
  title: string;
  desc: string;
  device: 'desktop' | 'phone';
  image: string;
};

// ponytail: placeholder polos warna cream sampai screenshot asli tersedia — ganti path `image` ke
// file di public/showcase/ (kode tidak perlu berubah, cuma path string ini).
const PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#f5efe6"/></svg>',
)}`;

const ROWS: Row[] = [
  {
    icon: BarChart3,
    title: 'Laporan untung, bukan cuma omzet',
    desc: 'Lihat laba rugi, menu terlaris, dan tren penjualan harian - langsung dari layar kasir atau HP kamu.',
    device: 'desktop',
    image: PLACEHOLDER,
  },
  {
    icon: PackageSearch,
    title: 'Stok jalan sendiri tiap ada transaksi',
    desc: 'Nggak perlu hitung manual - stok otomatis berkurang tiap jualan, ada alert kalau mulai menipis.',
    device: 'phone',
    image: PLACEHOLDER,
  },
  {
    icon: Printer,
    title: 'Struk thermal, siap cetak langsung',
    desc: 'Sambungkan printer Bluetooth 58/80mm, struk keluar lengkap dengan logo toko kamu.',
    device: 'desktop',
    image: PLACEHOLDER,
  },
];

function DeviceFrame({ device, image, alt }: { device: 'desktop' | 'phone'; image: string; alt: string }) {
  if (device === 'phone') {
    return (
      <div className="mx-auto w-[220px] rounded-[2rem] border-8 border-charcoal bg-charcoal p-1 shadow-[0_16px_40px_rgba(110,21,15,0.18)]">
        <div className="rounded-[1.5rem] overflow-hidden bg-cream aspect-[9/19]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={alt} className="w-full h-full object-cover" />
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export function AppShowcase() {
  return (
    <section className="py-12 lg:py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-14 lg:space-y-20">
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
                <DeviceFrame device={row.device} image={row.image} alt={row.title} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
