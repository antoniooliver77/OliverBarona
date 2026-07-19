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

const dolores = [
  {
    dolor: "«Nadie termina los cursos en línea»",
    sol: "La deserción no es pereza: es diseño sin narrativa ni razón para volver. Construyo cursos con estructura de historia — misiones, avance visible, retos — donde terminar se siente como ganar. La tasa de finalización es un resultado de diseño, no de suerte.",
  },
  {
    dolor: "«Compramos un LMS carísimo y nadie lo usa»",
    sol: "El problema casi nunca es la plataforma: es lo que hay adentro. Audito lo que ya tienes, rescato la inversión y rediseño contenidos y modelo de uso. Un LMS con buenos cursos se usa solo; uno con PDFs es un archivero caro.",
  },
  {
    dolor: "«Los estudiantes aprueban, pero no aprenden»",
    sol: "Exámenes de opción múltiple miden memoria de corto plazo, no aprendizaje. Diseño evaluaciones auténticas: proyectos, casos y evidencias de desempeño que no se pueden copiar — porque hay que saber hacer, no solo recordar.",
  },
  {
    dolor: "«Los docentes se resisten al cambio»",
    sol: "Lógico: nadie defiende un modelo que le impusieron. Por eso el modelo se construye CON tus docentes, con formación y acompañamiento hasta que lo dominan y lo hacen suyo. El cambio que se queda es el que los maestros adoptan, no el que soportan.",
  },
  {
    dolor: "«Nuestra oferta se ve igual a la de todos»",
    sol: "Una academia digital con sello propio es diferenciación que no se copia con un folleto: cursos con tu identidad pedagógica, experiencias que tus competidores no tienen y una razón concreta para elegirte. Vanguardia que puedes presumir porque funciona.",
  },
  {
    dolor: "«La distracción nos está ganando»",
    sol: "Y va a seguir ganando mientras la clase compita contra el celular con las mismas armas de 1995. Diseño experiencias que valen la atención: ritmo, interacción, historia y retos. Ya jugaste la simulación de arriba: prohibir no funciona — diseñar, sí.",
  },
];

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
  {
    q: "¿Cómo reducimos la deserción en los cursos en línea?",
    a: "Con diseño, no con recordatorios automáticos. La gente abandona cursos que no le dan una razón para volver: sin narrativa, sin avance visible, sin retos que importen. Cuando el curso tiene estructura de historia y el estudiante ve su progreso, terminar se vuelve el camino natural. La deserción es un síntoma; el diagnóstico casi siempre apunta al diseño.",
  },
  {
    q: "Ya invertimos en tecnología, ¿tenemos que empezar de cero?",
    a: "Casi nunca. La primera fase es una auditoría de lo que ya tienes — plataforma, contenidos, modelo — para rescatar cada peso invertido. Lo habitual es que la tecnología sobre y el diseño falte: se rediseña lo que vive adentro del sistema, no el sistema entero.",
  },
  {
    q: "¿Cuánto cuesta un proyecto de academia digital?",
    a: "Depende del punto de partida y la ambición: no cuesta lo mismo rediseñar un diplomado que construir la academia completa con formación docente. La auditoría inicial define alcance y presupuesto, y te entrego una propuesta clara, por fases y sin letra chica. Si tu proyecto no justifica la inversión, también te lo digo de frente.",
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

      {/* ============ DOLORES Y SOLUCIONES ============ */}
      <section className={sv.section} aria-labelledby="dolores">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_02</span>
          <span className={home.moduleTitle}>
            lección · <strong>los dolores</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <h2 id="dolores" className={sv.h2}>
          Los 6 dolores de toda institución — <span>y su solución</span>
        </h2>
        <p className={sv.prose}>
          Quince años escuchando a rectores, directores académicos y
          coordinadores dejan un patrón clarísimo. Si diriges una institución
          educativa, apuesto a que al menos tres de estas frases se han dicho
          en tu sala de juntas:
        </p>
        <div className={sv.dolores}>
          {dolores.map((d) => (
            <div key={d.dolor} className={sv.dolor}>
              <h3 className={sv.dolorTitulo}>{d.dolor}</h3>
              <p className={sv.dolorSol}>{d.sol}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ LA SIMULACIÓN ============ */}
      <section className={sv.section} aria-labelledby="batalla">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_03</span>
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
          <span className={home.moduleNum}>MOD_04</span>
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
