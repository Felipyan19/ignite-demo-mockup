import { CalendarDays, PackageSearch, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BackofficeLive } from '../components/BackofficeLive'
import { BrandLogo } from '../components/BrandLogo'
import { ChatPanel } from '../components/ChatPanel'
import { InventoryBackofficeLive } from '../components/InventoryBackofficeLive'
import { InventoryChatPanel } from '../components/InventoryChatPanel'
import { VerticalProgress } from '../components/VerticalProgress'
import type { Order, Reservation } from '../data/demoData'

export default function DemoPage() {
  const [demoType, setDemoType] = useState<'agenda' | 'inventory'>('agenda')
  const [progressStep, setProgressStep] = useState(0)
  const [progressComplete, setProgressComplete] = useState(false)
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [order, setOrder] = useState<Order | null>(null)
  const [resetKey, setResetKey] = useState(0)
  const backofficeRef = useRef<HTMLDivElement | null>(null)
  const hasResult = demoType === 'agenda' ? Boolean(reservation) : Boolean(order)

  useEffect(() => {
    if (!hasResult) return

    const target = backofficeRef.current
    if (!target) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reveal = () => target.classList.add('result-band-visible')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        reveal()
        observer.disconnect()
      },
      { threshold: 0.08, rootMargin: '0px 0px -12% 0px' },
    )

    if (reducedMotion) reveal()
    else observer.observe(target)

    const scrollFrame = requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    })

    return () => {
      cancelAnimationFrame(scrollFrame)
      observer.disconnect()
    }
  }, [hasResult])

  const reset = () => {
    setProgressStep(0)
    setProgressComplete(false)
    setReservation(null)
    setOrder(null)
    setResetKey((key) => key + 1)
  }

  const selectDemo = (type: 'agenda' | 'inventory') => {
    setDemoType(type)
    setProgressStep(0)
    setProgressComplete(false)
    setReservation(null)
    setOrder(null)
    setResetKey((key) => key + 1)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070b18] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="demo-bg-glow absolute inset-0" />
        <div className="demo-bg-grid absolute inset-0" />
      </div>

      <div className="relative">
        <section className="mx-auto max-w-[1080px] px-4 pb-16 pt-10 sm:px-6 lg:px-10">
          <div className="mx-auto w-fit">
            <div className="animate-page-in">
              <BrandLogo />
              <h1 className="display-font mt-7 max-w-[520px] text-[28px] font-bold leading-[1.16] tracking-[-0.01em] text-white sm:max-w-[640px] sm:text-[32px] md:text-[36px] lg:text-[40px]">
                De una conversación a una{' '}
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
                  operación completa.
                </span>
              </h1>
              <p className="mt-2 max-w-[630px] text-[15.5px] leading-[1.6] text-white/60">
                Elige una experiencia y pruébala como un cliente. Descubre cómo Ignite conecta cada conversación con las herramientas necesarias para ejecutar el proceso de principio a fin.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-1.5" role="group" aria-label="Seleccionar demostración">
              <button
                onClick={() => selectDemo('agenda')}
                aria-pressed={demoType === 'agenda'}
                className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-xs font-bold transition sm:text-sm ${demoType === 'agenda' ? 'bg-violet-500 text-white shadow-[0_8px_24px_rgba(124,58,237,.28)]' : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'}`}
              >
                <CalendarDays className="size-4" /> Agenda
              </button>
              <button
                onClick={() => selectDemo('inventory')}
                aria-pressed={demoType === 'inventory'}
                className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-xs font-bold transition sm:text-sm ${demoType === 'inventory' ? 'bg-violet-500 text-white shadow-[0_8px_24px_rgba(124,58,237,.28)]' : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'}`}
              >
                <PackageSearch className="size-4" /> Inventario
              </button>
            </div>

            <div className="mt-5 flex flex-row items-start gap-2 sm:gap-5 md:gap-7">
              {demoType === 'agenda' ? (
                <ChatPanel
                  key={`agenda-${resetKey}`}
                  onReservationCreated={setReservation}
                  onProgressChange={(step, complete) => {
                    setProgressStep(step)
                    setProgressComplete(complete)
                  }}
                />
              ) : (
                <InventoryChatPanel
                  key={`inventory-${resetKey}`}
                  onOrderCreated={setOrder}
                  onProgressChange={(step, complete) => {
                    setProgressStep(step)
                    setProgressComplete(complete)
                  }}
                />
              )}
              <div className="h-[620px] w-11 shrink-0 pt-1 sm:h-[650px] sm:w-[190px] md:w-[210px] xl:h-[670px]">
                <VerticalProgress activeStep={progressStep} complete={progressComplete} variant={demoType} />
              </div>
            </div>
          </div>

          {hasResult && (
            <div
              ref={backofficeRef}
              className="result-band -mx-4 mt-14 px-4 pt-12 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
            >
              <div className="backoffice-stage">
                {demoType === 'agenda' && reservation ? (
                  <BackofficeLive reservation={reservation} />
                ) : order ? (
                  <InventoryBackofficeLive order={order} />
                ) : null}
              </div>
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
