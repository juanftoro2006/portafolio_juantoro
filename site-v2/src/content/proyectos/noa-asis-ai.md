---
titulo: "NoA-ASIS_AI"
resumen: "Convierte la grabación de una reunión en un resumen ejecutivo con decisiones, responsables y tareas, entregado por Telegram."
estado: construccion
estado_etiqueta: "En piloto con usuarios reales"
sector: "Producto propio (SaaS)"
stack: ["n8n", "AssemblyAI", "Claude API", "Supabase (PostgreSQL)", "FastAPI", "Google Drive API", "Telegram Bot API", "Railway", "Render"]
problema: "De una reunión salen decisiones, responsables y tareas, pero casi nunca queda un acta. A los pocos días nadie recuerda quién quedó en qué. Tomar notas a mano distrae al que las toma, y escuchar de nuevo la grabación completa no lo hace nadie."
solucion: "El usuario envía el audio por Telegram o lo sube a una carpeta de Google Drive. El sistema valida que el usuario esté autorizado y que tenga saldo de minutos, transcribe con AssemblyAI, genera el resumen con Claude contra un contrato de salida y lo entrega por Telegram. El saldo y el consumo se llevan en Supabase. Es un flujo de 65 nodos en n8n, apoyado en un microservicio propio en FastAPI que calcula la duración del audio."
orden: 3
---

## Por qué está en construcción

Es un producto en piloto, no un caso cerrado. Todavía no tiene resultado de negocio que mostrar, y por eso esta página no trae una sección de resultados. Lo que sí tiene es más de 40 decisiones de arquitectura documentadas, cada una con el problema, las alternativas y la razón de la elección.

## Decisiones que importan más que el stack

- **Cambiar el canal en vez de pelear contra el sistema operativo.** iOS bloquea el micrófono de las aplicaciones de terceros mientras hay una llamada celular activa, sin excepción. En lugar de construir una aplicación puente, se cambió la entrada: el usuario sube la grabación a una carpeta de Drive y un disparador la procesa.
- **Un solo disparador para todos los clientes.** La opción fácil era un nodo de Drive por cliente, pero cada cliente nuevo obligaría a tocar el flujo en producción. Se resolvió con una consulta periódica a la API de cambios de Drive y una tabla en Supabase que dice de quién es cada carpeta. Dar de alta un cliente es agregar una fila, no editar el flujo.
- **Se cobra después de entregar, no antes.** En la primera versión el consumo se registraba antes del resumen. Si el resumen fallaba después de cobrar, el reintento era imposible. Ahora el cobro ocurre cuando el resumen ya llegó, y un audio que resulta no ser una reunión no se cobra.
- **Cada archivo entra una sola vez.** La llave de idempotencia del consumo es el identificador del archivo en Drive. Repetir el mismo audio no genera un segundo cobro.
- **Ningún fallo silencioso.** Las llamadas a servicios externos tienen su propia rama de error, con aviso al usuario y alerta al operador.

## Lo que falta

Cerrar el piloto con los usuarios actuales y definir un criterio de salida medible por fase. Cuando haya un dato real de uso, se publica aquí.
