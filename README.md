# oliverbarona.com

Sitio personal de Oliver Barona — Diseñador Instruccional Sr.
Stack: **Next.js 15 (App Router) + TypeScript + CSS Modules**, listo para Vercel.

## Desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Deploy a Vercel

1. `git init && git add . && git commit -m "init"`
2. Sube el repo a GitHub.
3. En Vercel → "Add New Project" → Importa el repo.
4. Framework: Next.js (auto-detectado). No requiere variables de entorno.
5. En **Settings → Domains** añade `oliverbarona.com` **y** `www.oliverbarona.com`.
   - Configura el apex (`oliverbarona.com`) como dominio principal.
   - `www.oliverbarona.com` queda como redirect 308 → apex (Vercel lo hace solo, y además `next.config.mjs` ya tiene una regla redundante por seguridad).

## SEO / IA implementado

- `metadata` completa (title template, description, keywords, OG, Twitter, canonicals, robots).
- JSON-LD `Person` + `WebSite` en `app/layout.tsx`.
- `app/sitemap.ts` y `app/robots.ts` con permisos explícitos para crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.).
- HSTS, headers de seguridad y compresión en `next.config.mjs`.
- HTML semántico (`header`, `nav`, `section`, `article`, `blockquote`).
- `lang="es-MX"`, `prefers-reduced-motion` respetado.

## Pendientes (cuando estés listo)

- `public/og.jpg` (1200×630) — imagen Open Graph.
- `public/favicon.ico` y `public/apple-touch-icon.png`.
- Imágenes de los 3 personajes para las tarjetas (las pediremos en una IA aparte, acordes al diseño nuevo).
- Páginas: `/capacitacion-empresarial`, `/innovacion-academica`, `/consejeria-creadores`, `/portafolio`, `/contacto`, legales.
