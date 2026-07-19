import type { Metadata } from "next";
import sv from "../servicio.module.css";
import { PageShell } from "../components/PageShell";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de uso de oliverbarona.com: alcance del contenido, propiedad intelectual y naturaleza informativa de los simuladores.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <PageShell modulo="terminos.txt" accent="var(--neon-cyan)" accentSoft="rgba(67, 198, 212, 0.1)">
      <header className={sv.head}>
        <span className={sv.code}>DOCUMENTO LEGAL</span>
        <h1 className={sv.title}>
          Términos y <span>condiciones</span>
        </h1>
        <p className={sv.lede}>
          Las reglas del juego de este sitio — escritas para humanos, no para
          asustar.
        </p>
      </header>

      <section className={sv.section}>
        <h2 className={sv.h2}>Uso del sitio</h2>
        <p className={sv.prose}>
          oliverbarona.com es el sitio profesional de Oliver Barona. Su
          contenido — textos, juegos, simuladores y materiales — es informativo
          y busca explicar los servicios de diseño instruccional que ofrezco.
          Al usarlo aceptas estos términos.
        </p>

        <h2 className={sv.h2}>Simuladores y calculadoras</h2>
        <p className={sv.prose}>
          Los juegos y simuladores del sitio (incluido el Auditorio de
          creadores y sus cálculos de precios y repartos) son{" "}
          <strong>herramientas ilustrativas</strong>: te ayudan a entender cómo
          pienso los tratos, pero <strong>no constituyen una oferta
          vinculante</strong> ni una cotización definitiva. Todo acuerdo real —
          alcance, precios, porcentajes, plazos — se define y firma por escrito
          entre las partes, después de una conversación.
        </p>

        <h2 className={sv.h2}>Propiedad intelectual</h2>
        <p className={sv.prose}>
          El diseño, los textos, los juegos y el código de este sitio son
          propiedad de Oliver Barona, salvo las marcas de terceros mencionadas,
          que pertenecen a sus titulares. Puedes compartir el contenido citando
          la fuente; no puedes reproducirlo con fines comerciales sin permiso.
        </p>

        <h2 className={sv.h2}>Testimonios</h2>
        <p className={sv.prose}>
          Los testimonios publicados corresponden a clientes reales y reflejan
          su experiencia particular; no garantizan resultados idénticos, porque
          cada proyecto — como cada comunidad y cada empresa — es distinto.
        </p>

        <h2 className={sv.h2}>Legislación aplicable</h2>
        <p className={sv.prose}>
          Estos términos se rigen por las leyes de los Estados Unidos
          Mexicanos. Última actualización: julio de 2026.
        </p>
      </section>
    </PageShell>
  );
}
