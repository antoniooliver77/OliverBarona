import type { Metadata } from "next";
import home from "../page.module.css";
import sv from "../servicio.module.css";
import { PageShell } from "../components/PageShell";
import { ElUltimoCurso } from "../components/ElUltimoCurso";

export const metadata: Metadata = {
  title: "Capacitación Online para empresas",
  description:
    "Capacitación empresarial con diseño instruccional: diagnóstico, pensamiento crítico, storytelling, pedagogía avanzada y neuroeducación. Descúbrelo jugando.",
  alternates: { canonical: "/capacitacion-empresarial" },
};

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

      <section className={sv.section} aria-labelledby="arsenal">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_01</span>
          <span id="arsenal" className={home.moduleTitle}>
            lección jugable · <strong>el arsenal</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <p className={sv.prose}>
          Podría explicarte mi método con un diagrama de flujo y viñetas. Pero
          soy diseñador instruccional: <em>sé que aprendes más jugando</em>. Así
          que mejor te lo demuestro con un jefe final. Derrota al Aburrimiento
          Corporativo — y en el camino conocerás mis 5 armas:
        </p>
        <ElUltimoCurso />
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
              <strong>Diagnóstico real</strong>: qué necesita aprender tu equipo —
              de verdad, no lo que dice el catálogo de cursos genéricos.
            </span>
          </li>
          <li>
            <span>
              <strong>Cursos y academias a la medida</strong>, construidos con
              pensamiento crítico, storytelling, pedagogía avanzada y
              neuroeducación.
            </span>
          </li>
          <li>
            <span>
              <strong>Experiencias que la gente termina</strong> — como el juego
              que acabas de jugar, pero sobre lo que tu operación necesita.
            </span>
          </li>
          <li>
            <span>
              <strong>Evidencia de aprendizaje</strong>: quién aprendió qué, y qué
              cambió en el desempeño gracias a eso.
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
