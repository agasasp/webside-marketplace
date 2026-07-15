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
