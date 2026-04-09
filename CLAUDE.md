# CLAUDE.md — Project Template

## Workflow: Spec-Driven Development (SDD)

Todo trabajo no trivial sigue estas 5 fases en orden. **No saltarse fases sin justificación explícita.**

### Fases

| Fase | Qué hace | Artefacto |
|------|----------|-----------|
| `explore` | Entiende el estado actual, restricciones y riesgos | Findings en `docs/qa/` |
| `propose` | Define intención, alcance y límites — **espera aprobación** | Plan en `docs/estrategia/` |
| `apply` | Implementa desde el plan aprobado | Código + tests |
| `verify` | Valida contra el spec, busca regresiones | Evidencia en `docs/qa/` |
| `archive` | Cierra el loop — memoria + commit | `mem_session_summary` + commit |

Skill de referencia SDD:
`~/.claude/plugins/marketplaces/engram/skills/sdd-flow/SKILL.md`

### Cuándo usar cada fase

- **Feature nueva** → todas las fases
- **Bug fix** → explore → apply → verify → archive
- **Cambio visual menor** → apply → verify → archive
- **Refactor estructural** → todas las fases obligatorias

---

## Memoria Persistente (Engram)

Guardar en memoria (`mem_save`) inmediatamente después de:
- Decisión de arquitectura o herramienta
- Bug fixeado (incluir causa raíz)
- Convención o patrón establecido
- Feature implementada con enfoque no obvio
- Preferencia o restricción del usuario aprendida

Cerrar toda sesión con `mem_session_summary` antes de decir "listo".

---

## Agentes disponibles

Ver `AGENTS.md` para el índice completo con triggers.

### Fase 0 — Antes de codear (explore + propose)

Los agentes de Fase 0 producen artefactos en `docs/` que alimentan el plan SDD.

| Agente | Carpeta de salida |
|--------|------------------|
| Digital Strategist | `docs/estrategia/` |
| SEO Audit | `docs/seo/` |
| Content | `docs/contenido/` |
| Frontend Design | `docs/diseno/` |

### Durante implementación (apply)

- `frontend-design` — diseño y componentes UI
- `vercel-react-best-practices` — optimización Next.js/React (si aplica)

### QA / Verify

- `agent-browser` — automatización de browser, QA visual
- `seo-audit` — auditoría SEO técnica
- `security` — hardening de seguridad (headers, validaciones, exposición)
- `accessibility` — WCAG 2.1 AA (ARIA, navegación teclado, contraste)

---

## Convenciones

- Español neutro latinoamericano en todo el contenido
- Confirmar con el usuario antes de cambios estructurales grandes
- No agregar features no pedidas
- No bikeshedding: resolver lo que se pidió, nada más
