import sv from "../servicio.module.css";

export type Paso = { titulo: string; desc: string };

/** Mapa de ruta — el gráfico insignia: nodos DI conectados por circuito.
 *  El último nodo va lleno: es el clímax. */
export function MapaRuta({ pasos }: { pasos: Paso[] }) {
  return (
    <div className={sv.ruta}>
      {pasos.map((p, i) => (
        <div key={p.titulo} className={sv.rutaStep}>
          <div className={sv.rutaNum}>{String(i + 1).padStart(2, "0")}</div>
          <h3 className={sv.rutaTitle}>{p.titulo}</h3>
          <p className={sv.rutaDesc}>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}
