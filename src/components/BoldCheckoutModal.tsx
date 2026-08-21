import { Check, Loader2, Lock, X } from 'lucide-react'
import { useState } from 'react'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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

  const pay = async () => {
    setStatus('processing')
    await wait(1400)
    setStatus('success')
    await wait(1000)
    onPaid()
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-label="Pago seguro con Bold">
      <div className="w-full max-w-[380px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center gap-2 border-b border-black/5 bg-slate-50 px-3 py-2.5">
          <div className="flex shrink-0 gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-full bg-white px-3 py-1 text-[11px] text-slate-500 ring-1 ring-black/5">
            <Lock className="size-3 shrink-0" />
            <span className="truncate">{url}</span>
          </div>
          <button onClick={onClose} disabled={status === 'processing'} className="shrink-0 rounded-full p-1 text-slate-400 transition hover:bg-black/5 hover:text-slate-600 disabled:opacity-40" aria-label="Cerrar">
            <X className="size-4" />
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
            <p className="mt-1.5 text-sm text-slate-500">{concept}</p>

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
              onClick={pay}
              disabled={status === 'processing'}
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ffc700] text-sm font-extrabold text-black transition duration-150 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-80"
            >
              {status === 'processing' ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Procesando pago…
                </>
              ) : (
                `Pagar ${amount}`
              )}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1 text-[10.5px] text-slate-400">
              <Lock className="size-3" /> Pago seguro procesado por Bold · simulación
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 px-6 py-11 text-center animate-success-pop">
            <div className="grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <Check className="size-7" strokeWidth={3} />
            </div>
            <p className="mt-2 text-base font-extrabold text-slate-900">¡Pago aprobado!</p>
            <p className="text-sm text-slate-500">{amount} · {concept}</p>
            <p className="mt-3 text-xs text-slate-400">Volviendo a WhatsApp…</p>
          </div>
        )}
      </div>
    </div>
  )
}
