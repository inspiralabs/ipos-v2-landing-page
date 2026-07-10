'use client';

import { RevealGroup, RevealItem } from '@/components/Reveal';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

// FAQ utama — tampil di homepage (#faq). Jawaban jujur, bahasa warung.
const FAQS: [string, string][] = [
  ['Apa saja batasan selama trial 14 hari?', 'Maksimal 20 menu, 50 transaksi, dan struk diberi tanda "DEMO". Semua fitur terbuka penuh supaya kamu bisa merasakan sistemnya. Setelah 14 hari, aplikasi terkunci sampai kamu memilih paket.'],
  ['Kalau trial habis, data saya hilang?', 'Tidak. Di iPOS Offline, data tetap tersimpan di perangkat kamu, masukkan kode aktivasi dan semuanya lanjut. Di paket cloud, data trial ditahan 30 hari dan dipindahkan ke akun berbayar saat kamu upgrade.'],
  ['iPOS Offline beneran sekali bayar?', 'Ya. Satu lisensi berlaku untuk satu perangkat, selamanya. Tidak ada biaya bulanan, tidak ada biaya tersembunyi. Internet hanya dibutuhkan sekali saat aktivasi.'],
  ['Bedanya iPOS Offline dan paket Cloud apa?', 'Offline: data tersimpan di HP/tablet kamu, jalan tanpa internet, sekali bayar. Cloud: data di server, bisa dipantau dari mana saja, ada fitur multi-kasir/multi-outlet, bayar bulanan atau beli putus.'],
  ['Karyawan saya gaptek, bisa nggak ya?', 'Bisa. Tampilannya cuma tap menu → bayar → selesai. Ada contoh menu siap pakai dan panduan di dalam aplikasi, kasir baru biasanya lancar di hari pertama.'],
  ['Kalau HP rusak atau hilang, data ikut hilang?', 'Di iPOS Offline ada tombol backup satu tap ke file, simpan di Google Drive kamu. Di paket cloud, data tersimpan di server, jadi ganti HP tinggal login.'],
  ['Saya sudah pakai Offline Lite, bisa naik ke Pro?', 'Bisa, kapan saja. Cukup bayar selisihnya Rp 199.000, admin kirim kode Pro baru, dan semua data kamu tetap utuh.'],
  ['Bagaimana cara bayarnya?', 'Transfer bank atau QRIS. Untuk iPOS Offline: hubungi admin via WhatsApp, kirim Kode HP yang tampil di aplikasi, bayar, dan kode aktivasi dikirim balik. Untuk Cloud: tim kami bantu proses upgrade dari akun trial kamu.'],
  ['Biaya setup itu untuk apa?', 'Untuk paket cloud: tim kami menyiapkan akun dan mendampingi sampai siap jualan. Biaya sekali di awal, selanjutnya mengikuti harga langganan. iPOS Offline tidak ada biaya setup.'],
  ['Perangkat apa yang bisa dipakai?', 'HP atau tablet Android dengan Chrome, juga laptop/PC. Struk bisa dicetak ke printer thermal Bluetooth 58/80mm.'],
];

export function Faq() {
  return (
    <RevealGroup className="space-y-3" stagger={0.05}>
      <Accordion type="single" collapsible>
        {FAQS.map(([q, a]) => (
          <RevealItem key={q} className="mb-3">
            <AccordionItem value={q}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          </RevealItem>
        ))}
      </Accordion>
    </RevealGroup>
  );
}
