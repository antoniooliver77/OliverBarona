import type { Metadata } from "next";
import sv from "../servicio.module.css";
import { PageShell } from "../components/PageShell";
import { CONTACTO } from "../lib/contacto";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Aviso de privacidad de oliverbarona.com: qué datos personales se recaban, con qué finalidad y cómo ejercer tus derechos ARCO.",
  alternates: { canonical: "/aviso-de-privacidad" },
  robots: { index: true, follow: true },
};

export default function AvisoPrivacidadPage() {
  return (
    <PageShell modulo="aviso_privacidad.txt" accent="var(--neon-cyan)" accentSoft="rgba(67, 198, 212, 0.1)">
      <header className={sv.head}>
        <span className={sv.code}>DOCUMENTO LEGAL</span>
        <h1 className={sv.title}>
          Aviso de <span>privacidad</span>
        </h1>
        <p className={sv.lede}>
          Corto y sin letra chica: qué datos tuyos recibo, para qué los uso y
          cómo puedes pedirme que los corrija o los borre.
        </p>
      </header>

      <section className={sv.section}>
        <h2 className={sv.h2}>Responsable de tus datos</h2>
        <p className={sv.prose}>
          Oliver Barona (en adelante, &ldquo;el Responsable&rdquo;), con
          domicilio en México, es responsable del tratamiento de los datos
          personales que proporciones a través de este sitio, conforme a la Ley
          Federal de Protección de Datos Personales en Posesión de los
          Particulares.
        </p>

        <h2 className={sv.h2}>Qué datos recabo y para qué</h2>
        <p className={sv.prose}>
          A través del formulario de contacto y de WhatsApp puedo recibir:
          nombre, correo electrónico, teléfono y la información que decidas
          compartir sobre tu proyecto (por ejemplo, tu perfil, número de
          seguidores o necesidades de capacitación). Estos datos se usan
          exclusivamente para: responder tu mensaje, preparar propuestas y
          cotizaciones, y — si contratamos — prestar los servicios acordados.
          No envío publicidad no solicitada ni vendo, rento o comparto tus
          datos con terceros, salvo obligación legal.
        </p>

        <h2 className={sv.h2}>Servicios de terceros</h2>
        <p className={sv.prose}>
          El formulario de contacto se procesa mediante Formspree y la
          mensajería mediante WhatsApp; ambos servicios tratan los datos
          conforme a sus propias políticas de privacidad. Este sitio no usa
          cookies de rastreo publicitario.
        </p>

        <h2 className={sv.h2}>Tus derechos (ARCO)</h2>
        <p className={sv.prose}>
          Puedes solicitar en cualquier momento el acceso, rectificación,
          cancelación u oposición al tratamiento de tus datos escribiendo a{" "}
          <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a>. Te
          responderé en un plazo máximo de 20 días hábiles.
        </p>

        <h2 className={sv.h2}>Cambios a este aviso</h2>
        <p className={sv.prose}>
          Cualquier modificación se publicará en esta misma página. Última
          actualización: julio de 2026.
        </p>
      </section>
    </PageShell>
  );
}
