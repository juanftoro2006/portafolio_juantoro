---
titulo: "Radar de Vacantes"
resumen: "Detecta ofertas de empleo en sus primeros días, directo desde los sistemas de las empresas, y avisa por Telegram solo las que vale la pena leer."
estado: listo
estado_etiqueta: "Corriendo solo a diario"
sector: "Proyecto propio · Repositorio público"
stack: ["Python", "Pydantic", "GitHub Actions", "Telegram Bot API", "pytest", "GitHub Pages"]
problema: "Buscar empleo en los agregadores tiene dos fallas. Una parte de los avisos sigue publicada cuando la vacante ya no existe, y los agregadores republican con retraso, así que cuando el aviso aparece la cola de candidatos ya es larga. Revisar las páginas de empleo de cada empresa a mano no escala."
solucion: "Los sistemas de reclutamiento más usados (Greenhouse, Lever y Ashby) exponen sus vacantes en feeds JSON públicos, la misma fuente que alimenta la página de empleos de cada empresa. El radar consulta esos feeds varias veces al día con GitHub Actions, los normaliza a un esquema único, deduplica, pasa un prefiltro barato por título y ubicación, y puntúa lo que sobrevive contra un perfil profesional. Solo las candidatas recientes llegan como alerta a Telegram. Todo lo demás queda registrado con el motivo del descarte."
resultado: "41 corridas automáticas en 14 días seguidos, sin intervención. 2.391 vacantes registradas de 28 empresas y 3 sistemas de reclutamiento. De esas, 327 pasaron el prefiltro, 48 alcanzaron el puntaje mínimo y 3 se convirtieron en alerta. Cero claves duplicadas en el registro y 595 cierres de vacante detectados. 45 pruebas automáticas."
resultado_corte: "4 de octubre de 2026"
snippet_lenguaje: "python"
snippet_descripcion: "Cómo se reconoce el nivel de un cargo a partir del título. La decisión está en el orden de la lista: se evalúa de lo más alto a lo más bajo, para que un título con dos marcas se clasifique por la más alta y para que \"Semi-Senior\" cuente como nivel medio y no como senior."
snippet_codigo: |
  # El ORDEN importa: se evalua de lo mas alto a lo mas bajo. "Sr. Engineer II"
  # tiene dos marcas y debe ganar la mas alta; "Semi-Senior" es mid, no senior.
  _NIVELES: list[tuple[str, re.Pattern[str]]] = [
      ("top", re.compile(r"\b(staff|principal|head of|director|vp|vice president|chief|cto)\b")),
      ("lead", re.compile(r"\b(lead|manager|gerente|lider|architect|arquitecto)\b")),
      ("mid", re.compile(r"\b(semi[- ]?senior|ssr|mid|mid[- ]level|intermediate)\b")),
      ("senior", re.compile(r"\b(senior|sr|iii|iv|l4|l5)\b")),
      ("mid", re.compile(r"\b(ii|l3)\b")),
      ("intern", re.compile(r"\b(intern|internship|practicante|pasante)\b")),
      ("junior", re.compile(r"\b(junior|jr|entry[- ]level|trainee|associate|early career)\b")),
  ]


  def nivel_del_titulo(titulo_norm: str) -> str:
      for nombre, patron in _NIVELES:
          if patron.search(titulo_norm):
              return nombre
      return "sin_marca"
repo_url: "https://github.com/juanftoro2006/Radar_Vacantes"
orden: 2
---

## Decisiones que importan más que el stack

- **Filtro barato antes que filtro caro.** El prefiltro y el puntaje son búsqueda de texto: costo cero y resultado repetible. Solo lo que sobrevive llegaría a un análisis con un modelo de lenguaje. Al revés sería pagar juicio caro para descubrir que un puesto de contabilidad no es un puesto de desarrollo.
- **Lista blanca, nunca lista negra.** La primera versión bloqueaba una lista de países y dejaba pasar como "remoto" todo lo demás. `Sweden (Remote)` pasaba. Hay 190 países y una lista negra siempre tiene un agujero. Ahora una ubicación pasa solo si nombra un lugar elegible o si es remota sin nombrar ninguno.
- **Descartar, marcar brecha y marcar riesgo son cosas distintas.** Una exigencia legal de otro país descarta. Un requisito de años se marca como brecha, porque se negocia con evidencia. El inglés avanzado se marca como riesgo. Mezclar las tres en un solo número borra esa diferencia.
- **Ningún descarte silencioso, ninguna caída silenciosa.** Todo lo descargado queda en el registro con su motivo. Y el resumen llega todos los días aunque no haya candidatas: si un día no llega, el radar está caído.

## El error que cambió el diseño

La primera versión recortaba las descripciones a 3.500 caracteres "para ahorrar tokens". El puntaje terminaba leyendo la presentación de la empresa en vez de los requisitos. Una vacante que pedía n8n, Python y OpenAI sacaba 4,7 y nunca aparecía; con el texto completo, el mismo puntaje le dio 7,3. La regla que quedó: al filtro barato no se le recorta la entrada. El recorte, si hace falta, es trabajo de la capa que paga tokens.

## De dónde viene

Empezó como un flujo en n8n con Google Sheets. Dejó de correr el día que se perdió el acceso al servidor, y el único síntoma fue dejar de ver vacantes. La versión actual se reescribió en Python sobre GitHub Actions, con pruebas automáticas y sin servidor que mantener.
