export type Reservation = {
  id: string
  customer: string
  service: string
  schedule: string
  time: string
  price: string
  isNew?: boolean
}

export const newReservation: Reservation = {
  id: 'RES-2091',
  customer: 'Felipe Castaño',
  service: 'Ritual en pareja',
  schedule: 'Hoy',
  time: '6:30 PM',
  price: '$260.000',
  isNew: true,
}

export const todaysReservations: Reservation[] = [
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

export const metrics = {
  reservationsToday: '7',
  clients: '133',
  revenue: '$540.000',
}

export type ActivityItem = {
  id: string
  text: string
  when: string
}

export const baseActivity: ActivityItem[] = [
  { id: 'act-1', text: 'Recordatorio enviado — Laura Restrepo', when: 'Hace 2h' },
  { id: 'act-2', text: 'Cliente registrada — María González', when: 'Hace 3h' },
]

export const newActivity: ActivityItem[] = [
  { id: 'act-new-1', text: 'Confirmación preparada', when: 'Hace un momento' },
  { id: 'act-new-2', text: 'Recordatorio programado — WhatsApp', when: 'Hace un momento' },
  { id: 'act-new-3', text: 'Reserva creada — Ritual en pareja · Hoy · 6:30 PM', when: 'Hace un momento' },
  { id: 'act-new-4', text: 'Cliente registrado — Felipe Castaño', when: 'Hace un momento' },
]

export const plans = [
  { name: 'Masaje relajante', price: '$120.000', duration: '50 min', description: 'Libera tensión con presión suave y aceites cálidos.' },
  { name: 'Ritual en pareja', price: '$260.000', duration: '75 min', description: 'Experiencia doble con aromaterapia y copa de bienvenida.' },
  { name: 'Jacuzzi + masaje', price: '$180.000', duration: '60 min', description: 'Hidroterapia y masaje relajante en una sola sesión.' },
] as const
