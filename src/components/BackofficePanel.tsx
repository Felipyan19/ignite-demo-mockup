import type { ReactNode } from 'react'
import { ArrowLeft, Bell, Bot, CheckCircle2, ChevronRight, Clock3, Home, Inbox, MessageCircle, ShieldCheck, Users } from 'lucide-react'
import type { Reservation } from '../data/demoData'
import { HarmonyBrandIcon } from './HarmonyBrandIcon'

const FOREST = '#33513a'
const WARNING = '#c98a1f'

const recentConversations = [
  {
    name: 'Valentina Rojas',
    message: 'Para este sábado. Quisiera decoración con pétalos y algo especial. ¿Todavía tienen disponibilidad?',
    time: '12:36',
    unread: 2,
    status: 'Pendiente' as const,
  },
  {
    name: 'Catalina Méndez',
    message: 'Claro. Incluye el espacio privado y la experiencia seleccionada. Si quieres, también puedo ayudarte.',
    time: '12:11',
    unread: 0,
    status: 'Abierta' as const,
  },
  {
    name: 'Andrés Castillo',
    message: 'Buenas, ¿atienden hoy en la noche?',
    time: '11:42',
    unread: 1,
    status: 'Abierta' as const,
  },
] as const

export function BackofficePanel({ reservation, onClose }: { reservation: Reservation; onClose: () => void }) {
  return (
    <section className="harmony-backoffice h-[620px] overflow-hidden bg-[#f3f2ee] text-[#20241f] animate-panel-in sm:h-[650px] xl:h-[670px]">
      <div className="flex h-full min-w-0">
        <aside className="hidden w-[190px] shrink-0 flex-col bg-[#203a28] text-white lg:flex">
          <div className="flex h-[58px] items-center gap-2.5 border-b border-white/[0.07] px-3.5">
            <HarmonyBrandIcon size={35} className="shrink-0" />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[13px] font-bold">Harmony</p>
              <p className="mt-1 text-[11px] text-white/45">Backoffice</p>
            </div>
          </div>

          <nav className="px-2 py-3.5" aria-label="Navegación simulada del backoffice">
            <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">Principal</p>
            <div className="space-y-1">
              <SidebarItem icon={<Home />} label="Inicio" active />
              <SidebarItem icon={<Inbox />} label="Conversaciones" badge={3} />
              <SidebarItem icon={<Users />} label="Clientes" />
              <SidebarItem icon={<ShieldCheck />} label="Usuarios" />
            </div>
          </nav>

          <div className="mt-auto border-t border-white/[0.07] p-2.5">
            <div className="mb-2 flex items-center gap-2 rounded-lg px-2 py-2 text-white/75">
              <span className="size-2 rounded-full bg-[#5c8c68] shadow-[0_0_0_4px_rgba(92,140,104,.10)]" />
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-white/90">Harmony IA</p>
                <p className="mt-0.5 text-[10px] text-white/40">Agente conectado</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.035] px-2 py-2">
              <div className="grid size-7 place-items-center rounded-md bg-white/[0.08] text-[10px] font-bold">AD</div>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold text-white/90">Admin de prueba</p>
                <p className="mt-0.5 text-[9px] text-white/40">Administrador</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[58px] shrink-0 items-center justify-between border-b border-[#20241f]/15 bg-white px-4 sm:px-5">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="grid size-8 shrink-0 place-items-center rounded-md text-[#20241f]/45 transition hover:bg-[#20241f]/5 hover:text-[#20241f] lg:hidden"
                  aria-label="Volver al chat"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <div className="min-w-0">
                  <h2 className="truncate text-[15px] font-bold tracking-[-0.02em] text-[#20241f]">Inicio</h2>
                  <p className="mt-0.5 hidden truncate text-[10px] text-[#20241f]/55 sm:block">Resumen operativo de la atención en Harmony</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="hidden h-8 items-center gap-1.5 rounded-md border border-[#20241f]/10 bg-white px-2.5 text-[10px] font-semibold text-[#20241f]/60 transition hover:bg-[#20241f]/5 hover:text-[#20241f] lg:inline-flex"
              >
                <ArrowLeft className="size-3.5" /> Volver al chat
              </button>
              <div className="relative grid size-8 place-items-center rounded-md text-[#20241f]/45">
                <Bell className="size-4" />
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#795830] ring-2 ring-white" />
              </div>
              <div className="grid size-8 place-items-center rounded-full bg-[#33513a] text-[10px] font-bold text-white">AD</div>
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
              <MetricCard icon={<MessageCircle />} label="Conversaciones" value="5" detail="2 abiertas ahora" />
              <MetricCard icon={<Inbox />} label="Sin leer" value="3" detail="Requieren seguimiento" tone="warning" />
              <MetricCard icon={<Clock3 />} label="Pendientes" value="1" detail="Esperando atención" tone="warning" />
              <MetricCard icon={<Users />} label="Clientes" value="5" detail="Registrados en Harmony" />
            </div>

            <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div className="overflow-hidden rounded-lg border border-[#20241f]/15 bg-white">
                <div className="flex items-center justify-between gap-3 border-b border-[#20241f]/10 px-4 py-3">
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-bold">Conversaciones recientes</h3>
                    <p className="mt-0.5 truncate text-[10px] text-[#20241f]/45">Lo último que está ocurriendo en la atención de Harmony.</p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-1 text-[10px] font-semibold text-[#203a28] sm:inline-flex">Ver todas <ChevronRight className="size-3.5" /></span>
                </div>

                <div>
                  <ConversationRow
                    name={reservation.customer}
                    message={`Reserva confirmada · ${reservation.service} · ${reservation.date} · ${reservation.time}`}
                    time="Ahora"
                    unread={0}
                    status="Confirmada"
                    highlight
                  />
                  {recentConversations.map((conversation) => (
                    <ConversationRow key={conversation.name} {...conversation} />
                  ))}
                </div>
              </div>

              <aside className="space-y-3">
                <div className="rounded-lg border border-[#20241f]/15 bg-white p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-[13px] font-bold">Estado de atención</h3>
                      <p className="mt-0.5 text-[10px] text-[#20241f]/45">Carga actual del canal de atención.</p>
                    </div>
                    <div className="grid size-8 place-items-center rounded-md bg-[#33513a]/10 text-[#33513a]"><Bot className="size-4" /></div>
                  </div>

                  <div className="mt-3 flex items-center gap-2.5 rounded-md bg-[#20241f]/[0.045] px-3 py-2.5">
                    <span className="size-2 rounded-full bg-[#33513a]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold">Harmony IA</p>
                      <p className="mt-0.5 text-[9px] text-[#20241f]/45">1 conversación asignada</p>
                    </div>
                    <span className="text-[9px] font-semibold text-[#33513a]">Conectado</span>
                  </div>

                  <div className="mt-3 space-y-2.5">
                    <LoadBar label="Abiertas" value="2" percent={50} />
                    <LoadBar label="Pendientes" value="1" percent={25} tone="warning" />
                    <LoadBar label="Resueltas" value="2" percent={50} tone="muted" />
                  </div>
                </div>

                <div className="rounded-lg border border-[#20241f]/15 bg-white p-3.5">
                  <h3 className="text-[13px] font-bold">Accesos rápidos</h3>
                  <div className="mt-2">
                    <QuickAccess icon={<Inbox />} label="Ir a conversaciones" />
                    <QuickAccess icon={<Users />} label="Consultar clientes" />
                    <QuickAccess icon={<ShieldCheck />} label="Administrar usuarios" />
                  </div>
                </div>
              </aside>
            </div>

            <div className="mt-3 rounded-lg border border-[#20241f]/15 bg-white p-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-[13px] font-bold">Temas frecuentes</h3>
                  <p className="mt-0.5 text-[10px] text-[#20241f]/45">Etiquetas más presentes en las conversaciones actuales.</p>
                </div>
                <span className="hidden text-[9px] text-[#20241f]/35 sm:block">Actualizado con la bandeja actual</span>
              </div>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
                <Topic label="Reserva" count={2} percent={80} highlight />
                <Topic label="Plan romántico" count={2} percent={70} />
                <Topic label="Disponibilidad" count={2} percent={64} />
                <Topic label="Cliente recurrente" count={1} percent={38} />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#33513a]/20 bg-[#33513a]/[0.045] px-3 py-2.5 text-[10px] text-[#203a28]">
              <CheckCircle2 className="size-4 shrink-0" />
              <span><strong>La reserva de {reservation.customer}</strong> ya se refleja en esta vista simulada, igual que una operación real aparecería en Harmony.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SidebarItem({ icon, label, active = false, badge = 0 }: { icon: ReactNode; label: string; active?: boolean; badge?: number }) {
  return (
    <div className={`relative flex h-9 items-center gap-2.5 rounded-md px-2.5 text-[11px] font-medium ${active ? 'bg-white/[0.10] text-white' : 'text-white/60'}`}>
      {active ? <span className="absolute inset-y-2 left-0 w-0.5 rounded-r-full bg-[#6e9678]" /> : null}
      <span className="[&>svg]:size-4">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {badge > 0 ? <span className="grid min-w-[18px] place-items-center rounded-full bg-[#795830] px-1 py-0.5 text-[9px] font-bold text-white">{badge}</span> : null}
    </div>
  )
}

function MetricCard({ icon, label, value, detail, tone = 'primary' }: { icon: ReactNode; label: string; value: string; detail: string; tone?: 'primary' | 'warning' }) {
  const iconClass = tone === 'warning' ? 'bg-[#c98a1f]/10 text-[#c98a1f]' : 'bg-[#33513a]/10 text-[#33513a]'
  return (
    <div className="rounded-lg border border-[#20241f]/15 bg-white p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className={`grid size-8 place-items-center rounded-md ${iconClass} [&>svg]:size-4`}>{icon}</div>
        <span className="text-[9px] text-[#20241f]/35">Hoy</span>
      </div>
      <p className="mt-2.5 text-[10px] text-[#20241f]/50">{label}</p>
      <strong className="mt-0.5 block text-[14px] tracking-tight text-[#20241f]">{value}</strong>
      <p className="mt-1 text-[9px] text-[#20241f]/35">{detail}</p>
    </div>
  )
}

function ConversationRow({ name, message, time, unread, status, highlight = false }: { name: string; message: string; time: string; unread: number; status: 'Pendiente' | 'Abierta' | 'Confirmada'; highlight?: boolean }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
  const statusClass = status === 'Pendiente'
    ? 'border-[#c98a1f]/25 bg-[#c98a1f]/8 text-[#b47712]'
    : status === 'Confirmada'
      ? 'border-[#33513a]/25 bg-[#33513a]/8 text-[#33513a]'
      : 'border-[#33513a]/20 bg-[#33513a]/5 text-[#33513a]'

  return (
    <div className={`flex items-center gap-3 border-b border-[#20241f]/10 px-4 py-3 last:border-b-0 ${highlight ? 'animate-highlight bg-[#33513a]/[0.035]' : ''}`}>
      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#2d5a3b] text-[10px] font-bold text-white">{initials}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[11px] font-bold text-[#20241f]">{name}</p>
          {unread > 0 ? <span className="grid min-w-[17px] place-items-center rounded-full bg-[#795830] px-1 py-0.5 text-[8px] font-bold text-white">{unread}</span> : null}
          {highlight ? <span className="rounded-full bg-[#33513a] px-1.5 py-0.5 text-[8px] font-bold text-white">Nueva</span> : null}
        </div>
        <p className="mt-1 truncate text-[9px] text-[#20241f]/42">{message}</p>
      </div>
      <div className="shrink-0 text-right">
        <span className={`inline-flex rounded-full border px-2 py-1 text-[8px] font-medium ${statusClass}`}>{status}</span>
        <p className="mt-1 text-[8px] text-[#20241f]/35">{time}</p>
      </div>
    </div>
  )
}

function LoadBar({ label, value, percent, tone = 'primary' }: { label: string; value: string; percent: number; tone?: 'primary' | 'warning' | 'muted' }) {
  const barColor = tone === 'warning' ? WARNING : tone === 'muted' ? 'rgba(32,36,31,.32)' : FOREST
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[9px] text-[#20241f]/55"><span>{label}</span><strong>{value}</strong></div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#20241f]/8"><div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: barColor }} /></div>
    </div>
  )
}

function QuickAccess({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 border-t border-[#20241f]/8 py-2.5 first:border-t-0">
      <span className="text-[#33513a] [&>svg]:size-4">{icon}</span>
      <span className="min-w-0 flex-1 truncate text-[10px] text-[#20241f]/70">{label}</span>
      <ChevronRight className="size-3.5 text-[#20241f]/25" />
    </div>
  )
}

function Topic({ label, count, percent, highlight = false }: { label: string; count: number; percent: number; highlight?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-[9px]"><span className={highlight ? 'font-semibold text-[#33513a]' : 'text-[#20241f]/60'}>{label}</span><strong className="text-[#20241f]/50">{count}</strong></div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#20241f]/8"><div className="h-full rounded-full bg-[#33513a]" style={{ width: `${percent}%` }} /></div>
    </div>
  )
}
