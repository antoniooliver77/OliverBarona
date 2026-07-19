import type { Metadata } from "next";
import home from "../page.module.css";
import sv from "../servicio.module.css";
import { PageShell } from "../components/PageShell";
import { ElUltimoCurso } from "../components/ElUltimoCurso";
import { waLink } from "../lib/contacto";

export const metadata: Metadata = {
  title: "Capacitación empresarial que tu equipo sí termina",
  description:
    "Capacitación para empresas con diseño instruccional profesional: cursos e-learning a la medida, academias internas y onboarding — con diagnóstico real y evidencia de aprendizaje. Ganador iSpring 2025.",
  alternates: { canonical: "/capacitacion-empresarial" },
};

const faqs = [
  {
    q: "¿Por qué la capacitación que compramos antes no funcionó?",
    a: "Porque la mayoría de los cursos corporativos se diseñan para cumplir un requisito, no para que alguien aprenda: contenido genérico, cero conexión con tu operación y evaluaciones que se aprueban sin pensar. Tu equipo no es el problema — el diseño lo es. La capacitación funciona cuando parte de un diagnóstico de TU empresa y se construye con pedagogía real.",
  },
  {
    q: "¿Qué tipo de capacitación empresarial haces?",
    a: "Cursos e-learning a la medida de tu operación, academias internas que organizan el conocimiento de tu empresa en rutas de aprendizaje, y programas de onboarding para que los nuevos entiendan su puesto rápido. Todo construido con diagnóstico, pensamiento crítico, storytelling, pedagogía avanzada y neuroeducación.",
  },
  {
    q: "¿Cómo mides que de verdad aprendieron?",
    a: "Con evaluación auténtica: evidencia de desempeño real, no exámenes de trivia que se aprueban copiando. Desde el diseño defino qué conducta debe cambiar en el trabajo, y al final te entrego indicadores claros: quién aprendió qué, y qué cambió en la operación gracias a eso.",
  },
  {
    q: "¿Cuánto cuesta un curso a la medida para mi empresa?",
    a: "Depende de lo que tu equipo necesita aprender — y eso se descubre con el diagnóstico, no con un catálogo de precios. Cuéntame tu necesidad y te respondo con una propuesta concreta y honesta: alcance, tiempos y costo sin letra chica. Y si no te conviene contratarme, también te lo digo.",
  },
  {
    q: "¿Qué es el diseño instruccional y por qué debería importarte?",
    a: "Es la disciplina que convierte información en aprendizaje real: une pedagogía, tecnología, storytelling y evaluación para que la gente entienda, recuerde y aplique. La diferencia entre un curso con diseño instruccional y uno sin él es la misma que entre una película y una carpeta de escenas sueltas: el material puede ser el mismo, el resultado no se parece en nada.",
  },
  {
    q: "¿Qué es una academia interna o universidad corporativa?",
    a: "Es el conocimiento de tu empresa — procesos, productos, cultura, mejores prácticas — organizado en rutas de aprendizaje permanentes, en lugar de cursos sueltos que se pierden. Sirve para entrenar nuevos, certificar equipos y dejar de depender de que 'el que sabe' tenga tiempo de explicar. Crece con tu operación y se queda aunque la gente rote.",
  },
  {
    q: "¿La capacitación es en línea o presencial?",
    a: "Mi especialidad es el e-learning a la medida: cursos en línea que tu equipo toma a su ritmo, con evidencia de avance. Y cuando el proyecto lo pide, diseño experiencias mixtas — la parte conceptual en línea y la práctica en vivo. Lo que nunca hago es llenar horas de sala con diapositivas: eso no es capacitación, es secuestro con café.",
  },
  {
    q: "¿Pueden rediseñar los cursos que ya tenemos?",
    a: "Sí, y suele ser una gran inversión: muchas empresas ya tienen el contenido correcto atrapado en un formato que aburre. Hago un diagnóstico de tus cursos actuales, rescato lo que sirve y rediseño lo que espanta — con storytelling, interacción y evaluación auténtica. Tu curso aburre; se puede arreglar.",
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

export default function CapacitacionEmpresarialPage() {
  return (
    <PageShell modulo="capacitacion_empresarial.exe" accent="var(--neon-orange)" accentSoft="rgba(255, 106, 0, 0.12)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className={sv.head}>
        <span className={sv.code}>CH_01 · Líder corporativo</span>
        <h1 className={sv.title}>
          Capacitación empresarial que tu equipo <span>sí termina</span>
        </h1>
        <p className={sv.lede}>
          Diriges una empresa y ya lo viviste: compraste cursos, tu gente les dio
          clic a todo hasta el final y <strong>nadie aprendió nada</strong>. El
          problema no es tu equipo. Es que ese curso no fue diseñado para que
          alguien aprendiera — fue diseñado para cumplir. Yo hago lo contrario:{" "}
          <strong>cursos e-learning a la medida, academias internas y
          onboarding</strong> construidos con diseño instruccional profesional,
          para que lo aprendido se use el lunes y se note en la operación.
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
          Qué hago por tu empresa: aprendizaje <span>que produce</span>
        </h2>
        <p className={sv.prose}>
          Aclaremos qué NO es esto: no es un catálogo de cursos genéricos, ni un
          PDF con voz en off, ni horas de video que tu gente reproduce en
          silencio mientras contesta correos. Es{" "}
          <em>capacitación diseñada desde tu operación</em>, por un diseñador
          instruccional con 15 años de experiencia y un premio internacional
          (iSpring 2025). Esto es lo que obtienes:
        </p>
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
              que está aquí abajo, pero sobre lo que tu operación necesita.
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

      {/* ============ EL JUEGO ============ */}
      <section className={sv.section} aria-labelledby="arsenal">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_02</span>
          <span className={home.moduleTitle}>
            lección jugable · <strong>el arsenal</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <h2 id="arsenal" className={sv.h2}>
          Conoce mi método <span>jugando</span>: derrota al aburrimiento
        </h2>
        <p className={sv.prose}>
          Podría explicarte mi método con un diagrama de flujo y viñetas. Pero
          soy diseñador instruccional: <em>sé que aprendes más jugando</em>. Así
          que mejor te lo demuestro con un jefe final. Derrota al Aburrimiento
          Corporativo — y en el camino conocerás mis 5 armas:
        </p>
        <ElUltimoCurso />
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
          Preguntas que me hacen <span>los líderes</span>
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
        <h2 className={sv.ctaPanelTitle}>¿Hablamos de tu equipo?</h2>
        <p className={sv.ctaPanelSub}>
          Cuéntame qué necesitan aprender y te digo, sin rodeos, cómo lo
          lograríamos — y si de verdad te conviene.
        </p>
        <div className={sv.ctaRow}>
          <a href="/contacto" className={home.cta}>
            Iniciar contacto
          </a>
          <a
            href={waLink(
              "Hola Oliver, dirijo una empresa y quiero capacitación que mi equipo sí termine. ¿Platicamos?"
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
