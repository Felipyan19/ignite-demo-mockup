import { CalendarDays, PackageSearch, RotateCcw } from 'lucide-react'
import { useEffect, useReducer, useRef } from 'react'
import { BackofficeLive } from '../components/BackofficeLive'
import { BrandLogo } from '../components/BrandLogo'
import { FlowChatPanel, type FlowResult } from '../components/FlowChatPanel'
import { InventoryBackofficeLive } from '../components/InventoryBackofficeLive'
import { VerticalProgress } from '../components/VerticalProgress'
import type { Order, Reservation } from '../data/demoData'
import flows from '../data/flows.json'
import type { FlowsConfig } from '../data/flowTypes'

const typedFlows = flows as unknown as FlowsConfig
type DemoType = 'agenda' | 'inventory'

type DemoState = {
  demoType: DemoType
  progressStep: number
  progressComplete: boolean
  reservation: Reservation | null
  order: Order | null
  resetKey: number
}

type DemoAction =
  | { type: 'select-demo'; demoType: DemoType }
  | { type: 'progress'; step: number; complete: boolean }
  | { type: 'complete'; result: FlowResult }
  | { type: 'reset' }

const initialDemoState: DemoState = {
  demoType: 'agenda',
  progressStep: 0,
  progressComplete: false,
  reservation: null,
  order: null,
  resetKey: 0,
}

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  if (action.type === 'progress') {
    return { ...state, progressStep: action.step, progressComplete: action.complete }
  }

  if (action.type === 'complete') {
    return action.result.type === 'reservation'
      ? { ...state, reservation: action.result.payload, order: null }
      : { ...state, order: action.result.payload, reservation: null }
  }

  if (action.type === 'select-demo') {
    return {
      ...initialDemoState,
      demoType: action.demoType,
      resetKey: state.resetKey + 1,
    }
  }

  return {
    ...initialDemoState,
    demoType: state.demoType,
    resetKey: state.resetKey + 1,
  }
}

export default function DemoPage() {
  const [{ demoType, progressStep, progressComplete, reservation, order, resetKey }, dispatch] = useReducer(
    demoReducer,
    initialDemoState,
  )
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
    dispatch({ type: 'reset' })
  }

  const selectDemo = (type: DemoType) => {
    dispatch({ type: 'select-demo', demoType: type })
  }

  const handleComplete = (result: FlowResult) => {
    dispatch({ type: 'complete', result })
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
              <p className="mt-2 max-w-[630px] text-[15.3px] leading-[1.6] text-white/70">
                Elige una experiencia y pruébala como un cliente. Descubre cómo Ignite conecta cada conversación con las herramientas necesarias para ejecutar el proceso de principio a fin.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,.04)]" role="group" aria-label="Seleccionar demostración">
              <button
                type="button"
                onClick={() => selectDemo('agenda')}
                aria-controls="demo-workspace"
                aria-pressed={demoType === 'agenda'}
                className={`group flex min-h-14 items-center justify-start gap-3 rounded-xl px-3.5 text-left transition-[background-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b18] active:scale-[.99] ${demoType === 'agenda' ? 'bg-violet-500 text-white shadow-[0_8px_24px_rgba(124,58,237,.28)]' : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'}`}
              >
                <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${demoType === 'agenda' ? 'bg-white/15' : 'bg-white/[0.05] text-violet-300'}`}>
                  <CalendarDays className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-extrabold sm:text-sm">Agenda</span>
                  <span className={`mt-0.5 block text-[10px] font-medium sm:text-[10.5px] ${demoType === 'agenda' ? 'text-white/75' : 'text-slate-500 group-hover:text-slate-300'}`}>Reservas y pagos</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => selectDemo('inventory')}
                aria-controls="demo-workspace"
                aria-pressed={demoType === 'inventory'}
                className={`group flex min-h-14 items-center justify-start gap-3 rounded-xl px-3.5 text-left transition-[background-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b18] active:scale-[.99] ${demoType === 'inventory' ? 'bg-violet-500 text-white shadow-[0_8px_24px_rgba(124,58,237,.28)]' : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'}`}
              >
                <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${demoType === 'inventory' ? 'bg-white/15' : 'bg-white/[0.05] text-violet-300'}`}>
                  <PackageSearch className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-extrabold sm:text-sm">Inventario</span>
                  <span className={`mt-0.5 block text-[10px] font-medium sm:text-[10.5px] ${demoType === 'inventory' ? 'text-white/75' : 'text-slate-500 group-hover:text-slate-300'}`}>Cotización y pedidos</span>
                </span>
              </button>
            </div>

            <div id="demo-workspace" className="mt-5 flex flex-row items-start gap-2 sm:gap-5 md:gap-7">
              <FlowChatPanel
                key={`${demoType}-${resetKey}`}
                flow={typedFlows[demoType]}
                onComplete={handleComplete}
                onProgressChange={(step, complete) => {
                  dispatch({ type: 'progress', step, complete })
                }}
              />
              <div className="h-[620px] w-10 shrink-0 pt-1 sm:h-[650px] sm:w-[190px] md:w-[210px] xl:h-[670px]">
                <VerticalProgress activeStep={progressStep} complete={progressComplete} variant={demoType} />
              </div>
            </div>
          </div>

          {hasResult && (
            <div
              ref={backofficeRef}
              aria-live="polite"
              aria-label="Resultado de la operación"
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
              type="button"
              onClick={reset}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-200 transition-colors duration-150 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b18]"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" /> Reiniciar demo
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
