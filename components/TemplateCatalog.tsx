"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BrowserFrame from "./BrowserFrame";
import { IconCheck, IconClose } from "./icons";
import { filters, templates, WHATSAPP_NUMBER, type WebTemplate } from "@/lib/templates";

export default function TemplateCatalog() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["value"]>("semua");
  const [modalTpl, setModalTpl] = useState<WebTemplate | null>(null);

  // lock scroll saat modal terbuka
  useEffect(() => {
    if (modalTpl) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalTpl]);

  const visible = templates.filter((t) => activeFilter === "semua" || t.category === activeFilter);

  const waHref = (tpl: WebTemplate) => {
    const msg = encodeURIComponent(
      `Halo Webside, saya tertarik dengan template "${tpl.name}" (${tpl.price}). Boleh minta info lebih lanjut?`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  return (
    <>
      <div className="filter-row" role="group" aria-label="Filter kategori template">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-pill${activeFilter === f.value ? " active" : ""}`}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="template-grid" style={{ paddingBottom: 100 }}>
        {visible.map((tpl) => (
          <article className="template-card" key={tpl.slug}>
            <BrowserFrame url={`webside.id/template/${tpl.slug}`} frame={tpl.frame} />
            <div className="template-card__meta">
              <div>
                <div className="template-card__name">{tpl.name}</div>
                <div className="template-card__cat">{tpl.categoryLabel}</div>
              </div>
              <div className="template-card__price">{tpl.priceShort}</div>
            </div>
            <div className="template-card__actions">
              <button className="btn btn-outline btn-sm btn-block" onClick={() => setModalTpl(tpl)}>
                Lihat Detail
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ---------- MODAL: Detail Template ---------- */}
      <div className={`modal-overlay${modalTpl ? " open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setModalTpl(null); }}>
        {modalTpl && (
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <div className="modal-head">
              <div>
                <div className="template-card__cat">{modalTpl.categoryLabel}</div>
                <h3 id="modalTitle" style={{ marginTop: 6, fontSize: "1.4rem" }}>
                  {modalTpl.name}
                </h3>
              </div>
              <button className="modal-close" aria-label="Tutup" onClick={() => setModalTpl(null)}>
                <IconClose />
              </button>
            </div>
            <div className="modal-body">
              <BrowserFrame url={`webside.id/template/${modalTpl.slug}`} frame={modalTpl.frame} />
              <p style={{ color: "var(--ink-soft)", fontSize: "0.95rem" }}>{modalTpl.desc}</p>
              <ul className="modal-features">
                <li><IconCheck /> Desain responsif untuk mobile, tablet, dan desktop</li>
                <li><IconCheck /> Kustomisasi warna, font, dan konten disertakan</li>
                <li><IconCheck /> Panduan pemasangan domain &amp; hosting</li>
              </ul>
              <div style={{ marginTop: 14, fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink)" }}>
                {modalTpl.price}
              </div>
              <div className="modal-actions">
                {modalTpl.demoUrl && (
                  <a
                    href={modalTpl.demoUrl}
                    className="btn btn-outline"
                    target="_blank"
                    rel="noopener"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                      <path d="M2 7.5a5.5 5.5 0 1 0 11 0 5.5 5.5 0 0 0-11 0Zm5.5-2.5v5m-2.5-2.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    View Demo
                  </a>
                )}
                <a href={waHref(modalTpl)} className="btn btn-accent" target="_blank" rel="noopener">
                  Tanya via WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
