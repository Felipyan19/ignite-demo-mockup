import { ArrowRight, Bot, CheckCircle2, Clock3 } from 'lucide-react'
import { IntegrationLogo } from './IntegrationLogo'

export type Message = {
  id: number
  role: 'assistant' | 'user'
  text?: string
  kind?: 'text' | 'plans'
}

const plans = [
  ['Masaje relajante', '60 min', '$120.000', 'Para descansar, liberar tensión y desconectarte un rato.', true],
  ['Ritual en pareja', '90 min', '$210.000', 'Una experiencia tranquila para compartir un momento especial.', false],
  ['Jacuzzi + masaje', '120 min', '$280.000', 'Una experiencia más completa que combina relajación y tiempo en pareja.', false],
] as const

export function MessageBubble({ message }: { message: Message }) {
  if (message.kind === 'plans') return <PlanCatalog />

  return (
    <div className={`mb-2.5 flex items-end gap-2 animate-message-in ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.role === 'assistant' && <AssistantAvatar />}
      <div className={`max-w-[84%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-5 shadow-sm ${message.role === 'user' ? 'rounded-br-md bg-gradient-to-br from-[#7C3AED] to-[#5B2EFF] text-white' : 'rounded-bl-md border border-slate-200 bg-white text-slate-800'}`}>
        {message.text}
      </div>
    </div>
  )
}

export function AssistantAvatar() {
  return <div className="mb-1 grid size-7 shrink-0 place-items-center rounded-full bg-slate-900 text-white"><Bot className="size-3.5" /></div>
}

export function TypingIndicator() {
  return (
    <div className="mb-2.5 flex items-end gap-2 animate-in-up">
      <AssistantAvatar />
      <div className="flex h-9 items-center gap-1 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3.5 shadow-sm" aria-label="Harmony está escribiendo">
        <span className="size-1.5 animate-pulse rounded-full bg-slate-400" />
        <span className="size-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:120ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:240ms]" />
      </div>
    </div>
  )
}

export function ResultCard({ onOpenBackoffice }: { onOpenBackoffice: () => void }) {
  return (
    <div className="mt-3.5 animate-success-pop rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-[0_8px_20px_rgba(15,23,42,.05)]">
      <div className="flex items-center gap-2 text-emerald-700"><CheckCircle2 className="size-5" /><span className="text-[13px] font-black sm:text-sm">Reserva confirmada</span></div>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
        <Detail label="Servicio" value="Masaje relajante" /><Detail label="Hora" value="5:00 PM" />
        <Detail label="Fecha" value="Mañana" /><Detail label="Total" value="$120.000 COP" />
      </div>
      <div className="mt-3.5 flex flex-wrap items-center gap-2 rounded-xl bg-white/80 p-2.5 text-[10px] leading-4 text-slate-600 sm:text-[11px]">
        <IntegrationLogo name="calendar" size="sm" /><IntegrationLogo name="whatsapp" size="sm" /><IntegrationLogo name="bold" size="sm" />
        <span className="sm:ml-1">Calendar, WhatsApp y Bold coordinados en esta simulación.</span>
      </div>
      <button onClick={onOpenBackoffice} className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#5B2EFF] px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_8px_20px_rgba(91,46,255,.20)] transition duration-150 hover:-translate-y-px hover:bg-[#4f24eb] focus:outline-none focus:ring-2 focus:ring-violet-300 active:translate-y-0">
        Ver qué pasó por dentro <ArrowRight className="size-4" />
      </button>
    </div>
  )
}

function PlanCatalog() {
  return (
    <div className="mb-2.5 flex items-end gap-2 animate-message-in">
      <AssistantAvatar />
      <div className="w-full max-w-[88%] overflow-hidden rounded-2xl rounded-bl-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-3.5 py-2.5">
          <div className="flex items-center justify-between gap-3"><p className="text-[12px] font-extrabold text-slate-900">Planes y servicios</p><span className="text-[10px] font-semibold text-slate-400">Harmony Spa</span></div>
          <p className="mt-0.5 text-[10px] leading-4 text-slate-500">Puedes preguntarme qué incluye cada opción o pedirme una recomendación.</p>
        </div>
        <div className="divide-y divide-slate-100">
          {plans.map(([name, duration, price, description, featured]) => (
            <div key={name} className={`px-3.5 py-2.5 ${featured ? 'bg-violet-50/55' : 'bg-white'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0"><div className="flex flex-wrap items-center gap-1.5"><strong className="text-[11px] text-slate-900">{name}</strong>{featured && <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-bold text-violet-700">Popular</span>}</div><p className="mt-1 text-[10px] leading-4 text-slate-500">{description}</p></div>
                <strong className="shrink-0 text-[11px] text-slate-900">{price}</strong>
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-[9px] font-semibold text-slate-400"><Clock3 className="size-3" /> {duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-0.5 font-bold text-slate-800">{value}</p></div>
}
