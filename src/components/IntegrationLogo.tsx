import { Database, FileText, type LucideIcon } from 'lucide-react'

type LogoName = 'whatsapp' | 'calendar' | 'bold' | 'wompi' | 'crm' | 'erp' | 'pdf'

const config: Record<LogoName, { src?: string; icon?: LucideIcon; iconColor?: string; label: string; fallback: string; bg: string }> = {
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
  bold: {
    label: 'Bold',
    fallback: 'B',
    bg: 'bg-amber-50',
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
  erp: {
    icon: Database,
    iconColor: 'text-blue-600',
    label: 'Sistema de inventario',
    fallback: 'IN',
    bg: 'bg-blue-50',
  },
  pdf: {
    icon: FileText,
    iconColor: 'text-red-600',
    label: 'Cotización en PDF',
    fallback: 'PDF',
    bg: 'bg-red-50',
  },
}

export function IntegrationLogo({ name, size = 'md' }: { name: LogoName; size?: 'sm' | 'md' }) {
  const item = config[name]
  const classes = size === 'sm' ? 'size-7 rounded-lg' : 'size-9 rounded-xl'
  const Icon = item.icon

  return (
    <div className={`${classes} ${item.bg} grid shrink-0 place-items-center border border-black/[0.06] shadow-sm`} title={item.label}>
      {Icon ? (
        <Icon className={`${size === 'sm' ? 'size-4' : 'size-5'} ${item.iconColor}`} strokeWidth={2.25} />
      ) : item.src ? (
        <img src={item.src} alt={item.label} className={size === 'sm' ? 'size-4.5 object-contain' : 'size-5.5 object-contain'} />
      ) : (
        <span className="text-xs font-black text-slate-800">{item.fallback}</span>
      )}
    </div>
  )
}
