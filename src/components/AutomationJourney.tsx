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
    <div className="rounded-[18px] border border-white/10 bg-white/[0.045] px-4 py-3.5 shadow-[0_18px_45px_rgba(0,0,0,.16)] backdrop-blur-md sm:px-5 sm:py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold tracking-[-0.01em] text-white sm:text-xs">Así funciona la atención</p>
          <p className="mt-0.5 text-[9px] text-slate-400 sm:text-[10px]">El proceso avanza mientras conversas con Harmony.</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-400/10 px-2.5 py-1 text-[9px] font-bold text-violet-200">
          <Sparkles className="size-3" /> Ignite
        </span>
      </div>

      <div
        className="relative mt-3.5"
        role="progressbar"
        aria-label="Progreso de la automatización"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressValue}
      >
        <div className="absolute left-[12.5%] right-[12.5%] top-[14px] h-[2px] overflow-hidden rounded-full bg-white/10">
          <div
            className={`journey-progress-line relative h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-violet-400 ${complete ? 'journey-progress-complete' : ''}`}
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
                      ? 'border-violet-500 bg-violet-500 text-white shadow-[0_5px_16px_rgba(124,58,237,.24)]'
                      : active
                        ? 'journey-node-active border-violet-400 bg-[#111528] text-violet-200 shadow-[0_0_0_4px_rgba(124,58,237,.10)]'
                        : 'border-white/15 bg-[#0c1020] text-slate-500'
                  }`}
                >
                  {completed ? <Check className="size-3.5 animate-check-pop" strokeWidth={3} /> : index + 1}
                </span>
                <span className={`mt-1.5 truncate text-[9px] font-bold sm:text-[10px] ${completed || active ? 'text-white' : 'text-slate-500'}`}>
                  {item.label}
                </span>
                <span className={`mt-0.5 hidden truncate text-[8px] sm:block sm:text-[9px] ${active ? 'font-semibold text-violet-300' : 'text-slate-500'}`}>
                  {item.helper}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div key={`${activeStep}-${complete}-${context.title}`} className="journey-context mt-3.5 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5">
        <ToolIcon tool={context.tool} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {!complete && <span className="journey-live-dot size-1.5 shrink-0 rounded-full bg-violet-400" />}
            <p className="truncate text-[10px] font-extrabold text-white sm:text-[11px]">{context.title}</p>
          </div>
          <p className="mt-0.5 truncate text-[9px] text-slate-400 sm:text-[10px]">{context.detail}</p>
        </div>
        <span className={`shrink-0 text-[9px] font-bold ${complete ? 'text-emerald-400' : 'text-violet-300'}`}>
          {complete ? 'Completado' : 'En proceso'}
        </span>
      </div>
    </div>
  )
}

function ToolIcon({ tool }: { tool: JourneyTool }) {
  if (tool === 'knowledge') {
    return (
      <div className="grid size-7 shrink-0 place-items-center rounded-lg border border-violet-400/15 bg-violet-400/10 text-violet-200 shadow-sm">
        <Database className="size-3.5" />
      </div>
    )
  }

  return <IntegrationLogo name={tool} size="sm" />
}
