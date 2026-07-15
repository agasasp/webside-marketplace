import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { WHATSAPP_NUMBER } from "@/lib/templates";
import { IconMail, IconPhone, IconPin, IconInstagram, IconLinkedin, IconTiktok } from "@/components/icons";

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
    <div className="container">
      <div className="page-header">
        <span className="eyebrow">Kontak</span>
        <h1>Yuk, mulai obrolan tentang website kamu.</h1>
        <p>Ceritakan kebutuhan kamu lewat form, atau langsung chat via WhatsApp untuk respon lebih cepat.</p>
      </div>

      <section style={{ paddingTop: 40 }}>
        <div className="contact-grid">
          {/* ---------- INFO ---------- */}
          <div>
            <div className="contact-info">
              <h3>Studio Webside</h3>
              <p>Senin–Jumat, 09.00–18.00 WIB. Di luar jam tersebut, tinggalkan pesan dan kami balas keesokan harinya.</p>
              <ul className="contact-list">
                <li>
                  <div className="icon-box">
                    <IconMail />
                  </div>
                  <div>
                    <div className="label">Email</div>
                    <div className="value">halo@webside.id</div>
                  </div>
                </li>
                <li>
                  <div className="icon-box">
                    <IconPhone />
                  </div>
                  <div>
                    <div className="label">WhatsApp</div>
                    <div className="value">+62 812-3456-7890</div>
                  </div>
                </li>
                <li>
                  <div className="icon-box">
                    <IconPin />
                  </div>
                  <div>
                    <div className="label">Studio</div>
                    <div className="value">Jl. Kemang Raya, Jakarta Selatan</div>
                  </div>
                </li>
              </ul>
              <div className="contact-socials">
                <a href="#" aria-label="Instagram">
                  <IconInstagram />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <IconLinkedin />
                </a>
                <a href="#" aria-label="TikTok">
                  <IconTiktok />
                </a>
              </div>
            </div>

            <div className="hours-card">
              <div className="hours-row">
                <span>Senin – Jumat</span>
                <span>09.00 – 18.00</span>
              </div>
              <div className="hours-row">
                <span>Sabtu</span>
                <span>10.00 – 15.00</span>
              </div>
              <div className="hours-row">
                <span>Minggu &amp; libur</span>
                <span>Tutup</span>
              </div>
            </div>

            <a href={waHref} target="_blank" rel="noopener" className="btn btn-accent btn-block" style={{ marginTop: 24 }}>
              Chat via WhatsApp
            </a>
          </div>

          {/* ---------- FORM ---------- */}
          <ContactForm />
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
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
  );
}
