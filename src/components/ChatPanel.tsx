import { Leaf, MoreVertical, Phone, Video } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { newReservation, plans, type Reservation } from '../data/demoData'
import { BoldCheckoutModal } from './BoldCheckoutModal'
import { MessageBubble, TypingIndicator, type Message } from './ChatContent'
import { WhatsAppSendIcon } from './icons/WhatsAppSendIcon'
import type { JourneyContext } from './VerticalProgress'

type Plan = (typeof plans)[number]

type Props = {
  onReservationCreated: (reservation: Reservation) => void
  onProgressChange: (activeStep: number, complete: boolean, context: JourneyContext) => void
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const timeNow = () => new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false })
const timeSlots = ['Hoy · 5:00 PM', 'Hoy · 6:30 PM', 'Mañana · 10:00 AM']

export function ChatPanel({ onReservationCreated, onProgressChange }: Props) {
  const [messages, setMessages] = useState<Message[]>(() => [{
    id: 1,
    role: 'assistant',
    kind: 'text',
    text: 'Hola 👋 Soy el asistente de Harmony Spa. ¿Qué te gustaría consultar?',
    time: timeNow(),
  }])
  const [step, setStep] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [automating, setAutomating] = useState(false)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)
  const [payment, setPayment] = useState<{ url: string; amount: string; concept: string } | null>(null)
  const chatScrollRef = useRef<HTMLDivElement | null>(null)
  const selectedTimeRef = useRef<string | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const container = chatScrollRef.current
      if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(frame)
  }, [messages, typing, done])

  const appendText = (role: Message['role'], text: string) => {
    setMessages((current) => [...current, { id: Date.now() + Math.random(), role, kind: 'text', text, time: timeNow() }])
  }

  const appendPlans = () => {
    setMessages((current) => [...current, { id: Date.now() + Math.random(), role: 'assistant', kind: 'plans', time: timeNow() }])
  }

  const appendPaymentLink = (amount: string, concept: string) => {
    setMessages((current) => [...current, {
      id: Date.now() + Math.random(),
      role: 'assistant',
      kind: 'payment-link',
      time: timeNow(),
      paymentUrl: 'https://checkout.bold.co/LNK_8F3KQ2N1',
      paymentAmount: amount,
      paymentConcept: concept,
    }])
  }

  const askPlans = async () => {
    if (automating || typing || done) return
    appendText('user', 'Quiero conocer los planes')
    onProgressChange(0, false, { title: 'Consultando información de Harmony', detail: 'Planes y servicios configurados por el negocio', tool: 'info' })
    setTyping(true)
    await wait(620)
    appendPlans()
    onProgressChange(0, false, { title: 'Información mostrada', detail: 'Planes y servicios de Harmony disponibles en la conversación', tool: 'info' })
    setTyping(false)
    setStep(1)
  }

  const selectPlan = async (plan: Plan) => {
    if (automating || typing || done) return
    setSelectedPlan(plan)
    appendText('user', `Quiero reservar: ${plan.name}`)
    onProgressChange(0, false, { title: 'Servicio seleccionado', detail: `${plan.name} · ${plan.duration} · ${plan.price}`, tool: 'info' })
    setTyping(true)
    await wait(620)
    appendText('assistant', `Disponibilidad validada ✓ Para tu ${plan.name} tengo estos horarios disponibles, ¿cuál te queda mejor?`)
    onProgressChange(1, false, { title: 'Disponibilidad validada', detail: 'Google Calendar · 3 horarios disponibles', tool: 'calendar' })
    setTyping(false)
    setStep(2)
  }

  const selectTime = async (time: string) => {
    if (automating || typing || done || !selectedPlan) return
    selectedTimeRef.current = time
    appendText('user', time)
    onProgressChange(1, false, { title: 'Horario seleccionado', detail: `Google Calendar · ${time}`, tool: 'calendar' })
    setTyping(true)
    await wait(820)
    appendText('assistant', `Genial, te aparto ${selectedPlan.name} ${time}. Puedo dejar preparado un anticipo de ${selectedPlan.price} con Bold para asegurar tu cupo, o puedes pagarlo directamente en el spa. ¿Cómo prefieres continuar?`)
    onProgressChange(2, false, { title: 'Preparando el pago', detail: 'Bold · anticipo opcional listo para generar', tool: 'bold' })
    setTyping(false)
    setStep(3)
  }

  const confirmBooking = async (withDeposit: boolean) => {
    if (automating || typing || done || !selectedPlan || !selectedTimeRef.current) return
    appendText('user', withDeposit ? 'Confirmar con anticipo' : 'Confirmar sin anticipo')
    setTyping(true)
    await wait(620)

    if (withDeposit) {
      appendPaymentLink(selectedPlan.price, `Anticipo · ${selectedPlan.name}`)
      onProgressChange(2, false, { title: 'Link de pago enviado', detail: 'Bold · esperando que el cliente pague por WhatsApp', tool: 'bold' })
      setTyping(false)
      setStep(4)
      return
    }

    setTyping(false)
    await runAutomation(false)
  }

  const openPayment = (message: Message) => {
    if (!message.paymentUrl || !message.paymentAmount) return
    setPayment({ url: message.paymentUrl, amount: message.paymentAmount, concept: message.paymentConcept ?? '' })
  }

  const handlePaymentPaid = async () => {
    setPayment(null)
    setTyping(true)
    await wait(500)
    appendText('assistant', `¡Pago aprobado! ✅ Bold confirmó tu anticipo de ${selectedPlan?.price} y tu cupo quedó asegurado.`)
    setTyping(false)
    await runAutomation(true)
  }

  const runAutomation = async (withDeposit: boolean) => {
    const selectedTime = selectedTimeRef.current
    if (!selectedPlan || !selectedTime) return
    setAutomating(true)
    onProgressChange(2, false, { title: withDeposit ? 'Pago confirmado' : 'Preparando el pago', detail: withDeposit ? 'Bold · anticipo pagado por WhatsApp' : 'Bold · pago directo en el spa', tool: 'bold' })
    await wait(760)

    onProgressChange(3, false, { title: 'Registrando la operación', detail: 'Backoffice · cliente, reserva y confirmación', tool: 'crm' })
    await wait(820)

    onReservationCreated({
      ...newReservation,
      service: selectedPlan.name,
      price: selectedPlan.price,
      time: selectedTime.replace('Hoy · ', '').replace('Mañana · ', ''),
      schedule: selectedTime.startsWith('Mañana') ? 'Mañana' : 'Hoy',
    })

    appendText('assistant', withDeposit
      ? `Tu reserva de ${selectedPlan.name} quedó confirmada para ${selectedTime}. Ya registramos tu pago con Bold, nos vemos pronto 💜`
      : `¡Listo! Tu reserva de ${selectedPlan.name} para ${selectedTime} quedó confirmada ✅ Pagarás ${selectedPlan.price} directamente en el spa. Te llegará la confirmación por WhatsApp.`)
    onProgressChange(3, true, { title: 'Operación completada', detail: 'Reserva registrada y confirmación preparada', tool: 'crm' })
    setAutomating(false)
    setDone(true)
  }

  const quickActions: { label: string; onClick: () => void }[] =
    step === 0 ? [{ label: 'Quiero conocer los planes', onClick: askPlans }]
    : step === 1 ? plans.map((plan) => ({ label: `Reservar ${plan.name}`, onClick: () => selectPlan(plan) }))
      : step === 2 ? timeSlots.map((time) => ({ label: time, onClick: () => selectTime(time) }))
        : step === 3 ? [
            { label: 'Confirmar con anticipo', onClick: () => confirmBooking(true) },
            { label: 'Confirmar sin anticipo', onClick: () => confirmBooking(false) },
          ]
          : []

  return (
    <section className="wa-wallpaper flex h-[620px] w-full min-w-0 max-w-[400px] flex-1 flex-col overflow-hidden rounded-[22px] shadow-[0_24px_60px_-24px_rgba(0,0,0,.55)] transition-shadow duration-300 sm:h-[650px] xl:h-[670px]">
      <div className="flex h-[66px] shrink-0 items-center gap-3 bg-[#008069] px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,.25)] sm:px-[18px]">
        <div className="grid size-[38px] shrink-0 place-items-center rounded-full bg-white/15 text-white"><Leaf className="size-4" /></div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[13px] font-extrabold text-white sm:text-sm">Harmony Spa</h2>
          <p className="mt-px text-[11.5px] text-white/70" aria-live="polite">{typing ? 'escribiendo…' : 'en línea'}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3.5 text-white/90 sm:gap-4">
          <Video className="size-[19px]" strokeWidth={1.75} />
          <Phone className="size-[16px]" strokeWidth={1.75} />
          <MoreVertical className="size-[18px]" strokeWidth={1.75} />
        </div>
      </div>

      <div ref={chatScrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5">
        <div className="mx-auto max-w-[368px]">
          {messages.map((message) => <MessageBubble key={message.id} message={message} onOpenPayment={openPayment} />)}
          {typing && <TypingIndicator />}
        </div>
      </div>

      {!done && !typing && quickActions.length > 0 && (
        <div className="px-4 pb-2 pt-1 sm:px-5">
          <div className="mx-auto flex max-w-[368px] flex-wrap justify-center gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                disabled={automating}
                className="inline-flex min-h-[34px] animate-in-up items-center rounded-full bg-white px-4 py-1.5 text-[12.5px] font-medium text-[#111b21] shadow-[0_1px_3px_rgba(0,0,0,.2)] transition hover:bg-[#f5f5f5] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="chat-input px-4 py-2.5 sm:px-5">
        <div className="mx-auto flex max-w-[368px] items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
          <input
            value=""
            readOnly
            disabled
            placeholder={done ? 'La demo terminó. Mira el backoffice abajo.' : typing ? 'Harmony está respondiendo…' : step === 4 ? 'Toca el link de pago para continuar' : 'Elige una opción arriba para continuar'}
            className="min-w-0 flex-1 cursor-not-allowed bg-transparent px-1 py-2 text-[13px] text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
          />
          <button disabled className="grid size-9 shrink-0 place-items-center rounded-full bg-[#00a884] text-white" aria-label="Enviar mensaje">
            <WhatsAppSendIcon className="size-4" />
          </button>
        </div>
      </div>

      {payment && selectedPlan && (
        <BoldCheckoutModal
          url={payment.url}
          amount={payment.amount}
          concept={payment.concept}
          merchant="Harmony Spa"
          onClose={() => setPayment(null)}
          onPaid={handlePaymentPaid}
        />
      )}
    </section>
  )
}
