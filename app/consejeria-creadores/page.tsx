import type { Metadata } from "next";
import home from "../page.module.css";
import sv from "../servicio.module.css";
import { PageShell } from "../components/PageShell";
import { MapaRuta } from "../components/MapaRuta";
import { TratoCreadores } from "../components/TratoCreadores";

export const metadata: Metadata = {
  title: "Cursos En Línea para creadores y divulgadores",
  description:
    "Ya construiste una comunidad; ahora monetízala. Plataforma de cursos propia con diseño instruccional. Tu comunidad decide el trato: desde $25,000 USD hasta $0 con reparto 50/50.",
  alternates: { canonical: "/consejeria-creadores" },
};

const pasos = [
  {
    titulo: "Tu esencia",
    desc: "Entiendo cómo enseñas, qué te hace único y por qué tu comunidad te sigue. Eso no se delega a una plantilla.",
  },
  {
    titulo: "Diseño del curso",
    desc: "Convertimos tu conocimiento en una experiencia con estructura, ritmo y evaluación — no una playlist de videos.",
  },
  {
    titulo: "Tu plataforma",
    desc: "Tu propia casa digital: tu marca, tus alumnos, tus datos. No un inquilinato en el marketplace de alguien más.",
  },
  {
    titulo: "Lanzamiento",
    desc: "Sales al aire con todo listo para vender: el clímax de la historia, y el inicio de tu ingreso.",
  },
];

export default function ConsejeriaCreadoresPage() {
  return (
    <PageShell modulo="consejeria_creadores.exe" accent="var(--fg)" accentSoft="rgba(237, 242, 247, 0.08)">
      <header className={sv.head}>
        <span className={sv.code}>CH_03 · Divulgador en redes</span>
        <h1 className={sv.title}>
          Enseñas por amor. Ahora <span>cobremos por eso.</span>
        </h1>
        <p className={sv.lede}>
          Voy a confesarte algo: los creadores son <strong>mis favoritos</strong>.
          Enseñan por puro amor — y ya hicieron <strong>lo más importante</strong>:
          construir una comunidad. Eso no se compra ni se delega. Esa comunidad
          merece contenido organizado de verdad, y tú mereces{" "}
          <strong>monetizar todo ese esfuerzo</strong> — no solo vivir de la
          esperanza del algoritmo.
        </p>
      </header>

      <section className={sv.section} aria-labelledby="trato">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_01</span>
          <span id="trato" className={home.moduleTitle}>
            lección · <strong>el trato</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <p className={sv.prose}>
          Tu plataforma de cursos completa vale <em>$25,000 USD</em>. Pero aquí
          tu comunidad es moneda: mientras más grande sea,{" "}
          <em>más del proyecto estoy dispuesto a apostarle</em> y menos efectivo
          necesitas poner — hasta llegar a $0 y ganar los dos a mitades, como
          hice con El Profe Luis y sus millones de seguidores. Muéstrame tu
          auditorio:
        </p>
        <TratoCreadores />
      </section>

      <section className={sv.section} aria-labelledby="metodo">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_02</span>
          <span id="metodo" className={home.moduleTitle}>
            lección · <strong>el método</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <p className={sv.prose}>
          Lo mismo que hice con El Profe Luis y sus más de 3 millones de
          seguidores: encontrar tu esencia y ponerla en una plataforma educativa,{" "}
          <em>como clonarte digitalmente</em> — pero con pedagogía de verdad
          detrás.
        </p>
        <MapaRuta pasos={pasos} />
      </section>

      <div className={sv.ctaPanel}>
        <h2 className={sv.ctaPanelTitle}>¿Hacemos tu curso realidad?</h2>
        <p className={sv.ctaPanelSub}>
          Cuéntame qué enseñas y a quién. Te respondo con una propuesta honesta —
          incluido el trato que más te convenga a ti, no a mí.
        </p>
        <a href="/contacto" className={home.cta}>
          Iniciar contacto
        </a>
      </div>
    </PageShell>
  );
}
