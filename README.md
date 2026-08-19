# Ignite Demo Mockup

MVP visual para demostrar cómo Ignite puede ejecutar una operación desde un chat y luego mostrar el resultado en un backoffice simulado.

## Objetivo

Validar visualmente esta hipótesis:

> El prospecto entiende mejor el valor de Ignite cuando ve que una conversación ejecuta acciones y actualiza un sistema, no cuando solo ve un chatbot respondiendo.

## Qué incluye

- Demo 100% frontend.
- Sin backend.
- Sin base de datos.
- Sin login.
- Sin WhatsApp real.
- Sin IA real.
- Flujo guiado de reserva.
- Animaciones de acciones en ejecución.
- Resultado visual.
- Drawer lateral con backoffice simulado.
- Responsive desktop/mobile.

## Stack

- React
- TypeScript
- Vite
- CSS
- lucide-react

## Ejecutar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Despliegue recomendado

Vercel. No requiere variables de entorno.

## Flujo de la demo

1. Usuario elige “Reservar una cita”.
2. Selecciona “Masaje relajante”.
3. Selecciona 5:00 PM.
4. Confirma.
5. Se muestran pasos animados:
   - Validando disponibilidad
   - Registrando cliente
   - Creando reserva
   - Programando recordatorio
6. Aparece la tarjeta “Reserva confirmada”.
7. El usuario pulsa “Ver qué pasó por dentro”.
8. Se abre el backoffice simulado con la nueva reserva resaltada.

## Fuera de alcance del MVP

- APIs reales.
- Webhooks.
- Persistencia.
- Multi-tenant.
- Pagos.
- CRM real.
- Agentes LLM.
- Integraciones.
- Analytics reales.

## Próximo paso si valida

Convertir los estados locales en eventos reales provenientes de Ignite Core / backend.
