import { Flame } from 'lucide-react'
import { baseInventoryActivity, inventoryMetrics, newInventoryActivity, todaysOrders, type Order } from '../data/demoData'
import { IntegrationLogo } from './IntegrationLogo'

const activity = [...newInventoryActivity, ...baseInventoryActivity]

export function InventoryBackofficeLive({ order }: { order: Order }) {
  const rows = [order, ...todaysOrders]

  return (
    <div>
      <div className="backoffice-kicker mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-violet-300/80">
        <ArrowIcon /> Resultado en tu negocio
      </div>

      <section className="backoffice-panel demo-backoffice-theme overflow-hidden rounded-[24px] bg-[var(--bo-bg)] shadow-[0_22px_60px_rgba(0,0,0,.28)]">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--bo-border)] bg-white/95 px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#5B2EFF] text-white shadow-[0_6px_16px_rgba(105,64,255,.3)]">
              <Flame className="size-4 fill-current" />
            </div>
            <h2 className="truncate text-[15px] font-bold tracking-[-0.01em] text-[var(--bo-text)]">Backoffice · QuimFarma</h2>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
            <span className="live-dot size-1.5 rounded-full bg-emerald-500" /> En vivo
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-2.5">
            <Metric label="Pedidos hoy" value={inventoryMetrics.ordersToday} />
            <Metric label="Clientes" value={inventoryMetrics.clients} />
            <Metric label="Cotizado" value={inventoryMetrics.quoted} />
          </div>

          <div className="mt-3.5">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[var(--bo-muted)]">Pedidos de hoy</p>
            <div className="overflow-hidden rounded-lg border border-[var(--bo-border)] bg-white">
              {rows.map((row, index) => (
                <div
                  key={row.id}
                  className={`flex items-center justify-between gap-3 border-t border-[var(--bo-border)] p-3 first:border-t-0 transition duration-150 ${index === 0 ? 'bg-[var(--bo-accent-soft)] animate-highlight' : 'bg-white'}`}
                >
                  <div className="min-w-0">
                    <strong className="truncate text-xs font-semibold text-[var(--bo-text)]">{row.customer}</strong>
                    <p className="mt-0.5 text-[11px] text-[var(--bo-muted)]">
                      {row.product} · {row.quantity} · {row.term}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-[11px] font-semibold text-[var(--bo-text)]">{row.total}</span>
                    {row.isNew && (
                      <span className="shrink-0 rounded-full bg-violet-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white">Nuevo</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3.5">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[var(--bo-muted)]">Actividad reciente</p>
            <div className="rounded-lg border border-[var(--bo-border)] bg-white px-3.5">
              {activity.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 border-t border-[var(--bo-border)] py-2.5 text-[11px] first:border-t-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-violet-400" />
                    <span className="truncate text-[var(--bo-text)]">{item.text}</span>
                  </div>
                  <span className="shrink-0 text-[10px] text-[var(--bo-muted)]">{item.when}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3.5">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[var(--bo-muted)]">Integraciones</p>
            <div className="flex flex-wrap gap-2">
              <IntegrationPill logo="whatsapp" label="WhatsApp Business" />
              <IntegrationPill logo="erp" label="Sistema de inventario" />
              <IntegrationPill logo="crm" label="Ignite CRM" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--bo-border)] bg-white p-3">
      <p className="text-[10px] font-medium text-[var(--bo-muted)]">{label}</p>
      <strong className="mt-1 block text-lg font-bold tracking-tight text-[var(--bo-text)]">{value}</strong>
    </div>
  )
}

function IntegrationPill({ logo, label }: { logo: 'whatsapp' | 'erp' | 'crm'; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--bo-border)] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[var(--bo-text)]">
      <IntegrationLogo name={logo} size="sm" />
      {label}
    </span>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-3.5 shrink-0" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
