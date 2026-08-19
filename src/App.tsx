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
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_22%_4%,rgba(124,58,237,.15),transparent_30%)]" />

      <div className="relative">
        <DemoHeader onReset={reset} />

        <section className="mx-auto max-w-[1500px] px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mb-5 max-w-[790px] animate-page-in">
            <p className="text-xs font-semibold text-violet-300">Demo interactiva · aproximadamente 2 minutos</p>
            <h1 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl lg:text-[2.15rem]">
              De una conversación a una operación completa.
            </h1>
            <p className="mt-2 max-w-[760px] text-sm leading-6 text-slate-400">
              Haz una reserva y mira cómo Ignite conecta la conversación con calendario, clientes, pagos y backoffice sin sacarte de la experiencia.
            </p>
          </div>

          <div
            className={`demo-workspace grid overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_24px_70px_rgba(0,0,0,.30)] transition-[grid-template-columns] duration-300 ease-out ${
              backofficeOpen && reservation
                ? 'lg:grid-cols-[minmax(390px,0.78fr)_minmax(620px,1.22fr)]'
                : 'lg:grid-cols-[minmax(0,680px)] lg:justify-center'
            }`}
          >
            <ChatPanel
              key={resetKey}
              compact={backofficeOpen}
              onReservationCreated={setReservation}
              onOpenBackoffice={() => reservation && setBackofficeOpen(true)}
            />
            {backofficeOpen && reservation && (
              <BackofficePanel reservation={reservation} onClose={() => setBackofficeOpen(false)} />
            )}
          </div>

          <div className="mt-5 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid size-8 place-items-center rounded-lg bg-violet-500/10 text-violet-300">
                <Sparkles className="size-4" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-white">¿Te imaginas este flujo conectado a tu negocio?</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">La demo es simulada; la implementación real conecta tus herramientas y reglas.</p>
              </div>
            </div>
            <a
              href="https://igniteapps.co/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#6C3CFF] px-4 py-3 text-xs font-extrabold text-white transition duration-150 hover:bg-[#5B2EFF] focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#070b18]"
            >
              Quiero esto para mi negocio <ArrowRight className="size-4" />
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
