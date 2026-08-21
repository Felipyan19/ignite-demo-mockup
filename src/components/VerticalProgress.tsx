import { ClipboardCheck, FileText, Flame, Info, PackageSearch, UserRoundCheck } from 'lucide-react'
import { IntegrationLogo } from './IntegrationLogo'

export type ProgressTool = 'info' | 'calendar' | 'bold' | 'crm' | 'product' | 'customer' | 'quote' | 'order'

export type JourneyContext = {
  title: string
  detail: string
  tool: ProgressTool
}

const agendaStages: { label: string; helper: string; tool: ProgressTool }[] = [
  { label: 'Información', helper: 'Planes y servicios', tool: 'info' },
  { label: 'Agenda', helper: 'Google Calendar', tool: 'calendar' },
  { label: 'Pago', helper: 'Bold', tool: 'bold' },
  { label: 'Backoffice', helper: 'Operación', tool: 'crm' },
]

const inventoryStages: { label: string; helper: string; tool: ProgressTool }[] = [
  { label: 'Solicitud', helper: 'Producto y cantidad', tool: 'product' },
  { label: 'Cliente', helper: 'Datos comerciales', tool: 'customer' },
  { label: 'Cotización', helper: 'Precio y PDF', tool: 'quote' },
  { label: 'Pedido', helper: 'Orden previa', tool: 'order' },
]

export function VerticalProgress({ activeStep, complete, variant = 'agenda' }: { activeStep: number; complete: boolean; variant?: 'agenda' | 'inventory' }) {
  const stages = variant === 'inventory' ? inventoryStages : agendaStages
  const progress = complete ? 100 : (activeStep / (stages.length - 1)) * 100
  const progressValue = complete ? 100 : Math.round(((activeStep + 1) / stages.length) * 100)

  return (
    <div
      className="vprogress relative flex h-full flex-col justify-between py-1"
      role="progressbar"
      aria-label="Progreso de la automatización"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progressValue}
    >
      <div className="absolute left-4 top-4 bottom-4 w-[2px] overflow-visible rounded-full bg-white/[0.07]">
        {[25, 50, 75].map((mark) => (
          <span key={mark} className="absolute -left-[3px] h-px w-2 rounded-full bg-white/15" style={{ top: `${mark}%` }} />
        ))}
        <div
          className={`vprogress-fill relative w-full overflow-hidden rounded-full bg-gradient-to-b from-violet-400 via-fuchsia-400 to-violet-500 ${complete ? 'vprogress-complete' : ''}`}
          style={{ height: `${progress}%` }}
        >
          {!complete && <span className="vprogress-dot" />}
        </div>
      </div>

      {stages.map((stage, index) => {
        const done = complete || index < activeStep
        const active = !complete && index === activeStep
        const lit = done || active

        return (
          <div key={stage.label} className="relative flex items-center gap-3 pl-0">
            <StageIcon tool={stage.tool} lit={lit} active={active} />
            <div className="hidden min-w-0 sm:block">
              <p className={`text-[11px] font-extrabold transition-colors duration-300 sm:text-xs ${lit ? 'text-white' : 'text-slate-500'}`}>
                {stage.label}
              </p>
              <p className={`mt-0.5 truncate text-[9px] transition-colors duration-300 sm:text-[10px] ${active ? 'text-violet-300' : lit ? 'text-slate-400' : 'text-slate-600'}`}>
                {stage.helper}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function StageIcon({ tool, lit, active }: { tool: ProgressTool; lit: boolean; active: boolean }) {
  const ring = active ? 'vprogress-node-active' : ''

  if (tool === 'info') {
    return (
      <div className={`relative z-[1] grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${ring} ${lit ? 'border-violet-400/70 bg-violet-500/15 text-violet-200 shadow-[0_0_0_4px_rgba(124,58,237,.10)]' : 'border-white/10 bg-[#0c1020] text-slate-600'}`}>
        <Info className="size-3.5" />
      </div>
    )
  }

  if (tool === 'crm') {
    return (
      <div className={`relative z-[1] grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${ring} ${lit ? 'border-violet-400/70 bg-gradient-to-br from-[#8B5CF6] to-[#5B2EFF] text-white shadow-[0_0_18px_rgba(139,92,246,.35)]' : 'border-white/10 bg-[#0c1020] text-slate-600'}`}>
        <Flame className={`size-3.5 ${lit ? 'fill-current' : ''}`} />
      </div>
    )
  }

  const InventoryIcon = tool === 'product'
    ? PackageSearch
    : tool === 'customer'
      ? UserRoundCheck
      : tool === 'quote'
        ? FileText
        : tool === 'order'
          ? ClipboardCheck
          : null

  if (InventoryIcon) {
    return (
      <div className={`relative z-[1] grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${ring} ${lit ? 'border-violet-400/70 bg-violet-500/15 text-violet-200 shadow-[0_0_0_4px_rgba(124,58,237,.10)]' : 'border-white/10 bg-[#0c1020] text-slate-600'}`}>
        <InventoryIcon className="size-3.5" />
      </div>
    )
  }

  if (tool === 'calendar' || tool === 'bold') {
    return (
      <div className={`relative z-[1] grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${ring} ${lit ? 'shadow-[0_0_0_4px_rgba(124,58,237,.10)]' : 'opacity-35 grayscale'}`}>
        <IntegrationLogo name={tool} size="sm" />
      </div>
    )
  }

  return null
}
