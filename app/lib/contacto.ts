/** Datos de contacto centralizados — un solo lugar para actualizarlos. */
export const CONTACTO = {
  email: "hola@oliverbarona.com",
  /** Número de WhatsApp con lada internacional, solo dígitos (ej. "5215512345678").
   *  Déjalo vacío para ocultar el botón de WhatsApp. */
  whatsapp: "",
  whatsappMensaje:
    "Hola Oliver, vengo de tu página y quiero hablar sobre un proyecto de capacitación.",
  /** ID del formulario en Formspree (https://formspree.io) — pendiente de crear. */
  formspreeId: "TU_FORM_ID",
};

export const waLink = () =>
  `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(CONTACTO.whatsappMensaje)}`;
