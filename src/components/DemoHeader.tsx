import { RotateCcw, ShieldCheck } from 'lucide-react'
import { BrandLogo } from './BrandLogo'

export function DemoHeader({ onReset }: { onReset: () => void }) {
  return (
    <header className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
      <BrandLogo />

      <div className="hidden text-center md:block">
        <p className="text-sm font-semibold text-white">Estás probando una simulación realista de Ignite.</p>
        <p className="mt-1 text-xs text-slate-400">Sin registro, sin datos reales y sin salir de esta pantalla.</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-slate-300 sm:flex">
          <ShieldCheck className="size-4 text-emerald-400" />
          <span><strong className="text-white">Simulación</strong><br />No ejecuta acciones reales</span>
        </div>
        <button onClick={onReset} className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label="Reiniciar demo">
          <RotateCcw className="size-4" />
        </button>
      </div>
    </header>
  )
}
