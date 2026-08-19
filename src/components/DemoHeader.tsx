import { RotateCcw } from 'lucide-react'

export function DemoHeader({ onReset }: { onReset: () => void }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">I</div>
        <div>
          <strong>Ignite</strong>
          <span>Interactive demo</span>
        </div>
      </div>

      <button className="ghost-button" onClick={onReset}>
        <RotateCcw size={16} />
        Reiniciar demo
      </button>
    </header>
  )
}
