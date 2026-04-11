"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import s from "./CharacterCard.module.css";

export type Character = {
  href: string;
  sector: "empresas" | "escuelas" | "creadores";
  id: string;
  code: string;
  title: string;
  desc: string;
  stats: { label: string; value: string }[];
};

export function CharacterCard({ c, index }: { c: Character; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={c.href}
      className={s.card}
      data-sector={c.sector}
      data-cursor="hover"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className={s.scanline} aria-hidden />
      <div className={s.noise} aria-hidden />

      <header className={s.head}>
        <span className={s.code}>{c.code}</span>
        <span className={s.id}>{c.id}</span>
      </header>

      <div className={s.body}>
        <h3 className={s.title}>{c.title}</h3>
        <p className={s.desc}>{c.desc}</p>
      </div>

      <ul className={s.stats}>
        {c.stats.map((st) => (
          <li key={st.label}>
            <span className={s.statLabel}>{st.label}</span>
            <span className={s.statValue}>{st.value}</span>
          </li>
        ))}
      </ul>

      <footer className={s.foot}>
        <span className={s.select}>[ SELECCIONAR ]</span>
        <span className={s.arrow} aria-hidden>
          →
        </span>
      </footer>

    </motion.a>
  );
}
