import type { Metadata } from "next";
import home from "../page.module.css";
import sv from "../servicio.module.css";
import { PageShell } from "../components/PageShell";
import { ContactForm } from "../components/ContactForm";
import { CONTACTO, waLink } from "../lib/contacto";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Inicia contacto con Oliver Barona: capacitación empresarial, academias digitales y cursos en línea para creadores. Cuéntame qué necesitas, sin filtros.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <PageShell modulo="contacto.exe" accent="var(--neon-cyan)" accentSoft="rgba(67, 198, 212, 0.1)">
      <header className={sv.head}>
        <span className={sv.code}>TRANSMISIÓN ABIERTA</span>
        <h1 className={sv.title}>
          Iniciar <span>contacto</span>
        </h1>
        <p className={sv.lede}>
          Empresa, escuela o creador: cuéntame qué necesitas que alguien aprenda.
          Te respondo <strong>en persona</strong> — sin bots ni respuestas
          enlatadas — y te digo con honestidad si puedo ayudarte y cómo.
        </p>
      </header>

      <div className={sv.contactGrid}>
        <section aria-label="Formulario de contacto">
          <div className={home.moduleHeader}>
            <span className={home.moduleNum}>MOD_01</span>
            <span className={home.moduleTitle}>
              lección · <strong>escríbeme</strong>
            </span>
            <span className={home.moduleLine} />
          </div>
          <ContactForm />
        </section>

        <aside className={sv.contactAside} aria-label="Otras vías de contacto">
          <div className={sv.contactCard}>
            <p className={sv.contactCardLabel}>canal directo</p>
            <p className={sv.contactCardValue}>
              <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a>
            </p>
          </div>

          {CONTACTO.whatsapp && (
            <div className={sv.contactCard}>
              <p className={sv.contactCardLabel}>respuesta rápida</p>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={sv.whatsapp}
              >
                WhatsApp directo →
              </a>
            </div>
          )}

          <div className={sv.contactCard}>
            <p className={sv.contactCardLabel}>ubicación</p>
            <p className={sv.contactCardValue}>
              México · trabajo con clientes de cualquier zona horaria
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
