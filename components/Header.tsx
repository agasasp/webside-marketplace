"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconMenu } from "./icons";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/template", label: "Template" },
  { href: "/kontak", label: "Kontak" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav container">
        <Link href="/" className="logo">
          <Image src="/webside.svg" alt="Webside" width={132} height={28} className="logo-img" priority />
        </Link>
        <ul className={`nav-links${open ? " open" : ""}`} id="navLinks">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <Link href="/kontak" className="btn btn-accent btn-sm">
            Konsultasi Gratis
          </Link>
          <button
            className="nav-toggle"
            aria-label="Buka menu"
            aria-expanded={open}
            aria-controls="navLinks"
            onClick={() => setOpen((v) => !v)}
          >
            <IconMenu />
          </button>
        </div>
      </nav>
    </header>
  );
}
