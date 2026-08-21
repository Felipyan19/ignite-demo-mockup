import { Database } from 'lucide-react'
import { IntegrationLogo } from '../IntegrationLogo'
import type { JourneyContext } from './VerticalProgress'

export function JourneyStatus({ complete, context }: { complete: boolean; context: JourneyContext }) {
  return (
    <div
      key={`${context.title}-${complete}`}
      className="journey-context mt-6 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
    >
      <ToolIcon tool={context.tool} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {!complete && <span className="journey-live-dot size-1.5 shrink-0 rounded-full bg-violet-400" />}
          <p className="truncate text-[11px] font-extrabold text-white sm:text-[12px]">{context.title}</p>
        </div>
        <p className="mt-0.5 truncate text-[10px] text-slate-400 sm:text-[11px]">{context.detail}</p>
      </div>
      <span className={`shrink-0 text-[10px] font-bold ${complete ? 'text-emerald-400' : 'text-violet-300'}`}>
        {complete ? 'Completado' : 'En proceso'}
      </span>
    </div>
  )
}

function ToolIcon({ tool }: { tool: JourneyContext['tool'] }) {
  if (tool === 'info') {
    return (
      <div className="grid size-7 shrink-0 place-items-center rounded-lg border border-violet-400/15 bg-violet-400/10 text-violet-200 shadow-sm">
        <Database className="size-3.5" />
      </div>
    )
  }

  return <IntegrationLogo name={tool} size="sm" />
}
