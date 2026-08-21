export type PlanOption = {
  name: string
  price: string
  duration: string
  description: string
}

export type Message = {
  id: number
  role: 'assistant' | 'user'
  kind?: 'text' | 'plans' | 'payment-link' | 'quote-document'
  text?: string
  time: string
  plans?: PlanOption[]
  paymentUrl?: string
  paymentAmount?: string
  paymentConcept?: string
  documentName?: string
  documentTotal?: string
}

export function MessageBubble({ message, onOpenPayment }: { message: Message; onOpenPayment?: (message: Message) => void }) {
  const isUser = message.role === 'user'

  if (message.kind === 'payment-link') return <PaymentLinkMessage message={message} onOpen={() => onOpenPayment?.(message)} />
  if (message.kind === 'quote-document') return <QuoteDocumentMessage message={message} />

  return (
    <div className={`mb-2.5 flex animate-message-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded-[10px] px-2.5 pb-1.5 pt-2 text-[13.5px] leading-[1.45] shadow-[0_1px_1px_rgba(0,0,0,.08)] ${isUser ? 'max-w-[78%] rounded-[10px_10px_2px_10px] bg-[#d9fdd3] text-slate-900' : 'max-w-[82%] rounded-[10px_10px_10px_2px] bg-white text-[#111b21]'}`}>
        {message.kind === 'plans' ? <PlansText plans={message.plans ?? []} /> : <p className="whitespace-pre-line">{message.text}</p>}
        <div className="mt-[3px] flex items-center justify-end gap-1 text-black/40">
          <span className="text-[10.5px] leading-none">{message.time}</span>
          {isUser && <span className="text-[10.5px] leading-none text-[#53bdeb]">✓✓</span>}
        </div>
      </div>
    </div>
  )
}

function QuoteDocumentMessage({ message }: { message: Message }) {
  return (
    <div className="mb-2.5 flex animate-message-in justify-start">
      <div className="max-w-[82%] rounded-[10px_10px_10px_2px] bg-white px-2.5 pb-1.5 pt-2 text-[13.5px] leading-[1.45] text-[#111b21] shadow-[0_1px_1px_rgba(0,0,0,.08)]">
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
          <div className="flex items-start gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-md bg-red-50 text-[11px] font-extrabold text-red-600">PDF</span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900">{message.documentName}</p>
              <p className="mt-0.5 text-[11.5px] text-slate-500">Cotización formal · {message.documentTotal}</p>
            </div>
          </div>
        </div>
        <p className="mt-2">Aquí tienes tu cotización formal con el detalle de productos y el valor total.</p>
        <div className="mt-[3px] flex items-center justify-end gap-1 text-black/40">
          <span className="text-[10.5px] leading-none">{message.time}</span>
        </div>
      </div>
    </div>
  )
}

function PlansText({ plans }: { plans: PlanOption[] }) {
  return (
    <div>
      <p>Estos son nuestros planes disponibles hoy:</p>
      <div className="mt-2 space-y-2.5">
        {plans.map((plan) => (
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

function PaymentLinkMessage({ message, onOpen }: { message: Message; onOpen: () => void }) {
  return (
    <div className="mb-2.5 flex animate-message-in justify-start">
      <button
        type="button"
        onClick={onOpen}
        className="max-w-[82%] rounded-[10px_10px_10px_2px] bg-white px-2.5 pb-1.5 pt-2 text-left text-[13.5px] leading-[1.45] text-[#111b21] shadow-[0_1px_1px_rgba(0,0,0,.08)] transition hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#efeae2]"
      >
        <p>Pagar {message.paymentConcept} · {message.paymentAmount}</p>
        <p className="mt-0.5 break-all text-[#0a7cff] underline">{message.paymentUrl}</p>
        <div className="mt-[3px] flex items-center justify-end gap-1 text-black/40">
          <span className="text-[10.5px] leading-none">{message.time}</span>
        </div>
      </button>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="mb-2.5 flex animate-in-up justify-start" role="status" aria-live="polite" aria-label="Harmony está escribiendo">
      <div className="flex h-9 items-center gap-1 rounded-[10px] bg-white px-3.5 shadow-[0_1px_1px_rgba(0,0,0,.08)]" aria-hidden="true">
        <span className="size-1.5 animate-pulse rounded-full bg-slate-400" />
        <span className="size-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:120ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:240ms]" />
      </div>
    </div>
  )
}
