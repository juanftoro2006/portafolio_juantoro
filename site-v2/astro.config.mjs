// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Nota sobre 'site' y 'base':
// - Si renombras el repo de GitHub a "juanftoro2006.github.io" (user page),
//   el sitio queda en la raíz del dominio y NO necesitas 'base'.
// - Si te quedas con el nombre actual del repo (portafolio_juantoro),
//   GitHub Pages lo sirve en /portafolio_juantoro/ y SÍ necesitas 'base'
//   para que las rutas internas (CSS, links) no se rompan.
// Dejo la opción de repo-project activa por defecto porque es la situación actual;
// cambia esto cuando decidas el nombre final del repo (ver bitácora del portafolio).
export default defineConfig({
  site: "https://juanftoro2006.github.io",
  base: "/portafolio_juantoro",
  vite: {
    plugins: [tailwindcss()],
  },
});
