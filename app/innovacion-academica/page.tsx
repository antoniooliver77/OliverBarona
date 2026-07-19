import type { Metadata } from "next";
import home from "../page.module.css";
import sv from "../servicio.module.css";
import { PageShell } from "../components/PageShell";
import { BatallaAtencion } from "../components/BatallaAtencion";

export const metadata: Metadata = {
  title: "Academia Digital para instituciones educativas",
  description:
    "Innovación académica con calidad pedagógica: academias digitales, contenidos que compiten contra la distracción y formación docente. Vanguardia sin sacrificar educación.",
  alternates: { canonical: "/innovacion-academica" },
};

export default function InnovacionAcademicaPage() {
  return (
    <PageShell modulo="innovacion_academica.exe" accent="var(--neon-cyan)" accentSoft="rgba(67, 198, 212, 0.1)">
      <header className={sv.head}>
        <span className={sv.code}>CH_02 · Visionario académico</span>
        <h1 className={sv.title}>
          Vanguardia, sí. Pero que <span>eduque.</span>
        </h1>
        <p className={sv.lede}>
          Diriges una institución educativa y conoces al enemigo: son los{" "}
          <strong>videos verticales</strong>. Compites todos los días contra la
          máquina de distracción más eficaz de la historia. La respuesta no es
          prohibir pantallas ni comprar tecnología por comprar: es diseñar
          experiencias de aprendizaje que valgan la atención de tus estudiantes.
        </p>
      </header>

      <section className={sv.section} aria-labelledby="batalla">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_01</span>
          <span id="batalla" className={home.moduleTitle}>
            lección jugable · <strong>la batalla por la atención</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <p className={sv.prose}>
          Podría darte un discurso sobre innovación educativa. Prefiero que la
          vivas: defiende un salón real del scroll infinito y mira cómo{" "}
          <em>cada solución transforma el aula en vivo</em>. Spoiler: prohibir
          celulares no va a funcionar.
        </p>
        <BatallaAtencion />
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
              <strong>Cursos</strong> que compiten contra la distracción y ganan:
              storytelling, interacción y ritmo — con el sello de tu institución.
            </span>
          </li>
          <li>
            <span>
              <strong>Metodologías activas</strong>: modelos pedagógicos que
              reorganizan cómo se enseña, no solo con qué software.
            </span>
          </li>
          <li>
            <span>
              <strong>Evaluaciones auténticas</strong> que miden desempeño real —
              no memoria de trivia — y despiertan a los estudiantes.
            </span>
          </li>
          <li>
            <span>
              <strong>Academias digitales completas</strong>: todo el sistema
              integrado, con tus docentes formados para sostenerlo.
            </span>
          </li>
        </ul>
      </section>

      <div className={sv.ctaPanel}>
        <h2 className={sv.ctaPanelTitle}>¿Hablamos de tu institución?</h2>
        <p className={sv.ctaPanelSub}>
          Cuéntame dónde está tu proyecto educativo hoy y hasta dónde quieres
          llevarlo. Yo pongo la ruta.
        </p>
        <a href="/contacto" className={home.cta}>
          Iniciar contacto
        </a>
      </div>
    </PageShell>
  );
}
