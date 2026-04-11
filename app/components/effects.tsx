"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import React, {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ==========================================================================
   CUSTOM CURSOR — desktop only, retícula HUD
   ========================================================================== */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches || reduce.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let rafId = 0;
    let pendingX = -100, pendingY = -100;

    const move = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          x.set(pendingX);
          y.set(pendingY);
          const t = document.elementFromPoint(pendingX, pendingY) as HTMLElement | null;
          setActive(
            !!t &&
              !!t.closest(
                'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
              )
          );
          rafId = 0;
        });
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          translateX: sx,
          translateY: sy,
          position: "fixed",
          left: 0,
          top: 0,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
        animate={{ scale: active ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <svg viewBox="0 0 36 36" width="36" height="36">
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1"
            opacity="0.9"
          />
          <line x1="18" y1="2" x2="18" y2="9" stroke="#00f0ff" strokeWidth="1" />
          <line
            x1="18"
            y1="27"
            x2="18"
            y2="34"
            stroke="#00f0ff"
            strokeWidth="1"
          />
          <line x1="2" y1="18" x2="9" y2="18" stroke="#00f0ff" strokeWidth="1" />
          <line
            x1="27"
            y1="18"
            x2="34"
            y2="18"
            stroke="#00f0ff"
            strokeWidth="1"
          />
          <circle cx="18" cy="18" r="1.5" fill="#ff6600" />
        </svg>
      </motion.div>
      <motion.div
        aria-hidden
        style={{
          translateX: x,
          translateY: y,
          position: "fixed",
          left: 0,
          top: 0,
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          background: "#00f0ff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          boxShadow: "0 0 8px #00f0ff",
        }}
      />
    </>
  );
}

/* ==========================================================================
   SCROLL PROGRESS — barra HUD superior
   ========================================================================== */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const pct = useTransform(scrollYProgress, (v) => Math.round(v * 100));
  const [val, setVal] = useState(0);

  useEffect(() => pct.on("change", (v) => setVal(v)), [pct]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          scaleX,
          transformOrigin: "0 0",
          height: 2,
          background:
            "linear-gradient(90deg, #00f0ff, #b200ff 50%, #ff6600)",
          boxShadow: "0 0 10px #00f0ff",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 16,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "#00f0ff",
          textTransform: "uppercase",
          textShadow: "0 0 8px rgba(0,240,255,0.6)",
        }}
      >
        LMS_OS · {String(val).padStart(3, "0")}%
      </div>
    </div>
  );
}

/* ==========================================================================
   SCRAMBLE TEXT — letras random que se resuelven
   ========================================================================== */
const CHARS = "!<>-_\\/[]{}—=+*^?#____";
export function ScrambleText({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  duration = 1500,
}: {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
}) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    let start = 0;
    const total = text.length;
    const step = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start - delay;
      if (elapsed < 0) {
        // No reemplazar con dots durante el delay: mantener el texto real
        // para que el LCP capture el contenido correcto en el primer paint.
        raf = requestAnimationFrame(step);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * total);
      let s = "";
      for (let i = 0; i < total; i++) {
        const c = text[i];
        if (c === " " || c === "\n") {
          s += c;
          continue;
        }
        if (i < revealed) s += c;
        else s += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOut(s);
      if (progress < 1) raf = requestAnimationFrame(step);
      else setOut(text);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, duration]);

  const T = Tag as React.ElementType;
  return <T ref={ref} className={className} aria-label={text}>{out}</T>;
}

/* ==========================================================================
   GLITCH TEXT — RGB split + glitch periódico
   ========================================================================== */
export function GlitchText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    let revertId = 0;
    const tick = () => {
      setGlitch(true);
      revertId = window.setTimeout(() => setGlitch(false), 180);
    };
    const id = setInterval(tick, 6000 + Math.random() * 4000);
    return () => {
      clearInterval(id);
      clearTimeout(revertId);
    };
  }, []);
  return (
    <span className={className} data-glitch={glitch || undefined} data-text={children}>
      {children}
    </span>
  );
}

/* ==========================================================================
   TYPEWRITER — escribe al entrar al viewport
   Acepta `segments` para colorear palabras durante la animación.
   ========================================================================== */
type Segment = { text: string; color?: string };

// Aplana segmentos en chars con metadatos de color
function buildChars(segments: Segment[]) {
  return segments.flatMap((seg) =>
    seg.text.split("").map((char) => ({ char, color: seg.color }))
  );
}

export function Typewriter({
  text,
  segments,
  className,
  speed = 18,
}: {
  text?: string;
  segments?: Segment[];
  className?: string;
  speed?: number;
}) {
  const chars = segments ? buildChars(segments) : (text ?? "").split("").map((c) => ({ char: c, color: undefined }));
  const fullText = chars.map((c) => c.char).join("");

  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setCount(i);
      if (i >= chars.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [inView, chars.length, speed]);

  const visible = chars.slice(0, count);

  // Agrupa chars consecutivos del mismo color para minimizar spans
  const grouped: { text: string; color?: string }[] = [];
  for (const c of visible) {
    const last = grouped[grouped.length - 1];
    if (last && last.color === c.color) {
      last.text += c.char;
    } else {
      grouped.push({ text: c.char, color: c.color });
    }
  }

  return (
    <p ref={ref} className={className} aria-label={fullText}>
      {grouped.map((g, i) =>
        g.color ? (
          <span key={i} style={{ color: g.color, fontWeight: 600 }}>{g.text}</span>
        ) : (
          <React.Fragment key={i}>{g.text}</React.Fragment>
        )
      )}
      {inView && count < chars.length && (
        <span
          style={{
            display: "inline-block",
            width: "0.55em",
            height: "1em",
            verticalAlign: "-0.15em",
            background: "#00f0ff",
            marginLeft: 2,
            animation: "blinkCaret 0.8s step-end infinite",
          }}
        />
      )}
    </p>
  );
}

/* ==========================================================================
   COUNTER — número que cuenta al entrar al viewport
   ========================================================================== */
export function Counter({
  to,
  duration = 2200,
  className,
  style,
  format = (n) => n.toLocaleString("es-MX"),
}: {
  to: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [n, setN] = useState(to); // Inicia en valor final para SSR/LCP
  useEffect(() => {
    if (!inView) return;
    setN(0); // Solo resetea en cliente tras entrar al viewport
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
      else setN(to);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className} style={style}>
      {format(n)}
    </span>
  );
}

/* ==========================================================================
   PARTICLES — canvas, partículas flotantes ligero
   ========================================================================== */
export function Particles({ density = 60 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    // Reducir densidad en móvil para ahorrar GPU
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = isMobile ? Math.floor(density * 0.4) : density;

    const ctx = c.getContext("2d", { alpha: true })!;
    const dpr = Math.min(devicePixelRatio, 2); // Cap DPR a 2x máximo
    let w = (c.width = c.offsetWidth * dpr);
    let h = (c.height = c.offsetHeight * dpr);
    let raf = 0;

    type P = { x: number; y: number; vx: number; vy: number; r: number; col: string };
    const colors = ["#00f0ff", "#b200ff", "#ff6600"];
    const ps: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.4,
      col: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Debounce resize para no recalcular en cada px
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        w = c.width = c.offsetWidth * dpr;
        h = c.height = c.offsetHeight * dpr;
      }, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Agrupar partículas por color para minimizar cambios de fillStyle
    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      // Dibujar sin shadowBlur por partícula (muy costoso).
      // Usamos un único filter blur global por grupo de color.
      for (const col of colors) {
        ctx.beginPath();
        ctx.fillStyle = col;
        for (const p of ps) {
          if (p.col !== col) continue;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          ctx.moveTo(p.x + p.r * dpr, p.y);
          ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2);
        }
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);
  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
