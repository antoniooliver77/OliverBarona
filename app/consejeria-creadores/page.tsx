import type { Metadata } from "next";
import home from "../page.module.css";
import sv from "../servicio.module.css";
import { PageShell } from "../components/PageShell";
import { MapaRuta } from "../components/MapaRuta";
import { TratoCreadores } from "../components/TratoCreadores";

export const metadata: Metadata = {
  title: "Crea y vende tu curso en línea con plataforma propia",
  description:
    "Construyo tu plataforma de cursos en línea completa: diseño instruccional profesional, tu marca, tus alumnos y tus datos. Con 100,000+ seguidores, tu comunidad paga parte del proyecto — hasta gratis con reparto 50/50.",
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

const faqs = [
  {
    q: "¿Por qué no simplemente subir mi curso a Hotmart, Udemy o Domestika?",
    a: "Porque ahí eres un producto de catálogo: la plataforma se queda una comisión, decide los descuentos, y lo más grave — los alumnos son suyos, no tuyos. Con plataforma propia tú pones el precio, la marca es tuya y cada correo de cada alumno se queda contigo. Tu comunidad te siguió a ti, no a un marketplace.",
  },
  {
    q: "¿Qué incluye exactamente el proyecto de $25,000 USD?",
    a: "Todo lo necesario para vender: el diseño instruccional de tu curso (estructura, guion, actividades y evaluaciones hechas por un profesional premiado), tu plataforma web propia con tu marca y dominio, el curso montado y funcionando, y el sistema de cobro conectado. Entras con conocimiento; sales con un negocio.",
  },
  {
    q: "¿Qué pasa si todavía no tengo 100,000 seguidores?",
    a: "Te lo digo de frente: sigue construyendo tu comunidad — es lo más valioso que tienes y nadie puede hacerlo por ti. El trato de apuesta abre en 100,000 seguidores porque debajo de eso las cuentas no te convienen, y no acepto tratos que no convienen. Cuando cruces la línea, esta mesa te espera.",
  },
  {
    q: "En el trato con reparto, ¿de quién es la plataforma y los alumnos?",
    a: "Tuyos. Siempre. La marca, el dominio, los datos y la comunidad son tuyos incluso en el trato 50/50 — lo mío es un porcentaje de las ventas, no un pedazo de tu proyecto. Los términos finos (duración y alcance del acuerdo) se firman claros y por escrito: letra chica sin trampas.",
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

export default function ConsejeriaCreadoresPage() {
  return (
    <PageShell modulo="consejeria_creadores.exe" accent="var(--fg)" accentSoft="rgba(237, 242, 247, 0.08)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className={sv.head}>
        <span className={sv.code}>CH_03 · Divulgador en redes</span>
        <h1 className={sv.title}>
          Monetiza tu comunidad con <span>tu propio curso en línea.</span>
        </h1>
        <p className={sv.lede}>
          Voy a confesarte algo: los creadores son <strong>mis favoritos</strong>.
          Enseñan por puro amor — y ya hicieron <strong>lo más importante</strong>:
          construir una comunidad que los escucha. Esa comunidad merece contenido
          organizado de verdad, y tú mereces cobrar por todo ese esfuerzo. Mi
          trabajo es simple de decir: <strong>convierto tu conocimiento en un
          curso en línea profesional, montado en una plataforma que es tuya</strong> —
          y lista para vender.
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
          Qué te construyo: una plataforma de cursos <span>que es tuya</span>
        </h2>
        <p className={sv.prose}>
          Aclaremos qué NO es esto: no es subir videos con candado a un
          marketplace, ni un curso genérico de plantilla, ni otra membresía que
          tu audiencia olvida en dos semanas. Esto es{" "}
          <em>tu escuela digital propia</em>, construida por un diseñador
          instruccional profesional (el que ganó el concurso internacional
          iSpring 2025, para ser exactos). El paquete completo incluye:
        </p>
        <ul className={sv.list}>
          <li>
            <span>
              <strong>Tu curso, diseñado en serio</strong>: estructura, guion,
              actividades y evaluaciones con pedagogía real — no una playlist
              con buenas intenciones.
            </span>
          </li>
          <li>
            <span>
              <strong>Tu plataforma web propia</strong>: tu dominio, tu marca,
              tus precios y tus datos. Cada alumno que se inscribe es{" "}
              <strong>tu</strong> alumno, no el de un marketplace.
            </span>
          </li>
          <li>
            <span>
              <strong>Todo montado y funcionando</strong>: lecciones, materiales,
              certificados y sistema de cobro conectado. Cero dolores técnicos.
            </span>
          </li>
          <li>
            <span>
              <strong>Listo para vender desde el día uno</strong>: no te entrego
              archivos, te entrego un negocio encendido.
            </span>
          </li>
        </ul>
      </section>

      {/* ============ EL TRATO, EXPLICADO Y JUGADO ============ */}
      <section className={sv.section} aria-labelledby="trato">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_02</span>
          <span className={home.moduleTitle}>
            lección · <strong>el trato</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <h2 id="trato" className={sv.h2}>
          Cuánto cuesta: <span>tu comunidad decide el precio</span>
        </h2>
        <p className={sv.prose}>
          El proyecto completo vale <em>$25,000 USD</em>. Puedes pagarlo y es
          100% tuyo, sin compartirme nada. Pero aquí viene lo que no te ofrece
          nadie más: <strong>si tu comunidad es grande, no necesitas pagarlo
          todo</strong>. A partir de 100,000 seguidores, yo pongo parte del
          proyecto de mi bolsa — apostándole a tu audiencia — a cambio de un
          porcentaje de las ventas. Mientras más grande tu comunidad, menos
          efectivo pones hoy: con más de un millón de seguidores puedo
          construirte todo <em>gratis</em> e ir a mitades, exactamente como hice
          con El Profe Luis y sus millones de seguidores. Tu comunidad es tu
          moneda. Muéstramela:
        </p>
        <TratoCreadores />
      </section>

      {/* ============ EL MÉTODO ============ */}
      <section className={sv.section} aria-labelledby="metodo">
        <div className={home.moduleHeader}>
          <span className={home.moduleNum}>MOD_03</span>
          <span className={home.moduleTitle}>
            lección · <strong>el método</strong>
          </span>
          <span className={home.moduleLine} />
        </div>
        <h2 id="metodo" className={sv.h2}>
          De tu conocimiento a tu academia <span>en 4 pasos</span>
        </h2>
        <p className={sv.prose}>
          Lo mismo que hice con El Profe Luis y sus más de 3 millones de
          seguidores: encontrar tu esencia y ponerla en una plataforma educativa,{" "}
          <em>como clonarte digitalmente</em> — pero con pedagogía de verdad
          detrás.
        </p>
        <MapaRuta pasos={pasos} />
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
          Preguntas que me hacen <span>todos los creadores</span>
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
