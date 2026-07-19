import type { Metadata } from "next";
import home from "../page.module.css";
import sv from "../servicio.module.css";
import { PageShell } from "../components/PageShell";
import { BatallaAtencion } from "../components/BatallaAtencion";
import { waLink } from "../lib/contacto";

export const metadata: Metadata = {
  title: "Academias digitales e innovación educativa para instituciones",
  description:
    "Innovación educativa con pedagogía real para colegios, universidades y formación continua: cursos, metodologías activas, evaluaciones auténticas y academias digitales completas. Con UNAM, Santillana, SM y Pearson en el historial.",
  alternates: { canonical: "/innovacion-academica" },
};

const faqs = [
  {
    q: "¿Innovar en educación significa comprar más tecnología?",
    a: "No — y ahí muere la mayoría de los proyectos de innovación educativa. La tecnología es herramienta, no propósito: un LMS carísimo con PDFs adentro sigue siendo un archivero. La innovación real empieza por la pedagogía (cómo aprende tu comunidad) y después elige la tecnología correcta, que casi nunca es la más cara ni la de moda.",
  },
  {
    q: "¿Qué es una academia digital y qué incluye?",
    a: "Es la oferta educativa en línea de tu institución funcionando como sistema: cursos con tu sello y calidad pedagógica real, un modelo que define cómo se enseña y se evalúa, y tus docentes formados para sostenerlo. No es subir clases grabadas a una plataforma — es construir una extensión digital de tu proyecto educativo.",
  },
  {
    q: "¿Cómo evitamos que la innovación se quede en el papel?",
    a: "Con la parte que casi todos saltan: la formación docente. El cambio no se sostiene con manuales sino con maestros que dominan el modelo y lo hacen suyo. Por eso mi trabajo incluye acompañamiento a tu equipo académico — el proyecto se queda contigo, no se va conmigo.",
  },
  {
    q: "¿Trabajas con colegios, universidades y formación continua?",
    a: "Sí. Quince años colaborando con instituciones y editoriales — UNAM, Santillana, SM Ediciones, Pearson — me enseñaron a adaptar el diseño instruccional a cada nivel: desde educación básica hasta posgrado y programas de formación continua. El método se ajusta al proyecto educativo, nunca al revés.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function InnovacionAcademicaPage() {
  return (
    <PageShell modulo="innovacion_academica.exe" accent="var(--neon-cyan)" accentSoft="rgba(67, 198, 212, 0.1)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className={sv.head}>
        <span className={sv.code}>CH_02 · Visionario académico</span>
        <h1 className={sv.title}>
          Innovación educativa que <span>sí enseña</span>: tu academia digital
        </h1>
        <p className={sv.lede}>
          Diriges una institución educativa y tu problema — entre muchos otros —
          es <strong>obtener y mantener la atención de tus estudiantes</strong>.
          ¿Un ejemplo poderoso de contra qué compites? Los videos verticales: la
          máquina de distracción más eficaz jamás construida. La respuesta no es
          prohibir pantallas ni comprar tecnología por comprar: es{" "}
          <strong>diseñar cursos, metodologías, evaluaciones y academias
          digitales</strong> que valgan esa atención.
        </p>
      </header>

      {/* ============ LA PROPUESTA, EXPLICADA ============ */}
      <section className={sv.section} aria-labelledby="propuesta">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_01</span>
          <span className={home.moduleTitle}>
            lección · <strong>la propuesta</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <h2 id="propuesta" className={sv.h2}>
          Qué hago por tu institución: <span>vanguardia con pedagogía</span>
        </h2>
        <p className={sv.prose}>
          Quince años trabajando con instituciones y editoriales — UNAM,
          Santillana, SM, Pearson — me enseñaron algo simple:{" "}
          <em>la innovación sin pedagogía es decoración</em>. Por eso todo
          empieza por lo académico, no por el software. Estos son los cuatro
          frentes en los que trabajo:
        </p>
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

      {/* ============ LA SIMULACIÓN ============ */}
      <section className={sv.section} aria-labelledby="batalla">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_02</span>
          <span className={home.moduleTitle}>
            simulación · <strong>defiende tu salón</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <h2 id="batalla" className={sv.h2}>
          La batalla por la atención: <span>vívela en 70 segundos</span>
        </h2>
        <p className={sv.prose}>
          Dicen que los estudiantes ya no ponen atención. Falso:{" "}
          <em>la ponen — 15 segundos a la vez, y en otra pantalla</em>. Aquí
          tienes un salón con 8 estudiantes y al enemigo en plena cacería. Tu
          misión: que la lección llegue al final. Vas a descubrir, en carne
          propia, por qué prohibir el celular nunca ha salvado una clase.
        </p>
        <BatallaAtencion />
      </section>

      {/* ============ FAQ ============ */}
      <section className={sv.section} aria-labelledby="preguntas">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_03</span>
          <span className={home.moduleTitle}>
            lección · <strong>las dudas</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <h2 id="preguntas" className={sv.h2}>
          Preguntas de <span>rectores y directores</span>
        </h2>
        <div className={sv.faq}>
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p className={sv.faqBody}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className={sv.ctaPanel}>
        <h2 className={sv.ctaPanelTitle}>¿Hablamos de tu institución?</h2>
        <p className={sv.ctaPanelSub}>
          Cuéntame dónde está tu proyecto educativo hoy y hasta dónde quieres
          llevarlo. Yo pongo la ruta.
        </p>
        <div className={sv.ctaRow}>
          <a href="/contacto" className={home.cta}>
            Iniciar contacto
          </a>
          <a
            href={waLink(
              "Hola Oliver, dirijo una institución educativa y quiero platicar sobre nuestra academia digital."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={sv.whatsapp}
          >
            Mejor por WhatsApp
          </a>
        </div>
      </div>
    </PageShell>
  );
}
