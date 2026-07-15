import Link from "next/link";
import Image from "next/image";
import { IconInstagram, IconLinkedin, IconTiktok } from "./icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <Image src="/webside.svg" alt="Webside" width={132} height={28} className="logo-img" />
            </Link>
            <p>Studio yang merancang dan membangun website — template siap pakai maupun desain custom.</p>
          </div>
          <div className="footer-col">
            <h4>Navigasi</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/template">Template</Link>
              </li>
              <li>
                <Link href="/kontak">Kontak</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Layanan</h4>
            <ul>
              <li>
                <Link href="/template">Template Siap Pakai</Link>
              </li>
              <li>
                <Link href="/kontak">Desain Custom</Link>
              </li>
              <li>
                <Link href="/kontak">Maintenance</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Kontak</h4>
            <ul>
              <li>
                <a href="mailto:halo@webside.id">halo@webside.id</a>
              </li>
              <li>
                <a href="tel:+6281234567890">+62 812-3456-7890</a>
              </li>
              <li>
                <Link href="/kontak">Jakarta, Indonesia</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Webside Studio. Semua hak dilindungi.</span>
          <div className="footer-social">
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
      </div>
    </footer>
  );
}
