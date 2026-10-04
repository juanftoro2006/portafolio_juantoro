# BITÁCORA — Rediseño Portafolio (búsqueda de empleo)

## Objetivo
Portafolio para búsqueda de empleo, audiencia: reclutadores técnicos. Separado por completo del futuro portafolio/landing de NoA (clientes) — no se mezclan en el mismo sitio.

## Reglas fijas (no se reinterpretan después)

1. **Honestidad de métricas.** Ninguna cifra se publica sin poder decir de dónde salió: medida real, o etiquetada explícitamente como proyección, o se omite. (Fijada tras el caso FreeSmile AI — su tabla de resultados era proyectada, no medida, y se retiró.)
2. **Anonimización total.** Ningún nombre real de cliente ni de persona se publica — incluye pilotos/testers, no solo clientes de negocio. Se usa un término técnico genérico: "CONSTRUCTORA" (CAC), "clínica odontológica" (FreeSmile), "boutique de moda" (Dangel), "3 usuarios piloto" (pilotos de ASIS_AI, hoy nombrados en el README).
3. **No se publica código de producción ni repos completos** — protege el producto NoA Capture (no regalar la implementación) y la confidencialidad de clientes. En su lugar, cada proyecto lleva: texto (case study) + video demo + un snippet corto y sanitizado.
4. **Las decisiones y rutas ya fijadas no se reinterpretan** — si hace falta cambiar algo, se discute explícitamente, no se asume.
5. **Convención de nombres (fijada 4-oct-2026).** "NoA" es el nombre principal de cada producto y el producto va como sufijo: NoA-CAPTURE, NoA-ASIS_AI, NoA-SALES_AI. Analogía de Juan: API = NoA; API REST = capture, sales_ai, asis_ai. Excepción: "Radar de Vacantes" conserva su nombre (herramienta personal, repo público ya en marcha); renombrarlo queda sin decidir.

## Arquitectura de contenido

1. **Hero** — "Desarrollador de Automatización e Integraciones con IA" (título del CV 2026), ubicación, disponibilidad remota, stack principal y correo visibles sin scroll.
2. **Proyectos** — 4 tarjetas con insignia de estado. Detalle por proyecto: Problema → Solución → Resultado (solo si hay dato real).
3. **Sobre mí** — 25 años operando negocios reales, ahora construye los sistemas que él mismo necesitaba como operador. Incluye trayectoria y habilidades del CV.
4. **Contacto** — correo, LinkedIn y GitHub como links directos. Sin formulario.

## Formato de cada proyecto
Texto (Problema-Solución-Resultado) + video demo (pendiente) + un snippet corto sanitizado (opcional en el schema, no bloquea publicar).

### Criterios para elegir el snippet
1. Una sola decisión, no el flujo completo (10-20 líneas máx).
2. Cero nombres de cliente, credenciales, URLs internas o datos reales de negocio.
3. Se entiende solo, sin necesitar el resto del repo.
4. Conecta directo con una frase del case study — prueba lo que dice el texto.
5. Muestra la parte no obvia (la decisión), no el boilerplate.

Nota: Claude no inventa el snippet — solo indica qué extraer del repo real. Para proyectos de clientes, Juan lo saca y lo sanitiza. Excepción aplicada el 4-oct: el snippet del Radar se copió literal de su repo público (`radar/puntuar.py`, `_NIVELES` + `nivel_del_titulo`), pendiente de visto bueno de Juan.

## Stack técnico del sitio (v2) — DECIDIDO (17-sep-2026), RATIFICADO (4-oct-2026)

**Astro 7 + Tailwind CSS v4 (vía `@tailwindcss/vite`) + Content Collections con schema Zod. Deploy: GitHub Pages vía GitHub Actions.**

Por qué (17-sep):
- **Astro, no una app React/Next.** El portafolio es contenido, no una app con estado — Astro no envía JS al cliente salvo que se pida.
- **Tailwind v4 vía el plugin de Vite, no `@astrojs/tailwind`** (la integración vieja rechaza Astro 6/7).
- **Content Collections + schema Zod aplican las reglas fijas en el build.** No existe campo para "resultado proyectado".
- **GitHub Pages**, porque el repo ya vive en GitHub.

Ratificación del 4-oct: Juan pidió conservar la presentación visual de su `index.html` original y preguntó si convenía trabajar sobre ese archivo o sobre `site-v2`. Decisión: **`site-v2` como motor, con el diseño original portado encima** (azul noche `#191c32`, acentos aqua, tarjeta lavanda `#b2b0ee`, retrato con marco cian, cambio de tema). Razón: con 4 proyectos y página de detalle, el HTML suelto obliga a copiar menú y pie en 5 páginas; en Astro cada proyecto es un `.md`.

**Dirección definitiva — DECIDIDO (4-oct-2026): `https://juanftoro2006.github.io/portafolio_juantoro/`.** El repo NO se renombra. Razón: Juan envía este link en postulaciones activas desde hoy, y renombrar el repo después rompería los links ya enviados. Las rutas internas pasan por `src/lib/rutas.ts`, que respeta el `base`.

## Estado del sitio (4-oct-2026)

**PUBLICADO el 4-oct-2026** en `https://juanftoro2006.github.io/portafolio_juantoro/`. Commit `9279c73` en `main`; el workflow `Publicar portafolio en GitHub Pages` corrió bien al primer intento. Verificado en línea: inicio y ficha de NoA-CAPTURE cargan con el contenido nuevo. Juan lo probó en celular: tema claro/oscuro, LinkedIn y GitHub funcionan. La rama `stack-v2-scaffolding` ya está mezclada en `main`.

Construido en `C:\PROYECTOS\portafolio\site-v2\`. Verificado en build limpio: 5 páginas, 0 errores, 0 archivos JS externos, 124 KB en total, 8 enlaces internos sin 404, sin desborde en móvil, y búsqueda de nombres reales de clientes y personas en el HTML generado sin resultados.

Archivos:
- `src/content.config.ts` — schema ampliado: `resumen`, `estado_etiqueta`, `sector`, `stack`, `resultado_corte`, `resultado_reportado`.
- `src/data/perfil.ts` — nombre, título, correo, LinkedIn, GitHub, habilidades y trayectoria (fuente: CV ES V3.1).
- `src/lib/rutas.ts` — helper de rutas que respeta el `base`.
- `src/layouts/Layout.astro`, `src/pages/index.astro`, `src/pages/proyectos/[id].astro`, `src/components/Icono.astro`, `src/styles/global.css`.
- `src/content/proyectos/` — `noa-capture.md`, `radar-de-vacantes.md`, `noa-asis-ai.md`, `noa-sales-ai.md`.
- `public/img/juantoro.webp` — retrato original convertido (315 KB → 23 KB).

Decisión nueva en el schema: **`resultado_reportado`**, campo aparte para cifras que dio el cliente y no midió Juan. La página las muestra siempre con la etiqueta "reportado por el cliente". Se creó por el caso NoA-SALES_AI.

Para verlo en local: `cd site-v2`, `npm run dev`, abrir `http://localhost:4321/portafolio_juantoro/`.

## Estado por proyecto

**NoA-CAPTURE — CARGADO (orden 1).**
Cliente anonimizado: en la ficha aparece redactado como "empresa constructora" (el término acordado es "CONSTRUCTORA"). Resultado medido, confirmado por Juan el 4-oct: 261 facturas en el mes de operación; 205 leídas del XML de forma determinista y 56 rescatadas por visión. Eso es 21% del total (56/261). El "27%" del CV sale de dividir 56/205 y no es el porcentaje del total.
Horas ahorradas — DECIDIDO por Juan (4-oct): **unas 35 horas mensuales** (261 facturas × 8 min; unas 418 al año), siempre etiquetadas como estimación, no medición. La ficha y el CV dicen lo mismo.
Fuera de la ficha por no encontrar la fuente: "procesadas en menos de 10 minutos" (está en el CV, no en la bitácora del proyecto).
Sin snippet: Juan debe extraerlo y sanitizarlo (candidatos: dedup por CUFE, fallback XML→visión).

**Radar de Vacantes — CARGADO (orden 2), reescrito desde cero.**
La ficha del 17-sep describía la v1 (n8n, 4 empresas, 249 vacantes, ventana de 48 h). El proyecto se reescribió el 21-sep en Python + GitHub Actions + Telegram. Cifras medidas sobre `origin/main` con corte al 4-oct-2026: 41 corridas automáticas en 14 días, 2.391 vacantes, 28 empresas, 3 ATS, 327 pasan prefiltro, 48 con puntaje ≥ 5, 3 alertas, 595 cierres detectados, 0 claves duplicadas, 45 pruebas.
Se retiró la cifra "18%–27% de vacantes fantasma": no tiene fuente citada en ninguna bitácora.
No se publica como validada la deduplicación por huella: no se ha disparado en producción (0 filas `duplicada`).
Enlaza el repo público. No se enlazó el dashboard de GitHub Pages porque no se pudo verificar su URL.

**NoA-ASIS_AI — CARGADO (orden 3), categoría "en piloto".**
Fuente: repo V2 (`NoA-ASIS_AI`), nunca el V1. Sin sección de resultado. Destaca: cambio de canal por el límite de iOS, un solo disparador para todos los clientes (Changes API + tabla de mapeo), cobro después de entregar, idempotencia por archivo. Pilotos sin nombrar.
**Decisión fija (17-sep-2026) — repo V1 descartado del portafolio.** El repo original `ASIS_AI` (V1) tiene credenciales expuestas en su historial de git, sin purgar ni rotar. No se muestra, no se enlaza, no se menciona. V1 permanece privado — decisión de Juan (riesgo aceptado mientras sea privado).

**NoA-SALES_AI — CARGADO (orden 4), categoría "prueba de concepto validada".**
Cliente anonimizado como "boutique de moda"; el vendedor aparece como "vendedor humano". Cifras (+8% ventas, 35% tiempo liberado, ~200 mensajes/día): Juan confirmó el 4-oct que **las reportó el cliente**; van en `resultado_reportado`. La ficha dice que la migración a WhatsApp está en curso y no activa.

**FreeSmile AI — FUERA de esta versión** por decisión de Juan (4-oct). Sigue en el CV. El texto Problema-Solución sin Resultado sigue siendo válido si se quiere agregar después.

## Pendientes inmediatos
- Juan aprobó el sitio el 4-oct ("me gusta mucho"). Mejoras posteriores se hacen de a una.
- Forma de trabajo pedida por Juan: instrucciones **un paso a la vez**, esperando su confirmación antes del siguiente.
- Pendiente: la fuente de "menos de 10 minutos" de NoA-CAPTURE (está en el CV, no en la ficha).
- ~~Actualizar el CV.~~ Hecho el 4-oct: `CV_2026_Juan_Fernando_Toro_Isaza_ES_V3_2.docx` y `..._EN_V3_2.docx` en la carpeta `Hoja de vida`, con el Radar en su versión actual, "56 de 261 (21%)" y 35 horas. Formato ATS intacto (sin tablas ni imágenes, 2 páginas). Juan exportó él mismo los PDF `..._ES.pdf` y `..._EN.pdf`, que son los que envía. El CV NO va en el repo: el repo es público. Pendiente opcional: botón de descarga del CV en el portafolio y link del portafolio en el encabezado del CV.
- Juan envió el portafolio a sus postulaciones activas el 4-oct.
- ~~Publicación.~~ Hecha el 4-oct por Juan desde su terminal, paso a paso (la sesión no tiene credenciales de GitHub y `.github/workflows/` está protegido contra escritura remota). Quedó un solo workflow: `.github/workflows/deploy.yml` en la raíz (Node 22, jobs construir y publicar). Se borraron `static.yml` y el `deploy.yml` mal ubicado de `site-v2/`. Aprendizaje: el "ruido CRLF" anotado antes no existe en el Windows de Juan; era un efecto de mirar el repo desde Linux.
- Orden de proyectos confirmado por Juan (4-oct): NoA-CAPTURE, Radar de Vacantes, NoA-ASIS_AI, NoA-SALES_AI.
- Limpieza del repo (en curso, 4-oct): se agrega `.gitignore` en la raíz y se dejan de versionar `node_modules/` (2.946 archivos) y `venv/` (860) con `git rm -r --cached`, que los saca de git sin borrarlos del disco.
- Snippets de NoA-CAPTURE, NoA-ASIS_AI y NoA-SALES_AI (los extrae y sanitiza Juan).
- Videos demo — backlog.
- Reemplazo del `index.html` viejo: sigue en la raíz sin tocar.
- Ruido de fin de línea (CRLF/LF) sin commitear en el repo del portafolio: sigue pendiente.

## Incidente del 4-oct-2026 (para no repetirlo)
Al revisar el repo del Radar se corrieron `git status` y `git fetch` en una carpeta montada sin permiso de borrado. Quedaron `index.lock`, `maintenance.lock` y un pack `.keep` huérfanos dentro de `.git`. Juan autorizó el borrado y se limpiaron. Regla operativa: en repos de Juan, solo comandos git de lectura y con `GIT_OPTIONAL_LOCKS=0`; nada de `fetch`, `add` ni `commit` desde la sesión.

## Por qué estas decisiones (research de referencia)
- Un reclutador da ~15 segundos en la primera pasada del portafolio → máximo 3-4 proyectos visibles, sin scroll excesivo.
- El formato que mejor funciona para backend/automatización es Problem-Solution combinado con Template-Based (fuente: scale.jobs).
- El diferenciador real en portafolios de automatización no es el diseño — es tener evidencia verificable (demo funcional o código), no solo capturas estáticas (fuente: caso n8n en GitHub, atrubaautomates/portfolioo).
- Contacto como link accionable directo, nunca un formulario decorativo (fuente: slategit.com).
- Título y stack visibles sin scroll, proyectos en las dos primeras secciones, 3-4 proyectos fuertes en vez de 8-12 pequeños (fuente: devplaybook.cc, checklist de hiring managers, consultado 4-oct-2026).
- Referencia visual revisada: `astro-starter-portfolio` (Astro 7 + Tailwind v4 + Content Collections, MIT). Se usó como referencia de estructura, no se migró a ella.
