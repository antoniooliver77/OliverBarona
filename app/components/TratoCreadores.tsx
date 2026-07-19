"use client";

import { useEffect, useRef, useState } from "react";
import s from "./TratoCreadores.module.css";
import home from "../page.module.css";
import { waLink } from "../lib/contacto";

/* ============================================================
   EL AUDITORIO — tu comunidad decide el trato
   Reglas:
   · El proyecto completo vale $25,000 USD (fijo).
   · Piso: 100,000 seguidores para hacer trato.
   · Pago mínimo: $10,000 en 100k, baja $1,000 por cada 100k
     extra, hasta $0 en 1,100,000+.
   · Pagando el mínimo siempre es 50/50. Pagando más, mi %
     baja lineal hasta 0% en $25,000.
   ============================================================ */

const PRECIO = 25000;
const PISO_SEGUIDORES = 100000;
const TOPE_SEGUIDORES = 1100000;
const PAGO_MIN_BASE = 10000;
const SHARE_MAX = 50;

/* pago mínimo según comunidad */
const pagoMinimo = (f: number) => {
  if (f < PISO_SEGUIDORES) return PRECIO;
  return Math.max(0, PAGO_MIN_BASE - (f - PISO_SEGUIDORES) / 100);
};

/* % mío: 50% pagando el mínimo → 0% pagando completo */
const parteMia = (pago: number, minimo: number) => {
  if (PRECIO - minimo <= 0) return 0;
  return Math.max(0, Math.min(SHARE_MAX, (SHARE_MAX * (PRECIO - pago)) / (PRECIO - minimo)));
};

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const num = (n: number) => n.toLocaleString("es-MX");

/* paradas del slider de seguidores (escala tipo log, valores bonitos) */
const PARADAS = [
  10000, 25000, 50000, 75000, 100000, 150000, 200000, 250000, 300000, 400000,
  500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1500000, 2000000, 3000000,
];

export function TratoCreadores() {
  const [seguidores, setSeguidores] = useState(300000);
  const [pago, setPago] = useState<number | null>(null); // null = mínimo
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const minimo = Math.ceil(pagoMinimo(seguidores) / 100) * 100;
  const hayTrato = seguidores >= PISO_SEGUIDORES;
  const pagoActual = Math.max(minimo, Math.min(PRECIO, pago ?? minimo));
  const mio = Math.round(parteMia(pagoActual, minimo));
  const tuyo = 100 - mio;
  const apuesto = PRECIO - pagoActual;

  const idx = PARADAS.reduce(
    (best, v, i) => (Math.abs(v - seguidores) < Math.abs(PARADAS[best] - seguidores) ? i : best),
    0
  );

  /* ---- auditorio: cada punto son 1,000 personas ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const CW = 720;
    const CH = 220;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = CW * dpr;
    canvas.height = CH * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = "#060a0e";
    ctx.fillRect(0, 0, CW, CH);

    /* escenario: tú */
    const sx = CW / 2;
    const sy = CH - 18;
    ctx.strokeStyle = "rgba(255, 106, 0, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(sx, sy, 13, Math.PI, 0);
    ctx.stroke();
    ctx.fillStyle = "#ff6a00";
    ctx.beginPath();
    ctx.arc(sx, sy - 2, 4.5, 0, Math.PI * 2);
    ctx.fill();

    /* asientos en arcos alrededor del escenario */
    const porPunto = seguidores > 1500000 ? 2500 : 1000;
    let restantes = Math.min(1500, Math.round(seguidores / porPunto));
    const total = restantes;
    let radio = 42;
    while (restantes > 0 && radio < 300) {
      const asientos = Math.floor((Math.PI * radio) / 10);
      const enFila = Math.min(asientos, restantes);
      for (let i = 0; i < enFila; i++) {
        const a = Math.PI + (Math.PI * (i + 0.5)) / asientos;
        const x = sx + Math.cos(a) * radio;
        const y = sy + Math.sin(a) * radio * 0.62;
        if (y < 8 || x < 8 || x > CW - 8) continue;
        const brillo = 0.45 + Math.random() * 0.5;
        ctx.fillStyle = `rgba(67, 198, 212, ${brillo})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }
      restantes -= enFila;
      radio += 13;
    }

    /* etiqueta */
    ctx.fillStyle = "#7c8da0";
    ctx.font = "10px monospace";
    ctx.textAlign = "right";
    ctx.fillText(`cada punto = ${num(porPunto)} personas · ${num(total)} puntos`, CW - 10, CH - 8);
    ctx.textAlign = "left";
    ctx.fillText("tú →", sx - 52, sy - 2);
  }, [seguidores]);

  const mensajeTrato = `Vengo del Auditorio de creadores. Mi comunidad: ${num(seguidores)} seguidores. Trato simulado: pago ${usd(pagoActual)} y reparto ${tuyo}% / ${mio}%. Quiero cerrarlo de verdad.`;

  return (
    <div className={s.wrap} data-cursor="hover">
      <div className={s.bar}>
        <span className={s.barTitle}>EL AUDITORIO · tu comunidad decide el trato</span>
        <span className={s.barRight}>{hayTrato ? "mesa abierta" : "construyendo"}</span>
      </div>

      <div className={s.inner}>
        {/* ---- PASO 1: tu comunidad ---- */}
        <p className={s.pasoLabel}>[ paso 01 · muéstrame tu comunidad ]</p>

        <canvas
          ref={canvasRef}
          className={s.audCanvas}
          style={{ aspectRatio: "720 / 220" }}
          aria-hidden
        />

        <p className={s.audMensaje}>
          {seguidores >= 1000000 ? (
            <>Un auditorio de <em>{num(seguidores)}</em> personas te escucha. Eso no se compra: se gana.</>
          ) : hayTrato ? (
            <>Ya hiciste lo más difícil: <em>{num(seguidores)}</em> personas te escuchan.</>
          ) : (
            <>Vas construyendo: <em>{num(seguidores)}</em> personas ya te escuchan.</>
          )}
        </p>

        <div className={s.controles}>
          <label htmlFor="segs">Seguidores en tu plataforma más fuerte</label>
          <input
            id="segs"
            className={s.numInput}
            type="number"
            min={0}
            step={1000}
            value={seguidores}
            onChange={(e) => {
              setSeguidores(Math.max(0, Number(e.target.value) || 0));
              setPago(null);
            }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={PARADAS.length - 1}
          step={1}
          value={idx}
          onChange={(e) => {
            setSeguidores(PARADAS[Number(e.target.value)]);
            setPago(null);
          }}
          className={s.slider}
          style={{ "--pct": `${(idx / (PARADAS.length - 1)) * 100}%` } as React.CSSProperties}
          aria-label="Seguidores en tu plataforma más fuerte"
        />
        <div className={s.marks}>
          <span>10k</span>
          <span>100k · aquí abre la mesa</span>
          <span>1.1M · apuesta total</span>
          <span>3M</span>
        </div>

        {/* ---- <100k: honestidad radical ---- */}
        {!hayTrato && (
          <div className={s.honesto}>
            <p className={s.honestoTitulo}>Todavía no — y te lo digo de frente.</p>
            <p className={s.honestoTexto}>
              Debajo de <strong>100,000 seguidores</strong> este trato no te
              conviene, y no acepto dinero de tratos que no convienen. Lo más
              valioso que tienes es tu comunidad: síguela construyendo, que
              nadie puede hacer eso por ti. Cuando cruces los 100k,{" "}
              <strong>esta mesa te espera</strong>. Y si ya casi llegas,
              escríbeme igual — me gusta conocer a la gente antes de que
              explote.
            </p>
          </div>
        )}

        {/* ---- PASO 2: la mesa ---- */}
        {hayTrato && (
          <>
            <p className={s.pasoLabel} style={{ marginTop: "1.75rem" }}>
              [ paso 02 · decide cuánto pones tú ]
            </p>
            <div className={s.mesa}>
              <div className={`${s.lado} ${s.ladoTu}`}>
                <p className={s.ladoTitulo}>Tú pones</p>
                <div className={s.cifra}>{usd(pagoActual)}</div>
                <input
                  type="range"
                  min={minimo}
                  max={PRECIO}
                  step={500}
                  value={pagoActual}
                  onChange={(e) => setPago(Number(e.target.value))}
                  className={s.slider}
                  style={{
                    "--pct": `${((pagoActual - minimo) / Math.max(1, PRECIO - minimo)) * 100}%`,
                  } as React.CSSProperties}
                  aria-label="Cuánto pagas del proyecto en efectivo"
                  aria-valuetext={`${usd(pagoActual)}, reparto ${tuyo} a ${mio}`}
                />
                <div className={s.marks}>
                  <span>{usd(minimo)} · tu mínimo</span>
                  <span>{usd(PRECIO)} · todo tuyo</span>
                </div>
                <p className={s.minimoNota}>
                  con {num(seguidores)} seguidores tu pago mínimo es {usd(minimo)}
                </p>
                <p className={s.apuesta}>
                  ...y pones lo que no se compra: <strong>una comunidad de {num(seguidores)}</strong> que
                  confía en ti.
                </p>
              </div>

              <div className={`${s.lado} ${s.ladoYo}`}>
                <p className={s.ladoTitulo}>Yo pongo</p>
                <div className={s.cifra}>
                  <em>{usd(apuesto)}</em>
                </div>
                <p className={s.cifraSub}>
                  de mi trabajo, <strong>apostados a tu comunidad</strong>. El
                  proyecto completo vale {usd(PRECIO)}: plataforma propia,
                  diseño instruccional, tu curso montado y listo para vender.
                </p>
                <p className={s.apuesta}>
                  {apuesto === 0 ? (
                    <>Pagaste el proyecto completo: no aposté nada y <strong>no te cobro ni un peso de tus ventas</strong>.</>
                  ) : mio >= 50 ? (
                    <>Apuesta máxima: vamos <strong>a mitades</strong>, como hice con El Profe Luis. Me conviene que vendas — voy a trabajar como si fuera mío. Porque lo es, en un {mio}%.</>
                  ) : (
                    <>Recupero mi apuesta con el <strong>{mio}% de tus ventas</strong>. Si a ti te va bien, a mí me va bien. Así de alineados.</>
                  )}
                </p>
              </div>
            </div>

            <div className={s.reparto}>
              <p className={s.repartoLabel}>reparto de cada venta</p>
              <p className={s.repartoCifra}>
                {tuyo}% tú · {mio}% yo
              </p>
              <div className={s.repartoBarra} aria-hidden>
                <div className={s.repartoTuyo} style={{ flex: tuyo }} />
                <div className={s.repartoMio} style={{ flex: Math.max(mio, 0.5) }} />
              </div>
              <p className={s.ajuste}>
                ¿Quieres mover estos porcentajes?{" "}
                <a
                  href={waLink(
                    `Hola Oliver, vengo del Auditorio: tengo ${num(seguidores)} seguidores y quiero platicar los porcentajes del trato (simulé pagar ${usd(pagoActual)} con reparto ${tuyo}/${mio}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mándame un WhatsApp y lo platicamos
                </a>{" "}
                — los números finos siempre se negocian de frente.
              </p>
            </div>

            {/* ---- EL CONTRATO (al final) ---- */}
            <div className={s.contrato}>
              <div className={s.contratoBar}>
                <span>borrador_de_trato.txt</span>
                <span>se firma en la llamada</span>
              </div>
              <div className={s.contratoBody}>
                <strong>CONTRATO DE APUESTA CREATIVA</strong> — borrador
                <br />
                · Yo, Oliver Barona, construyo tu plataforma de cursos completa
                — valor del proyecto: <strong>{usd(PRECIO)}</strong>.
                <br />
                · Tú pagas <i>{usd(pagoActual)}</i>.
                <br />
                {apuesto > 0 && (
                  <>
                    · Yo apuesto los <em>{usd(apuesto)}</em> restantes a tu
                    comunidad de <strong>{num(seguidores)}</strong>.
                    <br />
                  </>
                )}
                · De cada venta: <i>{tuyo}% para ti</i> · <em>{mio}% para mí</em>.
                <br />
                · Tu plataforma, tu marca, tus alumnos, tus datos. Siempre.
                <br />
                · Letra chica sin trampas: los números finos se cierran en una
                llamada.
                <br />
                <span className={s.firma}>
                  FIRMA: <em>el tipo que le apuesta a tu comunidad</em> ✍
                </span>
              </div>
              <div className={s.acciones}>
                <a
                  href={`/contacto?trato=${encodeURIComponent(mensajeTrato)}`}
                  className={home.cta}
                >
                  Llevar este trato a la llamada
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
