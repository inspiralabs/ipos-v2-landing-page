import { Reveal } from '@/components/Reveal';

type Row = {
  title: string;
  desc: string;
  device: 'desktop' | 'phone';
  skeleton: 'chart' | 'pos' | 'receipt';
};

const ROWS: Row[] = [
  {
    title: 'Laporan untung, bukan cuma omzet',
    desc: 'Lihat laba rugi, menu terlaris, dan tren penjualan harian - langsung dari layar kasir atau HP kamu.',
    device: 'desktop',
    skeleton: 'chart',
  },
  {
    title: 'Kasir tinggal tap, transaksi langsung jalan',
    desc: 'Pilih menu dari grid, keranjang dan total kebentuk otomatis - jualan jadi cepat tanpa ribet.',
    device: 'phone',
    skeleton: 'pos',
  },
  {
    title: 'Struk thermal, siap cetak langsung',
    desc: 'Sambungkan printer Bluetooth 58/80mm, struk keluar lengkap dengan logo toko kamu.',
    device: 'desktop',
    skeleton: 'receipt',
  },
];

const BAR_HEIGHTS = ['40%', '65%', '35%', '80%', '55%', '70%'];
const POS_MENU_ITEMS = [
  { name: 'Nasi Goreng', price: 'Rp 15.000' },
  { name: 'Es Teh Manis', price: 'Rp 5.000' },
  { name: 'Ayam Geprek', price: 'Rp 13.000' },
  { name: 'Kerupuk', price: 'Rp 3.000' },
];
const RECEIPT_LINES = [
  { label: 'Nasi Goreng x2', value: 'Rp 30.000' },
  { label: 'Es Teh Manis x2', value: 'Rp 10.000' },
  { label: 'Kerupuk x1', value: 'Rp 3.000' },
];

function ChartSkeleton() {
  return (
    <div className="h-full w-full flex items-end justify-around gap-2 p-6">
      {BAR_HEIGHTS.map((h, i) => (
        <div key={i} className="flex-1 rounded-t-md bg-maroon-deep/15" style={{ height: h }} />
      ))}
    </div>
  );
}

function PosSkeleton() {
  return (
    <div className="h-full w-full p-4 grid grid-cols-2 gap-2 content-start">
      {POS_MENU_ITEMS.map((item) => (
        <div key={item.name} className="rounded-lg border border-line bg-surface px-2.5 py-2">
          <div className="text-[10px] font-semibold text-charcoal/70">{item.name}</div>
          <div className="text-[10px] text-charcoal/50 mt-0.5">{item.price}</div>
        </div>
      ))}
    </div>
  );
}

function ReceiptSkeleton() {
  return (
    <div className="h-full w-full p-6 flex flex-col gap-2 font-mono text-[10px] text-charcoal/60">
      <div className="text-center font-bold text-charcoal/70 mb-1">STRUK PENJUALAN</div>
      <div className="border-t border-dashed border-line" />
      {RECEIPT_LINES.map((l) => (
        <div key={l.label} className="flex justify-between">
          <span>{l.label}</span>
          <span>{l.value}</span>
        </div>
      ))}
      <div className="border-t border-dashed border-line" />
      <div className="flex justify-between font-bold text-charcoal/80">
        <span>TOTAL</span>
        <span>Rp 43.000</span>
      </div>
    </div>
  );
}

function Skeleton({ kind }: { kind: Row['skeleton'] }) {
  if (kind === 'chart') return <ChartSkeleton />;
  if (kind === 'pos') return <PosSkeleton />;
  return <ReceiptSkeleton />;
}

function DeviceFrame({ device, skeleton }: { device: 'desktop' | 'phone'; skeleton: Row['skeleton'] }) {
  if (device === 'phone') {
    return (
      <div className="mx-auto w-[220px] rounded-[2rem] border-8 border-charcoal bg-charcoal p-1 shadow-[0_16px_40px_rgba(110,21,15,0.18)]">
        <div className="rounded-[1.5rem] overflow-hidden bg-cream aspect-[9/19]">
          <Skeleton kind={skeleton} />
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
        <Skeleton kind={skeleton} />
      </div>
    </div>
  );
}

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
                <DeviceFrame device={row.device} skeleton={row.skeleton} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
