import type { CSSProperties, ReactNode } from "react";
import home from "../page.module.css";
import sv from "../servicio.module.css";
import { CustomCursor, ScrollProgress } from "./effects";
import { Nav } from "./Nav";
import { SiteFooter } from "./SiteFooter";

/**
 * Marco común de las páginas interiores: HUD, nav, cursor y footer.
 * `accent` define el color de acento de la página (naranja/cian/niebla).
 */
export function PageShell({
  children,
  accent = "var(--neon-orange)",
  accentSoft = "rgba(255, 106, 0, 0.12)",
  modulo,
}: {
  children: ReactNode;
  accent?: string;
  accentSoft?: string;
  modulo: string;
}) {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      <main className={home.main}>
        <div className={home.shell}>
          {/* HUD TOP STRIP */}
          <div className={home.hud} role="presentation">
            <div className={home.hudLeft}>
              <span className={home.dot} />
              <span className={home.brand}>LMS_OS v2.5</span>
              <span className={home.hudPipe}>//</span>
              <span>módulo: {modulo}</span>
            </div>
            <div className={home.hudRight}>
              <span>node: mx-01</span>
              <span className={home.hudPipe}>//</span>
              <span>status: online</span>
            </div>
          </div>

          <Nav />

          <div
            className={sv.page}
            style={{ "--accent": accent, "--accent-soft": accentSoft } as CSSProperties}
          >
            {children}
          </div>

          <SiteFooter />
        </div>
      </main>
    </>
  );
}
