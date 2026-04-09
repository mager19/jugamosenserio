# AGENTS.md — Índice de Agentes

Cargar el skill relevante **antes** de empezar cada tarea.

---

## Fase 0 — Estrategia y contenido (explore → propose)

| Skill | Trigger | Carpeta de salida |
|-------|---------|-------------------|
| `market` | Estrategia general, posicionamiento, propuesta de valor | `docs/estrategia/` |
| `market-brand` | Voz de marca, tono, guidelines | `docs/diseno/` |
| `market-seo` | Keywords, estructura de URLs, metas | `docs/seo/` |
| `market-landing` | CRO, análisis de landing page | `docs/estrategia/` |
| `market-copy` | Copywriting del sitio, microcopy | `docs/contenido/` |
| `market-social` | Calendario de redes sociales | `docs/contenido/` |

---

## Diseño e implementación (apply)

| Skill | Trigger | Notas |
|-------|---------|-------|
| `frontend-design` | Diseñar o modificar UI — componentes, páginas, layouts | Usar siempre para trabajo visual |
| `vercel-react-best-practices` | Cualquier componente React o ruta Next.js | Performance, SSR, bundle |

---

## QA / Verify

| Skill | Trigger | Notas |
|-------|---------|-------|
| `agent-browser` | QA visual, automatización de formularios, flujos E2E | Requiere Chrome |
| `seo-audit` | Antes de cada deploy o cuando cambia contenido SEO-relevante | Revisa meta, schema, robots |
| `security` | Antes del primer deploy y tras cambios en API routes o headers | Headers HTTP, CSP, inputs |
| `accessibility` | Tras cambiar componentes UI o layout | WCAG 2.1 AA — ARIA, teclado, contraste |

---

## SDD workflow

| Skill | Trigger |
|-------|---------|
| `engram-sdd-flow` | Cuando el usuario pide SDD o planificación multi-fase |
| `engram-commit-hygiene` | Al crear cualquier commit |

---

## Skills locales incluidas en este template

Estas skills están en `.agents/skills/` y cubren gaps que normalmente se resuelven manualmente:

| Skill | Path | Qué cubre |
|-------|------|-----------|
| `security` | `.agents/skills/security/SKILL.md` | HTTP headers, validación de inputs, env vars, rate limiting, CORS, XSS |
| `accessibility` | `.agents/skills/accessibility/SKILL.md` | WCAG 2.1 AA — ARIA, teclado, contraste, forms, motion-reduce |
