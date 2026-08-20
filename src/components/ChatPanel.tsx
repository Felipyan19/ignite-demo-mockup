import { ChevronRight, Send, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { demoReservation, type Reservation } from '../data/demoData'
import type { JourneyContext } from './AutomationJourney'
import { MessageBubble, ResultCard, TypingIndicator, type Message } from './ChatContent'

type Props = {
  compact: boolean
  onReservationCreated: (reservation: Reservation) => void
  onOpenBackoffice: () => void
  onJourneyChange: (activeStep: number, complete: boolean, context: JourneyContext) => void
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function ChatPanel({ compact, onReservationCreated, onOpenBackoffice, onJourneyChange }: Props) {
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    role: 'assistant',
    kind: 'text',
    text: 'Hola 👋 Soy el asistente de Harmony Spa.\nPuedo ayudarte con nuestros planes, servicios o con una reserva. ¿Qué te gustaría consultar?',
  }])
  const [step, setStep] = useState(0)
  const [automating, setAutomating] = useState(false)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)
  const [input, setInput] = useState('')
  const chatScrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const container = chatScrollRef.current
      if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(frame)
  }, [messages, typing, done])

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
    updateJourneyBeforeReply(step)
    setTyping(true)
    await wait(step === 2 ? 820 : 620)

    if (step === 0) {
      appendText('assistant', 'Claro 😊 Te cuento algunas de las experiencias que tenemos en Harmony. Si me dices qué estás buscando, también puedo ayudarte a elegir.')
      appendPlans()
      onJourneyChange(0, false, { title: 'Información mostrada', detail: 'Planes y servicios de Harmony disponibles en la conversación', tool: 'knowledge' })
      finishReply(1)
      return
    }

    if (step === 1) {
      appendText('assistant', 'Claro. Es una muy buena opción si buscas relajarte y desconectarte un rato. Tiene una duración aproximada de 60 minutos y un valor de $120.000.\n\n¿Para qué día te gustaría reservar?')
      onJourneyChange(0, false, { title: 'Servicio seleccionado', detail: 'Masaje relajante · 60 min · $120.000', tool: 'knowledge' })
      finishReply(2)
      return
    }

    if (step === 2) {
      appendText('assistant', 'Perfecto. Para mañana tengo disponibilidad a las 3:00 PM, 5:00 PM y 7:00 PM. ¿Cuál horario te queda mejor?')
      onJourneyChange(1, false, { title: 'Disponibilidad validada', detail: 'Google Calendar · 3 horarios disponibles', tool: 'calendar' })
      finishReply(3)
      return
    }

    if (step === 3) {
      appendText('assistant', 'Perfecto, puedo apartarte las 5:00 PM. Para registrar la reserva, ¿me compartes tu nombre?')
      finishReply(4)
      return
    }

    if (step === 4) {
      appendText('assistant', 'Gracias, Felipe. Te dejo todo confirmado antes de continuar:\n\nMasaje relajante · mañana · 5:00 PM\nValor: $120.000\n\nAl confirmar, registraré la reserva y dejaré preparado el anticipo con Bold. ¿Está correcto?')
      finishReply(5)
      return
    }

    setTyping(false)
    await runAutomation()
  }

  const updateJourneyBeforeReply = (currentStep: number) => {
    if (currentStep === 0) onJourneyChange(0, false, { title: 'Consultando información de Harmony', detail: 'Planes y servicios configurados por el negocio', tool: 'knowledge' })
    if (currentStep === 2) onJourneyChange(1, false, { title: 'Consultando disponibilidad', detail: 'Google Calendar · agenda de Harmony Spa', tool: 'calendar' })
    if (currentStep === 3) onJourneyChange(1, false, { title: 'Horario seleccionado', detail: 'Google Calendar · mañana a las 5:00 PM', tool: 'calendar' })
    if (currentStep === 4) onJourneyChange(1, false, { title: 'Datos listos para registrar', detail: 'Cliente, servicio y horario validados', tool: 'calendar' })
    if (currentStep === 5) onJourneyChange(2, false, { title: 'Preparando el pago', detail: 'Bold · anticipo opcional listo para generar', tool: 'bold' })
  }

  const finishReply = (nextStep: number) => {
    setTyping(false)
    setStep(nextStep)
  }

  const runAutomation = async () => {
    setAutomating(true)
    onJourneyChange(2, false, { title: 'Preparando el pago', detail: 'Bold · anticipo opcional preparado de forma segura', tool: 'bold' })
    await wait(760)

    onJourneyChange(3, false, { title: 'Registrando la operación', detail: 'Backoffice · cliente, reserva y confirmación', tool: 'crm' })
    await wait(900)

    onReservationCreated(demoReservation)
    appendText('assistant', 'Perfecto, Felipe 😊 Tu reserva quedó confirmada para mañana a las 5:00 PM. Dejé preparado el anticipo con Bold y te enviaremos la confirmación por WhatsApp. Si necesitas cambiar el horario, también puedo ayudarte por aquí.')
    onJourneyChange(3, true, { title: 'Operación completada', detail: 'Reserva registrada y confirmación preparada', tool: 'crm' })
    setAutomating(false)
    setDone(true)
  }

  const submit = () => {
    const text = input.trim()
    if (text) continueFlow(text)
  }

  const quickActions = step === 0 ? ['Quiero conocer los planes']
    : step === 1 ? ['Me interesa el masaje relajante']
      : step === 2 ? ['Mañana, por favor']
        : step === 3 ? ['5:00 PM']
          : step === 4 ? ['Felipe Castaño']
            : step === 5 ? ['Sí, por favor'] : []

  return (
    <section className={`flex h-[620px] flex-col overflow-hidden bg-[#f7f7fa] transition-all duration-300 sm:h-[650px] xl:h-[670px] ${compact ? 'rounded-t-[24px] lg:rounded-l-[24px] lg:rounded-tr-none lg:rounded-br-none' : 'rounded-[24px]'}`}>
      <div className="flex items-center gap-3 border-b border-slate-200/80 bg-white px-4 py-3 sm:px-5">
        <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-slate-950 to-slate-700 text-white shadow-sm"><Sparkles className="size-4" /></div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2"><h2 className="truncate text-[13px] font-extrabold text-slate-900 sm:text-sm">Harmony Spa</h2><span className="size-1.5 rounded-full bg-emerald-500" /><span className="text-[10px] font-semibold text-emerald-600">En línea</span></div>
          <p className="mt-0.5 text-[10px] text-slate-500 sm:text-[11px]">Recepción virtual · Ignite AI</p>
        </div>
      </div>

      <div ref={chatScrollRef} className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-4 py-3 sm:px-5">
        <div className="mx-auto max-w-[540px]">
          {messages.map((message) => <MessageBubble key={message.id} message={message} />)}
          {typing && <TypingIndicator />}
          {done && <ResultCard onOpenBackoffice={onOpenBackoffice} />}
        </div>
      </div>

      {!done && quickActions.length > 0 && (
        <div className="border-t border-slate-200/80 bg-white px-4 py-2.5 sm:px-5">
          <div className="mx-auto flex max-w-[540px] flex-wrap gap-2">
            {quickActions.map((action) => (
              <button key={action} onClick={() => continueFlow(action)} disabled={automating || typing} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-2 text-xs font-bold text-violet-700 transition duration-150 hover:-translate-y-px hover:border-violet-300 hover:bg-violet-100 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45">
                {action}<ChevronRight className="size-3.5" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-slate-200/80 bg-white px-4 py-3 sm:px-5">
        <div className="mx-auto flex max-w-[540px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 transition duration-150 focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100">
          <input value={input} onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && submit()} disabled={automating || typing || done} placeholder={done ? 'La demo terminó. Abre el backoffice.' : typing ? 'Harmony está respondiendo…' : 'Escribe un mensaje...'} className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[13px] text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed sm:text-sm" />
          <button onClick={submit} disabled={!input.trim() || automating || typing || done} className="grid size-10 place-items-center rounded-xl bg-[#5B2EFF] text-white transition duration-150 hover:scale-[1.03] hover:bg-[#4f24eb] active:scale-100 disabled:bg-slate-200 disabled:text-slate-400" aria-label="Enviar mensaje"><Send className="size-4" /></button>
        </div>
      </div>
    </section>
  )
}
