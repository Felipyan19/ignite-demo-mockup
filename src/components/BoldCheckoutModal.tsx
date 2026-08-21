import { Check, Loader2, Lock, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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

type Props = {
  url: string
  amount: string
  concept: string
  merchant: string
  onClose: () => void
  onPaid: () => void
}

export function BoldCheckoutModal({ url, amount, concept, merchant, onClose, onPaid }: Props) {
  const [status, setStatus] = useState<'form' | 'processing' | 'success'>('form')
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const lifecycleRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const dialog = dialogRef.current
    lifecycleRef.current = controller
    if (dialog && !dialog.open) dialog.showModal()

    return () => {
      controller.abort()
      if (dialog?.open) dialog.close()
      if (lifecycleRef.current === controller) lifecycleRef.current = null
    }
  }, [])

  const pay = async () => {
    const signal = lifecycleRef.current?.signal
    if (!signal) return

    setStatus('processing')
    if (!await wait(1400, signal)) return
    setStatus('success')
    if (!await wait(1000, signal)) return
    onPaid()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="bold-checkout-title"
      aria-describedby="bold-checkout-description"
      className="m-auto w-[calc(100%_-_2rem)] max-w-[380px] overflow-visible border-0 bg-transparent p-0 text-left backdrop:bg-black/60 backdrop:backdrop-blur-[2px]"
      onCancel={(event) => {
        event.preventDefault()
        if (status !== 'processing') onClose()
      }}
    >
      <div className="w-full overflow-hidden rounded-2xl bg-white shadow-2xl">
        <h2 id="bold-checkout-title" className="sr-only">Pago seguro con Bold</h2>
        <div className="flex items-center gap-2 border-b border-black/5 bg-slate-50 px-3 py-2.5">
          <div className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-full bg-white px-3 py-1 text-[11px] text-slate-500 ring-1 ring-black/5">
            <Lock className="size-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{url}</span>
          </div>
          <button type="button" onClick={onClose} disabled={status === 'processing'} className="grid size-9 shrink-0 place-items-center rounded-full text-slate-500 transition-colors hover:bg-black/5 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 disabled:opacity-40" aria-label="Cerrar pago simulado">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {status !== 'success' ? (
          <div className="p-5">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-md bg-black text-[13px] font-black text-[#ffc700]">B</div>
              <span className="text-sm font-extrabold tracking-tight text-slate-900">bold</span>
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{merchant} te está cobrando</p>
            <p className="mt-1 text-[32px] font-black leading-none text-slate-900">{amount}</p>
            <p id="bold-checkout-description" className="mt-1.5 text-sm text-slate-600">{concept}</p>

            <div className="mt-5 grid grid-cols-3 gap-2 text-[11px] font-semibold">
              <span className="rounded-lg border-2 border-slate-900 bg-slate-50 py-2 text-center text-slate-900">Tarjeta</span>
              <span className="rounded-lg border border-slate-200 py-2 text-center text-slate-400">PSE</span>
              <span className="rounded-lg border border-slate-200 py-2 text-center text-slate-400">Nequi</span>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] text-slate-400">•••• •••• •••• ••••</div>
              <div className="flex gap-2.5">
                <div className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] text-slate-400">MM/AA</div>
                <div className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] text-slate-400">CVC</div>
              </div>
            </div>

            <button
              type="button"
              onClick={pay}
              disabled={status === 'processing'}
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ffc700] text-sm font-extrabold text-black transition-[filter,transform] duration-150 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {status === 'processing' ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Procesando pago…
                </>
              ) : (
                `Pagar ${amount}`
              )}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1 text-[10.5px] text-slate-400">
              <Lock className="size-3" aria-hidden="true" /> Pago seguro procesado por Bold · simulación
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 px-6 py-11 text-center animate-success-pop" role="status" aria-live="polite">
            <div className="grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <Check className="size-7" strokeWidth={3} aria-hidden="true" />
            </div>
            <p className="mt-2 text-base font-extrabold text-slate-900">¡Pago aprobado!</p>
            <p className="text-sm text-slate-500">{amount} · {concept}</p>
            <p className="mt-3 text-xs text-slate-400">Volviendo a WhatsApp…</p>
          </div>
        )}
      </div>
    </dialog>
  )
}
