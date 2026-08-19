import { ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { BackofficePanel } from './components/BackofficePanel'
import { ChatPanel } from './components/ChatPanel'
import { DemoHeader } from './components/DemoHeader'
import type { Reservation } from './data/demoData'

export default function App() {
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [backofficeOpen, setBackofficeOpen] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const reset = () => {
    setReservation(null)
    setBackofficeOpen(false)
    setResetKey((key) => key + 1)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070b18] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_22%_4%,rgba(124,58,237,.13),transparent_30%)]" />

      <div className="relative">
        <DemoHeader onReset={reset} />

        <section className="mx-auto max-w-[1440px] px-4 pb-7 sm:px-6 lg:px-8">
          <div className="mb-4 max-w-[730px] animate-page-in">
            <p className="text-[11px] font-semibold text-violet-300">Demo interactiva · aproximadamente 2 minutos</p>
            <h1 className="mt-1.5 text-[1.75rem] font-black leading-[1.1] tracking-[-0.04em] text-white sm:text-[2rem] lg:text-[2.1rem]">
              De una conversación a una operación completa.
            </h1>
            <p className="mt-2 max-w-[700px] text-[13px] leading-[1.65] text-slate-400 sm:text-sm">
              Haz una reserva y mira cómo Ignite conecta la conversación con calendario, clientes, pagos y backoffice sin sacarte de la experiencia.
            </p>
          </div>

          <div
            className={`demo-workspace overflow-hidden rounded-[24px] border border-white/10 bg-white shadow-[0_22px_60px_rgba(0,0,0,.28)] ${
              backofficeOpen && reservation ? '' : 'grid lg:grid-cols-[minmax(0,650px)] lg:justify-center'
            }`}
          >
            {backofficeOpen && reservation ? (
              <BackofficePanel reservation={reservation} onClose={() => setBackofficeOpen(false)} />
            ) : (
              <ChatPanel
                key={resetKey}
                compact={false}
                onReservationCreated={setReservation}
                onOpenBackoffice={() => reservation && setBackofficeOpen(true)}
              />
            )}
          </div>

          <div className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 grid size-7 place-items-center rounded-lg bg-violet-500/10 text-violet-300">
                <Sparkles className="size-3.5" />
              </div>
              <div>
                <p className="text-[13px] font-extrabold text-white sm:text-sm">¿Te imaginas este flujo conectado a tu negocio?</p>
                <p className="mt-0.5 text-[11px] leading-5 text-slate-400 sm:text-xs">La demo es simulada; la implementación real conecta tus herramientas y reglas.</p>
              </div>
            </div>
            <a
              href="https://igniteapps.co/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl bg-[#6C3CFF] px-4 py-2.5 text-xs font-extrabold text-white transition duration-150 hover:bg-[#5B2EFF] focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#070b18]"
            >
              Quiero esto para mi negocio <ArrowRight className="size-4" />
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
