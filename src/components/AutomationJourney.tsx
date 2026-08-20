import { Check, Database, Sparkles } from 'lucide-react'
import { IntegrationLogo } from './IntegrationLogo'

export type JourneyTool = 'knowledge' | 'calendar' | 'bold' | 'crm'

export type JourneyContext = {
  title: string
  detail: string
  tool: JourneyTool
}

type Props = {
  activeStep: number
  complete: boolean
  context: JourneyContext
}

const steps = [
  { label: 'Información', helper: 'Planes y servicios' },
  { label: 'Agenda', helper: 'Google Calendar' },
  { label: 'Pago', helper: 'Bold' },
  { label: 'Backoffice', helper: 'Operación' },
]

export function AutomationJourney({ activeStep, complete, context }: Props) {
  const progress = complete ? 100 : (activeStep / (steps.length - 1)) * 100
  const progressValue = complete ? 100 : Math.round(((activeStep + 1) / steps.length) * 100)

  return (
    <div className="border-b border-slate-200/80 bg-white px-4 py-3 sm:px-5">
      <div className="mx-auto max-w-[560px]">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold tracking-[-0.01em] text-slate-900 sm:text-xs">Así funciona la atención</p>
            <p className="mt-0.5 text-[9px] text-slate-400 sm:text-[10px]">El proceso avanza mientras conversas con Harmony.</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-[9px] font-bold text-violet-700">
            <Sparkles className="size-3" /> Ignite
          </span>
        </div>

        <div
          className="relative mt-3"
          role="progressbar"
          aria-label="Progreso de la automatización"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressValue}
        >
          <div className="absolute left-[12.5%] right-[12.5%] top-[14px] h-[2px] overflow-hidden rounded-full bg-slate-200">
            <div
              className={`journey-progress-line relative h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-500 ${complete ? 'journey-progress-complete' : ''}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="relative grid grid-cols-4 gap-1">
            {steps.map((item, index) => {
              const completed = complete || index < activeStep
              const active = !complete && index === activeStep

              return (
                <div key={item.label} className="flex min-w-0 flex-col items-center text-center">
                  <span
                    className={`relative z-[1] grid size-7 place-items-center rounded-full border text-[10px] font-extrabold transition-all duration-500 ${
                      completed
                        ? 'border-violet-600 bg-violet-600 text-white shadow-[0_4px_12px_rgba(91,46,255,.18)]'
                        : active
                          ? 'journey-node-active border-violet-500 bg-white text-violet-700 shadow-[0_0_0_4px_rgba(124,58,237,.08)]'
                          : 'border-slate-200 bg-white text-slate-400'
                    }`}
                  >
                    {completed ? <Check className="size-3.5 animate-check-pop" strokeWidth={3} /> : index + 1}
                  </span>
                  <span className={`mt-1.5 truncate text-[9px] font-bold sm:text-[10px] ${completed || active ? 'text-slate-900' : 'text-slate-400'}`}>
                    {item.label}
                  </span>
                  <span className={`mt-0.5 hidden truncate text-[8px] sm:block sm:text-[9px] ${active ? 'font-semibold text-violet-600' : 'text-slate-400'}`}>
                    {item.helper}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div key={`${activeStep}-${complete}-${context.title}`} className="journey-context mt-3 flex items-center gap-2.5 rounded-xl border border-violet-100 bg-gradient-to-r from-violet-50/90 to-white px-3 py-2">
          <ToolIcon tool={context.tool} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {!complete && <span className="journey-live-dot size-1.5 shrink-0 rounded-full bg-violet-500" />}
              <p className="truncate text-[10px] font-extrabold text-slate-800 sm:text-[11px]">{context.title}</p>
            </div>
            <p className="mt-0.5 truncate text-[9px] text-slate-500 sm:text-[10px]">{context.detail}</p>
          </div>
          <span className={`shrink-0 text-[9px] font-bold ${complete ? 'text-emerald-600' : 'text-violet-600'}`}>
            {complete ? 'Completado' : 'En proceso'}
          </span>
        </div>
      </div>
    </div>
  )
}

function ToolIcon({ tool }: { tool: JourneyTool }) {
  if (tool === 'knowledge') {
    return (
      <div className="grid size-7 shrink-0 place-items-center rounded-lg border border-violet-100 bg-white text-violet-600 shadow-sm">
        <Database className="size-3.5" />
      </div>
    )
  }

  return <IntegrationLogo name={tool} size="sm" />
}
