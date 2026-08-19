import { Flame } from 'lucide-react'
import { useState } from 'react'

export function BrandLogo() {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <a href="https://igniteapps.co/" target="_blank" rel="noreferrer" className="flex items-center" aria-label="Ignite Apps">
        <img
          src="https://igniteapps.co/ignite-apps-logo.svg"
          alt="Ignite Apps"
          className="h-9 w-auto max-w-[150px] object-contain"
          onError={() => setFailed(true)}
        />
      </a>
    )
  }

  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#5B2EFF] text-white shadow-[0_10px_28px_rgba(105,64,255,.34)]">
        <Flame className="size-5 fill-current" />
      </div>
      <div className="leading-none">
        <div className="text-xl font-black tracking-[-0.04em] text-white">ignite</div>
        <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-violet-300/70">Apps</div>
      </div>
    </div>
  )
}
