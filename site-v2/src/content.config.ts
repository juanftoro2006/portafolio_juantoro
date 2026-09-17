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
    // Título visible del proyecto (ej: "Radar de Vacantes")
    titulo: z.string(),

    // Estado real — controla si se muestra el badge "en construcción".
    // No hay estado intermedio "casi listo": o está probado, o se marca honestamente.
    estado: z.enum(["listo", "construccion"]),

    // Regla de anonimización total: NUNCA el nombre real del cliente.
    // Solo la etiqueta genérica ya acordada en la bitácora
    // (ej: "CONSTRUCTORA", "clínica odontológica", "boutique de moda").
    cliente_anonimizado: z.string().optional(),

    // Estructura fija del case study.
    problema: z.string(),
    solucion: z.string(),

    // Regla de honestidad de métricas, aplicada en el TIPO, no solo en revisión manual:
    // este campo es opcional y es texto libre, pero a propósito NO existe un campo
    // "resultado_proyectado". Si el número no es medido, simplemente no hay
    // dónde ponerlo en el schema — se omite, como pasó con FreeSmile AI.
    resultado: z.string().optional(),

    // Snippet corto y sanitizado (10-20 líneas), nunca el repo completo.
    snippet_codigo: z.string().optional(),
    snippet_lenguaje: z.string().optional(),
    snippet_descripcion: z.string().optional(),

    video_url: z.url().optional(),
    repo_url: z.url().optional(),

    // Orden de aparición manual (menor = primero).
    // Radar de Vacantes es hoy la pieza más fuerte de razonamiento técnico → va primero.
    orden: z.number().default(99),
  }),
});

export const collections = { proyectos };
