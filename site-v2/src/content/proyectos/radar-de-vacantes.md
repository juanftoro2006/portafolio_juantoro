---
titulo: "Radar de Vacantes"
estado: listo
problema: "Entre el 18% y el 27% de los avisos de empleo son vacantes fantasma o ya cerradas, y las ventanas reales de postulación son cortas — buscar a través de agregadores como LinkedIn o Indeed llega tarde, porque republican con retraso y no ofrecen feed público (solo APIs para partners). Costo estimado del ciclo manual: ~9 horas."
solucion: "Pipeline en n8n que lee directo de los feeds JSON públicos de los ATS reales (Greenhouse, Lever, Ashby) en vez de agregadores, con doble clave de deduplicación (técnica + huella de contenido) para que una republicación con ID nuevo no cuele como vacante nueva. Antes del scoring caro corre un prefiltro barato por listas blancas de título/ubicación. El resultado no es un puntaje único: se descompone en señales KNOCKOUT / BRECHA / RIESGO por dimensión (stack, seniority, contexto de negocio, años, inglés, ubicación) — un score agregado no dice qué componente hundió el resultado, el desglose sí. Ningún descarte es silencioso: cada exclusión queda como bandera explícita (ej. 'KNOCKOUT: seniority fuera de alcance', 'BRECHA: piden 5 años, tienes 2') en vez de un descarte mudo. Ventana dura de 48 horas: si no hay nada fresco, no hay nada."
resultado: "249 vacantes capturadas de 4 empresas fuente. Deduplicación validada: segunda ejecución consecutiva, 0 duplicados. Prefiltro barato: 71 de 249 pasan a la etapa de scoring completo. Vista final de candidatas: ~20 finalistas."
snippet_lenguaje: "javascript"
snippet_descripcion: "Bloque de scoring por seniority dentro del nodo 'Puntuar' de n8n. El título manda: roles de entrada puntúan más alto, y roles de liderazgo quedan fuera con una bandera explícita, no en silencio."
snippet_codigo: |
  // --- SENIORITY: el titulo manda ---
  let seniority = 5;
  if (/junior|jr\.|entry|trainee|intern/.test(titulo)) seniority = 10;
  else if (/\bii\b|mid|semi/.test(titulo)) seniority = 8;
  else if (/senior|sr\.|\biii\b/.test(titulo)) seniority = 4;
  if (/staff|principal|lead|architect|head of|director|manager/.test(titulo)) {
    seniority = 0;
    banderas.push('KNOCKOUT: seniority fuera de alcance');
  }
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
- **Presencial/híbrido descarta, salvo mención explícita de trabajo remoto.** El
  patrón detecta "on-site", "hybrid" o "relocate" en el texto, pero se retracta si
  la vacante también dice "fully remote" o "100% remote" — evita perder una vacante
  remota real solo porque menciona una oficina de paso.
- **Ningún descarte es silencioso.** Cada exclusión — por seniority, por ubicación,
  por tipo de compensación — queda como bandera con la razón exacta, no como un
  registro que simplemente desaparece del listado.

## Snippet

```javascript
// --- SENIORITY: el titulo manda ---
let seniority = 5;
if (/junior|jr\.|entry|trainee|intern/.test(titulo)) seniority = 10;
else if (/\bii\b|mid|semi/.test(titulo)) seniority = 8;
else if (/senior|sr\.|\biii\b/.test(titulo)) seniority = 4;
if (/staff|principal|lead|architect|head of|director|manager/.test(titulo)) {
  seniority = 0;
  banderas.push('KNOCKOUT: seniority fuera de alcance');
}
```

La decisión no obvia: el puntaje de seniority está invertido a propósito. Un rol
junior puntúa más que uno senior — el filtro busca roles de entrada, no los evita.
Y los roles de liderazgo no se descartan en silencio: quedan marcados con la razón,
visibles en el registro, no borrados del historial.
