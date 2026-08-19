import type { ReactNode } from 'react'
import { Bell, CalendarDays, Clock3, CreditCard, ExternalLink, MessageCircle, Users, X } from 'lucide-react'
import { existingReservations, type Reservation } from '../data/demoData'
import { IntegrationLogo } from './IntegrationLogo'

export function BackofficePanel({ reservation, onClose }: { reservation: Reservation; onClose: () => void }) {
  const rows = [reservation, ...existingReservations]

  return (
    <section className="relative min-h-[680px] overflow-y-auto rounded-r-[28px] bg-[#fbfbfd] animate-panel-in">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2"><h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">Backoffice</h2><span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black tracking-wide text-emerald-600">● EN VIVO</span></div>
            <p className="mt-1 text-[11px] text-slate-500">Así se reflejaría la operación automáticamente.</p>
          </div>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"><X className="size-4" /></button>
        </div>
        <nav className="mt-4 flex gap-5 overflow-x-auto text-xs font-bold text-slate-500">
          <span>Resumen</span><span className="border-b-2 border-violet-600 pb-3 text-violet-700">Reservas</span><span>Clientes</span><span>Pagos</span><span>Integraciones</span>
        </nav>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_290px]">
        <div className="min-w-0 space-y-4">
          <div className="grid grid-cols-3 gap-2.5">
            <Metric icon={<CalendarDays />} label="Reservas hoy" value="5" delta="+25%" />
            <Metric icon={<Users />} label="Clientes" value="28" delta="+1 ahora" />
            <Metric icon={<CreditCard />} label="Cobros" value="$780K" delta="+18%" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3"><h3 className="text-sm font-black text-slate-900">Reservas de hoy</h3><span className="text-[10px] font-bold text-violet-600">5 reservas</span></div>
            <div className="space-y-2.5">
              {rows.map((row, index) => (
                <div key={row.id} className={`grid gap-3 rounded-xl border p-3 transition sm:grid-cols-[1.4fr_.9fr_auto] sm:items-center ${index === 0 ? 'border-emerald-300 bg-emerald-50/70 ring-4 ring-emerald-50 animate-highlight' : 'border-slate-200 bg-white'}`}>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">{index === 0 && <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-white">Nueva</span>}<strong className="truncate text-xs text-slate-900">{row.customer}</strong></div>
                    <p className="mt-1 text-[11px] text-slate-500">{row.service}</p>
                  </div>
                  <div className="text-[11px] text-slate-600"><p className="font-bold text-slate-800">{row.time}</p><p className="mt-1">{row.price}</p></div>
                  <div className="flex items-center gap-2"><span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-extrabold text-emerald-600">Confirmada</span><IntegrationLogo name="whatsapp" size="sm" /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between"><div className="flex items-center gap-2"><IntegrationLogo name="calendar" size="sm" /><div><h3 className="text-sm font-black text-slate-900">Calendario conectado</h3><p className="text-[10px] text-slate-500">Google Calendar</p></div></div><button className="text-[10px] font-bold text-violet-600">Ver calendario</button></div>
            <div className="mt-4 grid grid-cols-[46px_1fr] gap-x-2 text-[10px] text-slate-400">
              <TimeRow time="4 PM" />
              <div className="my-1 rounded-lg border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2 text-emerald-800"><strong>5:00 PM · Felipe Castaño</strong><br /><span>Masaje relajante</span></div>
              <TimeRow time="5 PM" />
              <div className="my-1 rounded-lg border-l-4 border-violet-500 bg-violet-50 px-3 py-2 text-violet-800"><strong>6:30 PM · Reserva pendiente</strong><br /><span>Masaje en pareja</span></div>
              <TimeRow time="6 PM" />
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-black text-slate-900">Actividad reciente</h3><span className="text-[10px] font-bold text-violet-600">Ahora</span></div>
            <Activity icon={<CalendarDays />} title="Reserva creada" detail="Masaje relajante · 5:00 PM" />
            <Activity icon={<Users />} title="Cliente registrado" detail="Felipe Castaño" />
            <Activity icon={<Bell />} title="Recordatorio programado" detail="24 h antes por WhatsApp" />
            <Activity icon={<MessageCircle />} title="Confirmación preparada" detail="WhatsApp Business" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-black text-slate-900">Integraciones activas</h3><span className="text-[10px] font-bold text-emerald-600">4 conectadas</span></div>
            <IntegrationRow logo="whatsapp" title="WhatsApp Business" />
            <IntegrationRow logo="calendar" title="Google Calendar" />
            <IntegrationRow logo="wompi" title="Wompi" />
            <IntegrationRow logo="crm" title="Ignite CRM" />
          </div>

          <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-4">
            <p className="text-xs font-black text-slate-900">El valor no es el chatbot.</p>
            <p className="mt-1.5 text-[11px] leading-5 text-slate-600">Es que cada conversación pueda ejecutar procesos, mover datos y actualizar las herramientas del negocio.</p>
            <a href="https://igniteapps.co/" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-extrabold text-violet-700">Quiero esto en mi negocio <ExternalLink className="size-3" /></a>
          </div>
        </aside>
      </div>
    </section>
  )
}

function Metric({ icon, label, value, delta }: { icon: ReactNode; label: string; value: string; delta: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"><div className="mb-2 flex size-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600 [&>svg]:size-3.5">{icon}</div><p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{label}</p><div className="mt-1 flex items-end justify-between gap-1"><strong className="text-lg tracking-tight text-slate-950">{value}</strong><span className="text-[8px] font-bold text-emerald-600">{delta}</span></div></div>
}

function Activity({ icon, title, detail }: { icon: ReactNode; title: string; detail: string }) {
  return <div className="flex gap-2.5 border-t border-slate-100 py-3 first:border-0 first:pt-0"><div className="grid size-8 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-500 [&>svg]:size-3.5">{icon}</div><div className="min-w-0"><p className="text-[11px] font-extrabold text-slate-800">{title}</p><p className="mt-0.5 truncate text-[10px] text-slate-500">{detail}</p></div><span className="ml-auto mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500" /></div>
}

function IntegrationRow({ logo, title }: { logo: 'whatsapp' | 'calendar' | 'wompi' | 'crm'; title: string }) {
  return <div className="flex items-center gap-2.5 border-t border-slate-100 py-2.5 first:border-0"><IntegrationLogo name={logo} size="sm" /><span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-slate-700">{title}</span><span className="text-[9px] font-extrabold text-emerald-600">Conectado</span></div>
}

function TimeRow({ time }: { time: string }) {
  return <div className="flex items-center gap-1 py-2"><Clock3 className="size-3" />{time}</div>
}
