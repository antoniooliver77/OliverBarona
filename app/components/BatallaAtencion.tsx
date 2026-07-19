"use client";

import { useEffect, useRef, useState } from "react";
import s from "./BatallaAtencion.module.css";
import home from "../page.module.css";

/* ============================================================
   LA BATALLA POR LA ATENCIÓN
   Los videos verticales atacan tu salón. Espantarlos con clics
   funciona cada vez menos (prohibir no sirve). Tus soluciones
   transforman el salón en vivo — y eso sí gana la batalla.
   ============================================================ */

const W = 760;
const H = 372;
const LECCION_MS = 68000; // duración de la lección (barra de victoria)

type Solucion = {
  id: string;
  nombre: string;
  efecto: string; // frase grande
  detalle: string; // qué cambia en el juego
  desbloqueo: number; // ms de partida
};

const SOLUCIONES: Solucion[] = [
  {
    id: "curso",
    nombre: "CURSO REDISEÑADO",
    efecto: "La pizarra deja de ser un PDF.",
    detalle:
      "El contenido se vuelve una misión con historia. La atención de toda la clase empieza a recuperarse sola.",
    desbloqueo: 8000,
  },
  {
    id: "metodologia",
    nombre: "METODOLOGÍA ACTIVA",
    efecto: "Las filas se vuelven equipos.",
    detalle:
      "El salón se reorganiza en círculos de trabajo. Los videos hipnotizan la mitad de rápido: la clase se sostiene entre sí.",
    desbloqueo: 24000,
  },
  {
    id: "evaluacion",
    nombre: "EVALUACIÓN AUTÉNTICA",
    efecto: "El examen se vuelve un reto real.",
    detalle:
      "Los hipnotizados despiertan de golpe: un desafío con sentido puede más que cualquier scroll.",
    desbloqueo: 40000,
  },
  {
    id: "academia",
    nombre: "ACADEMIA COMPLETA",
    efecto: "Todo el sistema, funcionando junto.",
    detalle:
      "Cursos + metodología + evaluación integrados: los videos rebotan y la lección acelera hacia el final.",
    desbloqueo: 54000,
  },
];

type Estudiante = {
  x: number;
  y: number; // posición actual (lerp hacia tx,ty)
  tx: number;
  ty: number;
  atencion: number; // 0-100
  hipno: boolean;
  hipnoT: number; // tiempo hipnotizado (para auto-despertar)
  fuera: boolean;
  tono: number; // variación de color
};

type Video = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  objetivo: number; // índice de estudiante
  pegado: boolean;
  huyendo: boolean;
  rot: number;
  dead?: boolean;
};

type Part = { x: number; y: number; vx: number; vy: number; life: number; color: string };

type G = {
  t: number;
  leccion: number; // 0..1
  ests: Estudiante[];
  vids: Video[];
  parts: Part[];
  spawnT: number;
  spawnBase: number;
  manotazos: number;
  activas: Set<string>;
  paused: boolean;
  over: boolean;
  win: boolean;
  shake: number;
};

/* filas 4x2 (antes de metodología) */
const posFilas = (i: number) => ({
  x: 130 + (i % 4) * 140,
  y: 196 + Math.floor(i / 4) * 86,
});
/* círculos de equipo (después de metodología) */
const posCirculos = (i: number) => {
  const grupo = i < 4 ? 0 : 1;
  const ang = ((i % 4) / 4) * Math.PI * 2 + Math.PI / 4;
  return {
    x: (grupo === 0 ? 230 : 530) + Math.cos(ang) * 60,
    y: 238 + Math.sin(ang) * 44,
  };
};

const nuevoJuego = (): G => ({
  t: 0,
  leccion: 0,
  ests: Array.from({ length: 8 }, (_, i) => ({
    ...posFilas(i),
    tx: posFilas(i).x,
    ty: posFilas(i).y,
    atencion: 100,
    hipno: false,
    hipnoT: 0,
    fuera: false,
    tono: i,
  })),
  vids: [],
  parts: [],
  spawnT: 1600,
  spawnBase: 2400,
  manotazos: 0,
  activas: new Set(),
  paused: false,
  over: false,
  win: false,
  shake: 0,
});

type Ui = "title" | "play" | "win" | "lose";

export function BatallaAtencion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gRef = useRef<G>(nuevoJuego());
  const uiRef = useRef<Ui>("title");
  const audioRef = useRef<AudioContext | null>(null);
  const fontRef = useRef("sans-serif");

  const [ui, setUiState] = useState<Ui>("title");
  const [announce, setAnnounce] = useState<Solucion | null>(null);
  const [tick, setTick] = useState(0); // refresco ligero de las cards

  const setUi = (v: Ui) => {
    uiRef.current = v;
    setUiState(v);
  };

  const beep = (freq: number, dur = 0.08, type: OscillatorType = "square", vol = 0.03) => {
    const ctx = audioRef.current;
    if (!ctx) return;
    try {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + dur);
    } catch {
      /* sin audio */
    }
  };

  const empezar = () => {
    try {
      audioRef.current =
        audioRef.current ??
        new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      void audioRef.current.resume();
    } catch {
      /* sin audio */
    }
    gRef.current = nuevoJuego();
    setAnnounce(null);
    setUi("play");
    beep(440, 0.08);
    beep(660, 0.08);
  };

  /* activar una solución (desde las cards DOM) */
  const activar = (sol: Solucion) => {
    const g = gRef.current;
    if (uiRef.current !== "play" || g.paused || g.over) return;
    if (g.activas.has(sol.id) || g.t < sol.desbloqueo) return;
    g.activas.add(sol.id);
    g.paused = true;
    setAnnounce(sol);
    beep(523, 0.09);
    beep(784, 0.12);
    window.setTimeout(() => beep(1046, 0.16), 120);

    /* efectos inmediatos */
    if (sol.id === "metodologia") {
      g.ests.forEach((e, i) => {
        const p = posCirculos(i);
        e.tx = p.x;
        e.ty = p.y;
      });
    }
    if (sol.id === "evaluacion") {
      g.ests.forEach((e) => {
        if (!e.fuera && e.hipno) {
          e.hipno = false;
          e.hipnoT = 0;
          e.atencion = Math.min(100, e.atencion + 30);
        }
      });
      g.vids.forEach((v) => {
        if (v.pegado) {
          v.pegado = false;
          v.huyendo = true;
        }
      });
    }
    if (sol.id === "academia") {
      g.vids.forEach((v) => {
        v.huyendo = true;
        v.pegado = false;
      });
    }

    window.setTimeout(() => {
      gRef.current.paused = false;
      setAnnounce(null);
    }, 2300);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fam = getComputedStyle(document.documentElement)
      .getPropertyValue("--font-display")
      .trim();
    if (fam) fontRef.current = fam;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    /* manotazo: clic/tap sobre un video */
    const onPointer = (e: PointerEvent) => {
      const g = gRef.current;
      if (uiRef.current !== "play" || g.paused || g.over) return;
      const r = canvas.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * W;
      const my = ((e.clientY - r.top) / r.height) * H;
      for (const v of g.vids) {
        if (!v.dead && !v.huyendo && Math.hypot(v.x - mx, v.y - my) < 30) {
          v.huyendo = true;
          v.pegado = false;
          /* le quitaste el celular de la cara: el alumno despierta */
          const est = g.ests[v.objetivo];
          if (est && est.hipno) {
            est.hipno = false;
            est.hipnoT = 0;
          }
          g.manotazos += 1;
          /* prohibir no funciona: cada manotazo acelera el regreso */
          g.spawnBase = Math.max(1150, g.spawnBase * 0.95);
          beep(220, 0.06, "triangle", 0.03);
          for (let i = 0; i < 8; i++) {
            g.parts.push({
              x: v.x,
              y: v.y,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              life: 1,
              color: "#ff6a00",
            });
          }
          break;
        }
      }
    };
    canvas.addEventListener("pointerdown", onPointer);

    const update = (g: G, dt: number) => {
      g.t += dt;
      if (g.shake > 0) g.shake = Math.max(0, g.shake - dt * 0.03);

      const conCurso = g.activas.has("curso");
      const conMeto = g.activas.has("metodologia");
      const conEval = g.activas.has("evaluacion");
      const conAcad = g.activas.has("academia");

      /* lección avanza */
      g.leccion += (dt / LECCION_MS) * (conAcad ? 1.6 : 1);
      if (g.leccion >= 1) {
        g.leccion = 1;
        g.over = true;
        g.win = true;
        setUi("win");
        beep(523, 0.12);
        window.setTimeout(() => beep(659, 0.12), 130);
        window.setTimeout(() => beep(784, 0.12), 260);
        window.setTimeout(() => beep(1046, 0.25), 400);
        return;
      }

      /* spawn de videos */
      g.spawnT -= dt;
      if (g.spawnT <= 0) {
        g.spawnT = g.spawnBase;
        const vivos = g.ests.map((e, i) => ({ e, i })).filter(({ e }) => !e.fuera && !e.hipno);
        if (vivos.length > 0) {
          const { i } = vivos[Math.floor(Math.random() * vivos.length)];
          g.vids.push({
            x: 40 + Math.random() * (W - 80),
            y: -30,
            vx: 0,
            vy: 0,
            objetivo: i,
            pegado: false,
            huyendo: false,
            rot: 0,
          });
        }
      }

      /* mover videos */
      for (const v of g.vids) {
        v.rot += dt * 0.004;
        if (v.huyendo) {
          v.y -= 0.32 * dt;
          v.x += Math.sin(v.rot * 3) * 2;
          if (v.y < -40) v.dead = true;
          continue;
        }
        const e = g.ests[v.objetivo];
        if (e.fuera || (v.pegado && !e.hipno)) {
          v.huyendo = true;
          continue;
        }
        if (!v.pegado) {
          /* con academia completa: rebotan antes de llegar */
          if (conAcad && v.y > 108) {
            v.huyendo = true;
            g.parts.push({ x: v.x, y: v.y, vx: 0, vy: -2, life: 1, color: "#43c6d4" });
            continue;
          }
          const dx = e.x - v.x;
          const dy = e.y - 26 - v.y;
          const m = Math.hypot(dx, dy) || 1;
          const vel = 0.075 * dt;
          v.x += (dx / m) * vel;
          v.y += (dy / m) * vel;
          if (m < 14) {
            v.pegado = true;
            if (!e.hipno) {
              e.hipno = true;
              e.hipnoT = 0;
              beep(160, 0.12, "sawtooth", 0.03);
            }
          }
        } else {
          v.x = e.x + 16;
          v.y = e.y - 30 + Math.sin(g.t * 0.005) * 3;
        }
      }

      /* estudiantes */
      let fuera = 0;
      for (const e of g.ests) {
        if (e.fuera) {
          fuera++;
          continue;
        }
        /* moverse a su lugar (reacomodo de metodología) */
        e.x += (e.tx - e.x) * Math.min(1, dt * 0.005);
        e.y += (e.ty - e.y) * Math.min(1, dt * 0.005);

        if (e.hipno) {
          e.hipnoT += dt;
          const drena = (conMeto ? 2.8 : 5.2) / 1000;
          e.atencion -= drena * dt;
          /* sin soluciones, nadie despierta solo: o espantas el video o lo pierdes */
          const limite = conEval ? 3000 : conMeto ? 5500 : Infinity;
          if (e.hipnoT > limite) {
            e.hipno = false;
            e.hipnoT = 0;
          }
          if (e.atencion <= 0) {
            e.atencion = 0;
            e.fuera = true;
            e.hipno = false;
            g.shake = 12;
            beep(120, 0.3, "sawtooth", 0.045);
            for (let i = 0; i < 14; i++) {
              g.parts.push({
                x: e.x,
                y: e.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 1,
                color: "#7c8da0",
              });
            }
          }
        } else {
          const regen = (conCurso ? 5.5 : 1.2) / 1000;
          e.atencion = Math.min(100, e.atencion + regen * dt);
        }
      }
      if (fuera >= 4) {
        g.over = true;
        g.win = false;
        setUi("lose");
        return;
      }

      /* partículas */
      for (const p of g.parts) {
        p.x += p.vx * dt * 0.06;
        p.y += p.vy * dt * 0.06;
        p.life -= dt * 0.0018;
      }
      g.vids = g.vids.filter((v) => !v.dead);
      g.parts = g.parts.filter((p) => p.life > 0);
    };

    /* ---------- draw ---------- */
    const draw = (g: G) => {
      const conCurso = g.activas.has("curso");
      const conMeto = g.activas.has("metodologia");
      const conAcad = g.activas.has("academia");

      ctx.save();
      if (g.shake > 0) ctx.translate((Math.random() - 0.5) * g.shake, (Math.random() - 0.5) * g.shake);

      /* fondo del salón: se ilumina conforme lo transformas */
      ctx.fillStyle = "#060a0e";
      ctx.fillRect(-20, -20, W + 40, H + 40);
      const nivel = g.activas.size;
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, `rgba(18, 35, 58, ${0.35 + nivel * 0.12})`);
      grad.addColorStop(1, "rgba(6, 10, 14, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      /* piso */
      ctx.strokeStyle = `rgba(28, 42, 56, ${0.8 + nivel * 0.05})`;
      ctx.lineWidth = 1;
      for (let y = 150; y < H; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      if (conAcad) {
        /* glow de academia */
        ctx.fillStyle = "rgba(255, 106, 0, 0.05)";
        ctx.fillRect(0, 0, W, H);
      }

      /* ---- pizarra ---- */
      const px = W / 2 - 120;
      const py = 42;
      ctx.fillStyle = conCurso ? "#0a1119" : "#0d1218";
      ctx.strokeStyle = conCurso ? "#43c6d4" : "#3b4a5c";
      ctx.lineWidth = 2;
      ctx.fillRect(px, py, 240, 64);
      ctx.strokeRect(px, py, 240, 64);
      ctx.textAlign = "left";
      if (!conCurso) {
        ctx.fillStyle = "#7c8da0";
        ctx.font = `600 12px ${fontRef.current}`;
        ctx.fillText("PDF_escaneado_v7_FINAL.pdf", px + 14, py + 24);
        ctx.fillStyle = "#3b4a5c";
        for (let i = 0; i < 3; i++) ctx.fillRect(px + 14, py + 34 + i * 8, 180 - i * 40, 3);
      } else {
        ctx.fillStyle = "#43c6d4";
        ctx.font = `700 13px ${fontRef.current}`;
        ctx.fillText(conAcad ? "ACADEMIA · NIVEL 3" : "MISIÓN 01 · EL RETO", px + 14, py + 26);
        ctx.fillStyle = "#ff6a00";
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.arc(px + 22 + i * 22, py + 46, 5, 0, Math.PI * 2);
          if (i < (conAcad ? 4 : 2)) ctx.fill();
          else ctx.stroke();
        }
      }

      /* ---- estudiantes ---- */
      for (const e of g.ests) {
        if (e.fuera) {
          /* silla vacía */
          ctx.strokeStyle = "rgba(124, 141, 160, 0.35)";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(e.tx - 17, e.ty + 12, 34, 8);
          ctx.fillStyle = "rgba(124, 141, 160, 0.5)";
          ctx.font = `600 9px ${fontRef.current}`;
          ctx.textAlign = "center";
          ctx.fillText("se fue a ver shorts", e.tx, e.ty + 34);
          continue;
        }
        /* pupitre */
        ctx.fillStyle = conMeto ? "#12233a" : "#0d1520";
        ctx.strokeStyle = conMeto ? "rgba(67, 198, 212, 0.4)" : "#1c2a38";
        ctx.lineWidth = 1.5;
        ctx.fillRect(e.x - 17, e.y + 12, 34, 8);
        ctx.strokeRect(e.x - 17, e.y + 12, 34, 8);
        /* cuerpo */
        const tonos = ["#c4cfda", "#8fa3b8", "#a9b8c9", "#93a9be"];
        ctx.fillStyle = tonos[e.tono % 4];
        ctx.fillRect(e.x - 8, e.y - 6, 16, 18);
        /* cabeza */
        ctx.beginPath();
        ctx.arc(e.x, e.y - 15, 9, 0, Math.PI * 2);
        ctx.fillStyle = "#edf2f7";
        ctx.fill();
        /* ojos */
        if (e.hipno) {
          ctx.strokeStyle = "#ff6a00";
          ctx.lineWidth = 1.5;
          for (const ox of [-3.5, 3.5]) {
            ctx.beginPath();
            ctx.arc(e.x + ox, e.y - 16, 2.6, g.t * 0.01, g.t * 0.01 + Math.PI * 1.5);
            ctx.stroke();
          }
        } else {
          ctx.fillStyle = "#060a0e";
          ctx.fillRect(e.x - 4, e.y - 17, 2.5, 2.5);
          ctx.fillRect(e.x + 1.5, e.y - 17, 2.5, 2.5);
        }
        /* barra de atención */
        const bw = 32;
        ctx.fillStyle = "rgba(6, 10, 14, 0.7)";
        ctx.fillRect(e.x - bw / 2, e.y - 34, bw, 5);
        ctx.fillStyle = e.atencion > 45 ? "#43c6d4" : "#ff6a00";
        ctx.fillRect(e.x - bw / 2, e.y - 34, bw * (e.atencion / 100), 5);
      }

      /* ---- videos verticales ---- */
      for (const v of g.vids) {
        if (v.dead) continue;
        ctx.save();
        ctx.translate(v.x, v.y);
        ctx.rotate(Math.sin(v.rot) * 0.15);
        ctx.fillStyle = "#0d1218";
        ctx.strokeStyle = "#ff6a00";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-11, -19, 22, 38, 4);
        ctx.fill();
        ctx.stroke();
        /* play */
        ctx.fillStyle = "#ff6a00";
        ctx.beginPath();
        ctx.moveTo(-3, -6);
        ctx.lineTo(5, 0);
        ctx.lineTo(-3, 6);
        ctx.closePath();
        ctx.fill();
        /* barras de "engagement" */
        ctx.fillStyle = "rgba(255, 106, 0, 0.6)";
        ctx.fillRect(-7, 10, 3, 5);
        ctx.fillRect(-2, 8, 3, 7);
        ctx.fillRect(3, 6, 3, 9);
        ctx.restore();
      }

      /* ---- partículas ---- */
      for (const p of g.parts) {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
      }
      ctx.globalAlpha = 1;

      /* ---- HUD ---- */
      ctx.textAlign = "left";
      ctx.fillStyle = "#7c8da0";
      ctx.font = `600 11px ${fontRef.current}`;
      ctx.fillText("LA LECCIÓN", 16, 22);
      ctx.strokeStyle = "rgba(67, 198, 212, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(16, 28, 220, 9);
      ctx.fillStyle = "#43c6d4";
      ctx.fillRect(17, 29, 218 * g.leccion, 7);

      /* clase viva */
      const vivos = g.ests.filter((e) => !e.fuera).length;
      ctx.textAlign = "right";
      ctx.fillStyle = vivos <= 5 ? "#ff6a00" : "#7c8da0";
      ctx.font = `600 11px ${fontRef.current}`;
      ctx.fillText(`clase: ${vivos}/8`, W - 16, 22);

      /* medidor de futilidad */
      if (g.manotazos > 0) {
        ctx.fillStyle = "#ff6a00";
        ctx.font = `600 10px ${fontRef.current}`;
        ctx.fillText(
          `prohibir no funciona: los videos vuelven ${Math.round((2400 / g.spawnBase - 1) * 100)}% más rápido`,
          W - 16,
          40
        );
      }

      ctx.restore();
    };

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(now - last, 34);
      last = now;
      const g = gRef.current;
      if (uiRef.current === "play" && !g.paused && !g.over) update(g, dt);
      if (uiRef.current === "play") draw(g);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    /* refresco ligero de las cards de solución (desbloqueos) */
    const cardTimer = window.setInterval(() => setTick((n) => n + 1), 500);

    if (process.env.NODE_ENV === "development") {
      (window as unknown as { __batalla?: unknown }).__batalla = gRef;
      (window as unknown as { __stepB?: (dt: number) => void }).__stepB = (dt: number) => {
        const g = gRef.current;
        if (uiRef.current === "play" && !g.paused && !g.over) update(g, dt);
        draw(g);
      };
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(cardTimer);
      canvas.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const g = gRef.current;
  const vivos = g.ests.filter((e) => !e.fuera).length;
  const rango = vivos >= 8 ? "S" : vivos >= 6 ? "A" : "B";
  const rangoTexto =
    rango === "S"
      ? "Clase completa. Ni un solo estudiante perdido con el scroll."
      : rango === "A"
        ? "La lección terminó y casi todos siguen contigo. Muy pocas escuelas pueden decir eso."
        : "Se salvó la lección — y quedó clarísimo qué pasa sin un buen diseño.";

  void tick; // fuerza re-render periódico para los desbloqueos

  return (
    <div className={s.wrap} data-cursor="hover">
      <div className={s.bar}>
        <span className={s.barTitle}>SIMULACIÓN · la batalla por la atención</span>
        <span className={s.barRight}>
          {ui === "play" ? "clase en curso" : ui === "win" ? "lección completada" : ui === "lose" ? "clase perdida" : "insert coin"}
        </span>
      </div>

      <div className={s.stage}>
        <canvas
          ref={canvasRef}
          className={s.canvas}
          style={{ aspectRatio: `${W} / ${H}` }}
          aria-label="Videojuego: defiende la atención de tu salón de los videos verticales activando las soluciones de diseño instruccional"
        />

        {ui === "title" && (
          <div className={s.overlay}>
            <p className={s.kicker}>⚠ amenaza detectada en tu institución</p>
            <h3 className={s.big}>LA BATALLA POR LA ATENCIÓN</h3>
            <div className={s.enemigo}>
              <span className={s.enemigoName}>EL SCROLL INFINITO:</span>
              «Tus alumnos son míos. Un video de 15 segundos vence a cualquiera
              de tus clases de 50 minutos. <strong>Siempre.</strong>»
            </div>
            <div className={s.howto}>
              <div className={s.howtoItem}>
                <span className={s.howtoIcon}>👆</span>
                <span>Toca los videos para espantarlos… aunque cada vez vuelven más rápido</span>
              </div>
              <div className={s.howtoItem}>
                <span className={s.howtoIcon}>◈</span>
                <span>Activa las soluciones cuando se enciendan: transforman el salón</span>
              </div>
              <div className={s.howtoItem}>
                <span className={s.howtoIcon}>8/8</span>
                <span>Que la lección termine con tu clase despierta. Si 4 se van, pierdes</span>
              </div>
            </div>
            <button className={s.start} onClick={empezar}>
              ▶ Abrir el salón
            </button>
          </div>
        )}

        {announce && (
          <div className={s.announce}>
            <p className={s.announceGet}>¡SOLUCIÓN ACTIVADA!</p>
            <p className={s.announceName}>{announce.nombre}</p>
            <p className={s.announceEfecto}>{announce.efecto}</p>
            <p className={s.announceDetalle}>{announce.detalle}</p>
          </div>
        )}

        {ui === "lose" && (
          <div className={s.overlay}>
            <h3 className={s.big}>LA CLASE SE VACIÓ</h3>
            <div className={s.enemigo}>
              <span className={s.enemigoName}>EL SCROLL INFINITO:</span>
              «¿Lo ves? A manotazos no me ganas. <strong>Nadie me gana a manotazos.</strong>»
            </div>
            <p className={s.quote}>
              Pista: prohibir no funciona. <em>Diseñar, sí.</em> Activa las
              soluciones en cuanto se enciendan.
            </p>
            <button className={s.start} onClick={empezar}>
              ↻ Reabrir el salón
            </button>
          </div>
        )}

        {ui === "win" && (
          <div className={s.overlay}>
            <div className={s.rank}>{rango}</div>
            <h3 className={s.big}>LECCIÓN COMPLETADA</h3>
            <div className={s.statsFin}>
              <span><b>{vivos}/8</b>clase despierta</span>
              <span><b>{g.activas.size}/4</b>soluciones activadas</span>
              <span><b>{g.manotazos}</b>manotazos (no sirvieron)</span>
            </div>
            <p className={s.rangoTexto}>{rangoTexto}</p>
            <p className={s.quote}>
              Acabas de vivir la tesis completa: al scroll no se le gana
              prohibiendo, se le gana <em>diseñando mejor</em>. Eso hago —
              cursos, metodologías, evaluaciones y academias que recuperan la
              atención. Imagina esto en toda tu institución.
            </p>
            <div className={s.winActions}>
              <a href="/contacto" className={home.cta}>
                Transformar mi institución
              </a>
              <button className={s.replay} onClick={empezar}>
                ↻ jugar de nuevo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ---- soluciones (se desbloquean con el tiempo) ---- */}
      <div className={s.soluciones}>
        {SOLUCIONES.map((sol) => {
          const activa = g.activas.has(sol.id);
          const lista = ui === "play" && !activa && g.t >= sol.desbloqueo;
          const faltan = Math.max(0, Math.ceil((sol.desbloqueo - g.t) / 1000));
          return (
            <button
              key={sol.id}
              className={`${s.sol} ${lista ? s.solListo : ""} ${activa ? s.solActiva : ""}`}
              onClick={() => activar(sol)}
              disabled={!lista}
            >
              {sol.nombre}
              <small>
                {activa
                  ? "ACTIVA ✓"
                  : lista
                    ? "¡actívala ahora!"
                    : ui === "play"
                      ? `disponible en ${faltan}s`
                      : "bloqueada"}
              </small>
            </button>
          );
        })}
      </div>
    </div>
  );
}
