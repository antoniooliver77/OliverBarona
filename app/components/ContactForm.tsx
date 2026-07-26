"use client";

import { useEffect, useState } from "react";
import s from "./ContactForm.module.css";
import { CONTACTO } from "../lib/contacto";

type Field = {
  id: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  placeholder: string;
  options?: string[];
  required?: boolean;
};

const FIELDS: Field[] = [
  {
    id: "nombre",
    label: "01 · NOMBRE",
    type: "text",
    placeholder: "Tu nombre completo",
    required: true,
  },
  {
    id: "correo",
    label: "02 · CORREO",
    type: "email",
    placeholder: "tu@correo.com",
    required: true,
  },
  {
    id: "perfil",
    label: "03 · PERFIL (opcional)",
    type: "select",
    placeholder: "Selecciona tu perfil",
    options: [
      "Empresa — quiero capacitar a mi equipo",
      "Institución educativa — academia digital",
      "Creador — quiero lanzar un curso en línea",
      "Otro",
    ],
    required: false,
  },
  {
    id: "mensaje",
    label: "04 · MENSAJE",
    type: "textarea",
    placeholder: "Cuéntame qué necesitas. Sin filtros.",
    required: true,
  },
];

export function ContactForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});

  // Si vienen del Auditorio de creadores (?trato=...), precarga el mensaje
  useEffect(() => {
    const trato = new URLSearchParams(window.location.search).get("trato");
    if (trato) {
      setValues((prev) => ({
        ...prev,
        mensaje: prev.mensaje ?? trato,
        perfil: prev.perfil ?? "Creador — quiero lanzar un curso en línea",
      }));
    }
  }, []);

  const set = (id: string, v: string) => {
    setValues((prev) => ({ ...prev, [id]: v }));
    setErrores((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id]; // el error se limpia en cuanto corrigen
      return next;
    });
  };

  /** Valida los campos obligatorios: nombre, correo y mensaje. */
  const validar = () => {
    const e: Record<string, string> = {};
    const nombre = (values.nombre ?? "").trim();
    const correo = (values.correo ?? "").trim();
    const mensaje = (values.mensaje ?? "").trim();

    if (nombre.length < 2) e.nombre = "Escribe tu nombre.";
    if (!correo) e.correo = "Necesito tu correo para responderte.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo))
      e.correo = "Ese correo no se ve válido. Revísalo, por favor.";
    if (mensaje.length < 10)
      e.mensaje = "Cuéntame un poco más — al menos una frase.";

    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fallos = validar();
    if (Object.keys(fallos).length > 0) {
      setErrores(fallos);
      setStatus("idle");
      // enfoca el primer campo con problema
      const primero = FIELDS.find((f) => fallos[f.id]);
      if (primero) document.getElementById(primero.id)?.focus();
      return;
    }

    setErrores({});
    setStatus("sending");
    try {
      // El ID se configura en app/lib/contacto.ts (Formspree)
      const res = await fetch(`https://formspree.io/f/${CONTACTO.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  };

  if (status === "ok") {
    return (
      <div className={s.success}>
        <span className={s.successIcon}>✓</span>
        <p className={s.successTitle}>TRANSMISIÓN ENVIADA</p>
        <p className={s.successSub}>
          Mensaje recibido. Me pondré en contacto contigo pronto.
        </p>
      </div>
    );
  }

  return (
    // noValidate: la validación la hacemos nosotros para que los mensajes
    // salgan en español y con el estilo del sitio (los nativos cambian con
    // el idioma del navegador).
    <form className={s.form} onSubmit={handleSubmit} noValidate>
      <div className={s.grid}>
        {FIELDS.map((f) => (
          <div
            key={f.id}
            className={`${s.field} ${f.type === "textarea" ? s.full : ""} ${
              focused === f.id ? s.active : ""
            } ${errores[f.id] ? s.invalid : ""}`}
          >
            <label className={s.label} htmlFor={f.id}>
              {f.label}
            </label>

            {f.type === "textarea" ? (
              <textarea
                id={f.id}
                className={s.input}
                placeholder={f.placeholder}
                required={f.required}
                rows={4}
                aria-invalid={errores[f.id] ? true : undefined}
                aria-describedby={errores[f.id] ? `${f.id}-error` : undefined}
                value={values[f.id] ?? ""}
                onChange={(e) => set(f.id, e.target.value)}
                onFocus={() => setFocused(f.id)}
                onBlur={() => setFocused(null)}
              />
            ) : f.type === "select" ? (
              <select
                id={f.id}
                className={s.input}
                required={f.required}
                value={values[f.id] ?? ""}
                onChange={(e) => set(f.id, e.target.value)}
                onFocus={() => setFocused(f.id)}
                onBlur={() => setFocused(null)}
              >
                <option value="" disabled>
                  {f.placeholder}
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={f.id}
                className={s.input}
                type={f.type}
                placeholder={f.placeholder}
                required={f.required}
                aria-invalid={errores[f.id] ? true : undefined}
                aria-describedby={errores[f.id] ? `${f.id}-error` : undefined}
                value={values[f.id] ?? ""}
                onChange={(e) => set(f.id, e.target.value)}
                onFocus={() => setFocused(f.id)}
                onBlur={() => setFocused(null)}
              />
            )}

            {errores[f.id] && (
              <p className={s.fieldError} id={`${f.id}-error`} role="alert">
                {errores[f.id]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className={s.actions}>
        <button
          className={s.submit}
          type="submit"
          disabled={status === "sending"}
        >
          {/* span necesario: el relleno naranja (::before) taparía el texto suelto */}
          <span>{status === "sending" ? "ENVIANDO_" : "INICIAR CONTACTO →"}</span>
        </button>
        {status === "err" && (
          <span className={s.errMsg}>
            Error de transmisión. Intenta de nuevo.
          </span>
        )}
      </div>
    </form>
  );
}
