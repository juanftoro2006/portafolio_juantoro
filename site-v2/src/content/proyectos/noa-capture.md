---
titulo: "NoA-CAPTURE"
resumen: "Lee las facturas electrónicas DIAN que llegan al correo, extrae los datos y los deja en la hoja contable sin que nadie digite."
estado: listo
estado_etiqueta: "Un mes en operación real"
sector: "Sector construcción"
cliente_anonimizado: "empresa constructora"
stack: ["Python", "IMAP", "XML UBL 2.1", "Claude API (visión)", "Google Sheets API", "GitHub Actions", "Pydantic"]
problema: "La auxiliar contable de una empresa constructora abría cada correo, descargaba el adjunto, buscaba los campos de la factura electrónica y los digitaba a mano en dos hojas distintas: el registro de facturas y la planilla de compras. Era el mismo dato tecleado dos veces, todos los días, con el riesgo de error que eso trae."
solucion: "Un pipeline en Python que se conecta al correo corporativo por IMAP (bandeja de entrada y spam), descarga los adjuntos ZIP y lee el XML oficial de la DIAN (estándar UBL 2.1). Cuando el XML falta o llega incompleto, un modelo de visión (Claude) lee el PDF como respaldo. Antes de escribir, deduplica por CUFE, la huella única que la DIAN le pone a cada factura. Luego escribe una fila en la hoja de facturas y otra en la de compras. Corre solo de lunes a sábado con GitHub Actions."
resultado: "261 facturas electrónicas procesadas en el mes de operación con el cliente. 205 se leyeron directo del XML, de forma determinista. Las otras 56 (21%) no traían un XML utilizable y las rescató el modelo de visión leyendo el PDF."
orden: 1
---

## Decisiones que importan más que el stack

- **Primero lo determinista, después lo probabilístico.** El XML de la DIAN es un dato exacto: se lee con un parser y no se le pregunta nada a un modelo. La IA entra solo cuando el XML falta o viene incompleto. Así casi el 80% de las facturas no depende de un modelo ni gasta tokens, y la IA se concentra donde aporta.
- **Leer el correo sin dejar huella.** El cliente puso una regla no negociable: el sistema nunca puede marcar un correo como leído, porque el equipo usa ese estado para trabajar. Se resolvió leyendo con `BODY.PEEK[]`, que descarga el mensaje sin cambiarle el estado. También revisa la carpeta de spam.
- **La clave de deduplicación la pone la autoridad, no yo.** El CUFE lo genera la DIAN al firmar la factura. Usarlo como clave evita inventar una propia con número y proveedor, que se rompe con el primer error de digitación del emisor.
- **Validar en el borde.** Cada factura pasa por un modelo Pydantic antes de escribirse. Un campo mal formado falla ahí, con un mensaje claro, y no llega a la hoja contable.

## Lo que aprendí y haría distinto

Una clave de deduplicación solo protege lo que logra tener clave. Los documentos que fallaban la extracción por completo nunca llegaban a tener CUFE, así que el filtro no los veía y se reprocesaban en cada corrida. La lección: el caso de fallo también necesita identidad propia (por ejemplo, el nombre del archivo ZIP), no solo el caso exitoso.

## Sobre el ahorro de tiempo

Esto es una estimación, no una medición. Calculado a 8 minutos por factura para el proceso manual completo (abrir el correo, abrir el PDF, ubicar los campos y digitarlos), las 261 facturas del mes equivalen a unas 35 horas de digitación.
