// Construye rutas internas respetando el 'base' de astro.config.mjs.
// Por qué existe: en GitHub Pages el sitio puede vivir en una subcarpeta
// (/portafolio_juantoro/). Un href escrito a mano como "/proyectos/x/" ignora
// esa subcarpeta y da 404 en producción aunque el build pase sin errores.
// Con este helper, si mañana se renombra el repo, solo cambia astro.config.mjs.
export function ruta(camino = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const limpio = camino.replace(/^\//, "");
  return `${base}/${limpio}`;
}
