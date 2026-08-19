import { RotateCcw, ShieldCheck } from 'lucide-react'
import { BrandLogo } from './BrandLogo'

export function DemoHeader({ onReset }: { onReset: () => void }) {
  return (
    <header className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
      <BrandLogo />

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
          <ShieldCheck className="size-4 text-emerald-400" />
          <span><strong className="font-semibold text-slate-200">Simulación</strong> · sin datos reales</span>
        </div>
        <button
          onClick={onReset}
          className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.035] text-slate-400 transition duration-150 hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
          aria-label="Reiniciar demo"
          title="Reiniciar demo"
        >
          <RotateCcw className="size-4" />
        </button>
      </div>
    </header>
  )
}
