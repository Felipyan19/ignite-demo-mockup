import { Flame } from 'lucide-react'
import { useState } from 'react'

export function BrandLogo() {
  const [failed, setFailed] = useState(false)

  return (
    <a
      href="https://igniteapps.co/"
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center rounded-xl transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#070b18]"
      aria-label="Ignite Apps (abre en una pestaña nueva)"
    >
      {!failed ? (
        <img
          src="https://igniteapps.co/ignite-apps-logo.svg"
          alt="Ignite Apps"
          width="150"
          height="36"
          className="h-9 w-auto max-w-[150px] object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#5B2EFF] text-white shadow-[0_10px_28px_rgba(105,64,255,.34)]" aria-hidden="true">
            <Flame className="size-5 fill-current" />
          </span>
          <span className="leading-none">
            <span className="block text-xl font-black tracking-[-0.04em] text-white">ignite</span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.22em] text-violet-300/70">Apps</span>
          </span>
        </span>
      )}
    </a>
  )
}
