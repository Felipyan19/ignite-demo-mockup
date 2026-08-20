import { ArrowRight, Bot, CheckCircle2, ChevronRight, Clock3, Send, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { demoReservation, type Reservation } from '../data/demoData'
import { AutomationTrace, type AutomationStep } from './AutomationTrace'
import { IntegrationLogo } from './IntegrationLogo'

type Props = {
  compact: boolean
  onReservationCreated: (reservation: Reservation) => void
  onOpenBackoffice: () => void
}

type Message = {
  id: number
  role: 'assistant' | 'user'
  text?: string
  kind?: 'text' | 'plans'
}

type Plan = {
  name: string
  duration: string
  price: string
  description: string
  featured?: boolean
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const plans: Plan[] = [
  {
    name: 'Masaje relajante',
    duration: '60 min',
    price: '$120.000',
    description: 'Para descansar, liberar tensión y desconectarte un rato.',
    featured: true,
  },
  {
    name: 'Ritual en pareja',
    duration: '90 min',
    price: '$210.000',
    description: 'Una experiencia tranquila para compartir y salir de la rutina.',
  },
  {
    name: 'Jacuzzi + masaje',
    duration: '120 min',
    price: '$280.000',
    description: 'Una opción más completa para una experiencia privada y relajada.',
  },
]

const automationPlan: AutomationStep[] = [
  { id: 'calendar-check', title: 'Disponibilidad consultada', detail: 'Google Calendar · agenda Harmony Spa', logo: 'calendar' },
  { id: 'crm-customer', title: 'Cliente registrado', detail: 'Ignite CRM · Felipe Castaño', logo: 'crm' },
  { id: 'calendar-event', title: 'Evento creado', detail: 'Google Calendar · mañana 5:00 PM', logo: 'calendar' },
  { id: 'whatsapp', title: 'Confirmación preparada', detail: 'WhatsApp Business · mensaje automático', logo: 'whatsapp' },
  { id: 'payment', title: 'Cobro listo', detail: 'Wompi · anticipo opcional generado', logo: 'wompi' },
]

export function ChatPanel({ compact, onReservationCreated, onOpenBackoffice }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      kind: 'text',
      text: 'Hola 👋 Soy el asistente de Harmony Spa.\nPuedo ayudarte con nuestros planes, servicios o con una reserva. ¿Qué te gustaría consultar?',
    },
  ])
  const [step, setStep] = useState(0)
  const [automationSteps, setAutomationSteps] = useState<AutomationStep[]>([])
  const [automating, setAutomating] = useState(false)
  const [typing, setTyping] = useState(false)
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
  }, [messages, automationSteps, typing, done])

  const appendText = (role: Message['role'], text: string) => {
    setMessages((current) => [...current, { id: Date.now() + Math.random(), role, kind: 'text', text }])
  }

  const appendPlans = () => {
    setMessages((current) => [...current, { id: Date.now() + Math.random(), role: 'assistant', kind: 'plans' }])
  }

  const continueFlow = async (choice: string) => {
    if (automating || typing || done) return

    appendText('user', choice)
    setInput('')
    setTyping(true)
    await wait(620)

    if (step === 0) {
      appendText(
        'assistant',
        'Claro, con gusto. Tenemos varias opciones según el tipo de experiencia que busques. Estas son algunas de las más consultadas:',
      )
      appendPlans()
      setTyping(false)
      setStep(1)
      return
    }

    if (step === 1) {
      appendText(
        'assistant',
        'El masaje relajante es una opción muy tranquila para desconectarte un rato. Dura aproximadamente 60 minutos y tiene un valor de $120.000.\n\n¿Para qué día te gustaría reservarlo?',
      )
      setTyping(false)
      setStep(2)
      return
    }

    if (step === 2) {
      appendText(
        'assistant',
        'Claro. Para mañana tengo disponibilidad a las 3:00 PM, 5:00 PM y 7:00 PM. ¿Cuál horario te queda mejor?',
      )
      setTyping(false)
      setStep(3)
      return
    }

    if (step === 3) {
      appendText('assistant', 'Perfecto. Para dejar la reserva registrada, ¿me compartes tu nombre?')
      setTyping(false)
      setStep(4)
      return
    }

    if (step === 4) {
      appendText(
        'assistant',
        'Gracias, Felipe. Te confirmo antes de reservar:\n\nMasaje relajante · mañana · 5:00 PM\nValor: $120.000\n\n¿Está bien así?',
      )
      setTyping(false)
      setStep(5)
      return
    }

    if (step === 5) {
      setTyping(false)
      await runAutomation()
    }
  }

  const runAutomation = async () => {
    setAutomating(true)
    for (const item of automationPlan) {
      await wait(440)
      setAutomationSteps((current) => [...current, item])
    }
    onReservationCreated(demoReservation)
    appendText(
      'assistant',
      'Perfecto, Felipe. Tu reserva quedó confirmada para mañana a las 5:00 PM ✅\nTe enviaremos la confirmación por WhatsApp. Si necesitas cambiar el horario, también puedo ayudarte por aquí.',
    )
    setAutomating(false)
    setDone(true)
  }

  const submit = () => {
    const text = input.trim()
    if (!text) return
    continueFlow(text)
  }

  const quickActions = step === 0
    ? ['Quiero conocer los planes']
    : step === 1
      ? ['Me interesa el masaje relajante']
      : step === 2
        ? ['Mañana, por favor']
        : step === 3
          ? ['5:00 PM']
          : step === 4
            ? ['Felipe Castaño']
            : step === 5
              ? ['Sí, por favor']
              : []

  return (
    <section
      className={`flex h-[620px] flex-col overflow-hidden bg-[#f7f7fa] transition-all duration-300 sm:h-[650px] xl:h-[670px] ${
        compact
          ? 'rounded-t-[24px] lg:rounded-l-[24px] lg:rounded-tr-none lg:rounded-br-none'
          : 'rounded-[24px]'
      }`}
    >
      <div className="flex items-center gap-3 border-b border-slate-200/80 bg-white px-4 py-3 sm:px-5">
        <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-slate-950 to-slate-700 text-white shadow-sm">
          <Sparkles className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-[13px] font-extrabold text-slate-900 sm:text-sm">Harmony Spa</h2>
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-semibold text-emerald-600">En línea</span>
          </div>
          <p className="mt-0.5 text-[10px] text-slate-500 sm:text-[11px]">Recepción virtual · Ignite AI</p>
        </div>
      </div>

      <div ref={chatScrollRef} className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-4 py-4 sm:px-5">
        <div className="mx-auto max-w-[540px]">
          {messages.map((message) => (
            message.kind === 'plans' ? (
              <PlanCatalog key={message.id} />
            ) : (
              <div key={message.id} className={`mb-2.5 flex items-end gap-2 animate-message-in ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && <AssistantAvatar />}
                <div
                  className={`max-w-[84%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-5 shadow-sm ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-gradient-to-br from-[#7C3AED] to-[#5B2EFF] text-white'
                      : 'rounded-bl-md border border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            )
          ))}

          {typing && <TypingIndicator />}

          <AutomationTrace steps={automationSteps} active={automating} />

          {done && (
            <div className="mt-3.5 animate-success-pop rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-[0_8px_20px_rgba(15,23,42,.05)]">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="size-5" />
                <span className="text-[13px] font-black sm:text-sm">Reserva confirmada</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                <Detail label="Servicio" value="Masaje relajante" />
                <Detail label="Hora" value="5:00 PM" />
                <Detail label="Fecha" value="Mañana" />
                <Detail label="Total" value="$120.000 COP" />
              </div>
              <div className="mt-3.5 flex flex-wrap items-center gap-2 rounded-xl bg-white/80 p-2.5 text-[10px] leading-4 text-slate-600 sm:text-[11px]">
                <IntegrationLogo name="calendar" size="sm" />
                <IntegrationLogo name="whatsapp" size="sm" />
                <IntegrationLogo name="wompi" size="sm" />
                <span className="sm:ml-1">3 herramientas sincronizadas en esta simulación.</span>
              </div>
              <button
                onClick={onOpenBackoffice}
                className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#5B2EFF] px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_8px_20px_rgba(91,46,255,.20)] transition duration-150 hover:-translate-y-px hover:bg-[#4f24eb] focus:outline-none focus:ring-2 focus:ring-violet-300 active:translate-y-0"
              >
                Ver qué pasó por dentro <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {!done && quickActions.length > 0 && (
        <div className="border-t border-slate-200/80 bg-white px-4 py-2.5 sm:px-5">
          <div className="mx-auto flex max-w-[540px] flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                key={action}
                onClick={() => continueFlow(action)}
                disabled={automating || typing}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-2 text-xs font-bold text-violet-700 transition duration-150 hover:-translate-y-px hover:border-violet-300 hover:bg-violet-100 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {action}<ChevronRight className="size-3.5" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-slate-200/80 bg-white px-4 py-3 sm:px-5">
        <div className="mx-auto flex max-w-[540px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 transition duration-150 focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
          <input
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && submit()}
            disabled={automating || typing || done}
            placeholder={done ? 'La demo terminó. Abre el backoffice.' : typing ? 'Harmony está respondiendo…' : 'Escribe un mensaje...'}
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[13px] text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed sm:text-sm"
          />
          <button
            onClick={submit}
            disabled={!input.trim() || automating || typing || done}
            className="grid size-10 place-items-center rounded-xl bg-[#5B2EFF] text-white transition duration-150 hover:scale-[1.03] hover:bg-[#4f24eb] active:scale-100 disabled:bg-slate-200 disabled:text-slate-400"
            aria-label="Enviar mensaje"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

function AssistantAvatar() {
  return (
    <div className="mb-1 grid size-7 shrink-0 place-items-center rounded-full bg-slate-900 text-white">
      <Bot className="size-3.5" />
    </div>
  )
}

function TypingIndicator() {
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

function PlanCatalog() {
  return (
    <div className="mb-2.5 flex items-end gap-2 animate-message-in">
      <AssistantAvatar />
      <div className="w-full max-w-[88%] overflow-hidden rounded-2xl rounded-bl-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-3.5 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] font-extrabold text-slate-900">Planes y servicios</p>
            <span className="text-[10px] font-semibold text-slate-400">Harmony Spa</span>
          </div>
          <p className="mt-0.5 text-[10px] leading-4 text-slate-500">Puedes preguntarme qué incluye cada opción o pedirme una recomendación.</p>
        </div>

        <div className="divide-y divide-slate-100">
          {plans.map((plan) => (
            <div key={plan.name} className={`px-3.5 py-2.5 ${plan.featured ? 'bg-violet-50/55' : 'bg-white'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <strong className="text-[11px] text-slate-900">{plan.name}</strong>
                    {plan.featured && <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-bold text-violet-700">Popular</span>}
                  </div>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">{plan.description}</p>
                </div>
                <strong className="shrink-0 text-[11px] text-slate-900">{plan.price}</strong>
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-[9px] font-semibold text-slate-400">
                <Clock3 className="size-3" /> {plan.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 font-bold text-slate-800">{value}</p>
    </div>
  )
}
