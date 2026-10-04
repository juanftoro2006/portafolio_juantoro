// Definición de las "collections" de contenido de Astro.
// Aquí se declara el CONTRATO que debe cumplir cada proyecto del portafolio.
// Por qué esto importa más que una plantilla HTML suelta:
// las 4 reglas fijas de la bitácora (honestidad de métricas, anonimización,
// no exponer repos, Problema→Solución→Resultado) dejan de depender solo de
// que Juan se acuerde de aplicarlas a mano — el build FALLA si un archivo
// .md no cumple el schema. Es lo mismo que pydantic en Python: valida en
// el borde, no confía en que el dato ya venga limpio.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const proyectos = defineCollection({
  // glob() lee todos los .md de esta carpeta y los trata como entradas de la collection.
  loader: glob({ pattern: "**/*.md", base: "./src/content/proyectos" }),
  schema: z.object({
    // Título visible del proyecto (ej: "NoA-CAPTURE")
    titulo: z.string(),

    // Una sola línea para la tarjeta de la página principal: qué resuelve.
    // Tope de 160 caracteres: si no cabe en una línea, no es un resumen.
    resumen: z.string().max(160),

    // Estado real — controla el color del badge.
    // No hay estado intermedio "casi listo": o está probado, o se marca honestamente.
    estado: z.enum(["listo", "construccion"]),

    // Texto corto del badge (ej: "Un mes en operación real", "En piloto").
    // Es obligatorio para que el estado nunca quede a la imaginación del lector.
    estado_etiqueta: z.string(),

    // Sector o tipo de proyecto (ej: "Sector construcción", "Proyecto propio").
    sector: z.string(),

    // Regla de anonimización total: NUNCA el nombre real del cliente.
    // Solo la etiqueta genérica ya acordada en la bitácora
    // (ej: "empresa constructora", "clínica odontológica", "boutique de moda").
    cliente_anonimizado: z.string().optional(),

    // Tecnologías principales, en el orden en que importan.
    stack: z.array(z.string()).min(1),

    // Estructura fija del case study.
    problema: z.string(),
    solucion: z.string(),

    // Regla de honestidad de métricas, aplicada en el TIPO, no solo en revisión manual:
    // 'resultado' es SOLO para cifras medidas por Juan. A propósito NO existe un campo
    // "resultado_proyectado": si el número no es medido, no hay dónde ponerlo.
    resultado: z.string().optional(),

    // Fecha de corte de las cifras medidas (ej: "4 de octubre de 2026").
    // Un número sin fecha envejece en silencio; con fecha, el lector sabe qué tan fresco es.
    resultado_corte: z.string().optional(),

    // Cifras que NO midió Juan sino que reportó el cliente. Van en un campo aparte
    // para que la página las etiquete siempre como "reportado por el cliente".
    // (Decisión del 4-oct-2026: caso NoA-SALES_AI.)
    resultado_reportado: z.string().optional(),

    // Snippet corto y sanitizado (10-20 líneas), nunca el repo completo.
    snippet_codigo: z.string().optional(),
    snippet_lenguaje: z.string().optional(),
    snippet_descripcion: z.string().optional(),

    video_url: z.url().optional(),
    repo_url: z.url().optional(),

    // Orden de aparición manual (menor = primero).
    orden: z.number().default(99),
  }),
});

export const collections = { proyectos };
