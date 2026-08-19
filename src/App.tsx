import { ArrowRight, BadgeCheck, PlayCircle, Sparkles } from 'lucide-react'
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
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_5%,rgba(124,58,237,.24),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,.10),transparent_24%)]" />
      <div className="relative">
        <DemoHeader onReset={reset} />

        <section className="mx-auto max-w-[1500px] px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-violet-200"><PlayCircle className="size-3.5" /> Demo guiada · 2 minutos</div>
              <h1 className="max-w-[760px] text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">No mires un chatbot. Mira tu negocio operándose solo.</h1>
              <p className="mt-2 max-w-[780px] text-sm leading-6 text-slate-400">Haz una reserva desde el chat, observa las acciones que Ignite simula y luego abre el backoffice para ver cómo quedó todo registrado.</p>
            </div>
            <div className="flex gap-2 text-[10px] font-bold text-slate-300">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"><BadgeCheck className="size-3.5 text-emerald-400" /> Sin registro</span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"><Sparkles className="size-3.5 text-violet-300" /> Datos simulados</span>
            </div>
          </div>

          <div className={`demo-workspace grid overflow-hidden rounded-[30px] border border-white/10 bg-white shadow-[0_30px_90px_rgba(0,0,0,.38)] transition-[grid-template-columns] duration-700 ease-out ${backofficeOpen && reservation ? 'lg:grid-cols-[minmax(390px,0.78fr)_minmax(620px,1.22fr)]' : 'lg:grid-cols-[minmax(0,680px)] lg:justify-center'}`}>
            <ChatPanel key={resetKey} compact={backofficeOpen} onReservationCreated={setReservation} onOpenBackoffice={() => reservation && setBackofficeOpen(true)} />
            {backofficeOpen && reservation && <BackofficePanel reservation={reservation} onClose={() => setBackofficeOpen(false)} />}
          </div>

          <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-violet-400/15 bg-gradient-to-r from-violet-500/10 to-white/[0.03] px-5 py-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3"><div className="grid size-9 place-items-center rounded-xl bg-violet-500/15 text-violet-300"><Sparkles className="size-4" /></div><div><p className="text-sm font-extrabold text-white">¿Te imaginas esto con tus herramientas y procesos?</p><p className="mt-1 text-xs text-slate-400">WhatsApp, agenda, pagos, CRM y software trabajando como un solo sistema.</p></div></div>
            <a href="https://igniteapps.co/" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#6C3CFF] px-4 py-3 text-xs font-extrabold text-white shadow-[0_12px_30px_rgba(108,60,255,.28)] transition hover:bg-[#5B2EFF]">Quiero esto para mi negocio <ArrowRight className="size-4" /></a>
          </div>
        </section>
      </div>
    </main>
  )
}
