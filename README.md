# Webside — Next.js + TypeScript

Versi framework dari website statis `webside.zip` kamu, dipindahkan ke stack yang lagi populer:

- **Bahasa:** TypeScript
- **Framework:** Next.js 14 (App Router) + React 18

Semua desain, teks, dan struktur halaman (Home, Template, Kontak) dipertahankan persis seperti versi HTML asli — hanya cara membangunnya yang berubah jadi komponen React, supaya lebih mudah dikembangkan, di-deploy, dan ditambah fitur (misalnya nanti disambungkan ke database atau API pembayaran).

## Struktur

```
app/
  layout.tsx        -> layout global (Header + Footer + <main>)
  page.tsx           -> halaman Home
  template/page.tsx  -> halaman katalog Template
  kontak/page.tsx    -> halaman Kontak
  globals.css        -> CSS asli (styles.css) dipakai apa adanya
components/
  Header.tsx          -> navbar + menu mobile (client component)
  Footer.tsx
  Reveal.tsx           -> animasi scroll-reveal (ganti IntersectionObserver di script.js)
  BrowserFrame.tsx     -> mockup "browser frame" untuk preview template
  TemplateCatalog.tsx  -> filter kategori + modal detail (client component)
  ContactForm.tsx      -> form kontak dengan pesan sukses (client component)
  icons.tsx            -> semua ikon SVG inline
lib/
  templates.ts        -> data katalog template (mudah ditambah/diubah di satu tempat)
public/
  webside.svg
```

## Menjalankan di lokal

Butuh Node.js 18.18+ (atau 20+ direkomendasikan).

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Build untuk production

```bash
npm run build
npm start
```

## Deploy

Project ini siap di-deploy ke Vercel, Netlify, atau hosting Node.js apa pun:

```bash
npm run build
```

lalu jalankan `npm start`, atau push ke Vercel untuk deploy otomatis (`vercel deploy`).

## Yang berubah dari versi HTML asli

- Semua interaksi (menu mobile, scroll reveal, filter template, modal detail, form kontak) sekarang pakai React state, bukan `document.querySelector` manual di `script.js`.
- Data template dipusatkan di `lib/templates.ts` — tambah/ubah template cukup edit array di situ, otomatis muncul di halaman Home (featured) dan halaman Template (katalog lengkap).
- Routing pakai file-based routing Next.js (`app/template`, `app/kontak`) menggantikan file `.html` terpisah.
- CSS asli (`styles.css`) dipakai langsung tanpa perubahan sebagai `globals.css`, jadi tampilan 100% identik dengan versi awal.
