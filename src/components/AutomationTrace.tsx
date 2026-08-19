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
      className="mx-2 my-4 overflow-hidden rounded-2xl border border-violet-200/80 bg-white shadow-[0_10px_26px_rgba(88,56,210,.08)] animate-in-up"
      role="status"
      aria-live="polite"
    >
      <div className="border-b border-slate-100 bg-violet-50/55 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold text-slate-900">Ignite está ejecutando acciones</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Cada paso representa una integración del negocio.</p>
          </div>
          {active && <LoaderCircle className="size-4 animate-spin text-violet-600" />}
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#6C3CFF] transition-[width] duration-300 ease-out"
            style={{ width: `${Math.min(100, (steps.length / 5) * 100)}%` }}
          />
        </div>
      </div>

      <div className="divide-y divide-slate-100 px-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center gap-3 py-3 animate-in-up"
            style={{ animationDelay: `${Math.min(index * 25, 100)}ms` }}
          >
            <IntegrationLogo name={step.logo} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800">{step.title}</p>
              <p className="mt-0.5 truncate text-[11px] text-slate-500">{step.detail}</p>
            </div>
            <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
          </div>
        ))}
      </div>
    </div>
  )
}
