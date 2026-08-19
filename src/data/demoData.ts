export type Reservation = {
  id: string
  customer: string
  service: string
  dateLabel: string
  time: string
  status: 'Confirmada'
  reminder: string
}

export const initialReservation: Reservation = {
  id: 'demo-empty',
  customer: 'Nuevo cliente',
  service: '—',
  dateLabel: '—',
  time: '—',
  status: 'Confirmada',
  reminder: '—',
}
