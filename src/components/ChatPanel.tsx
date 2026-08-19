import { ArrowRight, Bot, CheckCircle2, ChevronRight, Send, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { demoReservation, type Reservation } from '../data/demoData'
import { AutomationTrace, type AutomationStep } from './AutomationTrace'
import { IntegrationLogo } from './IntegrationLogo'

type Props = {
  compact: boolean
  onReservationCreated: (reservation: Reservation) => void
  onOpenBackoffice: () => void
}

type Message = { id: number; role: 'assistant' | 'user'; text: string }

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const automationPlan: AutomationStep[] = [
  { id: 'calendar-check', title: 'Disponibilidad consultada', detail: 'Google Calendar · agenda Harmony Spa', logo: 'calendar' },
  { id: 'crm-customer', title: 'Cliente registrado', detail: 'Ignite CRM · Felipe Castaño', logo: 'crm' },
  { id: 'calendar-event', title: 'Evento creado', detail: 'Google Calendar · mañana 5:00 PM', logo: 'calendar' },
  { id: 'whatsapp', title: 'Confirmación preparada', detail: 'WhatsApp Business · mensaje automático', logo: 'whatsapp' },
  { id: 'payment', title: 'Cobro listo', detail: 'Wompi · anticipo opcional generado', logo: 'wompi' },
]

export function ChatPanel({ compact, onReservationCreated, onOpenBackoffice }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'assistant', text: '¡Hola! Soy el asistente virtual de Harmony Spa 💜\n¿En qué puedo ayudarte hoy?' },
  ])
  const [step, setStep] = useState(0)
  const [automationSteps, setAutomationSteps] = useState<AutomationStep[]>([])
  const [automating, setAutomating] = useState(false)
  const [done, setDone] = useState(false)
  const [input, setInput] = useState('')
  const chatScrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const container = chatScrollRef.current
      if (!container) return
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    })

    return () => cancelAnimationFrame(frame)
  }, [messages, automationSteps, done])

  const append = (role: Message['role'], text: string) => setMessages((current) => [...current, { id: Date.now() + Math.random(), role, text }])

  const continueFlow = async (choice: string) => {
    if (automating || done) return
    append('user', choice)
    setInput('')
    await wait(450)

    if (step === 0) {
      append('assistant', 'Claro. Para esta demo encontré el servicio “Masaje relajante” por $120.000. ¿Quieres reservarlo para mañana?')
      setStep(1)
      return
    }
    if (step === 1) {
      append('assistant', 'Perfecto. Consulté el calendario del negocio y tengo disponibilidad a las 3:00 PM, 5:00 PM y 7:00 PM.')
      setStep(2)
      return
    }
    if (step === 2) {
      append('assistant', 'Tengo listo: Masaje relajante · mañana · 5:00 PM. ¿Confirmo la reserva?')
      setStep(3)
      return
    }
    if (step === 3) {
      await runAutomation()
    }
  }

  const runAutomation = async () => {
    setAutomating(true)
    for (const item of automationPlan) {
      await wait(520)
      setAutomationSteps((current) => [...current, item])
    }
    onReservationCreated(demoReservation)
    append('assistant', '¡Listo! Tu reserva quedó confirmada ✅')
    setAutomating(false)
    setDone(true)
  }

  const submit = () => {
    const text = input.trim()
    if (!text) return
    continueFlow(text)
  }

  const quickActions = step === 0
    ? ['Quiero reservar un masaje']
    : step === 1
      ? ['Sí, para mañana']
      : step === 2
        ? ['5:00 PM']
        : step === 3
          ? ['Sí, confirmar']
          : []

  return (
    <section className={`flex h-[680px] flex-col overflow-hidden bg-[#f7f7fa] transition-all duration-500 ${compact ? 'rounded-l-[28px]' : 'rounded-[28px]'}`}>
      <div className="flex items-center gap-3 border-b border-slate-200/80 bg-white px-4 py-3.5 sm:px-5">
        <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-slate-950 to-slate-700 text-white shadow-sm"><Sparkles className="size-4.5" /></div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-sm font-extrabold text-slate-900">Harmony Spa</h2>
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-semibold text-emerald-600">En línea</span>
          </div>
          <p className="mt-0.5 text-[11px] text-slate-500">Atendido por Ignite AI</p>
        </div>
        <div className="rounded-xl border border-violet-100 bg-violet-50 px-2.5 py-1.5 text-[10px] font-bold text-violet-700">DEMO</div>
      </div>

      <div ref={chatScrollRef} className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-3 py-5 sm:px-5">
        <div className="mx-auto max-w-[560px]">
          {messages.map((message) => (
            <div key={message.id} className={`mb-3 flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && <div className="mb-1 grid size-7 shrink-0 place-items-center rounded-full bg-slate-900 text-white"><Bot className="size-3.5" /></div>}
              <div className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-5 shadow-sm ${message.role === 'user' ? 'rounded-br-md bg-gradient-to-br from-[#7C3AED] to-[#5B2EFF] text-white' : 'rounded-bl-md border border-slate-200 bg-white text-slate-800'}`}>
                {message.text}
              </div>
            </div>
          ))}

          <AutomationTrace steps={automationSteps} active={automating} />

          {done && (
            <div className="mx-2 mt-4 animate-in-up rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700"><CheckCircle2 className="size-5" /><span className="text-sm font-black">Reserva confirmada</span></div>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <Detail label="Servicio" value="Masaje relajante" />
                <Detail label="Hora" value="5:00 PM" />
                <Detail label="Fecha" value="Mañana" />
                <Detail label="Total" value="$120.000 COP" />
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/80 p-2.5 text-[11px] text-slate-600">
                <IntegrationLogo name="calendar" size="sm" />
                <IntegrationLogo name="whatsapp" size="sm" />
                <IntegrationLogo name="wompi" size="sm" />
                <span className="ml-1">3 herramientas sincronizadas en esta simulación.</span>
              </div>
              <button onClick={onOpenBackoffice} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B2EFF] px-4 py-3 text-xs font-extrabold text-white shadow-[0_10px_25px_rgba(91,46,255,.25)] transition hover:bg-[#4f24eb]">
                Ver qué pasó por dentro <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {!done && quickActions.length > 0 && (
        <div className="border-t border-slate-200/80 bg-white px-3 py-3 sm:px-5">
          <div className="mx-auto flex max-w-[560px] flex-wrap gap-2">
            {quickActions.map((action) => (
              <button key={action} onClick={() => continueFlow(action)} disabled={automating} className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-2 text-xs font-bold text-violet-700 transition hover:border-violet-300 hover:bg-violet-100 disabled:opacity-50">
                {action}<ChevronRight className="size-3.5" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-slate-200/80 bg-white px-3 py-3 sm:px-5">
        <div className="mx-auto flex max-w-[560px] items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
          <input value={input} onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && submit()} disabled={automating || done} placeholder={done ? 'La demo terminó. Abre el backoffice.' : 'Escribe un mensaje...'} className="min-w-0 flex-1 bg-transparent px-1 py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed" />
          <button onClick={submit} disabled={!input.trim() || automating || done} className="grid size-9 place-items-center rounded-xl bg-[#5B2EFF] text-white transition hover:bg-[#4f24eb] disabled:bg-slate-200 disabled:text-slate-400"><Send className="size-4" /></button>
        </div>
      </div>
    </section>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-0.5 font-bold text-slate-800">{value}</p></div>
}
