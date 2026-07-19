"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import s from "./Terminal.module.css";

type Line = { kind: "in" | "out" | "err"; text: string };

const HELP = [
  "comandos disponibles:",
  "  help          — muestra esta ayuda",
  "  about         — quién es Oliver Barona",
  "  skills        — stack pedagógico",
  "  contact       — datos de contacto",
  "  awards        — reconocimientos",
  "  clear         — limpia la consola",
];

const RESPONSES: Record<string, string[]> = {
  help: HELP,
  about: [
    "Oliver Barona — Diseñador Instruccional Sr.",
    "15 años creando aprendizaje significativo.",
    "Pedagogía + tecnología + dos kilos de sentido común.",
  ],
  skills: [
    "▸ Pensamiento crítico",
    "▸ Gamificación",
    "▸ Pedagogía avanzada",
    "▸ Storytelling educativo",
    "▸ Neurociencia aplicada al aprendizaje",
  ],
  contact: ["correo: hola@oliverbarona.com", "ubicación: México"],
  awards: ["★ Ganador del concurso internacional iSpring 2025"],
};

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "señal al aire — consola interactiva" },
    { kind: "out", text: 'escribe "help" para ver comandos.' },
  ]);
  const [val, setVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e9 });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const next: Line[] = [...lines, { kind: "in", text: raw }];
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const r = RESPONSES[cmd];
    if (r) {
      r.forEach((t) => next.push({ kind: "out", text: t }));
    } else {
      next.push({ kind: "err", text: `comando no reconocido: "${cmd}". prueba "help".` });
    }
    setLines(next);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(val);
      setVal("");
    }
  };

  return (
    <div className={s.term} onClick={() => inputRef.current?.focus()}>
      <header className={s.bar}>
        <span className={s.dots}>
          <i /> <i /> <i />
        </span>
        <span className={s.title}>oliver@mx-01: ~</span>
        <span className={s.status}>● al aire</span>
      </header>
      <div className={s.scroll} ref={scrollRef}>
        {lines.map((l, i) => (
          <div key={i} className={s[l.kind]}>
            {l.kind === "in" && <span className={s.prompt}>$</span>} {l.text}
          </div>
        ))}
        <div className={s.inputLine}>
          <span className={s.prompt}>$</span>
          <input
            ref={inputRef}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
            aria-label="Consola interactiva"
          />
          <span className={s.caret} />
        </div>
      </div>
    </div>
  );
}
