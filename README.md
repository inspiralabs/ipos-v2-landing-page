# landing-page

Website pemasaran Inspira POS (Next.js 15 App Router).

## Jalankan

```powershell
npm install
npm run dev
```

Buka http://localhost:3000. Setup env lengkap ada di [../MENJALANKAN.md](../MENJALANKAN.md) (bagian A6 & D).

## Env yang dipakai

| Var | Untuk apa |
|---|---|
| `NEXT_PUBLIC_TENANT_SERVICE_URL` | Tujuan POST form `/demo` (endpoint publik di `ipos-cloud/services/tenant-service`) |
| `NEXT_PUBLIC_INSPIRALABS_URL` | Override tujuan tombol "Hubungi via WhatsApp" (default `https://inspiralabs.id`, isi `http://localhost:3001` saat dev bareng `company-profile`) |
| `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` | Analytics |
| `RESEND_API_KEY` / `NOTIFY_EMAIL` | Belum dipakai di kode saat ini (disiapkan untuk notifikasi email) |

## Halaman

`/` · `/produk/offline` · `/produk/umkm` · `/produk/fnb` · `/harga` · `/demo` (form trial, masuk ke
admin-app → `/leads`) · `/kontak` · `/tentang-kami`
