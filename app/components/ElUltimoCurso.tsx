"use client";

import { useEffect, useRef, useState } from "react";
import s from "./ElUltimoCurso.module.css";
import home from "../page.module.css";

/* ============================================================
   EL ÚLTIMO CURSO — boss fight
   Jefe final: EL ABURRIMIENTO CORPORATIVO (un PDF gigante con corbata).
   Esquiva sus ataques, atrapa las 5 armas y derrótalo.
   Cada arma cambia tu disparo: el aprendizaje se juega, no se lee.
   ============================================================ */

const W = 760;
const H = 500;
const PLAYER_Y = H - 46;
const BOSS_W = 132;
const BOSS_H = 150;
const HP_MAX = 100;
const THRESHOLDS = [80, 60, 40, 20, 0];

type Arma = {
  nombre: string;
  grito: string; // anuncio grande al atraparla
  efecto: string; // qué cambia en el gameplay
  color: string;
};

const ARMAS: Arma[] = [
  {
    nombre: "DIAGNÓSTICO",
    grito: "¡Ahora ves su punto débil!",
    efecto: "Sin diagnóstico, ningún golpe servía. Tu disparo se activa y su barra de vida queda al descubierto.",
    color: "#43c6d4",
  },
  {
    nombre: "PENSAMIENTO CRÍTICO",
    grito: "¡El humo se disipa!",
    efecto: "Tus disparos ahora destruyen sus mentiras: los proyectiles enemigos caen ante la evidencia.",
    color: "#edf2f7",
  },
  {
    nombre: "STORYTELLING",
    grito: "¡Una historia que atrapa!",
    efecto: "Nadie suelta una buena trama: tu daño se duplica.",
    color: "#ff6a00",
  },
  {
    nombre: "NEUROEDUCACIÓN",
    grito: "¡El cerebro juega de tu lado!",
    efecto: "Atención y memoria a tu favor: sus ataques se vuelven lentos ante ti.",
    color: "#8fd8e0",
  },
  {
    nombre: "PEDAGOGÍA AVANZADA",
    grito: "¡Objetivos + práctica + evaluación!",
    efecto: "El diseño completo: disparo triple. Acaba con él.",
    color: "#ffb066",
  },
];

const TAUNTS_FASE = [
  "¡¿Cómo me viste?! ¡Nadie mide nada aquí!",
  "¡¿Evidencia?! ¡Yo vendo humo hace 20 años!",
  "¿La gente… quiere seguir viendo? ¡IMPOSIBLE!",
  "¡¿Por qué no me olvidan?! ¡Siempre me olvidan!",
  "NOOO… ¡mi PDF de 400 páginasss…!",
];

type Proj = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tipo: "slide" | "wave" | "zzz" | "aim";
  t: number;
  dead?: boolean;
};
type Shot = { x: number; y: number; vx: number; dead?: boolean };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string };

type Game = {
  mode: "dodge" | "fight" | "dying";
  fase: number; // 0..4 patrón de ataque actual
  owned: number; // armas atrapadas
  hp: number;
  px: number;
  lives: number;
  inv: number; // invulnerabilidad tras golpe (ms)
  shots: Shot[];
  projs: Proj[];
  parts: Particle[];
  pup: { x: number; y: number } | null;
  t: number;
  spawnT: number;
  pupT: number;
  fireT: number;
  shake: number;
  dissolve: number;
  paused: boolean;
  over: boolean;
};

const nuevoJuego = (): Game => ({
  mode: "dodge",
  fase: 0,
  owned: 0,
  hp: HP_MAX,
  px: W / 2,
  lives: 3,
  inv: 0,
  shots: [],
  projs: [],
  parts: [],
  pup: null,
  t: 0,
  spawnT: 0,
  pupT: 1600,
  fireT: 0,
  shake: 0,
  dissolve: 0,
  paused: false,
  over: false,
});

type Ui = "title" | "play" | "over" | "win";

export function ElUltimoCurso() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gRef = useRef<Game>(nuevoJuego());
  const keysRef = useRef<Set<string>>(new Set());
  const audioRef = useRef<AudioContext | null>(null);
  const fontRef = useRef<string>("sans-serif");
  const uiRef = useRef<Ui>("title");

  const [ui, setUiState] = useState<Ui>("title");
  const [announce, setAnnounce] = useState<Arma | null>(null);
  const [taunt, setTaunt] = useState<string | null>(null);
  const [livesUi, setLivesUi] = useState(3);

  const setUi = (v: Ui) => {
    uiRef.current = v;
    setUiState(v);
  };

  /* ---- audio: bleeps retro con WebAudio, sin archivos ---- */
  const beep = (freq: number, dur = 0.09, type: OscillatorType = "square", vol = 0.035) => {
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
      /* silencio digno */
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
    setLivesUi(3);
    setAnnounce(null);
    setTaunt(null);
    setUi("play");
    beep(440, 0.08);
    beep(660, 0.08);
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

    if (process.env.NODE_ENV === "development") {
      (window as unknown as { __juego?: unknown }).__juego = gRef;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    /* ---- input ---- */
    const kd = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "a", "d"].includes(e.key)) {
        keysRef.current.add(e.key);
        if (uiRef.current === "play") e.preventDefault();
      }
    };
    const ku = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);

    let dragging = false;
    const toGameX = (clientX: number) => {
      const r = canvas.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * W;
    };
    const pd = (e: PointerEvent) => {
      dragging = true;
      gRef.current.px = toGameX(e.clientX);
    };
    const pm = (e: PointerEvent) => {
      if (dragging) gRef.current.px = toGameX(e.clientX);
    };
    const pu = () => {
      dragging = false;
    };
    canvas.addEventListener("pointerdown", pd);
    window.addEventListener("pointermove", pm);
    window.addEventListener("pointerup", pu);

    /* ---- helpers de dibujo ---- */
    const diRect = (x: number, y: number, w: number, h: number, r: number) => {
      // contenedor DI: recta a la izquierda, curva a la derecha
      ctx.beginPath();
      ctx.moveTo(x + 2, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + 2, y + h);
      ctx.closePath();
    };

    const bossPos = (g: Game) => ({
      bx: W / 2 + Math.sin(g.t * 0.0012) * 90 - BOSS_W / 2,
      by: 64 + Math.sin(g.t * 0.0021) * 8,
    });

    const explosion = (g: Game, x: number, y: number, color: string, n = 14) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = 1 + Math.random() * 3;
        g.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, color });
      }
    };

    /* ---- update ---- */
    const golpeJugador = (g: Game) => {
      if (g.inv > 0) return;
      g.lives -= 1;
      g.inv = 1600;
      g.shake = 14;
      setLivesUi(g.lives);
      beep(140, 0.25, "sawtooth", 0.05);
      explosion(g, g.px, PLAYER_Y, "#ff6a00", 18);
      if (g.lives <= 0) {
        g.over = true;
        setUi("over");
      }
    };

    const update = (g: Game, dt: number) => {
      g.t += dt;
      if (g.inv > 0) g.inv -= dt;
      if (g.shake > 0) g.shake = Math.max(0, g.shake - dt * 0.03);

      /* jugador */
      const k = keysRef.current;
      const spd = 0.42 * dt;
      if (k.has("ArrowLeft") || k.has("a")) g.px -= spd;
      if (k.has("ArrowRight") || k.has("d")) g.px += spd;
      g.px = Math.max(24, Math.min(W - 24, g.px));

      const { bx, by } = bossPos(g);
      const slowMul = g.owned >= 4 ? 0.62 : 1;

      /* spawn de proyectiles según fase */
      g.spawnT -= dt;
      const intervalos = [760, 640, 800, 700, 560];
      if (g.spawnT <= 0 && g.mode !== "dying") {
        g.spawnT = intervalos[g.fase];
        const cx = bx + BOSS_W / 2;
        const cy = by + BOSS_H - 10;
        const f = g.fase;
        if (f === 0 || (f === 4 && Math.random() < 0.4)) {
          g.projs.push({ x: 30 + Math.random() * (W - 60), y: -20, vx: 0, vy: 0.16, tipo: "slide", t: 0 });
        }
        if (f === 1 || (f === 4 && Math.random() < 0.4)) {
          g.projs.push({ x: cx, y: cy, vx: 0, vy: 0.15, tipo: "wave", t: Math.random() * 6 });
        }
        if (f === 2) {
          g.projs.push({ x: cx, y: cy, vx: 0, vy: 0.11, tipo: "zzz", t: 0 });
        }
        if (f === 3 || f === 4) {
          const dx = g.px - cx;
          const dy = PLAYER_Y - cy;
          const m = Math.hypot(dx, dy) || 1;
          g.projs.push({ x: cx, y: cy, vx: (dx / m) * 0.15, vy: (dy / m) * 0.15, tipo: "aim", t: 0 });
        }
      }

      /* mover proyectiles */
      for (const p of g.projs) {
        p.t += dt * 0.004;
        const mul = slowMul;
        if (p.tipo === "slide") p.y += p.vy * dt * mul;
        else if (p.tipo === "wave") {
          p.y += p.vy * dt * mul;
          p.x += Math.sin(p.t * 2.2) * 1.9 * mul;
        } else if (p.tipo === "zzz") {
          p.y += p.vy * dt * mul;
          p.x += Math.sign(g.px - p.x) * Math.min(Math.abs(g.px - p.x), 0.075 * dt) * mul;
        } else {
          p.x += p.vx * dt * mul;
          p.y += p.vy * dt * mul;
        }
        if (p.y > H + 30 || p.x < -30 || p.x > W + 30) p.dead = true;
        /* golpe al jugador */
        const r = p.tipo === "slide" ? 18 : 13;
        if (Math.hypot(p.x - g.px, p.y - PLAYER_Y) < r + 12) {
          p.dead = true;
          golpeJugador(g);
        }
      }

      /* power-up */
      if (g.mode === "dodge" && !g.pup && g.owned < 5) {
        g.pupT -= dt;
        if (g.pupT <= 0) g.pup = { x: 60 + Math.random() * (W - 120), y: -24 };
      }
      if (g.pup) {
        g.pup.y += 0.085 * dt;
        if (g.pup.y > H + 24) {
          g.pup = null;
          g.pupT = 900; // reaparece: nadie se queda sin aprender
        } else if (Math.hypot(g.pup.x - g.px, g.pup.y - PLAYER_Y) < 26) {
          const arma = ARMAS[g.owned];
          g.owned += 1;
          g.pup = null;
          g.mode = "fight";
          g.paused = true;
          setAnnounce(arma);
          beep(523, 0.09);
          beep(784, 0.12);
          window.setTimeout(() => {
            beep(1046, 0.16);
          }, 120);
          window.setTimeout(() => {
            gRef.current.paused = false;
            setAnnounce(null);
          }, 2300);
        }
      }

      /* disparo automático (desde la 1a arma) */
      if (g.owned >= 1 && g.mode !== "dying") {
        g.fireT -= dt;
        if (g.fireT <= 0) {
          g.fireT = 190;
          g.shots.push({ x: g.px, y: PLAYER_Y - 16, vx: 0 });
          if (g.owned >= 5) {
            g.shots.push({ x: g.px - 8, y: PLAYER_Y - 12, vx: -0.09 });
            g.shots.push({ x: g.px + 8, y: PLAYER_Y - 12, vx: 0.09 });
          }
          beep(880, 0.03, "square", 0.012);
        }
      }

      /* mover disparos + colisiones */
      const dmg = (g.owned >= 3 ? 2 : 1) * 1.15;
      for (const sh of g.shots) {
        sh.y -= 0.5 * dt;
        sh.x += sh.vx * dt;
        if (sh.y < -20) sh.dead = true;

        /* pensamiento crítico: destruye proyectiles */
        if (g.owned >= 2 && !sh.dead) {
          for (const p of g.projs) {
            if (!p.dead && Math.hypot(p.x - sh.x, p.y - sh.y) < 16) {
              p.dead = true;
              sh.dead = true;
              explosion(g, p.x, p.y, "#c4cfda", 6);
              beep(300, 0.04, "triangle", 0.02);
              break;
            }
          }
        }

        /* daño al jefe (solo en fight) */
        if (
          g.mode === "fight" &&
          !sh.dead &&
          sh.x > bx &&
          sh.x < bx + BOSS_W &&
          sh.y > by &&
          sh.y < by + BOSS_H
        ) {
          sh.dead = true;
          g.hp -= dmg;
          explosion(g, sh.x, sh.y, "#43c6d4", 4);
          beep(660 + Math.random() * 120, 0.03, "triangle", 0.015);
          const objetivo = THRESHOLDS[g.owned - 1];
          if (g.hp <= objetivo) {
            g.hp = objetivo;
            if (objetivo <= 0) {
              g.mode = "dying";
              g.shake = 22;
              setTaunt(TAUNTS_FASE[4]);
            } else {
              g.mode = "dodge";
              g.fase = Math.min(4, g.fase + 1);
              g.pupT = 2800;
              g.shake = 10;
              setTaunt(TAUNTS_FASE[g.owned - 1]);
              window.setTimeout(() => setTaunt(null), 2000);
              beep(196, 0.2, "sawtooth", 0.04);
            }
          }
        }
      }

      /* muerte del jefe */
      if (g.mode === "dying") {
        g.dissolve += dt * 0.0006;
        if (g.dissolve > 0.2 && Math.random() < 0.3) {
          explosion(g, bx + Math.random() * BOSS_W, by + Math.random() * BOSS_H, Math.random() < 0.5 ? "#ff6a00" : "#edf2f7", 4);
        }
        if (g.dissolve >= 1.15) {
          g.over = true;
          setUi("win");
          window.setTimeout(() => setTaunt(null), 10);
          beep(523, 0.12);
          window.setTimeout(() => beep(659, 0.12), 130);
          window.setTimeout(() => beep(784, 0.12), 260);
          window.setTimeout(() => beep(1046, 0.25), 400);
        }
      }

      /* partículas */
      for (const pa of g.parts) {
        pa.x += pa.vx * dt * 0.06;
        pa.y += pa.vy * dt * 0.06;
        pa.life -= dt * 0.0016;
      }

      g.shots = g.shots.filter((x) => !x.dead);
      g.projs = g.projs.filter((x) => !x.dead);
      g.parts = g.parts.filter((x) => x.life > 0);
    };

    /* ---- draw ---- */
    const draw = (g: Game) => {
      ctx.save();
      if (g.shake > 0) {
        ctx.translate((Math.random() - 0.5) * g.shake, (Math.random() - 0.5) * g.shake);
      }

      /* fondo */
      ctx.fillStyle = "#060a0e";
      ctx.fillRect(-20, -20, W + 40, H + 40);
      const grad = ctx.createRadialGradient(W / 2, 40, 10, W / 2, 40, 420);
      grad.addColorStop(0, "rgba(18,35,58,0.85)");
      grad.addColorStop(1, "rgba(18,35,58,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      /* scanlines */
      ctx.fillStyle = "rgba(255,255,255,0.02)";
      for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 1);

      const { bx, by } = bossPos(g);

      /* ---- JEFE: el PDF con corbata ---- */
      ctx.save();
      ctx.globalAlpha = g.mode === "dying" ? Math.max(0, 1 - g.dissolve) : 1;
      /* aura de invulnerable */
      if (g.mode === "dodge" && g.owned === 0) {
        ctx.strokeStyle = "rgba(124,141,160,0.5)";
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 2;
        ctx.strokeRect(bx - 8, by - 8, BOSS_W + 16, BOSS_H + 16);
        ctx.setLineDash([]);
      }
      /* hoja */
      ctx.fillStyle = "#edf2f7";
      ctx.fillRect(bx, by, BOSS_W, BOSS_H);
      /* esquina doblada */
      ctx.fillStyle = "#060a0e";
      ctx.beginPath();
      ctx.moveTo(bx + BOSS_W - 26, by);
      ctx.lineTo(bx + BOSS_W, by);
      ctx.lineTo(bx + BOSS_W, by + 26);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#c4cfda";
      ctx.beginPath();
      ctx.moveTo(bx + BOSS_W - 26, by);
      ctx.lineTo(bx + BOSS_W - 26, by + 26);
      ctx.lineTo(bx + BOSS_W, by + 26);
      ctx.closePath();
      ctx.fill();
      /* ojos enojados */
      ctx.strokeStyle = "#060a0e";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(bx + 28, by + 38);
      ctx.lineTo(bx + 52, by + 48);
      ctx.moveTo(bx + BOSS_W - 28, by + 38);
      ctx.lineTo(bx + BOSS_W - 52, by + 48);
      ctx.stroke();
      ctx.fillStyle = "#060a0e";
      ctx.beginPath();
      ctx.arc(bx + 44, by + 58, 5, 0, Math.PI * 2);
      ctx.arc(bx + BOSS_W - 44, by + 58, 5, 0, Math.PI * 2);
      ctx.fill();
      /* boca según estado */
      ctx.strokeStyle = "#060a0e";
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (g.mode === "fight") {
        ctx.arc(bx + BOSS_W / 2, by + 88, 12, 0.15 * Math.PI, 0.85 * Math.PI); // preocupado
      } else {
        ctx.arc(bx + BOSS_W / 2, by + 100, 14, 1.15 * Math.PI, 1.85 * Math.PI); // sonrisa malvada
      }
      ctx.stroke();
      /* texto PDF */
      ctx.fillStyle = "#7c8da0";
      ctx.font = `700 15px ${fontRef.current}`;
      ctx.textAlign = "center";
      ctx.fillText("PDF · 400 págs", bx + BOSS_W / 2, by + 126);
      /* corbata navy */
      ctx.fillStyle = "#12233a";
      ctx.beginPath();
      ctx.moveTo(bx + BOSS_W / 2 - 9, by + BOSS_H);
      ctx.lineTo(bx + BOSS_W / 2 + 9, by + BOSS_H);
      ctx.lineTo(bx + BOSS_W / 2 + 13, by + BOSS_H + 26);
      ctx.lineTo(bx + BOSS_W / 2, by + BOSS_H + 40);
      ctx.lineTo(bx + BOSS_W / 2 - 13, by + BOSS_H + 26);
      ctx.closePath();
      ctx.fill();
      /* punto débil (con diagnóstico) */
      if (g.owned >= 1 && g.mode === "fight") {
        const pulse = 8 + Math.sin(g.t * 0.008) * 3;
        ctx.strokeStyle = "#43c6d4";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(bx + BOSS_W / 2, by + 74, pulse + 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(bx + BOSS_W / 2 - pulse - 14, by + 74);
        ctx.lineTo(bx + BOSS_W / 2 + pulse + 14, by + 74);
        ctx.moveTo(bx + BOSS_W / 2, by + 74 - pulse - 14);
        ctx.lineTo(bx + BOSS_W / 2, by + 74 + pulse + 14);
        ctx.stroke();
      }
      ctx.restore();

      /* ---- proyectiles ---- */
      for (const p of g.projs) {
        if (p.tipo === "slide") {
          ctx.fillStyle = "#edf2f7";
          ctx.fillRect(p.x - 16, p.y - 11, 32, 22);
          ctx.fillStyle = "#7c8da0";
          ctx.fillRect(p.x - 12, p.y - 6, 24, 2);
          ctx.fillRect(p.x - 12, p.y - 1, 18, 2);
          ctx.fillRect(p.x - 12, p.y + 4, 21, 2);
        } else if (p.tipo === "wave") {
          ctx.strokeStyle = "#ff6a00";
          ctx.lineWidth = 2;
          const r = 9 + Math.sin(p.t * 4) * 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 0.5, 0, Math.PI * 2);
          ctx.stroke();
        } else if (p.tipo === "zzz") {
          ctx.fillStyle = "#ff6a00";
          ctx.font = `700 22px ${fontRef.current}`;
          ctx.textAlign = "center";
          ctx.fillText("Z", p.x, p.y + 8);
        } else {
          ctx.fillStyle = "#ff6a00";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y + 10);
          ctx.lineTo(p.x - 7, p.y - 7);
          ctx.lineTo(p.x + 7, p.y - 7);
          ctx.closePath();
          ctx.fill();
        }
      }

      /* ---- power-up ---- */
      if (g.pup) {
        const arma = ARMAS[g.owned];
        const bob = Math.sin(g.t * 0.006) * 4;
        ctx.save();
        ctx.translate(g.pup.x, g.pup.y + bob);
        ctx.strokeStyle = arma.color;
        ctx.lineWidth = 2.5;
        diRect(-19, -15, 38, 30, 13);
        ctx.stroke();
        ctx.fillStyle = arma.color;
        ctx.font = `700 13px ${fontRef.current}`;
        ctx.textAlign = "center";
        ctx.fillText(arma.nombre.slice(0, 1), 0, 5);
        /* glow */
        ctx.strokeStyle = arma.color + "44";
        ctx.lineWidth = 6;
        diRect(-23, -19, 46, 38, 16);
        ctx.stroke();
        ctx.restore();
        /* flecha "atrápame" */
        ctx.fillStyle = "#43c6d4";
        ctx.font = `600 11px ${fontRef.current}`;
        ctx.textAlign = "center";
        ctx.fillText("▼ atrápala", g.pup.x, g.pup.y + bob - 26);
      }

      /* ---- disparos ---- */
      for (const sh of g.shots) {
        ctx.fillStyle = g.owned >= 3 ? "#ff9a4d" : "#43c6d4";
        ctx.fillRect(sh.x - 2, sh.y - 8, 4, 12);
        if (g.owned >= 3) {
          ctx.fillStyle = "rgba(255,106,0,0.35)";
          ctx.fillRect(sh.x - 1, sh.y + 4, 2, 10);
        }
      }

      /* ---- jugador: nave DI ---- */
      const blink = g.inv > 0 && Math.floor(g.t / 100) % 2 === 0;
      if (!blink) {
        ctx.save();
        ctx.translate(g.px, PLAYER_Y);
        ctx.strokeStyle = "#43c6d4";
        ctx.fillStyle = "rgba(67,198,212,0.15)";
        ctx.lineWidth = 2.5;
        diRect(-16, -11, 32, 22, 10);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#ff6a00";
        ctx.beginPath();
        ctx.arc(2, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        /* propulsor */
        ctx.fillStyle = Math.random() < 0.5 ? "#ff6a00" : "#ffb066";
        ctx.beginPath();
        ctx.moveTo(-6, 11);
        ctx.lineTo(0, 18 + Math.random() * 5);
        ctx.lineTo(6, 11);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      /* ---- partículas ---- */
      for (const pa of g.parts) {
        ctx.globalAlpha = Math.max(0, pa.life);
        ctx.fillStyle = pa.color;
        ctx.fillRect(pa.x - 2, pa.y - 2, 4, 4);
      }
      ctx.globalAlpha = 1;

      /* ---- HUD ---- */
      /* barra de vida del jefe */
      ctx.font = `600 11px ${fontRef.current}`;
      ctx.textAlign = "left";
      ctx.fillStyle = "#7c8da0";
      ctx.fillText("EL ABURRIMIENTO CORPORATIVO", 16, 24);
      ctx.strokeStyle = "rgba(255,106,0,0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(16, 32, 280, 10);
      if (g.owned >= 1) {
        ctx.fillStyle = "#ff6a00";
        ctx.fillRect(17, 33, 278 * (g.hp / HP_MAX), 8);
      } else {
        ctx.fillStyle = "#7c8da0";
        ctx.font = `600 9px ${fontRef.current}`;
        ctx.fillText("? ? ?  (necesitas un diagnóstico)", 22, 40.5);
      }
      /* vidas */
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = i < g.lives ? "#ff6a00" : "rgba(124,141,160,0.3)";
        const hx = W - 30 - i * 24;
        ctx.beginPath();
        ctx.arc(hx - 4, 24, 5, 0, Math.PI * 2);
        ctx.arc(hx + 4, 24, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(hx - 8.5, 26);
        ctx.lineTo(hx, 36);
        ctx.lineTo(hx + 8.5, 26);
        ctx.closePath();
        ctx.fill();
      }
      /* arsenal: 5 ranuras */
      for (let i = 0; i < 5; i++) {
        const ax = 16 + i * 30;
        const owned = i < g.owned;
        ctx.strokeStyle = owned ? ARMAS[i].color : "rgba(124,141,160,0.35)";
        ctx.lineWidth = 1.5;
        diRect(ax, H - 32, 24, 20, 8);
        ctx.stroke();
        ctx.fillStyle = owned ? ARMAS[i].color : "rgba(124,141,160,0.35)";
        ctx.font = `700 10px ${fontRef.current}`;
        ctx.textAlign = "center";
        ctx.fillText(ARMAS[i].nombre.slice(0, 1), ax + 12, H - 18);
      }
      /* hint contextual */
      ctx.fillStyle = "#7c8da0";
      ctx.font = `600 10px ${fontRef.current}`;
      ctx.textAlign = "right";
      const hint =
        g.owned === 0
          ? "esquiva — tus golpes aún no le hacen nada"
          : g.mode === "fight"
            ? "¡fuego automático! baja su barra"
            : "esquiva y atrapa la siguiente arma";
      ctx.fillText(hint, W - 16, H - 18);

      ctx.restore();
    };

    /* ---- loop ---- */
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(now - last, 34);
      last = now;
      const g = gRef.current;
      if (uiRef.current === "play" && !g.paused && !g.over) update(g, dt);
      if (uiRef.current === "play" || uiRef.current === "over") draw(g);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    if (process.env.NODE_ENV === "development") {
      // Paso manual para pruebas automatizadas (rAF se congela en tabs ocultas)
      (window as unknown as { __step?: (dt: number) => void }).__step = (dt: number) => {
        const g = gRef.current;
        if (uiRef.current === "play" && !g.paused && !g.over) update(g, dt);
        draw(g);
      };
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      canvas.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("pointerup", pu);
    };
  }, []);

  const rango = livesUi >= 3 ? "S" : livesUi === 2 ? "A" : "B";
  const rangoTexto =
    rango === "S"
      ? "Sin un rasguño. El aburrimiento nunca tuvo oportunidad."
      : rango === "A"
        ? "Gran combate: unas cicatrices, pero la lección quedó."
        : "Ganaste a la mala — que es, también, una forma de aprender.";

  return (
    <div className={s.wrap} data-cursor="hover">
      <div className={s.bar}>
        <span className={s.barTitle}>NIVEL SECRETO · el último curso</span>
        <span className={s.barRight}>
          {ui === "play" ? "en combate" : ui === "win" ? "victoria" : ui === "over" ? "game over" : "insert coin"}
        </span>
      </div>

      <div className={s.stage}>
        <canvas
          ref={canvasRef}
          className={s.canvas}
          style={{ aspectRatio: `${W} / ${H}` }}
          aria-label="Videojuego: derrota al Aburrimiento Corporativo esquivando sus ataques y atrapando las 5 armas del diseño instruccional"
        />

        {/* ---- TITLE ---- */}
        {ui === "title" && (
          <div className={s.overlay}>
            <p className={s.kicker}>⚠ jefe final detectado</p>
            <h3 className={s.big}>EL ÚLTIMO CURSO</h3>
            <div className={s.bossSays}>
              <span className={s.bossName}>EL ABURRIMIENTO CORPORATIVO:</span>
              «¿Otro héroe? Llevo 20 años durmiendo a tu equipo con diapositivas.
              Nadie termina tus cursos. <strong>Nadie terminará este.</strong>»
            </div>
            <p className={s.instrucciones}>
              Esquiva sus ataques con <strong>← →</strong> (o arrastra el dedo).
              Atrapa las <strong>5 armas del diseño instruccional</strong> que
              irán cayendo: cada una cambia tu forma de pelear. Tienes 3 vidas.
            </p>
            <button className={s.start} onClick={empezar}>
              ▶ Insertar moneda
            </button>
          </div>
        )}

        {/* ---- ANUNCIO DE ARMA (gigante) ---- */}
        {announce && (
          <div className={s.announce} style={{ "--arma": announce.color } as React.CSSProperties}>
            <p className={s.announceGet}>¡ARMA OBTENIDA!</p>
            <p className={s.announceName}>{announce.nombre}</p>
            <p className={s.announceGrito}>{announce.grito}</p>
            <p className={s.announceEfecto}>{announce.efecto}</p>
          </div>
        )}

        {/* ---- TAUNT DEL JEFE ---- */}
        {taunt && ui === "play" && <div className={s.taunt}>{taunt}</div>}

        {/* ---- GAME OVER ---- */}
        {ui === "over" && (
          <div className={s.overlay}>
            <h3 className={s.big}>GAME OVER</h3>
            <div className={s.bossSays}>
              <span className={s.bossName}>EL ABURRIMIENTO CORPORATIVO:</span>
              «Otro curso abandonado a la mitad. <strong>Típico.</strong>»
            </div>
            <button className={s.start} onClick={empezar}>
              ↻ Reintentar — que no gane el PDF
            </button>
          </div>
        )}

        {/* ---- VICTORIA ---- */}
        {ui === "win" && (
          <div className={s.overlay}>
            <div className={s.rank}>{rango}</div>
            <h3 className={s.big}>JEFE DERROTADO</h3>
            <p className={s.rangoTexto}>{rangoTexto}</p>
            <p className={s.quote}>
              Antes no sabías cómo íbamos a resolver tus necesidades de
              capacitación. <em>Ahora lo sabes</em> — y lo aprendiste jugando.
              Imagina lo que podemos lograr con un proyecto completo, enfocado
              en tu empresa.
            </p>
            <div className={s.winActions}>
              <a href="/contacto" className={home.cta}>
                Iniciar proyecto real
              </a>
              <button className={s.replay} onClick={empezar}>
                ↻ jugar de nuevo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
