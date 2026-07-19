import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: monograma OB en contenedor DI (recta → curva) sobre carbón. */
export default function Icon() {
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
            width: 52,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "4px solid #ff6a00",
            borderRadius: "4px 22px 22px 4px",
            color: "#ff6a00",
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "sans-serif",
            letterSpacing: 1,
          }}
        >
          OB
        </div>
      </div>
    ),
    { ...size }
  );
}
