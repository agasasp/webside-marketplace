import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, formatDate, type ContentBlock } from "@/lib/posts";

const WHATSAPP_NUMBER = "6281234567890";

/* ── static params ── */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

/* ── dynamic metadata ── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Artikel tidak ditemukan — Webside" };
  return {
    title: `${post.title} — Webside Blog`,
    description: post.excerpt,
  };
}

/* ── content renderer ── */
function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "p":
      return <p key={i}>{block.text}</p>;
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "h3":
      return <h3 key={i}>{block.text}</h3>;
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol key={i}>
          {block.items.map((item, j) => <li key={j}>{item}</li>)}
        </ol>
      );
    case "quote":
      return (
        <blockquote key={i}>
          <p>{block.text}</p>
          {block.author && <cite>— {block.author}</cite>}
        </blockquote>
      );
    case "callout":
      return (
        <div key={i} className="post-callout">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 8v5M9 6v.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span>{block.text}</span>
        </div>
      );
  }
}

/* ── page ── */
export default async function BlogDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  /* related: same category, exclude current */
  const related = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const waHref = encodeURIComponent(
    "Halo Webside, saya ingin konsultasi gratis soal kebutuhan website saya."
  );

  return (
    <>
      {/* ── HERO COVER ── */}
      <div
        className="post-cover"
        style={{ background: post.coverColor }}
        aria-hidden="true"
      />

      <div className="container">
        <div className="post-layout">
          {/* ════════════════ ARTICLE ════════════════ */}
          <article className="post-article">
            {/* breadcrumb */}
            <nav className="post-breadcrumb" aria-label="Breadcrumb">
              <Link href="/blog">Blog</Link>
              <span aria-hidden="true">›</span>
              <span>{post.categoryLabel}</span>
            </nav>

            {/* header */}
            <header className="post-header">
              <span className="post-cat">{post.categoryLabel}</span>
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="post-meta__sep">·</span>
                <span>{post.readTime} menit baca</span>
              </div>
            </header>

            {/* excerpt / lead */}
            <p className="post-lead">{post.excerpt}</p>

            {/* body */}
            <div className="post-body">
              {post.content.map((block, i) => renderBlock(block, i))}
            </div>

            {/* footer tags / share */}
            <footer className="post-footer">
              <div className="post-footer__tag">
                <span className="post-cat">{post.categoryLabel}</span>
              </div>
              <div className="post-footer__share">
                <span>Bagikan:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://webside.id/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener"
                  aria-label="Bagikan ke Twitter/X"
                  className="post-share-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M12.6 1h2.4L9.8 6.8 16 15h-4.5L8 10.4 3.9 15H1.5l5.5-6.3L0 1h4.6l3.2 4.3L12.6 1zm-.8 12.6h1.3L4.2 2.4H2.8l9 11.2z" fill="currentColor"/>
                  </svg>
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + `https://webside.id/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener"
                  aria-label="Bagikan ke WhatsApp"
                  className="post-share-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1a7 7 0 0 1 6.07 10.47L15 15l-3.65-.9A7 7 0 1 1 8 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                    <path d="M5.5 7.5c.5 1 1.5 2 2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
            </footer>

            {/* ── RELATED POSTS ── */}
            {related.length > 0 && (
              <section className="post-related">
                <h2 className="post-related__title">Artikel Terkait</h2>
                <div className="post-related__grid">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="post-related-card">
                      <div
                        className="post-related-card__thumb"
                        style={{ background: r.coverColor }}
                      />
                      <div className="post-related-card__body">
                        <span className="post-cat post-cat--sm">{r.categoryLabel}</span>
                        <p className="post-related-card__title">{r.title}</p>
                        <span className="post-related-card__meta">
                          {formatDate(r.date)} · {r.readTime} menit baca
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* ════════════════ SIDEBAR ════════════════ */}
          <aside className="post-sidebar">
            {/* CTA card */}
            <div className="blog-cta-card">
              <p className="blog-cta-card__title">Butuh website custom?</p>
              <p className="blog-cta-card__body">
                Konsultasi gratis 30 menit dengan tim kami — bahas kebutuhan dan budget kamu.
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

            {/* table of contents */}
            {(() => {
              const headings = post.content.filter(
                (b) => b.type === "h2"
              ) as Extract<ContentBlock, { type: "h2" }>[];
              if (headings.length === 0) return null;
              return (
                <div className="post-toc">
                  <p className="post-toc__label">Isi Artikel</p>
                  <ul className="post-toc__list">
                    {headings.map((h, i) => (
                      <li key={i}>
                        <span className="post-toc__num">{String(i + 1).padStart(2, "0")}</span>
                        <span>{h.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}

            {/* back to blog */}
            <Link href="/blog" className="post-back-link">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Kembali ke Blog
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
