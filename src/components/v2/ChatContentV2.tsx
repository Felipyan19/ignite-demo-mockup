import { plansV2 } from '../../data/demoDataV2'

export type MessageV2 = {
  id: number
  role: 'assistant' | 'user'
  kind?: 'text' | 'plans' | 'payment-link'
  text?: string
  time: string
  paymentUrl?: string
  paymentAmount?: string
  paymentConcept?: string
}

export function MessageBubbleV2({ message, onOpenPayment }: { message: MessageV2; onOpenPayment?: (message: MessageV2) => void }) {
  const isUser = message.role === 'user'

  if (message.kind === 'payment-link') return <PaymentLinkMessageV2 message={message} onOpen={() => onOpenPayment?.(message)} />

  return (
    <div className={`mb-2.5 flex animate-message-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded-[10px] px-2.5 pb-1.5 pt-2 text-[13.5px] leading-[1.45] shadow-[0_1px_1px_rgba(0,0,0,.08)] ${isUser ? 'max-w-[78%] rounded-[10px_10px_2px_10px] bg-[#d9fdd3] text-slate-900' : 'max-w-[82%] rounded-[10px_10px_10px_2px] bg-white text-[#111b21]'}`}>
        {message.kind === 'plans' ? <PlansText /> : <p className="whitespace-pre-line">{message.text}</p>}
        <div className="mt-[3px] flex items-center justify-end gap-1 text-black/40">
          <span className="text-[10.5px] leading-none">{message.time}</span>
          {isUser && <span className="text-[10.5px] leading-none text-[#53bdeb]">✓✓</span>}
        </div>
      </div>
    </div>
  )
}

function PlansText() {
  return (
    <div>
      <p>Estos son nuestros planes disponibles hoy:</p>
      <div className="mt-2 space-y-2.5">
        {plansV2.map((plan) => (
          <div key={plan.name}>
            <div className="flex items-baseline justify-between gap-3">
              <strong className="text-slate-900">{plan.name}</strong>
              <strong className="shrink-0 text-slate-900">{plan.price}</strong>
            </div>
            <p className="text-[12px] leading-4 text-slate-500">
              {plan.duration} · {plan.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function PaymentLinkMessageV2({ message, onOpen }: { message: MessageV2; onOpen: () => void }) {
  return (
    <div className="mb-2.5 flex animate-message-in justify-start">
      <button
        onClick={onOpen}
        className="w-full max-w-[82%] overflow-hidden rounded-[10px_10px_10px_2px] bg-white text-left shadow-[0_1px_1px_rgba(0,0,0,.08)] transition hover:brightness-[0.98]"
      >
        <div className="flex items-center gap-2.5 bg-[#0a0a0a] px-3 py-3">
          <div className="grid size-8 shrink-0 place-items-center rounded-md bg-[#ffc700] text-[13px] font-black text-black">B</div>
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-bold text-white">Bold · Pago seguro</p>
            <p className="truncate text-[10.5px] text-white/60">Tarjeta, PSE o Nequi</p>
          </div>
        </div>
        <div className="px-2.5 pb-1.5 pt-2 text-[13.5px] leading-[1.45] text-[#111b21]">
          <p className="font-semibold">Pagar {message.paymentConcept} · {message.paymentAmount}</p>
          <p className="mt-0.5 truncate text-[12.5px] text-[#0a7cff] underline">{message.paymentUrl}</p>
          {message.time && <p className="mt-[3px] text-right text-[10.5px] leading-none text-black/40">{message.time}</p>}
        </div>
      </button>
    </div>
  )
}

export function TypingIndicatorV2() {
  return (
    <div className="mb-2.5 flex animate-in-up justify-start">
      <div className="flex h-9 items-center gap-1 rounded-[10px] bg-white px-3.5 shadow-[0_1px_1px_rgba(0,0,0,.08)]" aria-label="Harmony está escribiendo">
        <span className="size-1.5 animate-pulse rounded-full bg-slate-400" />
        <span className="size-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:120ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:240ms]" />
      </div>
    </div>
  )
}
