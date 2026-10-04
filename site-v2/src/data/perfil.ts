// Datos de perfil en un solo lugar (fuente: CV 2026, versión ES V3.1).
// Por qué un archivo aparte: el correo, LinkedIn y el título aparecen en el
// hero, en contacto y en el pie. Si viven aquí, se cambian UNA vez.

export const perfil = {
  nombre: "Juan Toro",
  nombreCompleto: "Juan Fernando Toro Isaza",
  titulo: "Desarrollador de Automatización e Integraciones con IA",
  ubicacion: "Medellín, Colombia",
  disponibilidad: "Disponible para trabajo remoto",
  correo: "juanf.toroi@gmail.com",
  linkedin: "https://www.linkedin.com/in/juanfernandotoroisaza",
  github: "https://github.com/juanftoro2006",
};

// Stack que se muestra en el hero: lo que un reclutador busca en 15 segundos.
export const stackPrincipal = ["Python", "n8n", "FastAPI", "APIs REST", "LLMs (Claude, OpenAI)", "PostgreSQL"];

// Habilidades agrupadas, tal como están en el CV.
export const habilidades = [
  { grupo: "Lenguajes", items: ["Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"] },
  {
    grupo: "Backend e integraciones",
    items: ["FastAPI", "Pydantic", "APIs REST", "Webhooks", "WhatsApp Business API", "Meta Graph API", "Telegram Bot API", "IMAP"],
  },
  {
    grupo: "Automatización e IA",
    items: ["n8n", "Agentes de IA", "Sistemas multi-agente", "Claude API", "OpenAI API", "Salidas estructuradas y validadas", "AssemblyAI"],
  },
  { grupo: "Datos", items: ["PostgreSQL", "Supabase", "pgvector", "Google Sheets API", "pandas", "XML / JSON"] },
  { grupo: "Despliegue", items: ["Git", "GitHub Actions", "Docker", "Railway"] },
];

// Trayectoria previa: de aquí salen los "25 años operando negocios".
export const trayectoria = [
  { periodo: "2025 – hoy", rol: "Fundador y desarrollador de automatización", sector: "NoA, automatización de procesos" },
  { periodo: "2018 – 2025", rol: "Director de proyectos", sector: "Construcción en madera a la medida" },
  { periodo: "2014 – 2018", rol: "Fundador y coordinador general", sector: "Alimentos" },
  { periodo: "2006 – 2012", rol: "Asesor en seguros y riesgos", sector: "Servicios" },
  { periodo: "2002 – 2006", rol: "Gerente de exportaciones", sector: "Comercio internacional" },
  { periodo: "1997 – 2002", rol: "Socio fundador y coordinador general", sector: "Industrial" },
];
