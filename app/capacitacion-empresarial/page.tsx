import type { Metadata } from "next";
import home from "../page.module.css";
import sv from "../servicio.module.css";
import { PageShell } from "../components/PageShell";
import { MapaRuta } from "../components/MapaRuta";

export const metadata: Metadata = {
  title: "Capacitación Online para empresas",
  description:
    "Capacitación empresarial con diseño instruccional: cursos que tu equipo sí termina y conocimiento que sí se aplica. Diagnóstico, diseño, producción y medición.",
  alternates: { canonical: "/capacitacion-empresarial" },
};

const pasos = [
  {
    titulo: "Diagnóstico",
    desc: "Qué necesita aprender tu equipo — de verdad, no lo que dice el catálogo de cursos genéricos.",
  },
  {
    titulo: "Diseño instruccional",
    desc: "Guion, storytelling y gamificación al servicio de un objetivo: que lo aprendido se use el lunes.",
  },
  {
    titulo: "Producción",
    desc: "Cursos en línea que no parecen castigo: interactivos, claros y al grano.",
  },
  {
    titulo: "Medición",
    desc: "Evidencia de que aprendieron. Datos, no aplausos de cortesía.",
  },
];

export default function CapacitacionEmpresarialPage() {
  return (
    <PageShell modulo="capacitacion_empresarial.exe" accent="var(--neon-orange)" accentSoft="rgba(255, 106, 0, 0.12)">
      <header className={sv.head}>
        <span className={sv.code}>CH_01 · Líder corporativo</span>
        <h1 className={sv.title}>
          Capacitación que tu equipo <span>sí termina.</span>
        </h1>
        <p className={sv.lede}>
          Diriges una empresa y ya lo viviste: compraste cursos, tu gente les dio
          clic a todo hasta el final y <strong>nadie aprendió nada</strong>. El
          problema no es tu equipo. Es que ese curso no fue diseñado para que
          alguien aprendiera — fue diseñado para cumplir.
        </p>
      </header>

      <section className={sv.section} aria-labelledby="metodo">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_01</span>
          <span id="metodo" className={home.moduleTitle}>
            lección · <strong>el método</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <p className={sv.prose}>
          Mi trabajo es que la capacitación deje de ser un trámite y se convierta
          en <em>productividad medible</em>. Para eso sigo una ruta de cuatro
          pasos — la misma con la que gané el concurso internacional iSpring 2025:
        </p>
        <MapaRuta pasos={pasos} />
      </section>

      <section className={sv.section} aria-labelledby="entregables">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_02</span>
          <span id="entregables" className={home.moduleTitle}>
            lección · <strong>qué obtienes</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <ul className={sv.list}>
          <li>
            <span>
              <strong>Cursos e-learning a la medida</strong> de tu operación, tu
              gente y tu vocabulario — nada de plantillas recicladas.
            </span>
          </li>
          <li>
            <span>
              <strong>Academias internas</strong>: tu conocimiento organizado en
              rutas de aprendizaje que crecen con tu empresa.
            </span>
          </li>
          <li>
            <span>
              <strong>Onboarding que no espanta</strong>: los nuevos entienden su
              puesto antes de que el café se enfríe.
            </span>
          </li>
          <li>
            <span>
              <strong>Indicadores claros</strong>: quién aprendió qué, y qué cambió
              en la operación gracias a eso.
            </span>
          </li>
        </ul>
      </section>

      <div className={sv.ctaPanel}>
        <h2 className={sv.ctaPanelTitle}>¿Hablamos de tu equipo?</h2>
        <p className={sv.ctaPanelSub}>
          Cuéntame qué necesitan aprender y te digo, sin rodeos, cómo lo
          lograríamos — y si de verdad te conviene.
        </p>
        <a href="/contacto" className={home.cta}>
          Iniciar contacto
        </a>
      </div>
    </PageShell>
  );
}
