import Link from "next/link";
import Image from "next/image";
import { IconInstagram, IconLinkedin, IconTiktok } from "./icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">

          {/* brand */}
          <div className="footer-brand">
            <Link href="/" className="logo">
              <Image src="/webside.svg" alt="Webside" width={132} height={28} className="logo-img" />
            </Link>
            <p>Studio yang merancang dan membangun website — template siap pakai maupun desain custom.</p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram"><IconInstagram /></a>
              <a href="#" aria-label="LinkedIn"><IconLinkedin /></a>
              <a href="#" aria-label="TikTok"><IconTiktok /></a>
            </div>
          </div>

          {/* navigasi */}
          <div className="footer-col">
            <h4>Navigasi</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/template">Template</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/kontak">Kontak</Link></li>
            </ul>
          </div>

          {/* blog */}
          <div className="footer-col">
            <h4>Blog</h4>
            <ul>
              <li><Link href="/blog">Semua Artikel</Link></li>
              <li><Link href="/blog?kategori=desain">Desain</Link></li>
              <li><Link href="/blog?kategori=development">Development</Link></li>
              <li><Link href="/blog?kategori=seo">SEO</Link></li>
              <li><Link href="/blog?kategori=bisnis">Bisnis</Link></li>
            </ul>
          </div>

          {/* layanan */}
          <div className="footer-col">
            <h4>Layanan</h4>
            <ul>
              <li><Link href="/template">Template Siap Pakai</Link></li>
              <li><Link href="/kontak">Desain Custom</Link></li>
              <li><Link href="/kontak">Maintenance</Link></li>
            </ul>
          </div>

          {/* kontak */}
          <div className="footer-col">
            <h4>Kontak</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-list__label">Email</span>
                <a href="mailto:halo@webside.id" className="footer-contact-list__value">halo@webside.id</a>
              </li>
              <li>
                <span className="footer-contact-list__label">WhatsApp</span>
                <a href="tel:+6281213960283" className="footer-contact-list__value">+62 812–1396–0183</a>
              </li>
              <li>
                <span className="footer-contact-list__label">Studio</span>
                <span className="footer-contact-list__value">Jl. Kemang Raya, Jaksel</span>
              </li>
            </ul>
          </div>

        </div>

        {/* bottom bar */}
        <div className="footer-bottom">
          <span>© 2026 Webside Studio.</span>
          <div className="footer-bottom__links">
            <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>
            <Link href="/syarat-ketentuan">Syarat &amp; Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
