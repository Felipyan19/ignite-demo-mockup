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

export type Order = {
  id: string
  customer: string
  product: string
  quantity: string
  total: string
  term: string
  isNew?: boolean
}

export const todaysOrders: Order[] = [
  {
    id: 'ORD-4028',
    customer: 'Farmacia San Rafael',
    product: 'Ibuprofeno 400 mg',
    quantity: '60 unidades',
    total: '$168.000',
    term: 'Pago a 30 días',
  },
  {
    id: 'ORD-4015',
    customer: 'Droguería La Merced',
    product: 'Acetaminofén 500 mg',
    quantity: '40 unidades',
    total: '$106.400',
    term: 'Cliente registrado',
  },
]

export const inventoryMetrics = {
  ordersToday: '4',
  clients: '52',
  quoted: '$1.240.000',
}

export const baseInventoryActivity: ActivityItem[] = [
  { id: 'inv-act-1', text: 'Cotización enviada — Farmacia San Rafael', when: 'Hace 1h' },
  { id: 'inv-act-2', text: 'Pedido aprobado — Droguería La Merced', when: 'Hace 3h' },
]

export const newInventoryActivity: ActivityItem[] = [
  { id: 'inv-act-new-1', text: 'Cotización presentada', when: 'Hace un momento' },
  { id: 'inv-act-new-2', text: 'Orden previa creada', when: 'Hace un momento' },
  { id: 'inv-act-new-3', text: 'Solicitud enviada a la persona encargada', when: 'Hace un momento' },
]
