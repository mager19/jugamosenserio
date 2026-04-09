# Cómo usar este template

## 1. Copiar al nuevo proyecto

```bash
cp -r project-template/ mi-nuevo-proyecto/
cd mi-nuevo-proyecto/
```

## 2. Instalar skills globales necesarias

Desde Claude Code, instalar las skills que aún no tengas:

```
/skills frontend-design
/skills seo-audit
/skills agent-browser
/skills vercel-react-best-practices   # solo si usas Next.js + Vercel
/skills market
```

## 3. Ajustar CLAUDE.md al stack del proyecto

Editar las secciones que no apliquen. Por ejemplo:
- Si no es Next.js, remover `vercel-react-best-practices`
- Si no hay backend, ajustar la sección de seguridad
- Si el proyecto es en inglés, cambiar la convención de idioma

## 4. Iniciar con SDD — Fase explore

Decirle a Claude:

> "Corre la fase explore para [nombre del proyecto]"

Claude revisará el contexto inicial y producirá findings en `docs/qa/`.

## 5. Flujo completo

```
explore → propose → [aprobación tuya] → apply → verify → archive
```

Nunca saltarse `propose` → aprobación. Es el punto de control más importante.

---

## Estructura final esperada

```
mi-nuevo-proyecto/
  CLAUDE.md             ← instrucciones de Claude para este proyecto
  AGENTS.md             ← índice de agentes con triggers
  setup.md              ← este archivo (puede borrarse cuando no sea necesario)
  .env.example          ← variables de entorno requeridas (sin valores reales)
  docs/
    README.md
    estrategia/         ← artefactos de Digital Strategist
    seo/                ← artefactos de SEO Audit
    contenido/          ← artefactos de Content
    diseno/             ← artefactos de Frontend Design
    qa/                 ← evidencia de verify
  .agents/
    skills/             ← skills locales del proyecto (instaladas automáticamente)
  src/                  ← código de la aplicación
```
