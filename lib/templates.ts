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
  desc: string;
  frame: "hero3" | "hero-btn" | "shop" | "portfolio2" | "blog2" | "grid2";
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
    desc: "Cocok untuk profil perusahaan atau studio yang ingin tampil rapi dan profesional, lengkap dengan halaman layanan dan tim.",
    frame: "hero3",
  },
  {
    slug: "cepat",
    name: "Cepat",
    category: "landing-page",
    categoryLabel: "Landing Page",
    price: "Rp 449.000",
    priceShort: "Rp 449rb",
    desc: "Landing page satu halaman untuk peluncuran produk atau campaign — fokus ke satu ajakan bertindak, ringan dan cepat diakses.",
    frame: "hero-btn",
  },
  {
    slug: "pasar",
    name: "Pasar",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    price: "Rp 1.200.000",
    priceShort: "Rp 1.2jt",
    desc: "Toko online lengkap dengan katalog produk, keranjang, dan integrasi pembayaran — siap jualan begitu domain aktif.",
    frame: "shop",
  },
  {
    slug: "folio",
    name: "Folio",
    category: "portfolio",
    categoryLabel: "Portfolio",
    price: "Rp 649.000",
    priceShort: "Rp 649rb",
    desc: "Portofolio visual untuk kreator, fotografer, atau desainer — grid galeri besar yang membiarkan karya kamu jadi pusat perhatian.",
    frame: "portfolio2",
  },
  {
    slug: "rilis",
    name: "Rilis",
    category: "blog",
    categoryLabel: "Blog & Media",
    price: "Rp 599.000",
    priceShort: "Rp 599rb",
    desc: 'Untuk blog atau media kecil — daftar artikel yang jelas, halaman kategori, dan tampilan baca yang nyaman di mobile.',
    frame: "blog2",
  },
  {
    slug: "atelier",
    name: "Atelier",
    category: "portfolio",
    categoryLabel: "Portfolio",
    price: "Rp 699.000",
    priceShort: "Rp 699rb",
    desc: "Nuansa studio seni untuk arsitek, ilustrator, atau desainer interior — layout tenang dengan penekanan pada tipografi.",
    frame: "hero-btn",
  },
  {
    slug: "warung",
    name: "Warung",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    price: "Rp 999.000",
    priceShort: "Rp 999rb",
    desc: "Versi ringkas dari Pasar — pas untuk UMKM dengan katalog produk terbatas dan pemesanan langsung via WhatsApp.",
    frame: "grid2",
  },
  {
    slug: "kantor",
    name: "Kantor",
    category: "company-profile",
    categoryLabel: "Company Profile",
    price: "Rp 849.000",
    priceShort: "Rp 849rb",
    desc: "Untuk perusahaan jasa atau konsultan — halaman layanan terperinci, studi kasus, dan formulir kontak yang jelas.",
    frame: "grid2",
  },
  {
    slug: "luncur",
    name: "Luncur",
    category: "landing-page",
    categoryLabel: "Landing Page",
    price: "Rp 399.000",
    priceShort: "Rp 399rb",
    desc: "Landing page ringkas untuk webinar, event, atau pre-order — hitung mundur, formulir pendaftaran, dan FAQ singkat.",
    frame: "hero-btn",
  },
];

export const WHATSAPP_NUMBER = "6281234567890";
