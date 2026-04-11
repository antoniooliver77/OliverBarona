"use client";

import { useState } from "react";
import s from "./ContactForm.module.css";

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
    label: "03 · PERFIL",
    type: "select",
    placeholder: "Selecciona tu perfil",
    options: [
      "Empresa — quiero capacitar a mi equipo",
      "Institución educativa — academia digital",
      "Creador — quiero lanzar un curso en línea",
      "Otro",
    ],
    required: true,
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

  const set = (id: string, v: string) =>
    setValues((prev) => ({ ...prev, [id]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Cambia esta URL por tu endpoint real (Formspree, Resend, etc.)
      const res = await fetch("https://formspree.io/f/TU_FORM_ID", {
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
    <form className={s.form} onSubmit={handleSubmit} noValidate>
      <div className={s.grid}>
        {FIELDS.map((f) => (
          <div
            key={f.id}
            className={`${s.field} ${f.type === "textarea" ? s.full : ""} ${
              focused === f.id ? s.active : ""
            }`}
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
                value={values[f.id] ?? ""}
                onChange={(e) => set(f.id, e.target.value)}
                onFocus={() => setFocused(f.id)}
                onBlur={() => setFocused(null)}
              />
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
          {status === "sending" ? "ENVIANDO_" : "INICIAR CONTACTO →"}
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
