import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { WHATSAPP_NUMBER } from "@/lib/templates";
import { IconMail, IconPhone, IconPin } from "@/components/icons";

export const metadata: Metadata = {
  title: "Kontak — Webside",
  description: "Hubungi Webside untuk konsultasi gratis — beli template, desain custom, atau tanya soal maintenance website.",
};

const faqs = [
  {
    q: "Apakah harga template sudah termasuk domain dan hosting?",
    a: "Belum. Harga template mencakup desain dan kustomisasi konten. Domain dan hosting bisa kami bantu carikan, atau kamu pakai penyedia yang sudah ada.",
  },
  {
    q: "Berapa lama proses kustomisasi template?",
    a: "Rata-rata 3–7 hari kerja tergantung jumlah revisi dan kelengkapan konten yang kamu berikan di awal.",
  },
  {
    q: "Bisa request desain custom yang beda dari katalog?",
    a: "Bisa. Ceritakan referensi dan kebutuhan kamu lewat form atau WhatsApp, nanti tim kami buatkan penawaran desain custom.",
  },
  {
    q: "Metode pembayaran apa saja yang tersedia?",
    a: "Transfer bank dan QRIS. Untuk proyek custom, pembayaran dibagi dua tahap: uang muka di awal dan pelunasan sebelum website live.",
  },
];

export default function KontakPage() {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Halo Webside, saya ingin tanya soal website."
  )}`;

  return (
    <>
      {/* ══════════════════════════════════════
          HERO HEADER
      ══════════════════════════════════════ */}
      <div className="kontak-hero">
        <div className="container">
          <div className="kontak-hero__inner">
            {/* left: text + stats */}
            <div className="kontak-hero__left">
              <span className="eyebrow">Kontak</span>
              <h1 className="kontak-hero__title">
                Yuk, mulai obrolan<br />tentang website kamu.
              </h1>
              <p className="kontak-hero__sub">
                Isi kebutuhan kamu di form, langsung terhubung ke WhatsApp — tim kami akan balas dengan respon yang sudah disiapkan.
              </p>
              <div className="kontak-hero__stats">
                <div className="kontak-stat">
                  <span className="kontak-stat__num">120+</span>
                  <span className="kontak-stat__label">Website diluncurkan</span>
                </div>
                <div className="kontak-stat">
                  <span className="kontak-stat__num">&lt;1 Jam</span>
                  <span className="kontak-stat__label">Rata-rata respon</span>
                </div>
                <div className="kontak-stat">
                  <span className="kontak-stat__num">4.9/5</span>
                  <span className="kontak-stat__label">Rating klien</span>
                </div>
              </div>
            </div>

            {/* right: WA chat mockup */}
            <div className="kontak-hero__right" aria-hidden="true">
              <div className="wa-mockup">
                <div className="wa-mockup__bar">
                  <div className="wa-mockup__avatar" />
                  <div>
                    <div className="wa-mockup__name">+62 812-****-****</div>
                    <div className="wa-mockup__status">online</div>
                  </div>
                </div>
                <div className="wa-mockup__body">
                  <div className="wa-bubble wa-bubble--out">
                    Halo, butuh website company profile untuk usaha katering 😊
                  </div>
                  <div className="wa-bubble wa-bubble--in">
                    Halo! Boleh cerita sedikit soal brand kamu? Nanti kami kirimkan template custom yang sesuai 🙌
                  </div>
                  <div className="wa-mockup__typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN GRID — form + info
      ══════════════════════════════════════ */}
      <div className="container">
        <div className="kontak-grid">
          {/* ── FORM (left) ── */}
          <ContactForm />

          {/* ── INFO (right) ── */}
          <div className="kontak-info-col">
            {/* studio card */}
            <div className="kontak-studio-card">
              <p className="kontak-studio-card__label">Studio</p>
              <p className="kontak-studio-card__name">Studio Webside</p>
              <ul className="kontak-studio-list">
                <li>
                  <span className="kontak-studio-icon"><IconMail /></span>
                  <div>
                    <div className="kontak-studio-item__label">Email</div>
                    <div className="kontak-studio-item__value">halo@webside.id</div>
                  </div>
                </li>
                <li>
                  <span className="kontak-studio-icon"><IconPhone /></span>
                  <div>
                    <div className="kontak-studio-item__label">WhatsApp</div>
                    <div className="kontak-studio-item__value">+62 812-1396-0183</div>
                  </div>
                </li>
                <li>
                  <span className="kontak-studio-icon"><IconPin /></span>
                  <div>
                    <div className="kontak-studio-item__label">Studio</div>
                    <div className="kontak-studio-item__value">Jl. Kemang Raya, Jakarta Selatan</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* map placeholder */}
            <div className="kontak-map">
              <div className="kontak-map__pin">
                <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
                  <path d="M14 0C6.27 0 0 6.27 0 14c0 9.625 14 22 14 22S28 23.625 28 14C28 6.27 21.73 0 14 0z" fill="var(--accent)"/>
                  <circle cx="14" cy="14" r="5" fill="#fff"/>
                </svg>
              </div>
            </div>

            {/* hours */}
            <div className="kontak-hours">
              <p className="kontak-hours__title">Jam Operasional</p>
              <div className="kontak-hours__row">
                <span>Senin – Jumat</span>
                <span>09.00 – 18.00</span>
              </div>
              <div className="kontak-hours__row">
                <span>Sabtu</span>
                <span>10.00 – 15.00</span>
              </div>
              <div className="kontak-hours__row">
                <span>Minggu &amp; libur</span>
                <span className="kontak-hours__closed">Tutup</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <section>
          <Reveal className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Pertanyaan yang sering ditanyakan.</h2>
          </Reveal>
          <Reveal className="faq-list">
            {faqs.map((faq) => (
              <details className="faq-item" key={faq.q}>
                <summary>
                  {faq.q} <span className="plus" />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </Reveal>
        </section>
      </div>
    </>
  );
}
