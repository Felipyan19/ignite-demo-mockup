export type Reservation = {
  id: string
  customer: string
  service: string
  date: string
  time: string
  price: string
  status: 'Confirmada'
  origin: 'WhatsApp'
}

export const demoReservation: Reservation = {
  id: 'RES-1042',
  customer: 'Felipe Castaño',
  service: 'Masaje relajante',
  date: 'Mañana, 20 de agosto',
  time: '5:00 PM',
  price: '$120.000 COP',
  status: 'Confirmada',
  origin: 'WhatsApp',
}

export const existingReservations: Reservation[] = [
  {
    id: 'RES-1038',
    customer: 'María González',
    service: 'Masaje deportivo',
    date: 'Hoy',
    time: '2:00 PM',
    price: '$110.000 COP',
    status: 'Confirmada',
    origin: 'WhatsApp',
  },
  {
    id: 'RES-1040',
    customer: 'Laura Restrepo',
    service: 'Limpieza facial profunda',
    date: 'Hoy',
    time: '3:30 PM',
    price: '$90.000 COP',
    status: 'Confirmada',
    origin: 'WhatsApp',
  },
]
