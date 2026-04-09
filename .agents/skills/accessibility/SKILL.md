---
name: accessibility
description: >
  WCAG 2.1 AA accessibility audit and implementation for web apps.
  Use when building or reviewing UI components, adding forms, modals, navigation,
  or when the user mentions "accesibilidad", "a11y", "WCAG", "screen reader",
  "teclado", "contraste", "ARIA", o "lectores de pantalla".
metadata:
  author: project-template
  version: "1.0"
---

# Accessibility — WCAG 2.1 AA

Eres un experto en accesibilidad web. Tu objetivo es que la app sea usable por personas
con discapacidades visuales, motoras y cognitivas, cumpliendo el estándar WCAG 2.1 nivel AA.

## Cuándo usar este skill

- Al crear o modificar componentes UI (nav, forms, modals, cards, buttons)
- Al agregar animaciones o efectos de movimiento
- Al revisar contraste de colores del design system
- Pre-deploy: auditoría de accesibilidad completa
- Cuando el usuario reporta problemas con teclado o screen reader

---

## Los 4 principios WCAG (POUR)

1. **Perceptible** — el contenido debe ser visible/audible para todos
2. **Operable** — todo debe funcionar con teclado (sin mouse)
3. **Comprensible** — el contenido y la UI deben ser entendibles
4. **Robusto** — compatible con tecnologías asistivas

---

## Checklist de auditoría

### 1. Estructura semántica

```tsx
// ✅ Correcto — roles semánticos explícitos
<header role="banner">
<nav role="navigation" aria-label="Navegación principal">
<main id="main-content" role="main">
<footer role="contentinfo">

// ✅ Skip link — primer elemento focusable de la página
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white"
>
  Ir al contenido principal
</a>
```

- Una sola `<h1>` por página
- Jerarquía de headings correcta: h1 → h2 → h3 (sin saltar niveles)
- Landmarks únicos o con `aria-label` diferenciador

### 2. Navegación por teclado

**Reglas:**
- Todo elemento interactivo debe ser accesible con `Tab`
- Orden de focus debe seguir el flujo visual
- Focus visible siempre (nunca `outline: none` sin alternativa)
- Menús: flechas para navegar items, `Escape` para cerrar
- Modales: focus trap mientras está abierto, restaurar focus al cerrar

```tsx
// ✅ Focus ring visible
className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"

// ✅ Botón accesible con teclado
<button
  type="button"
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  aria-expanded={isOpen}
  aria-controls="menu-id"
>
```

### 3. ARIA — cuando y cómo usarlo

**Regla de oro: usar HTML semántico antes que ARIA.**

```tsx
// ✅ ARIA para estado dinámico
<nav aria-label="Navegación principal" role="navigation">
<button aria-expanded={isOpen} aria-controls="dropdown">
<input aria-label="Buscar proyectos" aria-describedby="search-hint">
<span id="search-hint" className="sr-only">Presiona Enter para buscar</span>

// ✅ aria-live para contenido que cambia sin recarga
<div aria-live="polite" aria-atomic="true">
  {status === 'success' && <p>¡Suscripción exitosa!</p>}
</div>

// ✅ Ocultar decoración de screen readers
<svg aria-hidden="true" focusable="false">

// ✅ Imágenes — alt descriptivo o vacío si es decorativo
<img src="..." alt="Diagrama de arquitectura del chatbot" />
<img src="..." alt="" aria-hidden="true" /> // decorativa
```

### 4. Contraste de colores

| Tipo | Ratio mínimo AA |
|------|----------------|
| Texto normal (< 18px o < 14px bold) | 4.5:1 |
| Texto grande (≥ 18px o ≥ 14px bold) | 3:1 |
| Componentes UI (bordes de inputs, iconos) | 3:1 |

**Verificar con:** https://webaim.org/resources/contrastchecker/

Errores comunes:
- Texto placeholder con opacidad baja (`text-on-surface/40`)
- Links sobre fondos de color
- Badges y chips con texto pequeño
- Estados hover/disabled sin contraste suficiente

### 5. Formularios

```tsx
// ✅ Cada input debe tener label asociado
<label htmlFor="email-input">Correo electrónico</label>
<input
  id="email-input"
  type="email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
{hasError && (
  <p id="email-error" role="alert" className="text-error text-sm">
    Ingresa un email válido
  </p>
)}

// ✅ Fieldset para grupos de inputs relacionados
<fieldset>
  <legend>Selecciona tu nivel</legend>
  <input type="radio" id="nivel-1" name="nivel" value="principiante" />
  <label htmlFor="nivel-1">Principiante</label>
</fieldset>
```

### 6. Animaciones y movimiento

```css
/* ✅ Respetar preferencia de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

En Tailwind:
```tsx
className="animate-pulse motion-reduce:animate-none"
className="transition-all motion-reduce:transition-none"
```

### 7. Declaración de idioma

```tsx
// src/app/layout.tsx
<html lang="es">
```

Si hay secciones en otro idioma:
```tsx
<p lang="en">This text is in English</p>
```

### 8. Elementos interactivos no nativos

Si usas `div` o `span` como botón o link (evitar cuando sea posible):

```tsx
// ✅ Si no queda otra opción
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
  aria-pressed={isActive}
>
```

---

## Output del audit

Reportar en formato:

```
### [CRÍTICO | ALTO | MEDIO | BAJO] — Título del issue

**Criterio WCAG**: 1.4.3 Contrast (Minimum) — Level AA
**Qué**: descripción del problema
**Dónde**: componente o archivo afectado
**Fix**: cambio exacto a hacer
```

---

## Archivos clave a revisar

- `src/app/layout.tsx` — lang, skip link, estructura de landmarks
- `src/components/layout/Navbar.tsx` — navegación por teclado, aria-expanded
- `src/components/layout/Footer.tsx` — roles, links
- `src/components/home/NewsletterSection.tsx` — form labels, aria-live
- `src/app/globals.css` — focus styles, motion-reduce
- Todos los componentes con `onClick` en elementos no interactivos

---

## Herramientas de verificación

- **axe DevTools** (extensión Chrome) — auditoría automática WCAG
- **NVDA** (Windows) / **VoiceOver** (Mac) — prueba con screen reader real
- **Keyboard-only navigation** — navegar toda la app sin mouse
- **WebAIM Contrast Checker** — webaim.org/resources/contrastchecker
- **Chrome DevTools → Accessibility panel** — inspeccionar árbol de accesibilidad

---

## Clases Tailwind útiles

```
sr-only                   — visualmente oculto, accesible para screen readers
focus:not-sr-only         — mostrar al recibir focus
focus:ring-2              — focus ring visible
motion-reduce:animate-none — desactivar animación con prefers-reduced-motion
motion-reduce:transition-none
```
