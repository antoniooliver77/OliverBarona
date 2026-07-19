"use client";

import { useState, type CSSProperties } from "react";
import sv from "../servicio.module.css";

const PRECIO_MAX = 12000; // USD — con esto la plataforma es 100% tuya
const SHARE_MAX = 50; // % de reparto si pagas $0

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Calculadora del trato para creadores:
 *  pagas $12,000 USD → 0% de reparto (todo tuyo);
 *  pagas $0 → 50/50. Entre medias, lineal. */
export function CalculadoraCreadores() {
  const [precio, setPrecio] = useState(6000);

  const share = Math.round(SHARE_MAX * (1 - precio / PRECIO_MAX));
  const tuyo = 100 - share;
  const pct = (precio / PRECIO_MAX) * 100;

  const verdict =
    share === 0 ? (
      <>
        La plataforma es <strong>100% tuya</strong>. Pagaste el proyecto completo:
        cada peso que entre después es tuyo.
      </>
    ) : precio === 0 ? (
      <>
        <strong>Hoy no pagas nada.</strong> Yo pongo el trabajo, tú pones la
        audiencia y el conocimiento: vamos <strong>50 y 50</strong> en los ingresos.
      </>
    ) : (
      <>
        Pagas <strong>{usd(precio)}</strong> y de los ingresos del curso te quedas
        con el <strong>{tuyo}%</strong>. Yo participo con el {share}% — me conviene
        que vendas: trabajo con más ganas.
      </>
    );

  return (
    <div className={sv.calc} aria-label="Calculadora del trato para creadores">
      <p className={sv.calcLabel}>[ decisión · mueve la barra y mira el trato ]</p>

      <div className={sv.calcRow}>
        <div>
          <div className={sv.calcBig}>
            pagas <em>{usd(precio)}</em>
          </div>
          <input
            type="range"
            min={0}
            max={PRECIO_MAX}
            step={500}
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            className={sv.slider}
            style={{ "--pct": `${pct}%` } as CSSProperties}
            aria-label="Cuánto pagas por tu plataforma, en dólares"
            aria-valuetext={`${usd(precio)}, reparto de ingresos ${share} por ciento`}
          />
          <div className={sv.sliderMarks}>
            <span>$0 · vamos 50/50</span>
            <span>{usd(PRECIO_MAX)} · todo tuyo</span>
          </div>
        </div>

        <div className={sv.calcResult}>
          <p className={sv.calcResultLabel}>reparto de ingresos</p>
          <p className={sv.calcShare}>
            {tuyo}% tú · {share}% yo
          </p>
          <p className={sv.calcVerdict}>{verdict}</p>
        </div>
      </div>

      <p className={sv.calcNote}>
        Números redondos para pensar con claridad. Los detalles finos — plazos,
        alcance y letra chica sin trampas — los cerramos en una llamada.
      </p>
    </div>
  );
}
