import type { Metadata } from "next";
import Link from "next/link";
import TemplateCatalog from "@/components/TemplateCatalog";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Template — Webside",
  description:
    "Katalog template website siap pakai dari Webside — company profile, landing page, e-commerce, portfolio, dan blog.",
};

export default function TemplatePage() {
  return (
    <>
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">Katalog Template</span>
          <h1>Pilih template, kami bantu sesuaikan.</h1>
          <p>
            Semua template sudah termasuk kustomisasi warna, konten, dan logo. Klik &quot;Lihat Detail&quot; untuk
            fitur lengkap, atau langsung tanya lewat WhatsApp.
          </p>
        </div>

        <TemplateCatalog />
      </div>

      {/* ================= CTA: custom design ================= */}
      <section className="" style={{ paddingTop: 0, paddingBottom: 96 }}>
        <div className="container">
          <Reveal className="cta-band">
            <div>
              <h2>Nggak nemu yang cocok?</h2>
              <p>Kami bisa buatkan desain custom dari nol, mengikuti identitas brand kamu sepenuhnya.</p>
            </div>
            <Link href="/kontak" className="btn btn-accent">
              Diskusikan Desain Custom
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
