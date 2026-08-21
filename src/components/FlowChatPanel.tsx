import { Leaf, MoreVertical, PackageSearch, Phone, Video } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Order, Reservation } from '../data/demoData'
import type { FlowBeat, FlowDefinition, FlowOption, FlowStep } from '../data/flowTypes'
import { BoldCheckoutModal } from './BoldCheckoutModal'
import { MessageBubble, TypingIndicator, type Message } from './ChatContent'
import { WhatsAppSendIcon } from './icons/WhatsAppSendIcon'
import type { JourneyContext } from './VerticalProgress'

const headerIcons = { leaf: Leaf, 'package-search': PackageSearch } as const

const wait = (ms: number, signal: AbortSignal) => new Promise<boolean>((resolve) => {
  if (signal.aborted) {
    resolve(false)
    return
  }

  const finish = (completed: boolean) => {
    signal.removeEventListener('abort', abort)
    resolve(completed)
  }
  const timer = window.setTimeout(() => finish(true), ms)
  const abort = () => {
    window.clearTimeout(timer)
    finish(false)
  }

  signal.addEventListener('abort', abort, { once: true })
})
const timeNow = () => new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false })

function resolvePath(vars: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((value, key) => {
    if (value && typeof value === 'object' && key in value) return (value as Record<string, unknown>)[key]
    return undefined
  }, vars)
}

function interpolate(template: string, vars: Record<string, unknown>): string {
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, path) => {
    const value = resolvePath(vars, path)
    return value === undefined || value === null ? match : String(value)
  })
}

function interpolateFields(fields: Record<string, string | number | boolean>, vars: Record<string, unknown>) {
  const result: Record<string, string | number | boolean> = {}
  for (const [key, value] of Object.entries(fields)) {
    result[key] = typeof value === 'string' ? interpolate(value, vars) : value
  }
  return result
}

export type FlowResult =
  | { type: 'reservation'; payload: Reservation }
  | { type: 'order'; payload: Order }

type MessageFields = Omit<Message, 'id' | 'role' | 'time'>

type Props = {
  flow: FlowDefinition
  onComplete: (result: FlowResult) => void
  onProgressChange: (activeStep: number, complete: boolean, context: JourneyContext) => void
}

export function FlowChatPanel({ flow, onComplete, onProgressChange }: Props) {
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 1, role: 'assistant', kind: 'text', text: flow.greeting, time: timeNow() },
  ])
  const [currentStepId, setCurrentStepId] = useState(flow.start)
  const [typing, setTyping] = useState(false)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [payment, setPayment] = useState<{ url: string; amount: string; concept: string } | null>(null)
  const chatScrollRef = useRef<HTMLDivElement | null>(null)
  const varsRef = useRef<Record<string, unknown>>({})
  const lifecycleRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    lifecycleRef.current = controller

    return () => {
      controller.abort()
      if (lifecycleRef.current === controller) lifecycleRef.current = null
    }
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const container = chatScrollRef.current
      if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(frame)
  }, [messages, typing])

  const appendMessage = (role: Message['role'], fields: MessageFields) => {
    setMessages((current) => [...current, { id: Date.now() + Math.random(), role, time: timeNow(), ...fields }])
  }

  const resolvePlans = (stepId: string, key: string) => {
    const step = flow.steps.find((item) => item.id === stepId)
    return (step?.options ?? []).flatMap((option) => {
      const plan = option.data?.[key]
      return plan ? [plan] : []
    }) as Message['plans']
  }

  const runBeats = async (beats: FlowBeat[], signal: AbortSignal) => {
    for (const beat of beats) {
      if (signal.aborted) return

      if (beat.type === 'progress') {
        onProgressChange(beat.step, beat.complete, {
          title: interpolate(beat.title, varsRef.current),
          detail: interpolate(beat.detail, varsRef.current),
          tool: beat.tool,
        })
        continue
      }

      if (beat.type === 'wait') {
        if (beat.showTyping) setTyping(true)
        if (!await wait(beat.ms, signal)) return
        if (beat.showTyping) setTyping(false)
        continue
      }

      if (beat.type === 'message') {
        if (beat.delay) {
          setTyping(true)
          if (!await wait(beat.delay, signal)) return
        }

        if (beat.kind === 'plans') {
          appendMessage('assistant', { kind: 'plans', plans: resolvePlans(beat.plansStep ?? '', beat.plansKey ?? '') })
        } else if (beat.kind === 'payment-link') {
          appendMessage('assistant', {
            kind: 'payment-link',
            paymentUrl: beat.paymentUrl,
            paymentAmount: beat.paymentAmount ? interpolate(beat.paymentAmount, varsRef.current) : undefined,
            paymentConcept: beat.paymentConcept ? interpolate(beat.paymentConcept, varsRef.current) : undefined,
          })
        } else if (beat.kind === 'quote-document') {
          appendMessage('assistant', {
            kind: 'quote-document',
            documentName: beat.documentName ? interpolate(beat.documentName, varsRef.current) : undefined,
            documentTotal: beat.documentTotal ? interpolate(beat.documentTotal, varsRef.current) : undefined,
          })
        } else {
          appendMessage('assistant', { kind: 'text', text: interpolate(beat.text ?? '', varsRef.current) })
        }

        if (beat.delay) setTyping(false)
        continue
      }

      if (beat.type === 'complete') {
        const fields = interpolateFields(beat.fields, varsRef.current)
        onComplete(
          beat.result === 'reservation'
            ? { type: 'reservation', payload: fields as unknown as Reservation }
            : { type: 'order', payload: fields as unknown as Order },
        )
        setDone(true)
        continue
      }

      if (beat.type === 'end') {
        setDone(true)
        continue
      }

      if (beat.type === 'goto') {
        setCurrentStepId(beat.step)
      }
    }
  }

  const choose = async (option: FlowOption) => {
    if (busy || done) return
    const controller = lifecycleRef.current
    if (!controller) return

    appendMessage('user', { kind: 'text', text: option.userText ?? option.label })

    if (option.captures?.length) {
      const next = { ...varsRef.current }
      for (const name of option.captures) next[name] = option.data?.[name]
      varsRef.current = next
    }

    setBusy(true)
    try {
      await runBeats(option.sequence, controller.signal)
    } finally {
      setBusy(false)
    }
  }

  const openPayment = (message: Message) => {
    if (!message.paymentUrl || !message.paymentAmount) return
    setPayment({ url: message.paymentUrl, amount: message.paymentAmount, concept: message.paymentConcept ?? '' })
  }

  const handlePaymentPaid = async () => {
    setPayment(null)
    const step = flow.steps.find((item) => item.id === currentStepId)
    if (!step?.onPaid) return
    const controller = lifecycleRef.current
    if (!controller) return

    setBusy(true)
    try {
      await runBeats(step.onPaid, controller.signal)
    } finally {
      setBusy(false)
    }
  }

  const currentStep: FlowStep | undefined = flow.steps.find((item) => item.id === currentStepId)
  const options = currentStep?.options ?? []
  const HeaderIcon = headerIcons[flow.header.icon as keyof typeof headerIcons] ?? Leaf
  const placeholderText = done
    ? flow.placeholder.done
    : typing
      ? flow.placeholder.typing
      : currentStep?.placeholder ?? flow.placeholder.idle

  return (
    <section className="wa-wallpaper flex h-[620px] w-full min-w-0 max-w-[400px] flex-1 flex-col overflow-hidden rounded-[22px] shadow-[0_24px_60px_-24px_rgba(0,0,0,.55)] transition-shadow duration-300 sm:h-[650px] xl:h-[670px]">
      <div className="flex h-[66px] shrink-0 items-center gap-3 bg-[#008069] px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,.25)] sm:px-[18px]">
        <div className="grid size-[38px] shrink-0 place-items-center rounded-full bg-white/15 text-white"><HeaderIcon className="size-4" aria-hidden="true" /></div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[13px] font-extrabold text-white sm:text-sm">{flow.header.title}</h2>
          <p className="mt-px text-[11.5px] text-white/85" aria-live="polite">{typing ? flow.header.typingText : flow.header.onlineText}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3.5 text-white/90 sm:gap-4">
          <Video className="size-[19px]" strokeWidth={1.75} aria-hidden="true" />
          <Phone className="size-[16px]" strokeWidth={1.75} aria-hidden="true" />
          <MoreVertical className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
        </div>
      </div>

      <div
        ref={chatScrollRef}
        className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5"
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        aria-label={`Conversación con ${flow.header.title}`}
      >
        <div className="mx-auto max-w-[368px]">
          {messages.map((message) => <MessageBubble key={message.id} message={message} onOpenPayment={openPayment} />)}
          {typing && <TypingIndicator />}
        </div>
      </div>

      {!done && !busy && options.length > 0 && (
        <div className="px-4 pb-2 pt-1 sm:px-5">
          <div className="mx-auto flex max-w-[368px] flex-wrap justify-center gap-2">
            {options.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => choose(option)}
                className="inline-flex min-h-10 animate-in-up items-center rounded-full bg-white px-4 py-1.5 text-[12.5px] font-semibold text-[#111b21] shadow-[0_1px_3px_rgba(0,0,0,.2)] transition-[background-color,transform,box-shadow] duration-150 hover:bg-[#f5f5f5] hover:shadow-[0_3px_10px_rgba(0,0,0,.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a64] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f1e9dd] active:scale-[0.98]"
              >
                {option.label}
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
            aria-label="Entrada de mensajes deshabilitada en esta demostración"
            placeholder={placeholderText}
            className="min-w-0 flex-1 cursor-not-allowed bg-transparent px-1 py-2 text-[13px] text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
          />
          <button type="button" disabled className="grid size-9 shrink-0 place-items-center rounded-full bg-[#00a884] text-white disabled:opacity-70" aria-label="Enviar mensaje deshabilitado en esta demostración">
            <WhatsAppSendIcon className="size-4" />
          </button>
        </div>
      </div>

      {payment && (
        <BoldCheckoutModal
          url={payment.url}
          amount={payment.amount}
          concept={payment.concept}
          merchant={flow.header.title}
          onClose={() => setPayment(null)}
          onPaid={handlePaymentPaid}
        />
      )}
    </section>
  )
}
