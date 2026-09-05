"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  posts,
  postCategories,
  formatDate,
  type BlogPost,
  type PostCategory,
} from "@/lib/posts";

const PAGE_SIZE = 10;
const WHATSAPP_NUMBER = "6281234567890";

const categoryCounts = postCategories.reduce<Record<string, number>>((acc, c) => {
  acc[c.value] =
    c.value === "semua"
      ? posts.length
      : posts.filter((p) => p.category === c.value).length;
  return acc;
}, {});

export default function BlogCatalog() {
  const [activeCategory, setActiveCategory] =
    useState<"semua" | PostCategory>("semua");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState<BlogPost[]>(posts);
  const [animating, setAnimating] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const computeFiltered = useCallback(() => {
    const q = search.trim().toLowerCase();
    return posts
      .filter((p) => activeCategory === "semua" || p.category === activeCategory)
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
  }, [activeCategory, search]);

  useEffect(() => {
    if (animating) return;
    setAnimating(true);
    if (listRef.current) listRef.current.classList.add("blog-list--exit");

    setTimeout(() => {
      const result = computeFiltered();
      setFiltered(result);
      setPage(1);

      if (listRef.current) {
        listRef.current.classList.remove("blog-list--exit");
        listRef.current.classList.add("blog-list--enter");
      }
      setTimeout(() => {
        if (listRef.current) listRef.current.classList.remove("blog-list--enter");
        setAnimating(false);
      }, 400);
    }, 180);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (next: number, btn?: HTMLButtonElement) => {
    if (next === page || next < 1 || next > totalPages) return;
    btn?.blur();
    setPage(next);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const waHref = encodeURIComponent(
    "Halo Webside, saya ingin konsultasi gratis soal kebutuhan website saya."
  );

  return (
    <div className="blog-layout">
      {/* ── SIDEBAR ── */}
      <aside className="blog-sidebar">
        <div className="blog-sidebar__section">
          <span className="blog-sidebar__label">Kategori</span>
          <ul className="blog-cat-list">
            {postCategories.map((c) => (
              <li key={c.value}>
                <button
                  className={`blog-cat-btn${activeCategory === c.value ? " active" : ""}`}
                  onClick={() => setActiveCategory(c.value)}
                >
                  <span>{c.label}</span>
                  <span className="blog-cat-btn__count">
                    {categoryCounts[c.value]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="blog-cta-card">
          <p className="blog-cta-card__title">Butuh website custom?</p>
          <p className="blog-cta-card__body">
            Konsultasi gratis 30 menit dengan tim kami — bahas kebutuhan dan
            budget kamu.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waHref}`}
            className="btn btn-primary btn-sm btn-block"
            target="_blank"
            rel="noopener"
          >
            Konsultasi Gratis
          </a>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="blog-main">
        {/* toolbar */}
        <div className="blog-toolbar">
          <span className="blog-toolbar__count">{filtered.length} artikel</span>
          <div className="blog-search">
            <svg
              className="blog-search__icon"
              width="15" height="15" viewBox="0 0 15 15" fill="none"
              aria-hidden="true"
            >
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m10 10 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              className="blog-search__input"
              placeholder="Cari artikel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Cari artikel"
            />
            {search && (
              <button
                className="blog-search__clear"
                onClick={() => setSearch("")}
                aria-label="Hapus pencarian"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* article list */}
        {filtered.length === 0 ? (
          <div className="blog-empty">
            <p>Tidak ada artikel yang cocok.</p>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => { setSearch(""); setActiveCategory("semua"); }}
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <>
            <div ref={listRef} className="blog-list blog-list--init">
              {pageItems.map((post, i) => (
                <article
                  key={post.slug}
                  className="blog-card"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-card__thumb"
                    aria-label={post.title}
                  >
                    <div
                      className="blog-card__thumb-bg"
                      style={{ background: post.coverColor }}
                    />
                  </Link>

                  <div className="blog-card__body">
                    <span className="blog-card__cat">{post.categoryLabel}</span>
                    <h2 className="blog-card__title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <div className="blog-card__meta">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="blog-card__meta-sep">·</span>
                      <span>{post.readTime} menit baca</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* pagination */}
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
          </>
        )}
      </div>
    </div>
  );
}
