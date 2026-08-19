import type { ReactNode } from 'react'
import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  UserRoundPlus,
  X,
} from 'lucide-react'
import type { Reservation } from '../data/demoData'

type Props = {
  open: boolean
  onClose: () => void
  reservation: Reservation
  isLive: boolean
}

export function BackofficeDrawer({
  open,
  onClose,
  reservation,
  isLive,
}: Props) {
  return (
    <>
      <div
        className={`drawer-backdrop ${open ? 'open' : ''}`}
        onClick={onClose}
      />
      <aside className={`drawer ${open ? 'open' : ''}`}>
        <div className="drawer-header">
          <div>
            <span className="drawer-kicker">BACKOFFICE DEMO</span>
            <h2>Esto ocurrió detrás del chat</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Cerrar backoffice">
            <X size={20} />
          </button>
        </div>

        <div className="metric-grid">
          <Metric label="Reservas hoy" value={isLive ? '5' : '4'} />
          <Metric label="Clientes" value={isLive ? '28' : '27'} />
          <Metric label="Pendientes" value="2" />
        </div>

        <section className="panel">
          <div className="panel-heading">
            <h3>Reservas</h3>
            {isLive && <span className="live-badge">Actualizado ahora</span>}
          </div>

          <div className={`reservation-row ${isLive ? 'fresh' : ''}`}>
            <div className="status-dot" />
            <div className="reservation-main">
              <strong>{reservation.customer}</strong>
              <span>{reservation.service}</span>
            </div>
            <div>
              <strong>{reservation.dateLabel}</strong>
              <span>{reservation.time}</span>
            </div>
            <span className="status-pill">{reservation.status}</span>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading"><h3>Actividad reciente</h3></div>
          <Activity
            icon={<CalendarCheck size={17} />}
            title="Nueva reserva creada"
            detail={`${reservation.customer} · ${reservation.time}`}
            active={isLive}
          />
          <Activity
            icon={<UserRoundPlus size={17} />}
            title="Cliente registrado"
            detail={reservation.customer}
            active={isLive}
          />
          <Activity
            icon={<Bell size={17} />}
            title="Recordatorio programado"
            detail={reservation.reminder}
            active={isLive}
          />
        </section>

        <div className="explanation">
          <CheckCircle2 size={18} />
          <p>
            En un proyecto real, estos eventos vendrían del backend.
            En este MVP son estados locales para demostrar visualmente la experiencia.
          </p>
        </div>
      </aside>
    </>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function Activity({
  icon,
  title,
  detail,
  active,
}: {
  icon: ReactNode
  title: string
  detail: string
  active: boolean
}) {
  return (
    <div className={`activity ${active ? 'active' : ''}`}>
      <div className="activity-icon">{icon}</div>
      <div>
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
      {active && <small>ahora</small>}
    </div>
  )
}
