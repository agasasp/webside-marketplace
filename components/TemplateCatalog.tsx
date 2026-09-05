"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import BrowserFrame from "./BrowserFrame";
import { IconCheck, IconClose } from "./icons";
import { filters, templates, WHATSAPP_NUMBER, type WebTemplate } from "@/lib/templates";

const PAGE_SIZE = 9;

type SortOption = "terpopuler" | "harga-terendah" | "harga-tertinggi" | "terbaru";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Terpopuler", value: "terpopuler" },
  { label: "Harga Terendah", value: "harga-terendah" },
  { label: "Harga Tertinggi", value: "harga-tertinggi" },
  { label: "Terbaru", value: "terbaru" },
];

// category counts
const categoryCounts = filters.reduce<Record<string, number>>((acc, f) => {
  acc[f.value] = f.value === "semua"
    ? templates.length
    : templates.filter((t) => t.category === f.value).length;
  return acc;
}, {});

function formatPrice(val: number) {
  return "Rp " + val.toLocaleString("id-ID");
}

function Modal({ tpl, onClose }: { tpl: WebTemplate; onClose: () => void }) {
  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const waHref = () => {
    const msg = encodeURIComponent(
      `Halo Webside, saya tertarik dengan template "${tpl.name}" (${tpl.price}). Boleh minta info lebih lanjut?`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  return createPortal(
    <div
      className="modal-overlay open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="modal-head">
          <div>
            <div className="template-card__cat">{tpl.categoryLabel}</div>
            <h3 id="modalTitle" style={{ marginTop: 6, fontSize: "1.4rem" }}>{tpl.name}</h3>
          </div>
          <button className="modal-close" aria-label="Tutup" onClick={onClose}>
            <IconClose />
          </button>
        </div>
        <div className="modal-body">
          <BrowserFrame url={`webside.id/template/${tpl.slug}`} frame={tpl.frame} />
          <p style={{ color: "var(--ink-soft)", fontSize: "0.95rem" }}>{tpl.desc}</p>
          <ul className="modal-features">
            <li><IconCheck /> Desain responsif untuk mobile, tablet, dan desktop</li>
            <li><IconCheck /> Kustomisasi warna, font, dan konten disertakan</li>
            <li><IconCheck /> Panduan pemasangan domain &amp; hosting</li>
          </ul>
          <div style={{ marginTop: 14, fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink)" }}>
            {tpl.price}
          </div>
          <div className="modal-actions">
            {tpl.demoUrl && (
              <a href={tpl.demoUrl} className="btn btn-outline" target="_blank" rel="noopener">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M2 7.5a5.5 5.5 0 1 0 11 0 5.5 5.5 0 0 0-11 0Zm5.5-2.5v5m-2.5-2.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                View Demo
              </a>
            )}
            <a href={waHref()} className="btn btn-accent" target="_blank" rel="noopener">
              Tanya via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function TemplateCatalog() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["value"]>("semua");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("terpopuler");
  const [sortOpen, setSortOpen] = useState(false);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [page, setPage] = useState(1);
  const [modalTpl, setModalTpl] = useState<WebTemplate | null>(null);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [displayedTemplates, setDisplayedTemplates] = useState(templates);
  const gridRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (modalTpl) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => { document.documentElement.style.overflow = ""; };
  }, [modalTpl]);

  // close sort dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const computeFiltered = useCallback(() => {
    const minVal = priceMin ? parseInt(priceMin.replace(/\D/g, ""), 10) : 0;
    const maxVal = priceMax ? parseInt(priceMax.replace(/\D/g, ""), 10) : Infinity;
    const q = search.trim().toLowerCase();

    return templates
      .filter((t) => activeFilter === "semua" || t.category === activeFilter)
      .filter((t) => !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.categoryLabel.toLowerCase().includes(q))
      .filter((t) => t.priceValue >= minVal && t.priceValue <= maxVal)
      .sort((a, b) => {
        switch (sort) {
          case "harga-terendah":  return a.priceValue - b.priceValue;
          case "harga-tertinggi": return b.priceValue - a.priceValue;
          case "terbaru":         return templates.indexOf(b) - templates.indexOf(a);
          default:                return b.popularity - a.popularity;
        }
      });
  }, [activeFilter, search, sort, priceMin, priceMax]);

  const applyFilters = useCallback((resetPage = true) => {
    if (animating) return;
    setAnimating(true);

    if (gridRef.current) gridRef.current.classList.add("tpl-grid--exit");

    setTimeout(() => {
      const result = computeFiltered();
      setDisplayedTemplates(result);
      if (resetPage) setPage(1);

      if (gridRef.current) {
        gridRef.current.classList.remove("tpl-grid--exit");
        gridRef.current.classList.add("tpl-grid--enter");
      }

      setTimeout(() => {
        if (gridRef.current) gridRef.current.classList.remove("tpl-grid--enter");
        setAnimating(false);
      }, 500);
    }, 200);
  }, [animating, computeFiltered]);

  // re-filter whenever deps change
  useEffect(() => {
    applyFilters(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, search, sort, priceMin, priceMax]);

  const totalPages = Math.ceil(displayedTemplates.length / PAGE_SIZE);
  const pageItems = displayedTemplates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (next: number, buttonEl?: HTMLButtonElement) => {
    if (next === page || next < 1 || next > totalPages) return;
    // blur the clicked button first so browser doesn't fight scrollTo
    // with its own "keep focused element in view" behaviour
    buttonEl?.blur();
    setPage(next);
    // defer scroll slightly so React re-render + browser paint finish first
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const activeSort = sortOptions.find((o) => o.value === sort)!;

  const hasActiveFilters = search || priceMin || priceMax || sort !== "terpopuler";

  const clearAll = () => {
    setSearch("");
    setPriceMin("");
    setPriceMax("");
    setSort("terpopuler");
  };

  return (
    <>
      {/* ---- CATEGORY FILTER PILLS ---- */}
      <div className="filter-row" role="group" aria-label="Filter kategori template">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-pill${activeFilter === f.value ? " active" : ""}`}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
            <span className="filter-pill__count">{categoryCounts[f.value]}</span>
          </button>
        ))}
      </div>

      {/* ---- SEARCH + SORT + PRICE ROW ---- */}
      <div className="tpl-toolbar">
        {/* search */}
        <div className="tpl-search">
          <svg className="tpl-search__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6"/>
            <path d="m11 11 2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <input
            type="search"
            className="tpl-search__input"
            placeholder="Cari template..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Cari template"
          />
          {search && (
            <button className="tpl-search__clear" onClick={() => setSearch("")} aria-label="Hapus pencarian">
              <IconClose />
            </button>
          )}
        </div>

        {/* price range */}
        <div className="tpl-price-range">
          <span className="tpl-price-range__label">Harga</span>
          <input
            type="text"
            className="tpl-price-input"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            aria-label="Harga minimum"
          />
          <span className="tpl-price-range__sep">—</span>
          <input
            type="text"
            className="tpl-price-input"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            aria-label="Harga maksimum"
          />
        </div>

        {/* sort dropdown */}
        <div className="tpl-sort" ref={sortRef}>
          <button
            className={`tpl-sort__btn${sortOpen ? " open" : ""}`}
            onClick={() => setSortOpen((v) => !v)}
            aria-expanded={sortOpen}
            aria-haspopup="listbox"
          >
            <span>Urutkan: <strong>{activeSort.label}</strong></span>
            <svg className="tpl-sort__caret" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {sortOpen && (
            <ul className="tpl-sort__menu" role="listbox" aria-label="Pilihan urutan">
              {sortOptions.map((o) => (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={sort === o.value}
                  className={`tpl-sort__option${sort === o.value ? " selected" : ""}`}
                  onClick={() => { setSort(o.value); setSortOpen(false); }}
                >
                  {o.label}
                  {sort === o.value && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* clear button */}
        {hasActiveFilters && (
          <button className="tpl-clear-btn" onClick={clearAll}>
            Reset
          </button>
        )}
      </div>

      {/* ---- RESULTS META ---- */}
      <div className="tpl-meta">
        <span>
          {displayedTemplates.length === 0
            ? "Tidak ada template ditemukan"
            : `${displayedTemplates.length} template ditemukan`}
        </span>
        {totalPages > 1 && (
          <span>Halaman {page} dari {totalPages}</span>
        )}
      </div>

      {/* ---- GRID ---- */}
      {displayedTemplates.length === 0 ? (
        <div className="tpl-empty">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="22" cy="22" r="14" stroke="var(--line-strong)" strokeWidth="2.5"/>
            <path d="m32 32 8 8" stroke="var(--line-strong)" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M17 22h10M22 17v10" stroke="var(--accent-soft-line)" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <p>Tidak ada template yang cocok dengan filter kamu.</p>
          <button className="btn btn-outline btn-sm" onClick={clearAll}>Reset Filter</button>
        </div>
      ) : (
        <div ref={gridRef} className="template-grid tpl-grid--init" style={{ paddingBottom: 48 }}>
          {pageItems.map((tpl, i) => (
            <article
              className="template-card tpl-card"
              key={tpl.slug}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setModalTpl(tpl)}
            >
              <div className="tpl-card__frame-wrap">
                <BrowserFrame url={`webside.id/template/${tpl.slug}`} frame={tpl.frame} />
                <div className="tpl-card__overlay">
                  <span className="tpl-card__overlay-btn">Lihat Detail</span>
                </div>
                {tpl.popularity >= 85 && (
                  <span className="tpl-card__badge">Populer</span>
                )}
              </div>
              <div className="template-card__meta">
                <div>
                  <div className="template-card__name">{tpl.name}</div>
                  <div className="template-card__cat">{tpl.categoryLabel}</div>
                </div>
                <div className="template-card__price">{tpl.priceShort}</div>
              </div>
              <div className="template-card__actions">
                <button
                  className="btn btn-outline btn-sm btn-block"
                  onClick={(e) => { e.stopPropagation(); setModalTpl(tpl); }}
                >
                  Lihat Detail
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ---- PAGINATION ---- */}
      {totalPages > 1 && (
        <div className="tpl-pagination" aria-label="Navigasi halaman">
          <button
            className="tpl-page-btn tpl-page-btn--arrow"
            onClick={(e) => handlePageChange(page - 1, e.currentTarget)}
            disabled={page === 1}
            aria-label="Halaman sebelumnya"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            // show first, last, and pages near current
            const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
            const isEllipsisBefore = p === page - 2 && page - 2 > 1;
            const isEllipsisAfter  = p === page + 2 && page + 2 < totalPages;

            if (isEllipsisBefore || isEllipsisAfter) {
              return <span key={p} className="tpl-page-ellipsis">…</span>;
            }
            if (!show) return null;
            return (
              <button
                key={p}
                className={`tpl-page-btn${page === p ? " active" : ""}`}
                onClick={(e) => handlePageChange(p, e.currentTarget)}
                aria-current={page === p ? "page" : undefined}
              >
                {p}
              </button>
            );
          })}

          <button
            className="tpl-page-btn tpl-page-btn--arrow"
            onClick={(e) => handlePageChange(page + 1, e.currentTarget)}
            disabled={page === totalPages}
            aria-label="Halaman berikutnya"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {mounted && modalTpl && (
        <Modal tpl={modalTpl} onClose={() => setModalTpl(null)} />
      )}
    </>
  );
}
