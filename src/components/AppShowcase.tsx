import Image from 'next/image';
import { Reveal } from '@/components/Reveal';

const CDN = 'https://assets.inspirapos.biz.id/hero-images';

type Row = {
  title: string;
  desc: string;
  image: string;
  imageAlt: string;
};

const ROWS: Row[] = [
  {
    title: 'Laporan untung, bukan cuma omzet',
    desc: 'Lihat laba rugi, menu terlaris, dan tren penjualan harian - langsung dari layar kasir atau HP kamu.',
    image: `${CDN}/laporan.webp`,
    imageAlt: 'Tampilan laporan penjualan Inspira POS',
  },
  {
    title: 'Kasir tinggal tap, transaksi langsung jalan',
    desc: 'Pilih menu dari grid, keranjang dan total kebentuk otomatis - jualan jadi cepat tanpa ribet.',
    image: `${CDN}/kasir.webp`,
    imageAlt: 'Tampilan kasir Inspira POS di ponsel',
  },
  {
    title: 'Struk thermal, siap cetak langsung',
    desc: 'Sambungkan printer Bluetooth 58/80mm, struk keluar lengkap dengan logo toko kamu.',
    image: `${CDN}/struk-kasir.webp`,
    imageAlt: 'Tampilan struk thermal Inspira POS',
  },
];

export function AppShowcase() {
  return (
    <section className="py-12 lg:py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {ROWS.map((row, i) => {
          const imageFirst = i % 2 === 1;
          return (
            <Reveal key={row.title} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className={imageFirst ? 'lg:order-2' : ''}>
                <h3 className="text-xl sm:text-2xl font-extrabold text-charcoal mb-2">{row.title}</h3>
                <p className="text-charcoal/60">{row.desc}</p>
              </div>
              <div className={imageFirst ? 'lg:order-1' : ''}>
                <Image
                  src={row.image}
                  alt={row.imageAlt}
                  width={960}
                  height={720}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
