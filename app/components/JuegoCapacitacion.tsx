"use client";

import { useState } from "react";
import s from "./JuegoCapacitacion.module.css";
import home from "../page.module.css";

/* ============================================================
   BOSS BATTLE — LA CAPACITACIÓN INÚTIL
   5 amenazas, 5 armas. El jugador aprende, jugando, con qué
   ataco sus necesidades de capacitación.
   ============================================================ */

type Arma =
  | "Diagnóstico"
  | "Pensamiento crítico"
  | "Storytelling"
  | "Pedagogía avanzada"
  | "Neuroeducación";

const ARMAS: Arma[] = [
  "Diagnóstico",
  "Pensamiento crítico",
  "Storytelling",
  "Pedagogía avanzada",
  "Neuroeducación",
];

type Amenaza = {
  nombre: string;
  desc: string;
  arma: Arma;
  golpe: string; // por qué esa arma la derrota
  pista: string; // hint cuando fallan
};

const AMENAZAS: Amenaza[] = [
  {
    nombre: "La Niebla",
    desc: "Algo falla en el desempeño de tu equipo, pero nadie sabe exactamente qué. Alguien ya propuso comprar un curso de Excel «por si acaso».",
    arma: "Diagnóstico",
    golpe:
      "No se puede atacar lo que no se ve. Primero mido: qué sabe tu gente, qué necesita saber y qué le estorba para lograrlo. La niebla se disipa con datos, no con corazonadas.",
    pista:
      "El arma es buena… pero estás disparando a ciegas. ¿No convendría averiguar primero qué está pasando?",
  },
  {
    nombre: "El Vendedor de Humo",
    desc: "Aparece con la solución de moda: «todos necesitan un curso de IA, gamificado, en el metaverso». Suena increíble. No resuelve nada.",
    arma: "Pensamiento crítico",
    golpe:
      "Separo la evidencia de la moda: qué funciona, qué es humo y qué le sirve a TU operación. La tecnología es herramienta, no propósito.",
    pista:
      "Golpe válido, pero este enemigo se derrota con preguntas incómodas: ¿dónde está la evidencia de que eso funciona?",
  },
  {
    nombre: "El Bostezo Infinito",
    desc: "Tu equipo abre el curso: 40 diapositivas con voz robótica. Para la número 6 ya están contestando WhatsApp.",
    arma: "Storytelling",
    golpe:
      "Nadie recuerda diapositivas: recuerdan historias. Convierto tu contenido en una trama con personajes, conflicto y resolución — un curso que la gente quiere terminar.",
    pista:
      "Casi. Este enemigo se alimenta de contenido sin alma. ¿Qué hace que alguien no pueda soltar una serie a las 2 a.m.?",
  },
  {
    nombre: "El Olvido Exprés",
    desc: "Terminaron el curso el viernes. El lunes no recuerdan ni el título. Para el mes siguiente, jurarían que nunca lo tomaron.",
    arma: "Neuroeducación",
    golpe:
      "Diseño con el cerebro a favor: atención, emoción y memoria. Práctica espaciada, recuperación activa y emoción bien usada para que lo aprendido se quede a vivir.",
    pista:
      "Este enemigo ataca directo a la memoria. Hay una ciencia que estudia exactamente cómo aprende (y olvida) el cerebro…",
  },
  {
    nombre: "El Simulacro",
    desc: "Todos aprobaron el examen final con 10. Nadie cambió nada en su trabajo. El indicador brilla; el desempeño, no.",
    arma: "Pedagogía avanzada",
    golpe:
      "Aprobar no es aprender. Alineo objetivos, práctica real y evaluación auténtica: evidencia de desempeño, no de memorización de trivia. Eso es diseño instruccional.",
    pista:
      "Este enemigo sobrevive a exámenes de opción múltiple. Se derrota con diseño: objetivos, práctica y evaluación que sí midan el trabajo real.",
  },
];

type Fase = "inicio" | "batalla" | "victoria";

export function JuegoCapacitacion() {
  const [fase, setFase] = useState<Fase>("inicio");
  const [ronda, setRonda] = useState(0);
  const [fallos, setFallos] = useState(0);
  const [feedback, setFeedback] = useState<"hit" | "miss" | null>(null);
  const [armaFallida, setArmaFallida] = useState<Arma | null>(null);
  const [shake, setShake] = useState(false);

  const amenaza = AMENAZAS[ronda];
  const derrotadas = ronda + (feedback === "hit" ? 1 : 0);

  const atacar = (arma: Arma) => {
    if (feedback === "hit") return;
    if (arma === amenaza.arma) {
      setFeedback("hit");
      setArmaFallida(null);
    } else {
      setFallos((f) => f + 1);
      setArmaFallida(arma);
      setFeedback("miss");
      setShake(true);
      window.setTimeout(() => setShake(false), 400);
    }
  };

  const siguiente = () => {
    if (ronda + 1 >= AMENAZAS.length) {
      setFase("victoria");
    } else {
      setRonda((r) => r + 1);
      setFeedback(null);
      setArmaFallida(null);
    }
  };

  const reiniciar = () => {
    setFase("batalla");
    setRonda(0);
    setFallos(0);
    setFeedback(null);
    setArmaFallida(null);
  };

  const rango = fallos === 0 ? "S" : fallos <= 2 ? "A" : "B";
  const rangoTexto =
    rango === "S"
      ? "Perfecto. Ni un golpe fallado: contigo esto va a ser rápido."
      : rango === "A"
        ? "Gran combate. Un par de golpes al aire, como en toda empresa real."
        : "Amenazas neutralizadas — a base de prueba y error, que también es aprender.";

  return (
    <div className={s.game} data-cursor="hover">
      {/* Barra superior */}
      <div className={s.bar}>
        <span className={s.barTitle}>BOSS BATTLE · la capacitación inútil</span>
        <span className={s.barScore}>
          {fase === "batalla"
            ? `amenazas: ${derrotadas}/${AMENAZAS.length}`
            : fase === "victoria"
              ? "nivel completado"
              : "insert coin"}
        </span>
      </div>

      <div className={s.inner}>
        {/* ---- INICIO ---- */}
        {fase === "inicio" && (
          <div className={s.screen}>
            <p className={s.screenKicker}>⚠ 5 amenazas detectadas</p>
            <h3 className={s.screenTitle}>Conoce mi arsenal — jugando</h3>
            <p className={s.screenText}>
              Tu empresa enfrenta <strong>5 amenazas de capacitación</strong>.
              Yo peleo con 5 armas: diagnóstico, pensamiento crítico,
              storytelling, pedagogía avanzada y neuroeducación. Tu misión:
              elegir el arma correcta contra cada amenaza. Te toma 2 minutos —
              y sí, esto también es una lección.
            </p>
            <button className={s.start} onClick={() => setFase("batalla")}>
              ▶ Iniciar combate
            </button>
          </div>
        )}

        {/* ---- BATALLA ---- */}
        {fase === "batalla" && (
          <div>
            <div
              className={`${s.enemy} ${shake ? s.enemyShake : ""} ${
                feedback === "hit" ? s.enemyDying : ""
              }`}
            >
              <p className={s.enemyLabel}>
                amenaza {String(ronda + 1).padStart(2, "0")}/
                {String(AMENAZAS.length).padStart(2, "0")}
              </p>
              <h3 className={s.enemyName}>{amenaza.nombre}</h3>
              <p className={s.enemyDesc}>{amenaza.desc}</p>
              <div className={s.hpWrap}>
                <span>hp</span>
                <div className={s.hpBar}>
                  <div
                    className={s.hpFill}
                    style={{ width: feedback === "hit" ? "0%" : "100%" }}
                  />
                </div>
              </div>
            </div>

            <p className={s.arsenalLabel}>
              {">"} elige tu arma <strong>[ decisión ]</strong>
            </p>
            <div className={s.arsenal}>
              {ARMAS.map((a) => (
                <button
                  key={a}
                  className={s.weapon}
                  onClick={() => atacar(a)}
                  disabled={feedback === "hit"}
                >
                  {a}
                </button>
              ))}
            </div>

            {feedback === "miss" && (
              <div className={`${s.feedback} ${s.feedbackMiss}`} role="status">
                <span className={s.feedbackTag} style={{ color: "var(--neon-orange)" }}>
                  ✕ {armaFallida} — la amenaza resiste
                </span>
                {amenaza.pista}
              </div>
            )}

            {feedback === "hit" && (
              <div className={`${s.feedback} ${s.feedbackHit}`} role="status">
                <span className={s.feedbackTag} style={{ color: "var(--neon-cyan)" }}>
                  ✓ golpe crítico con {amenaza.arma}
                </span>
                {amenaza.golpe}
                <div>
                  <button className={s.next} onClick={siguiente}>
                    {ronda + 1 >= AMENAZAS.length
                      ? "Terminar combate →"
                      : "Siguiente amenaza →"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---- VICTORIA ---- */}
        {fase === "victoria" && (
          <div className={s.screen}>
            <div className={s.rank}>{rango}</div>
            <h3 className={s.screenTitle}>Nivel completado</h3>
            <p className={s.screenText}>{rangoTexto}</p>
            <p className={s.victoryQuote}>
              Antes no sabías cómo íbamos a resolver tus necesidades de
              capacitación. <em>Ahora lo sabes.</em> Y lo aprendiste jugando,
              en dos minutos. Imagina lo que podemos lograr con un proyecto
              completo, enfocado en tu empresa.
            </p>
            <a href="/contacto" className={home.cta}>
              Iniciar proyecto real
            </a>
            <p style={{ marginTop: "1.5rem" }}>
              <button
                className={s.start}
                style={{ animation: "none" }}
                onClick={reiniciar}
              >
                ↻ jugar de nuevo
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
