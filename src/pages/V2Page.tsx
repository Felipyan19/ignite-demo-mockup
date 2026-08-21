import { RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BrandLogo } from '../components/BrandLogo'
import { BackofficeLive } from '../components/v2/BackofficeLive'
import { ChatPanelV2 } from '../components/v2/ChatPanelV2'
import { JourneyStatus } from '../components/v2/JourneyStatus'
import { VerticalProgress, type JourneyContext } from '../components/v2/VerticalProgress'
import type { ReservationV2 } from '../data/demoDataV2'

const initialJourneyContext: JourneyContext = {
  title: 'Listo para orientar al cliente',
  detail: 'Planes, servicios y respuestas configuradas por el negocio',
  tool: 'info',
}

export default function V2Page() {
  const [progressStep, setProgressStep] = useState(0)
  const [progressComplete, setProgressComplete] = useState(false)
  const [journeyContext, setJourneyContext] = useState<JourneyContext>(initialJourneyContext)
  const [reservation, setReservation] = useState<ReservationV2 | null>(null)
  const [resetKey, setResetKey] = useState(0)
  const backofficeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!reservation) return
    const frame = requestAnimationFrame(() => {
      backofficeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [reservation])

  const reset = () => {
    setProgressStep(0)
    setProgressComplete(false)
    setJourneyContext(initialJourneyContext)
    setReservation(null)
    setResetKey((key) => key + 1)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070b18] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="demo-bg-glow absolute inset-0" />
        <div className="demo-bg-grid absolute inset-0" />
      </div>

      <div className="relative">
        <header className="relative">
          <div className="mx-auto flex w-full max-w-[1080px] items-center gap-3 px-4 pt-8 sm:px-6 lg:px-10">
            <BrandLogo />
          </div>
        </header>

        <section className="mx-auto max-w-[1080px] px-4 pb-16 pt-6 sm:px-6 lg:px-10">
          <div className="animate-page-in">
            <h1 className="display-font mt-5 max-w-[640px] text-[clamp(26px,3.2vw,40px)] font-bold leading-[1.16] tracking-[-0.01em] text-white">
              Vende más desde una conversación{' '}
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
                que termina en reserva.
              </span>
            </h1>
            <p className="mt-2 max-w-[520px] text-[15.5px] leading-[1.6] text-white/60">
              Pruébala como un cliente: elige un servicio, reserva un horario y mira cómo Ignite conecta WhatsApp con calendario, pagos y backoffice.
            </p>
          </div>

          <JourneyStatus complete={progressComplete} context={journeyContext} />

          <div className="mt-4 flex flex-row items-start justify-center gap-2 sm:gap-5 md:gap-7">
            <ChatPanelV2
              key={resetKey}
              onReservationCreated={setReservation}
              onProgressChange={(step, complete, context) => {
                setProgressStep(step)
                setProgressComplete(complete)
                setJourneyContext(context)
              }}
            />
            <div className="h-[454px] w-11 shrink-0 pt-1 sm:w-[190px] md:w-[210px]">
              <VerticalProgress activeStep={progressStep} complete={progressComplete} />
            </div>
          </div>

          {reservation && (
            <div ref={backofficeRef} className="v2-result-band -mx-4 mt-14 border-t border-white/10 px-4 pt-12 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
              <BackofficeLive reservation={reservation} />
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-200 transition duration-150 hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              <RotateCcw className="size-3.5" /> Reiniciar demo
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
