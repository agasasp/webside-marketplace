import Link from "next/link";
import Reveal from "@/components/Reveal";
import BrowserFrame from "@/components/BrowserFrame";
import { templates } from "@/lib/templates";
import { IconPlus, IconTemplate, IconCustom, IconDev, IconSupport } from "@/components/icons";

const trustChips = [
  "UMKM",
  "Startup",
  "F&B",
  "Fashion",
  "Personal Brand",
  "Agency",
  "Retail",
  "Jasa & Konsultan",
];

const processSteps = [
  {
    num: "01",
    title: "Konsultasi",
    desc: "Ceritakan kebutuhan dan gaya brand kamu — via WhatsApp atau form kontak.",
  },
  {
    num: "02",
    title: "Pilih Arah",
    desc: "Pakai template katalog kami, atau mulai desain custom dari nol.",
  },
  {
    num: "03",
    title: "Kustomisasi",
    desc: "Kami sesuaikan konten, warna, dan fitur sampai kamu setuju hasilnya.",
  },
  {
    num: "04",
    title: "Peluncuran",
    desc: "Website naik, kamu dapat pendampingan untuk update dan maintenance.",
  },
];

const featured = templates.filter((t) => ["lumina", "folio", "pasar"].includes(t.slug));

export default function HomePage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero-dark">
        <div className="container hero-dark__inner">
          <span className="eyebrow hero-anim hero-anim--1">Studio Website — Sejak 2026</span>
          <h1 className="hero-dark__title hero-anim hero-anim--2">
            Website custom, <em>tanpa drama.</em>
          </h1>
          <p className="hero-dark__sub hero-anim hero-anim--3">
            Webside merancang dan membangun website untuk brand, studio, dan bisnis kamu — pilih dari template siap
            pakai, atau kami bangun dari nol sesuai kebutuhan.
          </p>
          <div className="hero-dark__actions hero-anim hero-anim--4">
            <Link href="/template" className="btn btn-accent">
              Lihat Template
              <span className="btn-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
            <Link href="/kontak" className="btn btn-outline-light">
              Konsultasi Gratis
            </Link>
          </div>
        </div>

        <div className="container hero-visual-wrap">
          <span className="hero-badge b1">
            <IconPlus />
            Desain
          </span>
          <span className="hero-badge b2">
            <IconPlus />
            Development
          </span>
          <span className="hero-badge b3">
            <IconPlus />
            Peluncuran
          </span>

          <div className="browser-frame dark">
            <div className="browser-frame__bar">
              <div className="browser-frame__dots">
                <span />
                <span />
                <span />
              </div>
              <div className="browser-frame__url">webside.id/nama-brand-kamu</div>
            </div>
            <div className="browser-frame__body">
              <div className="wf-nav">
                <div className="wf-dot" />
                <div className="wf-line w-30" />
                <div className="wf-line w-30" style={{ marginLeft: "auto" }} />
              </div>
              <div className="wf-hero-block" style={{ height: 80 }} />
              <div className="wf-line w-60" />
              <div className="wf-line w-40" />
              <div className="wf-btn" />
              <div className="wf-grid">
                <div className="wf-card" />
                <div className="wf-card" />
                <div className="wf-card" />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-trust">
          <div className="container">
            <p>
              <strong>120+ website</strong> sudah kami luncurkan untuk berbagai jenis bisnis di Indonesia
            </p>
            <div className="marquee">
              <div className="marquee__track">
                {[...trustChips, ...trustChips, ...trustChips, ...trustChips].map((chip, i) => (
                  <span className="marquee__chip" key={i}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section>
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Layanan</span>
            <h2>Satu studio, semua kebutuhan website kamu.</h2>
            <p>
              Dari beli template dan tinggal pakai, sampai desain penuh dari nol — kami sesuaikan dengan budget dan
              timeline kamu.
            </p>
          </Reveal>

          <Reveal className="services-grid" stagger>
            <div className="service-card">
              <div className="service-icon">
                <IconTemplate />
              </div>
              <h3>Template Siap Pakai</h3>
              <p>
                Pilih dari katalog template, kami bantu sesuaikan warna, konten, dan logo — website siap online dalam
                hitungan hari.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <IconCustom />
              </div>
              <h3>Desain Custom</h3>
              <p>
                Dibangun dari nol mengikuti identitas brand kamu — struktur, tone, dan interaksi dirancang khusus,
                bukan template modifikasi.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <IconDev />
              </div>
              <h3>Development &amp; Integrasi</h3>
              <p>Fitur khusus, CMS agar konten mudah diupdate sendiri, integrasi pembayaran, hingga toko online.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <IconSupport />
              </div>
              <h3>Maintenance &amp; Support</h3>
              <p>Pendampingan setelah website live — update rutin, backup, dan bantuan teknis saat kamu butuh.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="bg-alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Cara Kerja</span>
            <h2>Dari obrolan pertama sampai website live.</h2>
          </Reveal>
          <Reveal className="process-list" stagger>
            {processSteps.map((step) => (
              <div className="process-item" key={step.num}>
                <div className="process-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= FEATURED TEMPLATES ================= */}
      <section>
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Template Populer</span>
            <h2>Beberapa favorit dari katalog kami.</h2>
          </Reveal>

          <Reveal className="template-grid" stagger>
            {featured.map((tpl) => (
              <article className="template-card" key={tpl.slug}>
                <BrowserFrame url={`webside.id/template/${tpl.slug}`} frame={tpl.frame} />
                <div className="template-card__meta">
                  <div>
                    <div className="template-card__name">{tpl.name}</div>
                    <div className="template-card__cat">{tpl.categoryLabel}</div>
                  </div>
                  <div className="template-card__price">{tpl.priceShort}</div>
                </div>
              </article>
            ))}
          </Reveal>

          <div style={{ textAlign: "center", marginTop: 44 }} className="reveal in">
            <Link href="/template" className="btn btn-primary">
              Lihat Semua Template
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Kata Klien</span>
            <h2>Dipakai oleh brand yang serius sama tampilannya.</h2>
          </Reveal>
          <Reveal className="testi-grid">
            <div className="testi-card">
              <p className="testi-quote">
                Prosesnya cepat banget, dari pilih template sampai website naik cuma seminggu. Revisi juga responsif.
              </p>
              <div className="testi-person">
                <div className="testi-avatar">RA</div>
                <div>
                  <div className="testi-name">Raka Aditya</div>
                  <div className="testi-role">Owner, Kopi Sedaya</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <p className="testi-quote">
                Kami butuh sesuatu yang beda dari template pasaran, dan tim Webside berhasil menerjemahkan brand kami
                dengan pas.
              </p>
              <div className="testi-person">
                <div className="testi-avatar">SN</div>
                <div>
                  <div className="testi-name">Sri Nuraini</div>
                  <div className="testi-role">Founder, Studio Anyar</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <p className="testi-quote">
                Support after-launch-nya jadi nilai plus. Ada saja yang mau diubah tiap bulan, dan selalu dibantu
                tanpa ribet.
              </p>
              <div className="testi-person">
                <div className="testi-avatar">DP</div>
                <div>
                  <div className="testi-name">Dimas Prasetyo</div>
                  <div className="testi-role">Marketing Lead, Ruang Kerja</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section>
        <div className="container">
          <Reveal className="cta-band">
            <div>
              <h2>Siap punya website baru?</h2>
              <p>Ceritakan kebutuhan kamu, kami bantu carikan arah yang paling pas — template atau custom.</p>
            </div>
            <Link href="/kontak" className="btn btn-accent">
              Mulai Sekarang
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
