import type { Metadata } from "next";
import home from "../page.module.css";
import sv from "../servicio.module.css";
import { PageShell } from "../components/PageShell";
import { MapaRuta } from "../components/MapaRuta";
import { CalculadoraCreadores } from "../components/CalculadoraCreadores";

export const metadata: Metadata = {
  title: "Cursos En Línea para creadores y divulgadores",
  description:
    "Convierte tu conocimiento en un curso en línea que sí se vende. Plataforma propia, diseño instruccional y un trato flexible: desde $12,000 USD hasta $0 con reparto 50/50.",
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
          Enseñan por puro amor — sin presupuesto, sin equipo, sin que nadie se los
          pida. Eres el héroe solitario de esta historia: tu misión es compartir lo
          que sabes. La mía es que además puedas{" "}
          <strong>comer tres veces al día</strong> haciéndolo.
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
          Sé perfectamente que un divulgador no tiene el presupuesto de un
          corporativo. Por eso el trato es distinto — y es simple: tu plataforma de
          cursos completa cuesta <em>$12,000 USD</em>. Si los pagas, es tuya al
          100% y no me debes nada más. Si hoy no puedes pagar nada,{" "}
          <em>yo le apuesto a tu proyecto</em>: la construyo gratis y nos vamos 50
          y 50 en los ingresos. ¿Estás en medio? Mueve la barra:
        </p>
        <CalculadoraCreadores />
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
