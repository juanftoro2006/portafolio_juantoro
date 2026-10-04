# Portafolio — stack técnico (v2)

Astro 7 + Tailwind CSS v4 (plugin de Vite) + Content Collections con schema Zod.

## Por qué este stack (resumen — el detalle completo está en la bitácora del proyecto)

- **Astro**: portafolio = contenido, no una app interactiva. Astro no envía JS al
  cliente salvo que se pida explícitamente ("islands") → carga más rápida, que es
  justo el criterio que más pesa para un reclutador con ~15 segundos de atención.
- **Content Collections + Zod**: cada proyecto es un `.md` con metadatos validados
  en build-time contra `src/content.config.ts`. Las reglas fijas de la bitácora
  (honestidad de métricas, anonimización) quedan parcialmente aplicadas por el
  propio schema, no solo por disciplina manual.
- **Tailwind v4 vía `@tailwindcss/vite`**: es el enfoque actual recomendado por
  Astro (el paquete viejo `@astrojs/tailwind` quedó atrás para Tailwind v3).
- **GitHub Pages**: el repo ya vive en GitHub, sin restricción de uso comercial
  (a diferencia del plan gratuito de Vercel) y sin el recorte de cuota que tuvo
  Netlify en 2025.

## Comandos

```bash
npm install
npm run dev       # servidor local
npm run build     # build de producción + chequeo de tipos
npm run preview   # sirve el build de dist/
```

## Cargar un proyecto real

1. Crear `src/content/proyectos/nombre-proyecto.md`.
2. Llenar el frontmatter según el schema de `src/content.config.ts`.
3. Pegar el case study completo (texto largo) como cuerpo markdown del archivo.
4. Borrar o renombrar `_ejemplo-borrar.md` cuando haya al menos un proyecto real.

## Pendiente (fuera del alcance de este scaffolding)

- Diseño/wireframe visual — se hace después de cerrar todos los case studies
  (así quedó decidido en la bitácora del proyecto).
- Decidir nombre final del repo (afecta `site` y `base` en `astro.config.mjs`,
  ver comentario ahí).
