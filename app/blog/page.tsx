import type { Metadata } from "next";
import BlogCatalog from "@/components/BlogCatalog";

export const metadata: Metadata = {
  title: "Blog — Webside",
  description:
    "Artikel seputar desain web, development, SEO, dan bisnis dari tim Webside — studio yang sudah meluncurkan 120+ website untuk bisnis di Indonesia.",
};

export default function BlogPage() {
  return (
    <>
      {/* ── PAGE HEADER ── */}
      <div className="blog-page-header">
        <div className="container">
          <div className="blog-page-header__inner">
            <div className="blog-page-header__left">
              <h1 className="blog-page-header__title">
                Blog Webside — belajar<br />
                bikin website yang<br />
                beneran jalan.
              </h1>
            </div>
            <div className="blog-page-header__right">
              <p>
                Ditulis oleh tim yang sudah meluncurkan{" "}
                <strong>120+ website</strong> untuk berbagai jenis bisnis di Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container">
        <BlogCatalog />
      </div>
    </>
  );
}
