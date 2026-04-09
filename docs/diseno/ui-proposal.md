# UI Proposal — Jugamos en Serio
> Senior UI/UX Audit · design-taste-frontend skill · DESIGN_VARIANCE 8 · MOTION_INTENSITY 6 · VISUAL_DENSITY 4

---

## 1. Auditoría del diseño actual

### Nav
**Funciona:** Logo + 4 links + CTA es la estructura correcta para B2B. El amarillo en el botón conecta con la marca.
**Violaciones del skill:**
- Sin sticky/scroll behavior — se pierde el CTA en páginas largas.
- Botón probablemente tiene bordes redondeados perfectos (pill) → demasiado genérico para DESIGN_VARIANCE 8.
**Oportunidades:** Agregar magnetic hover en el CTA, underline animado en links, separador visual (border-bottom sutil) en scroll.

### Hero
**Funciona:** Split layout (texto izquierda + imagen derecha) ya respeta el ANTI-CENTER BIAS — base correcta.
**Violaciones del skill:**
- El collage de fotos es visualmente ruidoso; múltiples imágenes compiten entre sí.
- Stats flotantes probablemente son cards con sombra — viola ANTI-CARD OVERUSE.
- Sin clip-path ni elemento gráfico que rompa la simetría del split.
- Pill de "JUGAMOS PARA PENSAR · SENTIR · TRANSFORMAR" bien posicionada pero probablemente centrada.
**Oportunidades:** Clip-path diagonal en imagen, stats como números grandes sin card, pill left-aligned.

### Quote sección (Jennifer García)
**Funciona:** Fondo azul oscuro crea contraste fuerte, cita grande tiene impacto emocional.
**Violaciones del skill:**
- Composición probablemente centrada (foto + texto centrado) → viola ANTI-CENTER BIAS.
- Sin animación de entrada para el texto de la cita.
**Oportunidades:** Layout asimétrico (foto offset, cita alineada izquierda o derecha), quote mark tipográfico grande como elemento decorativo.

### Metodología (4 pasos numerados)
**Funciona:** Numeración 01-04 da jerarquía visual clara. Íconos ayudan a escanear.
**Violaciones del skill:**
- Probablemente es un grid 4 columnas o lista vertical plain — sin movimiento ni narrativa.
- Layout flat no genera sensación de proceso/flujo.
**Oportunidades:** Sticky scroll stack donde cada paso "entra" al hacer scroll — narrativa progresiva perfecta para metodología.

### Principios (Bento 2x2)
**Funciona:** Bento grid con colores de marca es la dirección correcta. Los 4 colores (azul, amarillo, rojo, naranja) crean variedad.
**Violaciones del skill:**
- Bento 2x2 perfecto es demasiado simétrico para DESIGN_VARIANCE 8.
- Probablemente todas las celdas tienen el mismo tamaño — pierden jerarquía.
**Oportunidades:** Bento asimétrico (1 celda grande + 3 pequeñas, o 2+2 de alturas distintas), hover con color shift.

### Testimonios (3 cards)
**Violaciones del skill:**
- 3 cards iguales horizontales están PROHIBIDAS con DESIGN_VARIANCE > 4.
- Cards con sombra violan ANTI-CARD OVERUSE.
**Oportunidades:** Scroll horizontal tipo carrusel asimétrico, o layout en zig-zag, o masonry de 2 columnas.

### Stats bar
**Funciona:** Fondo azul oscuro contrasta bien, números grandes tienen impacto.
**Violaciones del skill:**
- Probablemente estático — los números no tienen animación de count-up.
- Sin movimiento o elemento kinético.
**Oportunidades:** Kinetic Marquee horizontal para stats + logos de clientes, o count-up animation al entrar en viewport.

### Contacto final
**Funciona:** Split layout (copy izquierda + formulario derecha) es la elección correcta para ANTI-CENTER BIAS.
**Violaciones del skill:**
- Formulario probablemente tiene inputs con bordes redondeados genéricos.
- Sin microinteracciones en los inputs (focus states, label animation).
**Oportunidades:** Inputs con border-bottom solo (no box), label que sube al hacer focus, CTA con magnetic effect.

### Footer
**Funciona:** Estructura básica cumple su función.
**Oportunidades:** Agregar separador visual superior (línea de color amarillo), newsletter input si aplica.

---

## 2. Propuestas de mejora concretas

### Nav
```
- Layout: flex justify-between items-center, max-w-7xl mx-auto, py-5 px-6
- Logo: Plus Jakarta Sans font-bold text-xl, color primary #1B2B6B
- Links: text-sm font-medium, color off-black #1A1A18, hover con underline que crece 
  desde izquierda (::after width 0→100%, transition 300ms ease)
- Sticky: position fixed top-0, backdrop-blur-sm bg-[#FDFCFB]/90, 
  border-b border-transparent → border-b border-neutral-200 al hacer scroll (JS class toggle)
- CTA "Hablemos": bg-[#F5C842] text-[#1B2B6B] font-semibold text-sm px-5 py-2.5 
  rounded-md (no pill), magnetic effect con JS (translateX/Y -8px al hover)
- Mobile: hamburger icon de Phosphor (<List /> → <X />), drawer lateral desde derecha
```

### Hero
```
- Layout: CSS Grid 2 columnas [55fr_45fr], min-h-[100dvh], items-center
- Columna izquierda: flex flex-col gap-8, pl-16 pr-8, pt-24
  · Pill: inline-flex items-center gap-2 bg-[#F5C842]/20 text-[#1B2B6B] 
    text-xs font-semibold px-3 py-1.5 rounded-full tracking-widest uppercase — LEFT aligned
  · H1: Plus Jakarta Sans font-extrabold text-6xl md:text-7xl xl:text-8xl 
    tracking-tighter leading-[0.9] text-[#1A1A18]
    "El poder del juego / al servicio / del equipo." — saltos de línea deliberados
  · Subtítulo: text-lg text-[#4A4A45] font-normal max-w-md leading-relaxed
  · CTA group: flex gap-4 items-center
    · Primario: bg-[#E8623A] text-white font-semibold px-8 py-4 rounded-lg 
      hover:bg-[#D4522A] transition-colors, magnetic effect
    · Secundario: text-[#1B2B6B] font-medium underline-offset-4 hover:underline 
      flex items-center gap-2 (ícono ArrowRight de Phosphor)
  · Stats: 3 números GRANDES sin card — solo número + etiqueta
    · grid grid-cols-3 gap-8 pt-4 border-t border-neutral-200
    · Número: text-4xl font-extrabold text-[#1B2B6B]
    · Label: text-xs text-[#6B6B65] uppercase tracking-wider

- Columna derecha: relative overflow-hidden h-full
  · UNA sola imagen de alta calidad (no collage)
  · clip-path: polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%) — corte diagonal izquierda
  · Overlay: gradiente linear de left: from-[#FDFCFB] 20% to transparent
  · Imagen: object-cover w-full h-full (sin aspect-ratio fijo)
  · Elemento decorativo: círculo pequeño #F5C842, position absolute bottom-12 left-8, 
    w-4 h-4, z-10 — punto de entrada visual
```

### Quote sección (Jennifer García)
```
- Layout: CSS Grid [45fr_55fr] gap-0, bg-[#1B2B6B], min-h-[60dvh] items-center
- Columna izquierda (foto): relative
  · Imagen: h-full object-cover, saturación reducida (filter: grayscale(20%))
  · Overlay diagonal en borde derecho: 
    ::after { clip-path: polygon(80% 0%, 100% 0%, 100% 100%, 60% 100%) bg-[#1B2B6B] }
  · Badge nombre: absolute bottom-8 left-8, bg-[#F5C842] text-[#1B2B6B] 
    font-bold text-sm px-4 py-2 — no centrado, esquina inferior izquierda

- Columna derecha (cita): pl-16 pr-20 py-24
  · Quote mark decorativo: text-[#E8623A] font-serif text-[200px] leading-none 
    opacity-20, absolute top-8 left-8 — "❝" (carácter tipográfico, no imagen)
  · Cita: Plus Jakarta Sans font-semibold text-3xl xl:text-4xl leading-snug 
    text-white tracking-tight, relative z-10
  · Línea divisoria: w-16 h-0.5 bg-[#F5C842] mt-8 mb-4 — no centrada
  · Bio: text-sm text-blue-200 font-medium
  · Nombre: text-white font-bold text-base
  · Cargo: text-[#F5C842] text-sm
```

### Metodología (Sticky Scroll Stack)
```
- Sección: py-32 bg-[#FDFCFB]
- Header (sticky top-0 mientras dura la sección): 
  · "Una metodología diseñada para transformar" — text-5xl font-extrabold tracking-tighter
  · py-8, border-b border-neutral-200, bg-[#FDFCFB]/95 backdrop-blur-sm

- Stack de pasos: cada paso es un panel que hace "push" al anterior
  · Layout: flex flex-col gap-0
  · Cada panel: min-h-[50vh] flex items-center, sticky top-24, 
    bg variante por paso (ver colores abajo), rounded-2xl mx-8 mb-4
    shadow que crece con el z-index (paso 1 z-10, paso 4 z-40)
  
  · Panel interno: grid grid-cols-[auto_1fr] gap-12 items-start p-12
    · Número: text-[120px] font-extrabold leading-none opacity-10 text-current 
      (color del texto según fondo)
    · Ícono Phosphor: w-12 h-12, color accent
    · Título: text-2xl font-bold
    · Descripción: text-base leading-relaxed opacity-80

  · Colores por paso:
    · 01: bg-[#1B2B6B] texto blanco
    · 02: bg-[#F5C842] texto #1A1A18
    · 03: bg-[#E8623A] texto blanco
    · 04: bg-[#FDFCFB] texto #1A1A18, border border-neutral-200
```

### Principios (Bento asimétrico)
```
- Sección: py-32 px-8, bg-[#1A1A18]
- Header: text-5xl font-extrabold tracking-tighter text-white mb-16, LEFT-aligned

- Grid: CSS Grid
  grid-template-columns: repeat(12, 1fr)
  grid-template-rows: auto
  gap-4

  · Celda 1 (GRANDE, principio ancla): col-span-7 row-span-2
    bg-[#1B2B6B], rounded-2xl p-12
    Ícono grande (64px), Título text-3xl, Descripción text-lg
    
  · Celda 2: col-span-5 
    bg-[#F5C842], text-[#1A1A18], rounded-2xl p-10

  · Celda 3: col-span-5
    bg-[#E8623A], text-white, rounded-2xl p-10
    
  · Celda 4: col-span-7 (swap visual — ahora la pequeña queda a la derecha)
    bg-[#FDFCFB]/10 border border-white/10, text-white, rounded-2xl p-10

- Hover en cada celda: scale(1.01) transform, brightness ligero — 200ms ease
- Ícono Phosphor en cada celda: 40px, color complementario
```

### Testimonios (Scroll horizontal asimétrico)
```
- Sección: py-32 bg-[#FDFCFB]
- Header: "Lo que hemos vivido..." text-5xl font-extrabold tracking-tighter, LEFT-aligned

- Contenedor: overflow-x-auto scroll-smooth, -mx-8 px-8
  scrollbar-width: none (ocultar scrollbar nativo)
  
- Track: flex gap-6 w-max pb-8

- Cards (3, tamaños DISTINTOS — no iguales):
  · Card 1: w-[480px] min-h-[280px] — la más grande
  · Card 2: w-[360px] min-h-[240px] mt-12 — offset vertical
  · Card 3: w-[420px] min-h-[260px] mt-6 — offset intermedio

  · Estilo de cada card: SIN box-shadow — usar borde sutil
    border border-neutral-200 rounded-2xl p-8 bg-white
    
  · Interior:
    · Stars: flex gap-1, íconos <Star weight="fill" /> color #F5C842 size 16
    · Texto: text-lg leading-relaxed text-[#1A1A18] font-medium (NO comillas decorativas)
    · Separador: w-8 h-0.5 bg-[#E8623A] mt-6 mb-4
    · Nombre: font-bold text-sm
    · Cargo: text-neutral-500 text-xs uppercase tracking-wider

- Indicador de scroll: dots o flecha animada debajo del track
  · flex gap-2, cada dot: w-2 h-2 rounded-full bg-neutral-300, activo: bg-[#1B2B6B]
```

### Stats (Kinetic Marquee)
```
- Sección: bg-[#1B2B6B] py-6 overflow-hidden
- Doble pista marquee (una normal, una reversa para efecto profundidad):

  · Pista 1 (velocidad normal): dirección →
    Items: "500+ Equipos" · "1.2k+ Conversaciones" · "50+ Líderes" · "✦" (repetido)
    Separador: ✦ en color #F5C842
    
  · Pista 2 (velocidad 0.7x, reversa): dirección ←
    Logos de clientes (si disponibles) o repetición de stats en variante texto más chico

  · Tipografía pista 1: text-2xl font-extrabold text-white tracking-tight
  · animation: marquee 20s linear infinite (keyframes translateX 0 → -50%)
  · Pausa al hover: animation-play-state: paused (agrega interactividad)
```

### Contacto final
```
- Sección: min-h-[80dvh] bg-[#FDFCFB]
- Layout: CSS Grid [55fr_45fr]

- Columna izquierda: bg-[#1B2B6B] p-20 flex flex-col justify-center
  · Eyebrow: text-[#F5C842] text-sm font-semibold tracking-widest uppercase mb-4
  · H2: text-5xl font-extrabold text-white tracking-tighter leading-tight mb-6
    "¿Listos para / jugar en serio?"
  · Body: text-blue-200 text-lg leading-relaxed mb-12
  · Items de confianza: 3 líneas sin bullet visual:
    · flex items-center gap-3
    · Ícono Phosphor <CheckCircle weight="fill" /> color #F5C842 24px
    · Texto text-white text-sm
  · Dato social proof: "Más de 500 equipos ya dieron el primer paso" — 
    text-xs text-blue-300 mt-8

- Columna derecha: p-16 flex flex-col justify-center bg-white
  · Formulario:
    · Campo: flex flex-col gap-1 mb-6
      · Label: text-xs font-semibold uppercase tracking-wider text-[#1A1A18]
      · Input: border-0 border-b-2 border-neutral-200 focus:border-[#1B2B6B]
        bg-transparent py-3 text-base outline-none transition-colors
        (NO box border, solo línea inferior)
    · Campos: Nombre, Empresa, Email, Mensaje (textarea 4 rows)
    · CTA: w-full bg-[#E8623A] text-white font-bold py-4 rounded-lg 
      hover:bg-[#D4522A] transition, magnetic effect suave
      flex items-center justify-center gap-2
      <ArrowRight /> de Phosphor al final
```

### Footer
```
- bg-[#1A1A18] py-16 px-8
- Border top: 2px solid #F5C842 (línea de color — sello de marca)
- Layout: grid grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-16

- Columna 1 (Logo + descripción):
  · Logo texto: Plus Jakarta Sans font-extrabold text-white
  · Tagline: text-neutral-400 text-sm max-w-xs mt-3
  · Redes: flex gap-4 mt-6, íconos Phosphor 20px color neutral-400 
    hover:text-[#F5C842] transition

- Columnas 2-4 (nav agrupado): 
  · Heading: text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4
  · Links: text-sm text-neutral-300 hover:text-white transition

- Bottom: border-t border-neutral-800 pt-8
  · flex justify-between items-center
  · Copyright: text-xs text-neutral-600
  · Legal links: text-xs text-neutral-600 hover:text-neutral-300
```

---

## 3. Componentes premium del Creative Arsenal

### Kinetic Marquee (Stats + logos)
**Por qué:** La stats bar actual es estática. Un marquee convierte datos en movimiento, refuerza escala ("500+ equipos") de forma dinámica, y el pause-on-hover agrega microinteracción sin costo. Perfecto para B2B donde la prueba social necesita impacto inmediato.
**Implementación:** CSS animation pura, sin dependencia. Dos pistas en dirección opuesta.

### Sticky Scroll Stack (Metodología)
**Por qué:** La metodología es el core del producto — necesita narrativa progresiva, no una lista plana. El sticky stack hace que cada paso "viva" mientras el usuario hace scroll, creando sensación de guía paso a paso. DESIGN_VARIANCE 8 requiere layouts no convencionales.
**Implementación:** Framer Motion `useScroll` + `useTransform` para la opacidad y escala de cada panel.

### Magnetic Buttons (CTAs principales)
**Por qué:** Los CTAs "Hablemos" y "Agendar" son los puntos de conversión. El efecto magnético (+/- 8-12px de movimiento) hace que el botón "llame" al cursor, aumenta perceived quality y diferencia de cualquier sitio de la competencia.
**Implementación:** `onMouseMove` con `getBoundingClientRect()`, `useState` para x/y, `motion.button` con `animate`.

### Asymmetric Bento (Principios)
**Por qué:** El bento 2x2 simétrico existente desperdicia la oportunidad de jerarquizar principios. Un principio "ancla" grande + 3 satélites comunica que hay un valor core diferenciador.
**Implementación:** CSS Grid con `grid-column: span N` explícito. Sin JS.

### Count-up Numbers (Stats integrado en Hero y Stats bar)
**Por qué:** "500+" impacta más si el usuario ve el número subiendo cuando entra en viewport. Crea sensación de velocidad y momentum — apropiado para una empresa de transformación.
**Implementación:** `useInView` de Framer Motion + custom hook `useCountUp(target, duration)`.

### Asymmetric Scroll Testimonials
**Por qué:** Reemplaza las 3 cards prohibidas. El scroll horizontal con cards de alturas distintas crea el efecto masonry horizontal que pide DESIGN_VARIANCE 8. El offset vertical entre cards añade dinamismo sin complejidad técnica.
**Implementación:** CSS puro con `overflow-x: auto` y `scroll-snap-type: x mandatory`.

---

## 4. Design System

### Tokens de color (CSS Custom Properties)

```css
:root {
  /* Brand palette */
  --color-primary: #1B2B6B;
  --color-primary-dark: #122050;
  --color-primary-light: #2D45A0;
  --color-primary-muted: rgba(27, 43, 107, 0.08);

  --color-secondary: #E8623A;
  --color-secondary-dark: #D4522A;
  --color-secondary-light: #F07A55;

  --color-tertiary: #F5C842;
  --color-tertiary-dark: #D9AE28;
  --color-tertiary-light: #FAD96A;

  /* Neutral scale */
  --color-neutral-50: #FDFCFB;   /* off-white — background base */
  --color-neutral-100: #F5F3F0;
  --color-neutral-200: #E8E4DE;
  --color-neutral-300: #D1CBC1;
  --color-neutral-400: #A89F92;
  --color-neutral-500: #7A7168;
  --color-neutral-600: #5A5249;
  --color-neutral-700: #3D3830;
  --color-neutral-800: #2A2520;
  --color-neutral-900: #1A1A18;  /* off-black — NUNCA pure black */

  /* Surface */
  --color-bg: var(--color-neutral-50);
  --color-surface: #FFFFFF;
  --color-surface-raised: #FFFFFF;

  /* Text */
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-600);
  --color-text-tertiary: var(--color-neutral-400);
  --color-text-inverse: #FFFFFF;
  --color-text-accent: var(--color-primary);

  /* Semantic */
  --color-cta-primary: var(--color-secondary);
  --color-cta-secondary: var(--color-tertiary);
  --color-cta-text: var(--color-primary);
}
```

### Escala tipográfica — Plus Jakarta Sans

```css
/* Importar desde Google Fonts o bundles locales */
/* @import: Plus Jakarta Sans 400, 500, 600, 700, 800, ExtraBold */

:root {
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;

  /* Scale (usando fluid clamp para responsive sin breakpoints) */
  --text-xs:   0.75rem;    /* 12px — labels, captions */
  --text-sm:   0.875rem;   /* 14px — nav links, meta */
  --text-base: 1rem;       /* 16px — body copy */
  --text-lg:   1.125rem;   /* 18px — subtítulos, intro */
  --text-xl:   1.25rem;    /* 20px — card titles */
  --text-2xl:  1.5rem;     /* 24px — section subtitles */
  --text-3xl:  1.875rem;   /* 30px — H3 */
  --text-4xl:  2.25rem;    /* 36px — H2 mobile */
  --text-5xl:  3rem;       /* 48px — H2 desktop */
  --text-6xl:  3.75rem;    /* 60px — H1 mobile */
  --text-7xl:  4.5rem;     /* 72px — H1 tablet */
  --text-8xl:  6rem;       /* 96px — H1 desktop */

  /* Display fluid */
  --text-display: clamp(3rem, 6vw, 6rem);
  --text-display-xl: clamp(3.75rem, 8vw, 8rem);

  /* Tracking (letter-spacing) */
  --tracking-tighter: -0.04em;  /* Headlines grandes */
  --tracking-tight:   -0.02em;  /* H2, H3 */
  --tracking-normal:   0em;
  --tracking-wide:     0.05em;
  --tracking-widest:   0.15em;  /* Labels uppercase */

  /* Leading (line-height) */
  --leading-none:    1;
  --leading-tight:   1.1;
  --leading-snug:    1.3;
  --leading-normal:  1.5;
  --leading-relaxed: 1.65;
}
```

### Espaciado y contenedores

```css
:root {
  /* Spacing scale (base-8) */
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */

  /* Section padding */
  --section-py: clamp(4rem, 8vw, 8rem);
  --section-px: clamp(1.5rem, 4vw, 4rem);

  /* Containers */
  --container-sm:  640px;
  --container-md:  768px;
  --container-lg:  1024px;
  --container-xl:  1280px;
  --container-2xl: 1440px;
  --container-full: 1680px;

  /* Radii */
  --radius-sm:  0.375rem;  /* 6px — inputs */
  --radius-md:  0.5rem;    /* 8px — botones */
  --radius-lg:  0.75rem;   /* 12px — cards */
  --radius-xl:  1rem;      /* 16px — modals */
  --radius-2xl: 1.5rem;    /* 24px — bento cells */
  --radius-full: 9999px;   /* pills */
}
```

### Breakpoints

```ts
// tailwind.config.ts
const breakpoints = {
  xs:  '375px',   // iPhone SE
  sm:  '640px',   // Landscape mobile
  md:  '768px',   // iPad portrait
  lg:  '1024px',  // iPad landscape / small laptop
  xl:  '1280px',  // Desktop
  '2xl': '1440px', // Wide desktop
  '3xl': '1680px', // Ultra-wide (layout cap aquí)
}
```

### Componentes base

#### Button variants

```tsx
// Uso: <Button variant="primary" size="md" magnetic>Hablemos</Button>

const buttonVariants = {
  // Primario — acción principal de conversión
  primary: `
    bg-[--color-secondary] text-white font-semibold
    px-8 py-4 rounded-[--radius-md]
    hover:bg-[--color-secondary-dark]
    transition-colors duration-200
    focus-visible:ring-2 ring-offset-2 ring-[--color-secondary]
  `,

  // Secundario — acción alternativa
  secondary: `
    bg-[--color-tertiary] text-[--color-primary] font-semibold
    px-8 py-4 rounded-[--radius-md]
    hover:bg-[--color-tertiary-dark]
    transition-colors duration-200
  `,

  // Ghost — acción menos prioritaria
  ghost: `
    bg-transparent text-[--color-primary] font-medium
    px-6 py-3 rounded-[--radius-md]
    border border-[--color-primary]
    hover:bg-[--color-primary-muted]
    transition-colors duration-200
  `,

  // Link — inline action
  link: `
    bg-transparent text-[--color-primary] font-medium
    underline-offset-4 hover:underline
    inline-flex items-center gap-2
    transition-all duration-200
  `,

  // Nav CTA — amarillo, compacto
  nav: `
    bg-[--color-tertiary] text-[--color-primary] font-semibold
    px-5 py-2.5 rounded-[--radius-md] text-sm
    hover:bg-[--color-tertiary-dark]
    transition-colors duration-200
  `,
}

const buttonSizes = {
  sm: 'text-sm px-5 py-2.5',
  md: 'text-base px-8 py-4',
  lg: 'text-lg px-10 py-5',
}
```

#### Card base

```tsx
// Anti card overuse: usar SOLO cuando hay contenido estructurado
// Nunca agregar box-shadow por defecto — usar border

const cardBase = `
  bg-white border border-[--color-neutral-200]
  rounded-[--radius-2xl] p-8
  transition-transform duration-200 ease-out
  hover:scale-[1.01]
`
// Para dark surface:
const cardDark = `
  bg-white/5 border border-white/10
  rounded-[--radius-2xl] p-8
  backdrop-blur-sm
`
```

#### Section wrapper

```tsx
// Envuelve todas las secciones — padding consistente

const SectionWrapper = ({ children, bg = 'default', className = '' }) => (
  <section
    className={`
      py-[--section-py] px-[--section-px]
      ${bg === 'dark' ? 'bg-[--color-neutral-900]' : ''}
      ${bg === 'primary' ? 'bg-[--color-primary]' : ''}
      ${bg === 'default' ? 'bg-[--color-bg]' : ''}
      ${className}
    `}
  >
    <div className="max-w-[--container-xl] mx-auto">
      {children}
    </div>
  </section>
)
```

#### Badge / Pill

```tsx
const badgeVariants = {
  // Pill de eyebrow — encima de headlines
  eyebrow: `
    inline-flex items-center gap-2
    bg-[--color-tertiary]/20 text-[--color-primary]
    text-xs font-semibold px-3 py-1.5 rounded-full
    tracking-widest uppercase
  `,

  // Step number badge — metodología
  step: `
    inline-flex items-center justify-center
    w-8 h-8 rounded-full
    bg-[--color-primary] text-white
    text-xs font-bold
  `,

  // Status / category — blog, casos
  category: `
    inline-flex items-center
    bg-[--color-neutral-100] text-[--color-neutral-600]
    text-xs font-medium px-3 py-1 rounded-full
    tracking-wide
  `,
}
```

### Animaciones base

```ts
// animations.ts — Spring physics y transiciones

export const springConfig = {
  // Rebote suave — para elementos que entran
  gentle: { type: 'spring', stiffness: 120, damping: 20, mass: 1 },
  // Más snappy — para hovers y micro-interacciones
  snappy: { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 },
  // Muy suave — para modals y overlays
  lazy:   { type: 'spring', stiffness: 80,  damping: 20, mass: 1.2 },
}

export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ...springConfig.gentle } },
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export const slideInLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { ...springConfig.gentle } },
}

// Marquee keyframe (en globals.css)
// @keyframes marquee {
//   from { transform: translateX(0) }
//   to   { transform: translateX(-50%) }
// }
// .animate-marquee { animation: marquee 20s linear infinite }
// .animate-marquee-reverse { animation: marquee 25s linear infinite reverse }

// Count-up hook
export function useCountUp(target: number, duration = 2000) {
  // IntersectionObserver → cuando entra, anima de 0 a target
  // Ver implementación en hooks/useCountUp.ts
}
```

---

## 5. Estructura de componentes Next.js

```
src/
├── app/
│   ├── layout.tsx          → RootLayout: fuentes, metadata, providers
│   ├── page.tsx            → Página principal: importa todas las sections
│   ├── globals.css         → CSS custom properties, keyframes marquee, reset
│   └── favicon.ico
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx         → Sticky nav, magnetic CTA, scroll behavior, mobile drawer
│   │   └── Footer.tsx      → Footer grid, redes sociales, border-top amarillo
│   │
│   ├── sections/
│   │   ├── Hero.tsx        → Grid 55/45, clip-path imagen, stats sin card, pill
│   │   ├── Quote.tsx       → Split layout, foto con overlay diagonal, cita asimétrica
│   │   ├── Methodology.tsx → Sticky scroll stack, 4 paneles, progress indicator
│   │   ├── Principles.tsx  → Bento asimétrico CSS Grid 12 cols
│   │   ├── Testimonials.tsx→ Scroll horizontal, cards tamaños distintos, snap
│   │   ├── Stats.tsx       → Kinetic marquee doble pista, count-up numbers
│   │   └── Contact.tsx     → Split form, inputs border-bottom, magnetic CTA
│   │
│   └── ui/
│       ├── Button.tsx      → Variants: primary, secondary, ghost, link, nav; magnetic prop
│       ├── MagneticButton.tsx → HOC wrapper para efecto magnético
│       ├── Badge.tsx       → Variants: eyebrow, step, category
│       ├── Icon.tsx        → Wrapper de @phosphor-icons/react con size/weight defaults
│       ├── Marquee.tsx     → Kinetic marquee reutilizable, prop: speed, direction, pause
│       ├── CountUp.tsx     → Número animado con useInView
│       ├── SectionWrapper.tsx → Padding + max-width + bg variant
│       └── ScrollProgress.tsx → Indicador de progreso de scroll (opcional, nav)
│
├── data/
│   └── content.json        → Toda la data del sitio (ver estructura abajo)
│
├── hooks/
│   ├── useCountUp.ts       → IntersectionObserver + animación numérica
│   ├── useMagnetic.ts      → MouseEvent → translateX/Y para magnetic buttons
│   └── useScrollProgress.ts→ scroll position → progress 0-1
│
└── lib/
    ├── animations.ts       → Spring configs, variants de Framer Motion
    └── utils.ts            → cn() (clsx + tailwind-merge), formatNumber
```

---

## 6. Decisiones técnicas de implementación

### Framer Motion — usos específicos

| Componente | Uso | Técnica |
|-----------|-----|---------|
| `Hero.tsx` | Entrada de headline y pill | `motion.div` con `fadeUp` + `staggerContainer` |
| `Methodology.tsx` | Sticky scroll stack | `useScroll` + `useTransform` para scale/opacity de cada panel |
| `Principles.tsx` | Entrada de cada celda bento | `whileInView` con `fadeUp` staggered |
| `Testimonials.tsx` | Drag en mobile | `motion.div` con `drag="x"` + `dragConstraints` |
| `Quote.tsx` | Entrada del texto de cita | `motion.p` con `variants` typewriter-like (stagger por palabra) |
| `Contact.tsx` | Form submit feedback | `AnimatePresence` para success state |
| `MagneticButton.tsx` | Efecto magnético | `motion.button` con `animate={{ x, y }}` spring config snappy |
| `Stats.tsx` | Count-up | `useInView` de Framer Motion para trigger |
| `Nav.tsx` | Mobile drawer | `AnimatePresence` + `motion.div` slide desde derecha |

### Client vs Server components

```
Server (default — sin 'use client'):
├── app/page.tsx              → Solo importa sections — no interactividad
├── sections/Quote.tsx        → Solo markup estático
├── sections/Principles.tsx   → CSS hover puro, sin JS
├── sections/Contact.tsx      → El form necesita client — extraer <ContactForm>

Client ('use client'):
├── components/layout/Nav.tsx → scroll state, mobile drawer, backdrop-blur
├── components/ui/MagneticButton.tsx → MouseEvent handlers
├── components/ui/Marquee.tsx → RAF o CSS animation (puede ser server si es pure CSS)
├── components/ui/CountUp.tsx → IntersectionObserver
├── sections/Hero.tsx         → Framer Motion animations (wrapper puede ser server)
├── sections/Methodology.tsx  → useScroll (Framer Motion)
├── sections/Testimonials.tsx → drag en mobile
├── sections/Contact.tsx →    → solo el <ContactForm> sub-componente

Patrón recomendado: Section server + extraer sub-componentes client mínimos
Ejemplo: <Methodology> server → <MethodologyPanel> client (solo el panel con motion)
```

### Estructura de content.json

```json
{
  "site": {
    "name": "Jugamos en Serio",
    "tagline": "El poder del juego al servicio del equipo.",
    "url": "https://jugamosenserio.com"
  },
  "nav": {
    "links": [
      { "label": "Nosotros", "href": "#nosotros" },
      { "label": "Metodología", "href": "#metodologia" },
      { "label": "Experiencias", "href": "#experiencias" },
      { "label": "Contacto", "href": "#contacto" }
    ],
    "cta": { "label": "Hablemos", "href": "#contacto" }
  },
  "hero": {
    "pill": "Jugamos para pensar · Sentir · Transformar",
    "headline": "El poder del juego al servicio del equipo.",
    "subheadline": "Transformamos equipos a través del juego consciente.",
    "ctas": [
      { "label": "Ver experiencias", "href": "#experiencias", "variant": "primary" },
      { "label": "Conoce la metodología", "href": "#metodologia", "variant": "link" }
    ],
    "stats": [
      { "value": 500, "suffix": "+", "label": "Equipos" },
      { "value": 1200, "suffix": "+", "label": "Conversaciones" },
      { "value": 50, "suffix": "+", "label": "Líderes" }
    ],
    "image": { "src": "/images/hero.jpg", "alt": "Equipo en sesión de juego" }
  },
  "quote": {
    "text": "[Texto completo de la cita de Jennifer]",
    "author": {
      "name": "Jennifer Marcela García",
      "role": "Fundadora de Jugamos en Serio",
      "image": { "src": "/images/jennifer.jpg", "alt": "Jennifer Marcela García" }
    }
  },
  "methodology": {
    "headline": "Una metodología diseñada para transformar, no solo para entretener.",
    "steps": [
      {
        "number": "01",
        "icon": "Compass",
        "title": "[Nombre del paso]",
        "description": "[Descripción]",
        "color": "primary"
      },
      {
        "number": "02",
        "icon": "Lightbulb",
        "title": "[Nombre del paso]",
        "description": "[Descripción]",
        "color": "tertiary"
      },
      {
        "number": "03",
        "icon": "Users",
        "title": "[Nombre del paso]",
        "description": "[Descripción]",
        "color": "secondary"
      },
      {
        "number": "04",
        "icon": "Star",
        "title": "[Nombre del paso]",
        "description": "[Descripción]",
        "color": "neutral"
      }
    ]
  },
  "principles": {
    "headline": "Nuestros principios",
    "items": [
      {
        "icon": "GameController",
        "title": "[Principio 1]",
        "description": "[Descripción]",
        "color": "primary",
        "size": "large"
      },
      {
        "icon": "Heart",
        "title": "[Principio 2]",
        "description": "[Descripción]",
        "color": "tertiary",
        "size": "small"
      },
      {
        "icon": "Flame",
        "title": "[Principio 3]",
        "description": "[Descripción]",
        "color": "secondary",
        "size": "small"
      },
      {
        "icon": "ArrowsOut",
        "title": "[Principio 4]",
        "description": "[Descripción]",
        "color": "neutral",
        "size": "medium"
      }
    ]
  },
  "testimonials": {
    "headline": "Lo que hemos vivido...",
    "items": [
      {
        "rating": 5,
        "text": "[Testimonio]",
        "author": "[Nombre]",
        "role": "[Cargo]",
        "company": "[Empresa]",
        "size": "large"
      },
      {
        "rating": 5,
        "text": "[Testimonio]",
        "author": "[Nombre]",
        "role": "[Cargo]",
        "company": "[Empresa]",
        "size": "small"
      },
      {
        "rating": 5,
        "text": "[Testimonio]",
        "author": "[Nombre]",
        "role": "[Cargo]",
        "company": "[Empresa]",
        "size": "medium"
      }
    ]
  },
  "stats": [
    { "value": 500, "suffix": "+", "label": "Equipos transformados" },
    { "value": 1200, "suffix": "+", "label": "Conversaciones profundas" },
    { "value": 50, "suffix": "+", "label": "Líderes acompañados" }
  ],
  "contact": {
    "eyebrow": "Hablemos",
    "headline": "¿Listos para jugar en serio?",
    "body": "Cuéntanos sobre tu equipo y diseñamos una experiencia a su medida.",
    "trust": [
      "Sin compromiso — primera conversación gratis",
      "Respuesta en menos de 24 horas",
      "Más de 500 equipos ya dieron el primer paso"
    ],
    "form": {
      "fields": [
        { "name": "nombre", "label": "Tu nombre", "type": "text", "required": true },
        { "name": "empresa", "label": "Empresa", "type": "text", "required": true },
        { "name": "email", "label": "Email", "type": "email", "required": true },
        { "name": "mensaje", "label": "Cuéntanos sobre tu equipo", "type": "textarea", "rows": 4 }
      ],
      "cta": "Enviar mensaje"
    }
  },
  "footer": {
    "tagline": "Transformamos equipos a través del juego consciente.",
    "social": [
      { "platform": "LinkedIn", "icon": "LinkedinLogo", "href": "#" },
      { "platform": "Instagram", "icon": "InstagramLogo", "href": "#" }
    ],
    "legal": {
      "copyright": "© 2025 Jugamos en Serio. Todos los derechos reservados.",
      "links": [
        { "label": "Política de privacidad", "href": "/privacidad" }
      ]
    }
  }
}
```

---

## Checklist de implementación

### Prioridad alta (bloqueante para lanzar)
- [ ] Instalar dependencias: `framer-motion`, `@phosphor-icons/react`, `clsx`, `tailwind-merge`
- [ ] Configurar fuente Plus Jakarta Sans en `layout.tsx` (next/font/google)
- [ ] Definir CSS custom properties en `globals.css`
- [ ] Nav sticky con backdrop blur
- [ ] Hero: grid 55/45, clip-path imagen, stats sin card
- [ ] Contacto: split layout + inputs border-bottom
- [ ] Footer con border-top amarillo

### Prioridad media (calidad percibida)
- [ ] Magnetic buttons en CTAs principales
- [ ] Sticky scroll stack en Metodología
- [ ] Bento asimétrico en Principios
- [ ] Scroll horizontal en Testimonios

### Prioridad baja (delight)
- [ ] Kinetic marquee en Stats
- [ ] Count-up en números
- [ ] Mobile drawer animado en Nav
- [ ] Animación de entrada staggered en secciones

---

## Dependencias a instalar

```bash
npm install framer-motion @phosphor-icons/react clsx tailwind-merge
npm install -D @types/node
```

```ts
// tailwind.config.ts — plugins y safelist
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary:   { DEFAULT: '#1B2B6B', dark: '#122050', light: '#2D45A0' },
        secondary: { DEFAULT: '#E8623A', dark: '#D4522A', light: '#F07A55' },
        tertiary:  { DEFAULT: '#F5C842', dark: '#D9AE28', light: '#FAD96A' },
        neutral: {
          50: '#FDFCFB', 100: '#F5F3F0', 200: '#E8E4DE',
          300: '#D1CBC1', 400: '#A89F92', 500: '#7A7168',
          600: '#5A5249', 700: '#3D3830', 800: '#2A2520', 900: '#1A1A18',
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        'marquee-reverse': 'marquee 25s linear infinite reverse',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
}
export default config
```
