// Kontak resmi — satu sumber untuk semua CTA di landing page.
// website: bisa dioverride via NEXT_PUBLIC_INSPIRALABS_URL (mis. http://localhost:3001 saat
// menjalankan company-profile lokal), supaya link kontak tidak selalu lompat ke production.
export const CONTACT = {
  waNumber: '6282124533265',
  waDisplay: '+62 821-2453-3265',
  email: 'hello@inspiralabs.id',
  website: process.env.NEXT_PUBLIC_INSPIRALABS_URL || 'https://inspiralabs.id',
  websiteDisplay: 'inspiralabs.id',
};

export function waLink(message: string): string {
  return `https://wa.me/${CONTACT.waNumber}?text=${encodeURIComponent(message)}`;
}

// Semua CTA "konsultasi" / "hubungi via WhatsApp" diarahkan ke sini, bukan wa.me langsung —
// supaya data calon klien (nama, usaha, kebutuhan) tercatat rapi lewat form InspiraLabs.
// `pesan` mengisi otomatis field "Pesan / Detail Kebutuhan" di form tersebut.
export function kontakLink(pesan: string): string {
  return `${CONTACT.website}/kontak?pesan=${encodeURIComponent(pesan)}`;
}
