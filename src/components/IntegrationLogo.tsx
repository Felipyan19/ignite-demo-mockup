import { useState } from 'react'

type LogoName = 'whatsapp' | 'calendar' | 'wompi' | 'crm'

const config: Record<LogoName, { src?: string; label: string; fallback: string; bg: string }> = {
  whatsapp: {
    src: 'https://cdn.simpleicons.org/whatsapp/25D366',
    label: 'WhatsApp Business',
    fallback: 'WA',
    bg: 'bg-emerald-50',
  },
  calendar: {
    src: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-calendar/default.svg',
    label: 'Google Calendar',
    fallback: '31',
    bg: 'bg-white',
  },
  wompi: {
    src: 'https://wompi.co/assets/downloadble/logos_wompi/Wompi_ContraccionPrincipal.svg',
    label: 'Wompi',
    fallback: 'W',
    bg: 'bg-[#B0F2AE]',
  },
  crm: {
    label: 'Ignite CRM',
    fallback: 'I',
    bg: 'bg-violet-100',
  },
}

export function IntegrationLogo({ name, size = 'md' }: { name: LogoName; size?: 'sm' | 'md' }) {
  const [failed, setFailed] = useState(false)
  const item = config[name]
  const classes = size === 'sm' ? 'size-7 rounded-lg' : 'size-9 rounded-xl'
  return (
    <div className={`${classes} ${item.bg} grid shrink-0 place-items-center border border-black/[0.06] shadow-sm`} title={item.label}>
      {item.src && !failed ? (
        <img
          src={item.src}
          alt={item.label}
          className={size === 'sm' ? 'size-4.5 object-contain' : 'size-5.5 object-contain'}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-xs font-black text-slate-800">{item.fallback}</span>
      )}
    </div>
  )
}
