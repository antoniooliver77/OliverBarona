/** Datos de contacto centralizados — un solo lugar para actualizarlos. */
export const CONTACTO = {
  email: "hola@oliverbarona.com",
  /** Número de WhatsApp con lada internacional, solo dígitos. */
  whatsapp: "525578621537",
  whatsappMensaje:
    "Hola Oliver, vengo de tu página y quiero hablar sobre un proyecto de capacitación.",
  /** ID del formulario en Formspree (https://formspree.io) — pendiente de crear. */
  formspreeId: "TU_FORM_ID",
};

/** Link de WhatsApp con mensaje contextual (cada pantalla manda el suyo). */
export const waLink = (mensaje: string = CONTACTO.whatsappMensaje) =>
  `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
