import type { Metadata } from "next";
import home from "../page.module.css";
import sv from "../servicio.module.css";
import { PageShell } from "../components/PageShell";
import { MapaRuta } from "../components/MapaRuta";

export const metadata: Metadata = {
  title: "Academia Digital para instituciones educativas",
  description:
    "Innovación académica con calidad pedagógica: academias digitales, contenidos que compiten contra la distracción y formación docente. Vanguardia sin sacrificar educación.",
  alternates: { canonical: "/innovacion-academica" },
};

const pasos = [
  {
    titulo: "Auditoría académica",
    desc: "Qué está funcionando en tu institución y qué solo parece moderno pero no enseña.",
  },
  {
    titulo: "Modelo pedagógico digital",
    desc: "Un diseño que une tu proyecto educativo con la tecnología correcta — no la de moda.",
  },
  {
    titulo: "Producción de contenidos",
    desc: "Materiales y experiencias que compiten (y ganan) contra la distracción.",
  },
  {
    titulo: "Formación docente",
    desc: "Tus maestros dominan las herramientas. El cambio se queda, no se va conmigo.",
  },
];

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

      <section className={sv.section} aria-labelledby="metodo">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_01</span>
          <span id="metodo" className={home.moduleTitle}>
            lección · <strong>el método</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <p className={sv.prose}>
          Quince años trabajando con instituciones y editoriales — UNAM,
          Santillana, SM, Pearson — me enseñaron algo simple:{" "}
          <em>la innovación sin pedagogía es decoración</em>. Por eso la ruta
          empieza por lo académico, no por el software:
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
              <strong>Tu academia digital</strong>: cursos y programas en línea con
              el sello de tu institución y calidad pedagógica real.
            </span>
          </li>
          <li>
            <span>
              <strong>Contenidos educativos</strong> diseñados para aprender — con
              storytelling, interacción y evaluación bien pensada.
            </span>
          </li>
          <li>
            <span>
              <strong>Docentes preparados</strong>: acompañamiento y formación para
              que tu equipo se apropie del modelo.
            </span>
          </li>
          <li>
            <span>
              <strong>Diferenciación honesta</strong>: una oferta educativa que
              puedes presumir porque sí funciona.
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
