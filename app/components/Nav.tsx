"use client";

import { usePathname } from "next/navigation";
import home from "../page.module.css";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/capacitacion-empresarial", label: "Empresas" },
  { href: "/innovacion-academica", label: "Instituciones" },
  { href: "/consejeria-creadores", label: "Creadores" },
];

/** Navegación principal — presente en todas las páginas. */
export function Nav() {
  const pathname = usePathname();
  return (
    <nav className={home.nav} aria-label="Navegación principal">
      {LINKS.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className={`${home.navLink} ${pathname === l.href ? home.navActive : ""}`}
          aria-current={pathname === l.href ? "page" : undefined}
        >
          {l.label}
        </a>
      ))}
      <a
        href="/contacto"
        className={home.navContacto}
        aria-current={pathname === "/contacto" ? "page" : undefined}
      >
        Contacto
      </a>
    </nav>
  );
}
