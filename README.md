# Ignite Demo Mockup

MVP visual e interactivo para demostrar el valor de Ignite Apps sin backend, base de datos ni integraciones reales.

## Qué demuestra

El prospecto realiza una reserva dentro de un chat y observa cómo Ignite **simularía** acciones reales en distintas herramientas:

1. Consulta disponibilidad en Google Calendar.
2. Registra el cliente en el CRM.
3. Crea la reserva y el evento.
4. Prepara la confirmación por WhatsApp Business.
5. Deja listo un cobro con Wompi.
6. Abre un backoffice simulado donde la operación aparece actualizada.

El objetivo no es fingir que hay un backend: toda la UI indica claramente que se trata de una simulación con datos ficticios.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Lucide React
- Estado local únicamente

## Ejecutar

```bash
corepack enable
yarn install
yarn dev
```

El proyecto fija su versión de Yarn en `package.json`. Corepack se encarga de usarla automáticamente.

## Build

```bash
yarn build
```

## Principios del demo

- Sin registro antes del “aha moment”.
- Un solo caso de uso, corto y guiado.
- El usuario nunca sale de la pantalla.
- Primero conversación, luego resultado y después backoffice.
- Logos e integraciones reconocibles para conectar la demo con herramientas reales.
- CTA comercial después de demostrar el valor.

## Fuera de alcance

- Backend
- Base de datos
- Login
- LLM real
- WhatsApp real
- Google Calendar real
- Wompi real
- Persistencia
- Multi-tenant
