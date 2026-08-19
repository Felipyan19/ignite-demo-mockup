import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  LoaderCircle,
  Sparkles,
} from 'lucide-react'
import type { Reservation } from '../data/demoData'

type Props = {
  onReservationCreated: (reservation: Reservation) => void
  onOpenBackoffice: () => void
}

type Message = {
  id: number
  role: 'assistant' | 'user' | 'system'
  text?: string
  kind?: 'message' | 'processing' | 'result'
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function ChatDemo({ onReservationCreated, onOpenBackoffice }: Props) {
  const [step, setStep] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      text: 'Hola 👋 Soy la demo de Ignite. ¿Qué quieres probar?',
    },
  ])
  const [processing, setProcessing] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const append = (message: Message) =>
    setMessages((current) => [...current, message])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, processing, done])

  const choose = async (label: string) => {
    append({ id: Date.now(), role: 'user', text: label })
    await wait(450)

    if (step === 0) {
      append({
        id: Date.now() + 1,
        role: 'assistant',
        text: 'Perfecto. ¿Qué servicio deseas reservar?',
      })
      setStep(1)
      return
    }

    if (step === 1) {
      append({
        id: Date.now() + 1,
        role: 'assistant',
        text: 'Tengo disponibilidad mañana a las 3:00 PM, 5:00 PM y 7:00 PM.',
      })
      setStep(2)
      return
    }

    if (step === 2) {
      append({
        id: Date.now() + 1,
        role: 'assistant',
        text: 'Listo. ¿Confirmo “Masaje relajante” mañana a las 5:00 PM?',
      })
      setStep(3)
      return
    }

    if (step === 3) {
      setStep(4)
      await runAutomation()
    }
  }

  const runAutomation = async () => {
    const tasks = [
      'Validando disponibilidad',
      'Registrando cliente',
      'Creando reserva',
      'Programando recordatorio',
    ]

    for (const task of tasks) {
      setProcessing((current) => [...current, task])
      await wait(650)
    }

    const reservation: Reservation = {
      id: 'RES-1042',
      customer: 'Felipe Castaño',
      service: 'Masaje relajante',
      dateLabel: 'Mañana',
      time: '5:00 PM',
      status: 'Confirmada',
      reminder: 'Mañana 4:00 PM',
    }

    onReservationCreated(reservation)
    setDone(true)
    append({
      id: Date.now() + 10,
      role: 'assistant',
      text: 'Listo. La reserva quedó confirmada ✅',
    })
  }

  const quickActions =
    step === 0
      ? ['Reservar una cita']
      : step === 1
        ? ['Masaje relajante']
        : step === 2
          ? ['5:00 PM']
          : step === 3
            ? ['Sí, confirmar']
            : []

  return (
    <div className="chat-card">
      <div className="chat-header">
        <div className="agent-avatar"><Bot size={19} /></div>
        <div>
          <strong>Ignite Demo</strong>
          <span><i /> En línea</span>
        </div>
      </div>

      <div className="messages">
        {messages.map((message) => (
          <div
            className={`message-row ${message.role}`}
            key={message.id}
          >
            {message.role === 'assistant' && (
              <div className="mini-avatar"><Bot size={14} /></div>
            )}
            <div className={`bubble ${message.role}`}>
              {message.text}
            </div>
          </div>
        ))}

        {processing.length > 0 && !done && (
          <div className="automation-card">
            <div className="automation-title">
              <Sparkles size={16} />
              Ignite está ejecutando acciones
            </div>
            {processing.map((item, index) => (
              <div className="automation-line" key={item}>
                <CheckCircle2 size={16} />
                <span>{item}</span>
                {index === processing.length - 1 && (
                  <LoaderCircle className="spin" size={14} />
                )}
              </div>
            ))}
          </div>
        )}

        {done && (
          <>
            <div className="result-card">
              <div className="result-icon"><Check size={18} /></div>
              <div>
                <strong>Reserva confirmada</strong>
                <span>Masaje relajante · Mañana · 5:00 PM</span>
              </div>
            </div>

            <button className="inside-button" onClick={onOpenBackoffice}>
              Ver qué pasó por dentro
              <ArrowRight size={17} />
            </button>
          </>
        )}

        <div ref={bottomRef} />
      </div>

      {quickActions.length > 0 && (
        <div className="quick-actions">
          {quickActions.map((action) => (
            <button key={action} onClick={() => choose(action)}>
              {action}
            </button>
          ))}
        </div>
      )}

      <div className="fake-input">
        <span>Escribe un mensaje...</span>
        <button aria-label="Enviar"><ArrowRight size={17} /></button>
      </div>
    </div>
  )
}
