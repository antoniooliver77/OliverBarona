import type { Metadata } from "next";
import home from "../page.module.css";
import sv from "../servicio.module.css";
import pf from "./portafolio.module.css";
import { PageShell } from "../components/PageShell";
import { waLink } from "../lib/contacto";

export const metadata: Metadata = {
  title: "Portafolio: cursos y juegos que puedes abrir y probar",
  description:
    "Tres proyectos reales y dos juegos propios que se abren en tu navegador: academias, lecciones con historia, simuladores y juegos didácticos. Pruébalos tú.",
  alternates: { canonical: "/portafolio" },
};

const SITE = "https://oliverbarona.com";

const portafolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Portafolio de Oliver Barona",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "CreativeWork",
        name: "Nova Insurance Academy",
        description:
          "Academia digital de cursos en línea para preparar exámenes de licencia en seguros.",
        creator: { "@type": "Person", name: "Oliver Barona", url: SITE },
        url: `${SITE}/portafolio`,
        review: {
          "@type": "Review",
          author: { "@type": "Organization", name: "Nova Insurance Academy" },
          reviewBody:
            "Nuestra academia ha sido un éxito tanto económico como educativo, gracias a su gran labor pedagógica.",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "CreativeWork",
        name: "Talentoría — Academia de reclutamiento y selección con IA",
        description:
          "Academia en línea con cientos de lecciones, juegos y videos para formar reclutadores en inteligencia artificial.",
        creator: { "@type": "Person", name: "Oliver Barona", url: SITE },
        url: `${SITE}/portafolio`,
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "VideoGame",
        name: "CAJA 07 — Simulador de punto de venta",
        description:
          "Simulador gamificado de caja de supermercado: códigos PLU, escaneo, cobro con cambio y clientes con paciencia limitada.",
        creator: { "@type": "Person", name: "Oliver Barona", url: SITE },
        url: `${SITE}/demos/lab-simulador-caja.html`,
        gamePlatform: "Web",
        inLanguage: "es-MX",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "VideoGame",
        name: "EL VISTO BUENO — Juego de liderazgo y accountability",
        description:
          "Juego de decisiones: un jefe nuevo aprueba o rechaza solicitudes contra un reglamento que cambia cada día, con reloj, citaciones y dilemas de poder.",
        creator: { "@type": "Person", name: "Oliver Barona", url: SITE },
        url: `${SITE}/demos/lab-juego-liderazgo.html`,
        gamePlatform: "Web",
        inLanguage: "es-MX",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "CreativeWork",
        name: "El Profe Luis — Matemáticas con juegos de refuerzo",
        description:
          "Lecciones de matemáticas para secundaria y preparatoria con juegos integrados, en elprofeluis.com.",
        creator: { "@type": "Person", name: "Oliver Barona", url: SITE },
        url: `${SITE}/portafolio`,
        review: {
          "@type": "Review",
          author: { "@type": "Person", name: "El Profe Luis" },
          reviewBody:
            "Oliver logró encontrar mi esencia y ponerla en una plataforma educativa.",
        },
      },
    },
  ],
};

export default function PortafolioPage() {
  return (
    <PageShell modulo="portafolio.exe">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portafolioJsonLd) }}
      />

      <header className={sv.head}>
        <span className={sv.code}>PORTAFOLIO</span>
        <h1 className={sv.title}>
          Aquí no te cuento mi trabajo: <span>te dejo usarlo</span>
        </h1>
        <p className={sv.lede}>
          Un portafolio normal te enseña fotos bonitas de proyectos
          terminados. Este funciona distinto: cada proyecto de esta página
          incluye lecciones y juegos reales que construí, y los puedes abrir
          ahora mismo en tu navegador — para tomarlos tal como los tomaría
          un alumno y juzgar con tus propios dedos si están tan bien hechos
          como digo.
        </p>
      </header>

      <section className={sv.section} id="proyectos">
        <h2 className={sv.h2}>Hice tres proyectos para tres clientes muy distintos</h2>
        <p className={sv.prose}>
          Una empresa que vende cursos en línea para pasar los exámenes de
          licencia de seguros. Una consultora de recursos humanos que quería
          convertir sus años de experiencia reclutando en una academia. Y un
          maestro de matemáticas con millones de seguidores que necesitaba
          una plataforma propia para sus clases. Tres públicos que no se
          parecen en nada — y el mismo método pedagógico detrás.
        </p>
        <p className={sv.prose}>
          De cada proyecto te cuento qué necesitaba el cliente, qué construí
          y qué lleva adentro; al final de cada uno hay botones para abrir
          muestras reales del trabajo. No es el producto completo, porque
          ese es del cliente, pero sí son lecciones y juegos tal cual los ve
          un alumno, abiertos dentro de un aula virtual como la que tendría
          tu proyecto. Ábrelos — para eso los puse.
        </p>
      </section>

      {/* LABORATORIO */}
      <section className={sv.section}>
        <h2 className={sv.h2}>
          ¿Un curso puede ser un videojuego de verdad? Hice dos para
          demostrarlo
        </h2>
        <p className={sv.prose}>
          Cuando digo que un curso puede tener personajes, conflicto,
          puntaje y finales distintos, la gente suele imaginarse un examen
          con dibujitos. Así que construí estos dos juegos — no son de
          ningún cliente, son míos — para que lo compruebes jugando: uno
          entrena una habilidad de piso (cobrar en la caja de un súper) y el
          otro pone a prueba cómo decides cuando eres el jefe. Los dos se
          juegan aquí mismo, en tu navegador, y los dos te dicen al final
          qué aprendiste.
        </p>
        <div className={pf.lab}>
          <article className={pf.labCard}>
            <div className={pf.labArte} aria-hidden="true">🛒⌨️💵</div>
            <div className={pf.labCuerpo}>
              <span className={pf.labMeta}>SIMULADOR OPERATIVO · HABILIDAD + MEMORIA</span>
              <h3>CAJA 07 — punto de venta</h3>
              <p>
                Es tu primer turno como cajero, y la estación es una caja de
                verdad: la banda corre, el escáner dispara su láser rojo con
                cada bip y el ticket se imprime en una pantallita verde de
                registradora. Memoriza los códigos de las frutas, escanea
                con ritmo para que el combo crezca y da el cambio exacto —
                todo mientras la paciencia del cliente se agota frente a ti.
              </p>
              <ul className={pf.labMecanicas}>
                <li>Códigos PLU reales que se desbloquean por nivel</li>
                <li>Puntos, combos ×4 y racha — un error te la rompe</li>
                <li>Clientes con paciencia que se van si tardas</li>
                <li>Cobro real: efectivo con cambio exacto o tarjeta</li>
                <li>Corte de caja con repaso personalizado de errores</li>
              </ul>
            </div>
            <a
              className={pf.labJugar}
              href="/demos/lab-simulador-caja.html"
              target="_blank"
              rel="noopener"
            >
              Jugar CAJA 07 →
            </a>
          </article>
          <article className={pf.labCard}>
            <div className={pf.labArte} aria-hidden="true">📄🔴🔵</div>
            <div className={pf.labCuerpo}>
              <span className={pf.labMeta}>JUEGO DE DECISIONES · LIDERAZGO Y ACCOUNTABILITY</span>
              <h3>EL VISTO BUENO — el sello es tuyo</h3>
              <p>
                Acabas de ascender a jefe, y tu oficina es un escritorio de
                madera con dos sellos y un reglamento en tablilla: cada
                solicitud que llega — vacaciones, vales, horas extra — se
                azota con APROBADO o RECHAZADO según reglas que cambian
                todos los días, con el reloj encima y las citaciones cayendo
                en papelito rosa cuando te equivocas. Suena fácil, hasta que
                el papel llega con un post-it de tu propio director
                pidiéndote que te hagas de la vista gorda.
              </p>
              <ul className={pf.labMecanicas}>
                <li>Encuentra qué solicitudes violan el reglamento del día</li>
                <li>Cada error es una citación — con tres, te corren</li>
                <li>2 charlas por día para los casos que un sello no resuelve</li>
                <li>Dilemas de poder, consecuencias tardías y varios finales</li>
              </ul>
            </div>
            <a
              className={pf.labJugar}
              href="/demos/lab-juego-liderazgo.html"
              target="_blank"
              rel="noopener"
            >
              Jugar EL VISTO BUENO →
            </a>
          </article>
        </div>
        <p className={sv.prose}>
          Cada uno se diseñó y programó en cuestión de días, con mi método y
          con inteligencia artificial en la producción. Ahora imagínalos con
          tus códigos, tus procesos y los dilemas reales de tu gente.
        </p>
      </section>

      {/* CASO 01 · NOVA */}
      <section className={sv.section}>
        <h2 className={sv.h2}>Caso 1 · Nova Insurance Academy</h2>
        <p className={sv.prose}>
          Nova vende cursos para aprobar los exámenes de licencia en
          seguros, y su problema nunca fue la falta de contenido — de eso
          sobraba — sino que el contenido técnico, tal como estaba, se leía
          como un reglamento. Un alumno que necesita aprobar un examen no
          necesita un documento: necesita una ruta.
        </p>
        <div className={pf.ficha}>
          <div className={pf.fichaDato}>
            <span className={pf.fichaEtiqueta}>Tipo</span>
            <span className={pf.fichaValor}>
              Academia en línea para exámenes de licencia
            </span>
          </div>
          <div className={pf.fichaDato}>
            <span className={pf.fichaEtiqueta}>Para quién</span>
            <span className={pf.fichaValor}>
              Alumnos que deben aprobar un examen y formarse en seguros
            </span>
          </div>
          <div className={pf.fichaDato}>
            <span className={pf.fichaEtiqueta}>Lo que buscaban</span>
            <span className={pf.fichaValor}>
              Vender cursos estructurados y elevar la preparación del alumno
            </span>
          </div>
        </div>
        <p className={sv.prose}>
          Construí lecciones que se cuentan como historias: el tema no
          empieza con una definición, sino con un caso — un empleado que se
          lesiona, una casa que se incendia — y a partir de esa historia se
          desarrolla por bloques hasta cerrar con ejemplos y práctica. Cada
          lección es multimedia de verdad: abre con un video, cierra con un
          podcast de repaso para el camino y, en medio, los temas más áridos
          llevan su propia calculadora para que el alumno practique con
          números reales en lugar de memorizar fórmulas.
        </p>
        <figure className={pf.cita}>
          <blockquote>
            &ldquo;Nuestra academia ha sido un éxito tanto económico como
            educativo, gracias a su gran labor pedagógica.&rdquo;
          </blockquote>
          <figcaption>Nova Insurance Academy</figcaption>
        </figure>
        <p className={pf.notaDemo}>
          Estas dos lecciones son reales y se abren dentro del campus
          virtual de la academia, tal como las estudia un alumno. Los videos
          y podcasts originales pertenecen a Nova, así que en su lugar verás
          un aviso donde irían — todo lo demás es la lección completa:
        </p>
        <div className={pf.demoCards}>
          <a
            className={pf.demoCard}
            href="/demos/nova-leccion-workers-compensation.html"
            target="_blank"
            rel="noopener"
          >
            <span className={pf.demoTag}>LECCIÓN COMPLETA</span>
            <b>Compensación para trabajadores</b>
            <span>
              Un tema árido del examen de licencia, contado con historia,
              calculadora de indemnizaciones y evaluación.
            </span>
          </a>
          <a
            className={pf.demoCard}
            href="/demos/nova-leccion-polizas-vivienda.html"
            target="_blank"
            rel="noopener"
          >
            <span className={pf.demoTag}>LECCIÓN COMPLETA</span>
            <b>Tipos de pólizas de vivienda</b>
            <span>
              Quién corre el riesgo en cada póliza — con casos, comparativas
              y práctica al cierre.
            </span>
          </a>
        </div>
      </section>

      {/* CASO 02 · TALENTORÍA */}
      <section className={sv.section}>
        <h2 className={sv.h2}>Caso 2 · Talentoría</h2>
        <p className={sv.prose}>
          Talentoría lleva años reclutando y seleccionando talento para
          otras empresas, y en ese oficio acumuló lo que no se compra en
          ningún lado: criterio real, de miles de contrataciones. Su
          necesidad era convertir todo ese conocimiento en algo que pudiera
          compartirse — no un manual dormido en un cajón, sino una academia
          en línea que le enseñara a otros reclutadores a trabajar con
          inteligencia artificial igual de bien que ellos.
        </p>
        <div className={pf.ficha}>
          <div className={pf.fichaDato}>
            <span className={pf.fichaEtiqueta}>Tipo</span>
            <span className={pf.fichaValor}>
              Academia en línea de reclutamiento y selección con IA
            </span>
          </div>
          <div className={pf.fichaDato}>
            <span className={pf.fichaEtiqueta}>Para quién</span>
            <span className={pf.fichaValor}>
              Reclutadores, generalistas de RH y líderes que seleccionan
            </span>
          </div>
          <div className={pf.fichaDato}>
            <span className={pf.fichaEtiqueta}>Lo que buscaban</span>
            <span className={pf.fichaValor}>
              Convertir años de experiencia en un curso a la altura de su
              reputación
            </span>
          </div>
        </div>
        <p className={sv.prose}>
          Construí con ellos su academia y el curso de reclutamiento y
          selección con inteligencia artificial más ambicioso que he
          producido: cientos de lecciones organizadas en módulos, con
          videos, juegos, actividades interactivas y evaluaciones que miden
          criterio — qué decides frente a un caso — y no memoria. El curso
          tiene además su propio universo narrativo: un curador con oficio
          que acompaña al participante y un villano, BIASED.exe, que aparece
          justo cuando el tema se presta para tomar un atajo equivocado.
        </p>
        <p className={pf.notaDemo}>
          Esta es una de los cientos de lecciones del curso, abierta dentro
          del aula virtual de la academia — el temario del lado izquierdo te
          da una idea del tamaño real del proyecto:
        </p>
        <div className={pf.demoCards}>
          <a
            className={pf.demoCard}
            href="/demos/talentoria-perfilamiento-vacantes-ia.html"
            target="_blank"
            rel="noopener"
          >
            <span className={pf.demoTag}>LECCIÓN COMPLETA · CON SU VILLANO</span>
            <b>Perfilamiento de vacantes con IA</b>
            <span>
              Por qué el perfil que pide &ldquo;pasión y ADN innovador&rdquo;
              atrae puros CVs equivocados — y cómo escribir el correcto, sin
              sesgos.
            </span>
          </a>
        </div>
      </section>

      {/* CASO 03 · PROFE LUIS */}
      <section className={sv.section}>
        <h2 className={sv.h2}>Caso 3 · El Profe Luis</h2>
        <p className={sv.prose}>
          El Profe Luis explica matemáticas a más de 3 millones de personas
          en redes sociales, y quería compartir todo su conocimiento en un
          lugar propio: una plataforma donde sus clases vivieran completas y
          ordenadas, con su forma de hablar y de enseñar. El reto era
          trasladar esa cercanía a una plataforma sin que se convirtiera en
          el material escolar del que sus alumnos justamente huyen.
        </p>
        <div className={pf.ficha}>
          <div className={pf.fichaDato}>
            <span className={pf.fichaEtiqueta}>Tipo</span>
            <span className={pf.fichaValor}>
              Lecciones de matemáticas con juegos de refuerzo
            </span>
          </div>
          <div className={pf.fichaDato}>
            <span className={pf.fichaEtiqueta}>Para quién</span>
            <span className={pf.fichaValor}>
              Alumnos de secundaria y preparatoria
            </span>
          </div>
          <div className={pf.fichaDato}>
            <span className={pf.fichaEtiqueta}>Lo que buscaba</span>
            <span className={pf.fichaValor}>
              Explicar el concepto y convertir la práctica en algo jugable
            </span>
          </div>
        </div>
        <p className={sv.prose}>
          Diseñé una estructura de dos tiempos: primero la lección presenta
          el tema con la voz del Profe — explicación, contexto, ejemplos y
          humor —, y enseguida el alumno pasa a un juego hecho a la medida
          de ese tema, para practicar jugando lo que acaba de entender. El
          resultado en la plataforma se siente como estar en clase con él, y
          esa cercanía — que la gente sienta que trabaja con el Profe y no
          con un libro digital — fue el requisito número uno del diseño.
        </p>
        <figure className={pf.cita}>
          <blockquote>
            &ldquo;Oliver logró encontrar mi esencia y ponerla en una
            plataforma educativa.&rdquo;
          </blockquote>
          <figcaption>
            El Profe Luis — divulgador educativo, más de 3 millones de
            seguidores
          </figcaption>
        </figure>
        <p className={pf.notaDemo}>
          Así quedó integrado en elprofeluis.com, con su navegación y su
          identidad:
        </p>
        <div className={pf.capturas}>
          <figure className={pf.captura}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/profeluis-integracion-leccion.png"
              alt="Lección integrada en elprofeluis.com con banner superior, índice lateral por temas y el contenido de clase en el área principal"
              loading="lazy"
            />
            <figcaption>
              La lección dentro de la plataforma: banner, índice lateral y
              contenido de clase.
            </figcaption>
          </figure>
          <figure className={pf.captura}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/profeluis-integracion-radar.png"
              alt="Actividad Astro-Radar colocada como refuerzo dentro de la lección, después de la explicación del tema"
              loading="lazy"
            />
            <figcaption>
              El Astro-Radar como refuerzo, justo después de la explicación.
            </figcaption>
          </figure>
          <figure className={pf.captura}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/profeluis-integracion-burbujas.png"
              alt="Juego Burbujas de la Recta integrado como recurso de práctica, manteniendo el índice lateral y la identidad de la plataforma"
              loading="lazy"
            />
            <figcaption>
              Burbujas de la Recta como práctica, sin salirse de la
              identidad del sitio.
            </figcaption>
          </figure>
        </div>
        <p className={pf.notaDemo}>
          La primera clase del curso completa — con el Astro-Radar integrado
          al final, como lo vive el alumno — y un segundo juego para el tema
          de la recta numérica. Se disfrutan más en computadora:
        </p>
        <div className={pf.demoCards}>
          <a
            className={pf.demoCard}
            href="/demos/profeluis-leccion-numeros.html"
            target="_blank"
            rel="noopener"
          >
            <span className={pf.demoTag}>LECCIÓN + SU JUEGO INTEGRADO</span>
            <b>¿Qué rayos es un número?</b>
            <span>
              La primera clase del curso con la voz del Profe, que remata
              con el Astro-Radar como práctica jugable.
            </span>
          </a>
          <a
            className={pf.demoCard}
            href="/demos/profeluis-juego-burbujas.html"
            target="_blank"
            rel="noopener"
          >
            <span className={pf.demoTag}>JUEGO DE PRÁCTICA</span>
            <b>Burbujas de la Recta</b>
            <span>
              Revienta las burbujas ubicando números en la recta antes de
              que se te vayan.
            </span>
          </a>
        </div>
      </section>

      {/* QUÉ DEMUESTRA + CTA */}
      <section className={sv.section}>
        <h2 className={sv.h2}>Tres públicos distintos, el mismo método</h2>
        <p className={sv.prose}>
          Un adulto estudiando para una licencia de seguros, un reclutador
          revisando sus propios sesgos y un chavo de secundaria peleándose
          con la recta numérica no se parecen en nada, y sin embargo los
          tres proyectos repiten la misma estructura: nombrar el problema,
          dar de qué agarrarse y terminar en algo que se hace, no que se
          lee. Eso — más que cualquier herramienta — es lo que vendo.
        </p>
        <div className={sv.ctaPanel}>
          <p className={sv.ctaPanelTitle}>
            Ya viste el trabajo: ahora hablemos del tuyo
          </p>
          <p className={sv.ctaPanelSub}>
            Cuéntame qué quieres enseñar y a quién. Si tu proyecto se parece
            a alguno de estos, te digo cómo lo abordaría y qué tendrías
            funcionando primero.
          </p>
          <div className={sv.ctaRow}>
            <a href="/contacto" className={home.cta}>
              Iniciar contacto
            </a>
            <a
              href={waLink(
                "Hola Oliver, vi tu portafolio y quiero platicar sobre mi proyecto."
              )}
              className={sv.whatsapp}
              target="_blank"
              rel="noopener"
            >
              WhatsApp directo
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
