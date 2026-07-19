import home from "../page.module.css";

/** Footer común: firma + páginas legales. */
export function SiteFooter() {
  return (
    <footer className={home.footer}>
      <p>
        © {new Date().getFullYear()} Oliver Barona ·{" "}
        <span>hecho con código</span> · LMS_OS v2.5
      </p>
      <p className={home.footerLegal}>
        <a href="/aviso-de-privacidad">Aviso de privacidad</a>
        {" · "}
        <a href="/terminos">Términos y condiciones</a>
      </p>
    </footer>
  );
}
