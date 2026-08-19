import { CheckCircle2, LoaderCircle } from 'lucide-react'
import { IntegrationLogo } from './IntegrationLogo'

export type AutomationStep = {
  id: string
  title: string
  detail: string
  logo: 'whatsapp' | 'calendar' | 'wompi' | 'crm'
}

export function AutomationTrace({ steps, active }: { steps: AutomationStep[]; active: boolean }) {
  if (!steps.length) return null

  return (
    <div
      className="my-3.5 overflow-hidden rounded-xl border border-violet-200/80 bg-white shadow-[0_8px_22px_rgba(88,56,210,.07)] animate-in-up"
      role="status"
      aria-live="polite"
    >
      <div className="border-b border-slate-100 bg-violet-50/50 px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] font-extrabold text-slate-900">Ignite está ejecutando acciones</p>
            <p className="mt-0.5 truncate text-[10px] text-slate-500 sm:text-[11px]">Cada paso representa una integración del negocio.</p>
          </div>
          {active && <LoaderCircle className="size-4 shrink-0 animate-spin text-violet-600" />}
        </div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#6C3CFF] transition-[width] duration-300 ease-out"
            style={{ width: `${Math.min(100, (steps.length / 5) * 100)}%` }}
          />
        </div>
      </div>

      <div className="divide-y divide-slate-100 px-3.5">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center gap-2.5 py-2.5 animate-in-up"
            style={{ animationDelay: `${Math.min(index * 20, 80)}ms` }}
          >
            <IntegrationLogo name={step.logo} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-slate-800 sm:text-xs">{step.title}</p>
              <p className="mt-0.5 truncate text-[10px] text-slate-500 sm:text-[11px]">{step.detail}</p>
            </div>
            <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
          </div>
        ))}
      </div>
    </div>
  )
}
