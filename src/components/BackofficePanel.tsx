import type { ReactNode } from 'react'
import { Bell, CalendarDays, Clock3, CreditCard, MessageCircle, Users, X } from 'lucide-react'
import { existingReservations, type Reservation } from '../data/demoData'
import { IntegrationLogo } from './IntegrationLogo'

export function BackofficePanel({ reservation, onClose }: { reservation: Reservation; onClose: () => void }) {
  const rows = [reservation, ...existingReservations]

  return (
    <section className="relative h-[620px] overflow-y-auto rounded-b-[24px] bg-[#fbfbfd] animate-panel-in sm:h-[650px] xl:h-[670px] lg:rounded-r-[24px] lg:rounded-bl-none">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3.5 backdrop-blur sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <h2 className="text-lg font-black tracking-[-0.03em] text-slate-950">Backoffice</h2>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                <span className="size-1.5 rounded-full bg-emerald-500" /> En vivo
              </span>
            </div>
            <p className="mt-1 max-w-[520px] text-[11px] leading-4 text-slate-500">La operación que acabas de simular ya aparece registrada.</p>
          </div>
          <button
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition duration-150 hover:bg-slate-50 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-300"
            aria-label="Cerrar backoffice"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="mt-3 flex gap-4 overflow-x-auto text-[11px] font-semibold text-slate-400" aria-label="Secciones del backoffice">
          <span className="border-b-2 border-violet-600 pb-2.5 font-bold text-violet-700">Reservas</span>
          <span>Clientes</span>
          <span>Pagos</span>
          <span>Integraciones</span>
        </nav>
      </div>

      <div className="grid gap-3.5 p-4 xl:grid-cols-[minmax(0,1fr)_270px]">
        <div className="min-w-0 space-y-3.5">
          <div className="grid grid-cols-3 gap-2">
            <Metric icon={<CalendarDays />} label="Reservas hoy" value="5" />
            <Metric icon={<Users />} label="Clientes" value="28" />
            <Metric icon={<CreditCard />} label="Cobros" value="$780K" />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-[0_5px_16px_rgba(15,23,42,.04)] sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-[13px] font-black text-slate-900 sm:text-sm">Reservas de hoy</h3>
              <span className="text-[10px] font-semibold text-slate-400">5 reservas</span>
            </div>
            <div className="space-y-2">
              {rows.map((row, index) => (
                <div
                  key={row.id}
                  className={`grid gap-2.5 rounded-xl border p-3 transition duration-150 sm:grid-cols-[1.4fr_.85fr_auto] sm:items-center ${
                    index === 0
                      ? 'border-emerald-200 bg-emerald-50/55 animate-highlight'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-emerald-700">Nueva</span>
                      )}
                      <strong className="truncate text-xs text-slate-900">{row.customer}</strong>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">{row.service}</p>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <p className="font-bold text-slate-800">{row.time}</p>
                    <p className="mt-0.5">{row.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-600">Confirmada</span>
                    <IntegrationLogo name="whatsapp" size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-[0_5px_16px_rgba(15,23,42,.04)] sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <IntegrationLogo name="calendar" size="sm" />
                <div className="min-w-0">
                  <h3 className="truncate text-[13px] font-black text-slate-900 sm:text-sm">Calendario conectado</h3>
                  <p className="text-[10px] text-slate-500">Google Calendar</p>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-semibold text-slate-400">Sincronizado</span>
            </div>
            <div className="mt-3.5 grid grid-cols-[42px_1fr] gap-x-2 text-[10px] text-slate-400">
              <TimeRow time="4 PM" />
              <div className="my-1 rounded-lg border-l-[3px] border-emerald-500 bg-emerald-50 px-3 py-2 text-emerald-800">
                <strong>5:00 PM · Felipe Castaño</strong><br /><span>Masaje relajante</span>
              </div>
              <TimeRow time="5 PM" />
              <div className="my-1 rounded-lg border-l-[3px] border-violet-400 bg-violet-50/80 px-3 py-2 text-violet-800">
                <strong>6:30 PM · Reserva pendiente</strong><br /><span>Masaje en pareja</span>
              </div>
              <TimeRow time="6 PM" />
            </div>
          </div>
        </div>

        <aside className="space-y-3.5">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-[0_5px_16px_rgba(15,23,42,.04)] sm:p-4">
            <div className="mb-2.5 flex items-center justify-between">
              <h3 className="text-[13px] font-black text-slate-900 sm:text-sm">Actividad reciente</h3>
              <span className="text-[10px] font-semibold text-emerald-600">Ahora</span>
            </div>
            <Activity icon={<CalendarDays />} title="Reserva creada" detail="Masaje relajante · 5:00 PM" />
            <Activity icon={<Users />} title="Cliente registrado" detail="Felipe Castaño" />
            <Activity icon={<Bell />} title="Recordatorio programado" detail="24 h antes por WhatsApp" />
            <Activity icon={<MessageCircle />} title="Confirmación preparada" detail="WhatsApp Business" />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-[0_5px_16px_rgba(15,23,42,.04)] sm:p-4">
            <div className="mb-2.5 flex items-center justify-between">
              <h3 className="text-[13px] font-black text-slate-900 sm:text-sm">Integraciones</h3>
              <span className="text-[10px] font-semibold text-slate-400">4 conectadas</span>
            </div>
            <IntegrationRow logo="whatsapp" title="WhatsApp Business" />
            <IntegrationRow logo="calendar" title="Google Calendar" />
            <IntegrationRow logo="wompi" title="Wompi" />
            <IntegrationRow logo="crm" title="Ignite CRM" />
          </div>
        </aside>
      </div>
    </section>
  )
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_4px_12px_rgba(15,23,42,.03)]">
      <div className="mb-1.5 text-slate-400 [&>svg]:size-3.5">{icon}</div>
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <strong className="mt-0.5 block text-[17px] tracking-tight text-slate-950 sm:text-lg">{value}</strong>
    </div>
  )
}

function Activity({ icon, title, detail }: { icon: ReactNode; title: string; detail: string }) {
  return (
    <div className="flex gap-2.5 border-t border-slate-100 py-2.5 first:border-0 first:pt-0">
      <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-500 [&>svg]:size-3.5">{icon}</div>
      <div className="min-w-0">
        <p className="text-[11px] font-extrabold text-slate-800">{title}</p>
        <p className="mt-0.5 truncate text-[10px] text-slate-500">{detail}</p>
      </div>
      <span className="ml-auto mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500" />
    </div>
  )
}

function IntegrationRow({ logo, title }: { logo: 'whatsapp' | 'calendar' | 'wompi' | 'crm'; title: string }) {
  return (
    <div className="flex items-center gap-2.5 border-t border-slate-100 py-2 first:border-0">
      <IntegrationLogo name={logo} size="sm" />
      <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-slate-700">{title}</span>
      <span className="text-[10px] font-semibold text-emerald-600">Conectado</span>
    </div>
  )
}

function TimeRow({ time }: { time: string }) {
  return <div className="flex items-center gap-1 py-2"><Clock3 className="size-3" />{time}</div>
}
