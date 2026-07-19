import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";
export const alt = "Oliver Barona — Diseñador Instruccional Sr.";

/** Imagen Open Graph: carbón + navy, monograma DI, línea de circuito. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(160deg, #12233a 0%, #060a0e 55%, #060a0e 100%)",
          color: "#edf2f7",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* etiqueta superior */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 24,
            letterSpacing: 6,
            color: "#43c6d4",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 54,
              height: 46,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "4px solid #ff6a00",
              borderRadius: "4px 22px 22px 4px",
              color: "#ff6a00",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            OB
          </div>
          <div style={{ display: "flex" }}>DISEÑO INSTRUCCIONAL · MX</div>
        </div>

        {/* título */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: 2,
              display: "flex",
            }}
          >
            OLIVER BARONA
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#c4cfda",
              display: "flex",
            }}
          >
            Capacitaciones donde la gente, en verdad, aprende.
          </div>
        </div>

        {/* pie con línea de circuito */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 24,
            color: "#7c8da0",
          }}
        >
          <div
            style={{
              flex: 1,
              height: 3,
              background:
                "linear-gradient(90deg, #ff6a00, rgba(255,106,0,0))",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", color: "#ff6a00", fontWeight: 700 }}>
            GANADOR iSPRING 2025
          </div>
          <div style={{ display: "flex" }}>oliverbarona.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
