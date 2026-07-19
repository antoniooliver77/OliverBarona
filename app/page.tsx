import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import s from "./page.module.css";
import {
  CustomCursor,
  ScrollProgress,
  ScrambleText,
  GlitchText,
  Typewriter,
  Counter,
  Particles,
} from "./components/effects";
import { CharacterCard, type Character } from "./components/CharacterCard";

// Lazy load Terminal: está debajo del fold, no afecta LCP/FCP
const Terminal = dynamic(
  () => import("./components/Terminal").then((m) => m.Terminal),
  { loading: () => <div style={{ height: 320 }} /> }
);

export const metadata: Metadata = {
  title: "Oliver Barona — Diseñador Instruccional Sr.",
  description:
    "Diseñador instruccional senior. Capacitaciones, academias digitales y cursos en línea donde la gente, en verdad, aprende. Pedagogía + tecnología + sentido común. Ganador iSpring 2025.",
  alternates: { canonical: "/" },
};

const characters: Character[] = [
  {
    href: "/capacitacion-empresarial",
    sector: "empresas",
    code: "CH_01",
    id: "Líder corporativo",
    title: "Capacitación Online",
    desc: "Eres el jefe de una empresa, no importa su tamaño. Quieres capacitaciones efectivas en las que tus trabajadores, en verdad, aprendan y mejoren su productividad.",
    stats: [
      { label: "Sector", value: "B2B" },
      { label: "Nivel", value: "★★★" },
      { label: "ROI", value: "↑↑↑" },
    ],
  },
  {
    href: "/innovacion-academica",
    sector: "escuelas",
    code: "CH_02",
    id: "Visionario académico",
    title: "Academia Digital",
    desc: "Eres el encargado de una institución educativa. Sabes que debes estar a la vanguardia, pero buscas educación de calidad. Sabes que el verdadero enemigo de los estudiantes son los videos verticales.",
    stats: [
      { label: "Sector", value: "EDU" },
      { label: "Nivel", value: "★★★★" },
      { label: "Impacto", value: "MAX" },
    ],
  },
  {
    href: "/consejeria-creadores",
    sector: "creadores",
    code: "CH_03",
    id: "Divulgador en redes",
    title: "Cursos En Línea",
    desc: "Eres el héroe solitario. Tu misión es enseñar, pero lo haces casi sin ayuda. Compartir conocimiento es tu pasión, pero ahora también ya quieres monetizar y comer tres veces al día.",
    stats: [
      { label: "Sector", value: "SOLO" },
      { label: "Nivel", value: "★★★★★" },
      { label: "Modo", value: "PRO" },
    ],
  },
];

const allies = [
  "UNAM",
  "Santillana",
  "SM Ediciones",
  "Pearson",
  "Editores Mexicanos Unidos",
  "El Profe Luis",
  "Talentoría",
];

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      <main className={s.main}>
        <div className={s.shell}>
          {/* HUD TOP STRIP */}
          <div className={s.hud} role="presentation">
            <div className={s.hudLeft}>
              <span className={s.dot} />
              <span className={s.brand}>LMS_OS v2.5</span>
              <span className={s.hudPipe}>//</span>
              <span>módulo: oliver_barona.exe</span>
            </div>
            <div className={s.hudRight}>
              <span>node: mx-01</span>
              <span className={s.hudPipe}>//</span>
              <span>status: online</span>
            </div>
          </div>

          {/* HERO */}
          <header className={s.hero}>
            <div className={s.perspective} aria-hidden />
            <div className={s.sun} aria-hidden />
            <div className={s.particles}>
              <Particles density={70} />
            </div>

            <div className={s.heroInner}>
              <div className={s.heroText}>
                <span className={s.achievement}>
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Ganador del Concurso Internacional de Creación de Cursos iSpring 2025
                </span>

                <h1 className={s.h1}>
                  <span>
                    <ScrambleText text="OLIVER" duration={1100} delay={200} />
                  </span>
                  <span>
                    <GlitchText className="">BARONA</GlitchText>
                  </span>
                </h1>

                <p className={s.role}>Diseñador Instruccional Sr.</p>

                <dl className={s.heroMeta}>
                  <div>
                    <dt>Experiencia</dt>
                    <dd>
                      <Counter to={15} duration={1800} style={{ minWidth: "2ch", display: "inline-block" }} />+ años
                    </dd>
                  </div>
                  <div>
                    <dt>Proyectos</dt>
                    <dd>
                      <Counter to={120} duration={2200} style={{ minWidth: "3ch", display: "inline-block" }} />+
                    </dd>
                  </div>
                  <div>
                    <dt>Audiencia impactada</dt>
                    <dd>
                      <Counter to={3} duration={1800} style={{ minWidth: "1ch", display: "inline-block" }} />M+
                    </dd>
                  </div>
                  <div>
                    <dt>Reconocimientos</dt>
                    <dd>★ iSpring 2025</dd>
                  </div>
                </dl>
              </div>

              <div className={s.heroImageWrap} aria-hidden>
                <Image
                  src="/oliver-hero.jpg"
                  alt="Oliver Barona — Diseñador Instruccional Sr."
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 45vw"
                  className={s.heroImage}
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
                <div className={s.heroImageGlow} />
              </div>
            </div>
          </header>

          {/* MODULE 01 — MANIFIESTO */}
          <section className={s.module} aria-labelledby="m01">
            <div className={s.moduleHeader}>
              <span className={s.moduleNum}>MOD_01</span>
              <span id="m01" className={s.moduleTitle}>
                lección · <strong>el problema</strong>
              </span>
              <span className={s.moduleLine} />
            </div>

            <Typewriter
              className={s.lede}
              speed={14}
              segments={[
                { text: "Vamos a ponernos de acuerdo: Tú estás buscando algún tipo de " },
                { text: "capacitación", color: "var(--neon-orange)" },
                { text: ", la que sea: " },
                { text: "en línea", color: "var(--neon-cyan)" },
                { text: ", " },
                { text: "presencial", color: "var(--neon-cyan)" },
                { text: ", para tus " },
                { text: "hijos", color: "var(--fg)" },
                { text: ", tus " },
                { text: "alumnos", color: "var(--fg)" },
                { text: ", tus " },
                { text: "trabajadores", color: "var(--neon-orange)" },
                { text: ", tu " },
                { text: "público", color: "var(--neon-orange)" },
                { text: "." },
              ]}
            />

            <h2 className={s.statement}>
              En fin, que buscas que <span>alguien aprenda algo.</span>
            </h2>

            <p className={s.defProse}>
              Para que esto suceda, hay que crearla y para que sea{" "}
              <strong>útil</strong> (para que{" "}
              <span className={s.accentOrange}>en verdad alguien aprenda</span>
              ), esa formación necesita{" "}
              <strong className={s.accentOrange}>Diseño Instruccional</strong>.
            </p>

            <div className={s.defs}>
              <article className={`${s.defCard} ${s.cyan}`}>
                <p className={s.defLabel}>
                  {"> ¿qué es el diseño instruccional?"}
                </p>
                <p className={s.defText}>
                  Pues es{" "}
                  <strong className={s.accentCyan}>"eso"</strong>{" "}
                  que une pedagogía, tecnología, experiencia,
                  pensamiento crítico y dos kilos de{" "}
                  <strong className={s.accentOrangeGlow}>sentido común</strong>,
                  para lograr que los
                  estudiantes/hijos/trabajadores/
                  <strong className={s.accentOrange}>tú misma</strong>/
                  <strong className={s.accentPurple}>tú mismo</strong> en verdad
                  aprendan.
                </p>
              </article>
            </div>
          </section>

          {/* PHASE TRANSITION */}
          <div className={s.phaseTransition} aria-hidden>
            <span className={s.phaseComplete}>FASE_01 · COMPLETA</span>
            <div className={s.phaseBar}><div className={s.phaseBarFill} /></div>
            <span className={s.phaseNext}>▶ INICIANDO · SIMULACIÓN</span>
          </div>

          {/* MODULE 02 — CHARACTER SELECT */}
          <section className={s.select} aria-labelledby="m02">
            <Typewriter
              className={s.selectIntro}
              speed={12}
              segments={[
                { text: "Ya con esto tienes " },
                { text: "lo más importante", color: "var(--neon-orange)" },
                { text: ", pero como no toda la educación es igual," },
                { text: " vamos a jugar", color: "var(--neon-cyan)" },
                { text: " un poco: Selecciona el personaje que más se parece a ti." },
              ]}
            />
            <h2 id="m02" className={s.selectTitle}>
              <small>[ iniciando simulación ]</small>
              Selecciona tu personaje
            </h2>

            <nav
              className={s.cards}
              aria-label="Rutas de capacitación y diseño instruccional"
            >
              {characters.map((c, i) => (
                <CharacterCard key={c.href} c={c} index={i} />
              ))}
            </nav>
          </section>

          {/* MODULE 03 — REVIEW */}
          <section className={s.review} aria-labelledby="m03">
            <div className={s.moduleHeader}>
              <span className={s.moduleNum}>MOD_03</span>
              <span id="m03" className={s.moduleTitle}>
                lección · <strong>prueba social</strong>
              </span>
              <span className={s.moduleLine} />
            </div>

            <div className={s.reviewBox}>
              <div className={s.stars} aria-label="5 estrellas">
                ★ ★ ★ ★ ★
              </div>
              <blockquote className={s.quote}>
                "Oliver logró encontrar mi esencia y ponerla en una plataforma
                educativa. Es como si me hubieran clonado digitalmente y ahora
                pudiera compartir mis conocimientos, pero con muchísima
                tecnología detrás respaldando a mi comunidad."
              </blockquote>
              <div className={s.reviewMeta}>
                <div className={s.author}>
                  <span className={s.authorName}>El Profe Luis</span>
                  <span className={s.authorRole}>
                    Divulgador · Cliente verificado
                  </span>
                </div>
                <div className={s.reviewStat}>
                  <div className={s.reviewStatNum}>
                    <Counter to={3000000} duration={2400} />+
                  </div>
                  <div className={s.reviewStatLabel}>seguidores</div>
                </div>
              </div>

              <a href="/portafolio" className={s.cta}>
                Ejecutar protocolo · ver portafolio
              </a>
            </div>
          </section>

          {/* TICKER ALIANZAS */}
          <div className={s.tickerWrap} aria-label="Alianzas">
            <span className={s.tickerLabel}>
              alianzas en los últimos 15 años de experiencia
            </span>
            <div className={s.ticker}>
              {[...allies, ...allies, ...allies].map((a, i) => (
                <span key={i} className={s.tickerItem}>
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* CONSOLE FOOTER */}
          <section className={s.console} aria-label="Consola interactiva">
            <p className={s.consoleTitle}>
              {">"} extra · <strong>consola interactiva</strong> · escribe{" "}
              <span style={{ color: "var(--neon-cyan)" }}>help</span> para
              empezar
            </p>
            <Terminal />
          </section>

          <footer className={s.footer}>
            © {new Date().getFullYear()} Oliver Barona ·{" "}
            <span>hecho con código</span> · LMS_OS v2.5
          </footer>
        </div>
      </main>
    </>
  );
}
