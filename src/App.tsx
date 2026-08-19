import { useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { ChatDemo } from './components/ChatDemo'
import { BackofficeDrawer } from './components/BackofficeDrawer'
import { DemoHeader } from './components/DemoHeader'
import { initialReservation } from './data/demoData'
import type { Reservation } from './data/demoData'

export default function App() {
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [runId, setRunId] = useState(0)

  const resetDemo = () => {
    setReservation(null)
    setDrawerOpen(false)
    setRunId((id) => id + 1)
  }

  const liveReservation = useMemo(
    () => reservation ?? initialReservation,
    [reservation],
  )

  return (
    <main className="app-shell">
      <DemoHeader onReset={resetDemo} />

      <section className="demo-stage">
        <div className="stage-copy">
          <span className="eyebrow"><Sparkles size={15} /> Demo interactiva</span>
          <h1>Prueba cómo Ignite opera una reserva.</h1>
          <p>
            Completa el proceso dentro del chat. Cuando la reserva quede lista,
            podrás ver cómo se reflejaría automáticamente en el backoffice.
          </p>
        </div>

        <div className="chat-frame">
          <ChatDemo
            key={runId}
            onReservationCreated={(item) => setReservation(item)}
            onOpenBackoffice={() => setDrawerOpen(true)}
          />
        </div>
      </section>

      <BackofficeDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        reservation={liveReservation}
        isLive={Boolean(reservation)}
      />
    </main>
  )
}
