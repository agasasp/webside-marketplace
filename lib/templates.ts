export type TemplateCategory =
  | "company-profile"
  | "landing-page"
  | "ecommerce"
  | "portfolio"
  | "blog";

export interface WebTemplate {
  slug: string;
  name: string;
  category: TemplateCategory;
  categoryLabel: string;
  price: string;
  priceShort: string;
  priceValue: number; // numeric for sorting/filtering
  popularity: number; // 1–100
  desc: string;
  frame: "hero3" | "hero-btn" | "shop" | "portfolio2" | "blog2" | "grid2";
  demoUrl?: string;
}

export const filters: { label: string; value: "semua" | TemplateCategory }[] = [
  { label: "Semua", value: "semua" },
  { label: "Company Profile", value: "company-profile" },
  { label: "Landing Page", value: "landing-page" },
  { label: "E-commerce", value: "ecommerce" },
  { label: "Portfolio", value: "portfolio" },
  { label: "Blog & Media", value: "blog" },
];

export const templates: WebTemplate[] = [
  {
    slug: "lumina",
    name: "Lumina",
    category: "company-profile",
    categoryLabel: "Company Profile",
    price: "Rp 799.000",
    priceShort: "Rp 799rb",
    priceValue: 799000,
    popularity: 92,
    desc: "Cocok untuk profil perusahaan atau studio yang ingin tampil rapi dan profesional, lengkap dengan halaman layanan dan tim.",
    frame: "hero3",
    demoUrl: "https://webside.id/demo/lumina",
  },
  {
    slug: "cepat",
    name: "Cepat",
    category: "landing-page",
    categoryLabel: "Landing Page",
    price: "Rp 449.000",
    priceShort: "Rp 449rb",
    priceValue: 449000,
    popularity: 85,
    desc: "Landing page satu halaman untuk peluncuran produk atau campaign — fokus ke satu ajakan bertindak, ringan dan cepat diakses.",
    frame: "hero-btn",
    demoUrl: "https://webside.id/demo/cepat",
  },
  {
    slug: "pasar",
    name: "Pasar",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    price: "Rp 1.200.000",
    priceShort: "Rp 1.2jt",
    priceValue: 1200000,
    popularity: 88,
    desc: "Toko online lengkap dengan katalog produk, keranjang, dan integrasi pembayaran — siap jualan begitu domain aktif.",
    frame: "shop",
    demoUrl: "https://webside.id/demo/pasar",
  },
  {
    slug: "folio",
    name: "Folio",
    category: "portfolio",
    categoryLabel: "Portfolio",
    price: "Rp 649.000",
    priceShort: "Rp 649rb",
    priceValue: 649000,
    popularity: 79,
    desc: "Portofolio visual untuk kreator, fotografer, atau desainer — grid galeri besar yang membiarkan karya kamu jadi pusat perhatian.",
    frame: "portfolio2",
    demoUrl: "https://webside.id/demo/folio",
  },
  {
    slug: "rilis",
    name: "Rilis",
    category: "blog",
    categoryLabel: "Blog & Media",
    price: "Rp 599.000",
    priceShort: "Rp 599rb",
    priceValue: 599000,
    popularity: 65,
    desc: "Untuk blog atau media kecil — daftar artikel yang jelas, halaman kategori, dan tampilan baca yang nyaman di mobile.",
    frame: "blog2",
    demoUrl: "https://webside.id/demo/rilis",
  },
  {
    slug: "atelier",
    name: "Atelier",
    category: "portfolio",
    categoryLabel: "Portfolio",
    price: "Rp 699.000",
    priceShort: "Rp 699rb",
    priceValue: 699000,
    popularity: 71,
    desc: "Nuansa studio seni untuk arsitek, ilustrator, atau desainer interior — layout tenang dengan penekanan pada tipografi.",
    frame: "hero-btn",
    demoUrl: "https://webside.id/demo/atelier",
  },
  {
    slug: "warung",
    name: "Warung",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    price: "Rp 999.000",
    priceShort: "Rp 999rb",
    priceValue: 999000,
    popularity: 76,
    desc: "Versi ringkas dari Pasar — pas untuk UMKM dengan katalog produk terbatas dan pemesanan langsung via WhatsApp.",
    frame: "grid2",
    demoUrl: "https://webside.id/demo/warung",
  },
  {
    slug: "kantor",
    name: "Kantor",
    category: "company-profile",
    categoryLabel: "Company Profile",
    price: "Rp 849.000",
    priceShort: "Rp 849rb",
    priceValue: 849000,
    popularity: 68,
    desc: "Untuk perusahaan jasa atau konsultan — halaman layanan terperinci, studi kasus, dan formulir kontak yang jelas.",
    frame: "grid2",
    demoUrl: "https://webside.id/demo/kantor",
  },
  {
    slug: "luncur",
    name: "Luncur",
    category: "landing-page",
    categoryLabel: "Landing Page",
    price: "Rp 399.000",
    priceShort: "Rp 399rb",
    priceValue: 399000,
    popularity: 82,
    desc: "Landing page ringkas untuk webinar, event, atau pre-order — hitung mundur, formulir pendaftaran, dan FAQ singkat.",
    frame: "hero-btn",
    demoUrl: "https://webside.id/demo/luncur",
  },
  {
    slug: "sinau",
    name: "Sinau",
    category: "blog",
    categoryLabel: "Blog & Media",
    price: "Rp 549.000",
    priceShort: "Rp 549rb",
    priceValue: 549000,
    popularity: 58,
    desc: "Platform konten edukasi atau newsletter — arsip artikel, halaman author, dan fitur berlangganan email terintegrasi.",
    frame: "blog2",
    demoUrl: "https://webside.id/demo/sinau",
  },
  {
    slug: "metro",
    name: "Metro",
    category: "company-profile",
    categoryLabel: "Company Profile",
    price: "Rp 749.000",
    priceShort: "Rp 749rb",
    priceValue: 749000,
    popularity: 74,
    desc: "Company profile modern bergaya kota — cocok untuk startup, agensi digital, atau brand lifestyle yang ingin terlihat bold.",
    frame: "hero3",
    demoUrl: "https://webside.id/demo/metro",
  },
  {
    slug: "kios",
    name: "Kios",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    price: "Rp 899.000",
    priceShort: "Rp 899rb",
    priceValue: 899000,
    popularity: 70,
    desc: "Toko digital untuk produk digital seperti ebook, preset, atau template — unduhan otomatis setelah pembayaran.",
    frame: "shop",
    demoUrl: "https://webside.id/demo/kios",
  },
];

export const WHATSAPP_NUMBER = "6281234567890";
