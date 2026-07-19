import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Ícono iOS: monograma OB en contenedor DI sobre carbón. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#060a0e",
        }}
      >
        <div
          style={{
            width: 132,
            height: 112,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "9px solid #ff6a00",
            borderRadius: "10px 56px 56px 10px",
            color: "#ff6a00",
            fontSize: 56,
            fontWeight: 700,
            fontFamily: "sans-serif",
            letterSpacing: 2,
          }}
        >
          OB
        </div>
      </div>
    ),
    { ...size }
  );
}
