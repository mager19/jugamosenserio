---
name: security
description: >
  Web application security hardening for Next.js / React projects.
  Use when doing pre-deploy security audit, adding API routes, handling user input,
  configuring HTTP headers, or when the user mentions "seguridad", "hardening",
  "headers", "CSP", "XSS", "rate limiting", or "variables de entorno".
metadata:
  author: project-template
  version: "1.0"
---

# Security Hardening

Eres un experto en seguridad de aplicaciones web. Tu objetivo es identificar y eliminar
vulnerabilidades antes de que lleguen a producción, sin over-engineerear ni agregar
complejidad innecesaria.

## Cuándo usar este skill

- Pre-deploy: auditoría de seguridad antes del primer lanzamiento
- Al agregar API routes o endpoints nuevos
- Al manejar input de usuarios (forms, query params, body)
- Al configurar variables de entorno
- Al agregar autenticación o autorización

---

## Checklist de auditoría

### 1. HTTP Security Headers

Verificar que `next.config.mjs` (o `next.config.js`) incluye todos los headers:

```js
headers: [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",   // ajustar según necesidad
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  },
]
```

**Verificar con:** https://securityheaders.com

### 2. Variables de entorno

- **NUNCA** exponer secrets como `NEXT_PUBLIC_*` — ese prefijo los expone al cliente
- Variables server-only: `MAILCHIMP_API_KEY`, `DATABASE_URL`, claves de API
- Variables client-safe: solo datos no sensibles que el cliente necesita
- Verificar que `.env.local` está en `.gitignore`
- Proveer `.env.example` con keys pero sin valores reales

**Patrón correcto en API route:**
```ts
const apiKey = process.env.MY_API_KEY  // server-only ✅
// NO: process.env.NEXT_PUBLIC_MY_API_KEY  ❌
```

### 3. Validación de inputs en API routes

Toda API route que reciba datos debe:

```ts
// 1. Verificar method
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

// 2. Parsear y validar body
const body = await req.json()
const { email } = body

if (!email || typeof email !== 'string') {
  return NextResponse.json({ error: 'Email requerido' }, { status: 400 })
}

// 3. Validar formato (regex o zod)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!emailRegex.test(email) || email.length > 254) {
  return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
}

// 4. NO exponer stack traces en producción
try {
  // ...lógica...
} catch {
  return NextResponse.json({ error: 'Error interno' }, { status: 500 })
}
```

### 4. Rate limiting

Para endpoints públicos (newsletter, contact forms):

**Opción gratuita — Middleware de Next.js con Map en memoria:**
```ts
// Solo válido para desarrollo — no persiste entre instancias serverless
const rateMap = new Map<string, { count: number; reset: number }>()
```

**Opción recomendada para producción — Upstash Redis:**
```ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '60 m'),
})

const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
const { success } = await ratelimit.limit(ip)
if (!success) {
  return NextResponse.json({ error: 'Demasiados intentos' }, { status: 429 })
}
```

### 5. CORS

En Next.js App Router, configurar CORS en API routes si son públicas:

```ts
const allowedOrigins = ['https://tudominio.com']

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') ?? ''
  if (allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }
  return new NextResponse(null, { status: 403 })
}
```

### 6. Prevención de XSS

- **No usar `dangerouslySetInnerHTML`** salvo que el contenido sea sanitizado
- Si se renderiza HTML de usuario: usar `DOMPurify` o `sanitize-html`
- React escapa automáticamente las expresiones `{variable}` — no concatenar HTML manualmente

### 7. Dependencias

```bash
npm audit
```

- Resolver vulnerabilidades `high` y `critical` antes de deploy
- `moderate` y `low` pueden quedar documentadas si el path no es explotable

---

## Output del audit

Reportar en formato:

```
### [CRÍTICO | ALTO | MEDIO | BAJO] — Título del issue

**Qué**: descripción del problema
**Dónde**: archivo:línea
**Fix**: qué cambiar exactamente
```

Agrupar por severidad. Incluir evidencia (línea de código o header faltante).

---

## Archivos clave a revisar

- `next.config.mjs` — headers HTTP, rewrites, redirects
- `src/app/api/**/route.ts` — todos los API routes
- `.env.local` / `.env.example` — variables de entorno
- `package.json` — dependencias y versiones
- `src/middleware.ts` — si existe, lógica de auth/rate limit

---

## Herramientas de verificación

- **securityheaders.com** — escaneo de headers HTTP
- **npm audit** — vulnerabilidades en dependencias
- **OWASP ZAP** (avanzado) — escaneo dinámico de la app
- **Mozilla Observatory** — observatory.mozilla.org
