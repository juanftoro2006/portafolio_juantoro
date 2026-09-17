---
titulo: "Radar de Vacantes"
estado: listo
problema: "Entre el 18% y el 27% de los avisos de empleo son vacantes fantasma o ya cerradas, y las ventanas reales de postulación son cortas — buscar a través de agregadores como LinkedIn o Indeed llega tarde, porque republican con retraso y no ofrecen feed público (solo APIs para partners). Costo estimado del ciclo manual: ~9 horas."
solucion: "Pipeline en n8n que lee directo de los feeds JSON públicos de los ATS reales (Greenhouse, Lever, Ashby) en vez de agregadores, con doble clave de deduplicación (técnica + huella de contenido) para que una republicación con ID nuevo no cuele como vacante nueva. Antes del scoring caro corre un prefiltro barato por listas blancas de título/ubicación. El resultado no es un puntaje único: se descompone en señales KNOCKOUT / BRECHA / RIESGO por dimensión (stack, inglés, seniority, ubicación) — un score agregado no dice qué componente hundió el resultado, el desglose sí. Ningún descarte es silencioso: el piso deja bandera (ej. 'KNOCKOUT: stack 1.8 bajo el piso de 2.0') para poder recalibrar después. Ventana dura de 48 horas: si no hay nada fresco, no hay nada."
resultado: "249 vacantes capturadas de 4 empresas fuente. Deduplicación validada: segunda ejecución consecutiva, 0 duplicados. Prefiltro barato: 71 de 249 pasan a la etapa de scoring completo. Vista final de candidatas: ~20 finalistas."
orden: 1
---

## Por qué el enfoque cambió a mitad de camino

El proyecto arrancó como un puntuador de CV. La primera versión agregaba stack, inglés,
seniority y ubicación en un número único — y ese número no decía qué hacer el lunes.
Un score bajo no distingue si el problema es el inglés o si la vacante ya no existe.

La causa raíz no estaba en el modelo de puntaje: estaba en la fuente. Entre 18% y 27%
de los avisos ya no son oportunidades reales, y los agregadores (LinkedIn, Indeed) no
tienen forma de saberlo a tiempo — ni tienen feed público para consultarlo por API.

Eso cambió el producto: dejó de ser un matcher de CV y pasó a ser, primero que nada,
un detector de vacantes frescas y vivas. El match de perfil quedó como segunda etapa.

## Decisiones que importan más que el stack

- **Doble clave de deduplicación.** Una clave técnica sola se puede burlar con una
  republicación que cambia el ID. La huella de contenido no.
- **Inglés no descarta.** Usarlo como filtro eliminaba ~70% del mercado remoto. Se
  marca como riesgo de entrevista, no como exclusión.
- **Presencial pasó de KNOCKOUT a RIESGO** después de un caso medido: una vacante
  remota que solo mencionaba "oficina" en el texto moría en 0 con el patrón viejo.
  Un falso negativo cuesta una oportunidad real — eso pesa más que un filtro cómodo.
- **El piso de puntaje no descarta en silencio.** Deja la razón exacta, para poder
  ver qué tan cerca quedó una vacante y recalibrar con evidencia, no a ciegas.

## Snippet

*(pendiente — Juan define si va el de las señales KNOCKOUT/BRECHA/RIESGO o el del
mapeo de campos por proveedor, lo saca del repo real y lo sanitiza)*
