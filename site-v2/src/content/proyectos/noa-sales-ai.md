---
titulo: "NoA-SALES_AI"
resumen: "Agente de ventas que atiende el chat, muestra el catálogo y le pasa al vendedor humano solo los clientes listos para comprar."
estado: construccion
estado_etiqueta: "Prueba de concepto validada"
sector: "E-commerce de moda"
cliente_anonimizado: "boutique de moda"
stack: ["n8n", "Supabase (PostgreSQL)", "OpenAI API", "Claude API", "WhatsApp Business API", "Meta Graph API", "Telegram Bot API"]
problema: "En una boutique de moda que vende por chat, el vendedor respondía lo mismo decenas de veces al día: precios, tallas, colores. Los clientes listos para comprar quedaban mezclados con los curiosos, y una respuesta tardía significaba una venta perdida."
solucion: "Un agente orquestador en n8n decide en cada mensaje qué herramienta usar. Consulta el catálogo con fotos y videos en Supabase y conversa con el cliente. En paralelo, un segundo modelo califica la intención de compra con una rúbrica acumulativa de 0 a 100. Cuando el puntaje pasa de 80 y el cliente está en fase de cierre, el sistema le envía al vendedor humano un resumen del caso y silencia al bot mientras el humano atiende."
resultado_reportado: "8% más de ventas y 35% del tiempo de atención liberado, con unos 200 mensajes diarios."
orden: 4
---

## Estado real, sin adornos

El concepto se validó de punta a punta sobre Telegram: conversación, catálogo con fotos, calificación y paso al vendedor. La migración a WhatsApp Business API está en curso y todavía no está activa. Por eso el proyecto figura como prueba de concepto y no como sistema en producción.

## Decisiones que importan más que el stack

- **Una rúbrica con topes, no un número libre.** Cada señal suma un valor fijo y tiene un máximo de repeticiones: curiosidad, interés, confianza y cierre. Sin una señal explícita de cierre el puntaje no pasa de 70, así que nadie llega al vendedor solo por hacer muchas preguntas.
- **Del interruptor a la tabla.** La primera versión marcaba al cliente con un interruptor de "ya pasó al vendedor". Como el puntaje es acumulativo y nunca baja solo, cualquier saludo posterior volvía a disparar la notificación. El rediseño, ya decidido y pendiente de conectar al flujo, cambia el interruptor por una tabla de oportunidades: una fila por intento de compra, con apertura, cierre y estado.
- **El webhook no confía en quien llama.** En el flujo migrado, cada mensaje entrante de WhatsApp se valida con la firma HMAC de Meta antes de procesarse.
- **Auditar antes de migrar.** La migración a WhatsApp incluyó una auditoría de la cuenta de Meta Business vía Graph API (portafolios, cuentas de WhatsApp, números y usuarios del sistema) para saber exactamente qué activos existían antes de conectar nada.

## Lo que falta

Terminar la migración a WhatsApp y rediseñar cómo el vendedor cierra una oportunidad sin los botones que tenía en Telegram.
