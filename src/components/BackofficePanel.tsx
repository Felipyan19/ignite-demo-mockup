import type { ReactNode } from 'react'
import { Bell, CalendarDays, Clock3, CreditCard, MessageCircle, Users, X } from 'lucide-react'
import { existingReservations, type Reservation } from '../data/demoData'
import { IntegrationLogo } from './IntegrationLogo'

export function BackofficePanel({ reservation, onClose }: { reservation: Reservation; onClose: () => void }) {
  const rows = [reservation, ...existingReservations]

  return (
    <section className="demo-backoffice-theme relative h-[620px] overflow-y-auto rounded-b-[24px] bg-[var(--bo-bg)] animate-panel-in sm:h-[650px] xl:h-[670px] lg:rounded-r-[24px] lg:rounded-bl-none">
      <div className="sticky top-0 z-10 border-b border-[var(--bo-border)] bg-white/95 px-4 py-3.5 backdrop-blur sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-[var(--bo-text)]">Backoffice</h2>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[var(--bo-accent)]"><span className="size-1.5 rounded-full bg-[var(--bo-accent)]" /> Operación actualizada</span>
            </div>
            <p className="mt-1 max-w-[520px] text-[11px] leading-4 text-[var(--bo-muted)]">La reserva que acabas de simular ya aparece registrada en la operación.</p>
          </div>
          <button onClick={onClose} className="grid size-9 shrink-0 place-items-center rounded-md border border-[var(--bo-border)] bg-white text-[var(--bo-muted)] transition duration-150 hover:bg-[var(--bo-soft)] hover:text-[var(--bo-text)] focus:outline-none focus:ring-2 focus:ring-[var(--bo-accent)]/20" aria-label="Cerrar backoffice"><X className="size-4" /></button>
        </div>
        <nav className="mt-3 flex gap-4 overflow-x-auto text-[11px] font-medium text-[var(--bo-muted)]" aria-label="Secciones del backoffice">
          <span className="border-b-2 border-[var(--bo-accent)] pb-2.5 font-semibold text-[var(--bo-accent)]">Reservas</span><span>Clientes</span><span>Pagos</span><span>Integraciones</span>
        </nav>
      </div>

      <div className="grid gap-3.5 p-4 xl:grid-cols-[minmax(0,1fr)_270px]">
        <div className="min-w-0 space-y-3.5">
          <div className="grid grid-cols-3 gap-2"><Metric icon={<CalendarDays />} label="Reservas hoy" value="5" /><Metric icon={<Users />} label="Clientes" value="28" /><Metric icon={<CreditCard />} label="Cobros" value="$780K" /></div>

          <Surface>
            <div className="mb-3 flex items-center justify-between gap-3"><div><h3 className="text-[13px] font-semibold text-[var(--bo-text)] sm:text-sm">Reservas de hoy</h3><p className="mt-0.5 text-[10px] text-[var(--bo-muted)]">Agenda operativa</p></div><span className="text-[10px] font-medium text-[var(--bo-muted)]">5 reservas</span></div>
            <div className="overflow-hidden rounded-lg border border-[var(--bo-border)] bg-white">
              {rows.map((row, index) => (
                <div key={row.id} className={`grid gap-2.5 border-t border-[var(--bo-border)] p-3 first:border-t-0 transition duration-150 sm:grid-cols-[1.4fr_.85fr_auto] sm:items-center ${index === 0 ? 'bg-[var(--bo-accent-soft)] animate-highlight' : 'bg-white'}`}>
                  <div className="min-w-0"><div className="flex items-center gap-2">{index === 0 && <span className="rounded-full bg-[var(--bo-accent)]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[var(--bo-accent)]">Nueva</span>}<strong className="truncate text-xs font-semibold text-[var(--bo-text)]">{row.customer}</strong></div><p className="mt-1 text-[11px] text-[var(--bo-muted)]">{row.service}</p></div>
                  <div className="text-[11px] text-[var(--bo-muted)]"><p className="font-semibold text-[var(--bo-text)]">{row.time}</p><p className="mt-0.5">{row.price}</p></div>
                  <div className="flex items-center gap-2"><span className="rounded-full bg-[var(--bo-accent-soft)] px-2 py-1 text-[10px] font-semibold text-[var(--bo-accent)]">Confirmada</span><IntegrationLogo name="whatsapp" size="sm" /></div>
                </div>
              ))}
            </div>
          </Surface>

          <Surface>
            <div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-2.5"><IntegrationLogo name="calendar" size="sm" /><div className="min-w-0"><h3 className="truncate text-[13px] font-semibold text-[var(--bo-text)] sm:text-sm">Calendario conectado</h3><p className="text-[10px] text-[var(--bo-muted)]">Google Calendar</p></div></div><span className="shrink-0 text-[10px] font-medium text-[var(--bo-accent)]">Sincronizado</span></div>
            <div className="mt-3.5 grid grid-cols-[42px_1fr] gap-x-2 text-[10px] text-[var(--bo-muted)]">
              <TimeRow time="4 PM" /><div className="my-1 rounded-md border-l-[3px] border-[var(--bo-accent)] bg-[var(--bo-accent-soft)] px-3 py-2 text-[var(--bo-accent-dark)]"><strong>5:00 PM · Felipe Castaño</strong><br /><span>Masaje relajante</span></div>
              <TimeRow time="5 PM" /><div className="my-1 rounded-md border-l-[3px] border-[var(--bo-warning)] bg-[var(--bo-warning-soft)] px-3 py-2 text-[#805b1e]"><strong>6:30 PM · Reserva pendiente</strong><br /><span>Masaje en pareja</span></div><TimeRow time="6 PM" />
            </div>
          </Surface>
        </div>

        <aside className="space-y-3.5">
          <Surface>
            <div className="mb-2.5 flex items-center justify-between"><div><h3 className="text-[13px] font-semibold text-[var(--bo-text)] sm:text-sm">Actividad reciente</h3><p className="mt-0.5 text-[10px] text-[var(--bo-muted)]">Últimos cambios del flujo</p></div><span className="text-[10px] font-medium text-[var(--bo-accent)]">Ahora</span></div>
            <Activity icon={<CalendarDays />} title="Reserva creada" detail="Masaje relajante · 5:00 PM" /><Activity icon={<Users />} title="Cliente registrado" detail="Felipe Castaño" /><Activity icon={<Bell />} title="Recordatorio programado" detail="24 h antes por WhatsApp" /><Activity icon={<CreditCard />} title="Anticipo preparado" detail="Bold · pago opcional" /><Activity icon={<MessageCircle />} title="Confirmación preparada" detail="WhatsApp Business" />
          </Surface>

          <Surface>
            <div className="mb-2.5 flex items-center justify-between"><div><h3 className="text-[13px] font-semibold text-[var(--bo-text)] sm:text-sm">Integraciones</h3><p className="mt-0.5 text-[10px] text-[var(--bo-muted)]">Herramientas conectadas</p></div><span className="text-[10px] font-medium text-[var(--bo-muted)]">4</span></div>
            <IntegrationRow logo="whatsapp" title="WhatsApp Business" /><IntegrationRow logo="calendar" title="Google Calendar" /><IntegrationRow logo="bold" title="Bold" /><IntegrationRow logo="crm" title="Ignite CRM" />
          </Surface>
        </aside>
      </div>
    </section>
  )
}

function Surface({ children }: { children: ReactNode }) { return <div className="rounded-lg border border-[var(--bo-border)] bg-white p-3.5 sm:p-4">{children}</div> }
function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) { return <div className="rounded-lg border border-[var(--bo-border)] bg-white p-3"><div className="mb-2 grid size-8 place-items-center rounded-md bg-[var(--bo-accent-soft)] text-[var(--bo-accent)] [&>svg]:size-3.5">{icon}</div><p className="text-[10px] font-medium text-[var(--bo-muted)]">{label}</p><strong className="mt-0.5 block text-[17px] font-semibold tracking-tight text-[var(--bo-text)] sm:text-lg">{value}</strong></div> }
function Activity({ icon, title, detail }: { icon: ReactNode; title: string; detail: string }) { return <div className="flex gap-2.5 border-t border-[var(--bo-border)] py-2.5 first:border-0 first:pt-0"><div className="grid size-7 shrink-0 place-items-center rounded-md bg-[var(--bo-soft)] text-[var(--bo-accent)] [&>svg]:size-3.5">{icon}</div><div className="min-w-0"><p className="text-[11px] font-semibold text-[var(--bo-text)]">{title}</p><p className="mt-0.5 truncate text-[10px] text-[var(--bo-muted)]">{detail}</p></div><span className="ml-auto mt-1 size-1.5 shrink-0 rounded-full bg-[var(--bo-accent)]" /></div> }
function IntegrationRow({ logo, title }: { logo: 'whatsapp' | 'calendar' | 'bold' | 'crm'; title: string }) { return <div className="flex items-center gap-2.5 border-t border-[var(--bo-border)] py-2 first:border-0"><IntegrationLogo name={logo} size="sm" /><span className="min-w-0 flex-1 truncate text-[11px] font-medium text-[var(--bo-text)]">{title}</span><span className="text-[10px] font-medium text-[var(--bo-accent)]">Conectado</span></div> }
function TimeRow({ time }: { time: string }) { return <div className="flex items-center gap-1 py-2"><Clock3 className="size-3" />{time}</div> }
