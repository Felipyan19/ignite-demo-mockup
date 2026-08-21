export type ReservationV2 = {
  id: string
  customer: string
  service: string
  schedule: string
  time: string
  price: string
  isNew?: boolean
}

export const newReservationV2: ReservationV2 = {
  id: 'RES-2091',
  customer: 'Felipe Castaño',
  service: 'Ritual en pareja',
  schedule: 'Hoy',
  time: '6:30 PM',
  price: '$260.000',
  isNew: true,
}

export const todaysReservationsV2: ReservationV2[] = [
  {
    id: 'RES-2087',
    customer: 'María González',
    service: 'Ritual en pareja',
    schedule: 'Hoy',
    time: '3:30 PM',
    price: '$260.000',
  },
  {
    id: 'RES-2082',
    customer: 'Laura Restrepo',
    service: 'Masaje relajante',
    schedule: 'Hoy',
    time: '1:00 PM',
    price: '$120.000',
  },
]

export const metricsV2 = {
  reservationsToday: '7',
  clients: '133',
  revenue: '$540.000',
}

export type ActivityItemV2 = {
  id: string
  text: string
  when: string
}

export const baseActivityV2: ActivityItemV2[] = [
  { id: 'act-1', text: 'Recordatorio enviado — Laura Restrepo', when: 'Hace 2h' },
  { id: 'act-2', text: 'Cliente registrada — María González', when: 'Hace 3h' },
]

export const newActivityV2: ActivityItemV2[] = [
  { id: 'act-new-1', text: 'Confirmación preparada', when: 'Hace un momento' },
  { id: 'act-new-2', text: 'Recordatorio programado — WhatsApp', when: 'Hace un momento' },
  { id: 'act-new-3', text: 'Reserva creada — Ritual en pareja · Hoy · 6:30 PM', when: 'Hace un momento' },
  { id: 'act-new-4', text: 'Cliente registrado — Felipe Castaño', when: 'Hace un momento' },
]

export const plansV2 = [
  { name: 'Masaje relajante', price: '$120.000', duration: '50 min', description: 'Libera tensión con presión suave y aceites cálidos.' },
  { name: 'Ritual en pareja', price: '$260.000', duration: '75 min', description: 'Experiencia doble con aromaterapia y copa de bienvenida.' },
  { name: 'Jacuzzi + masaje', price: '$180.000', duration: '60 min', description: 'Hidroterapia y masaje relajante en una sola sesión.' },
] as const
