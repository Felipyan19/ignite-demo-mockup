import { MoreVertical, PackageSearch, Phone, Video } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { MessageBubble, TypingIndicator, type Message } from './ChatContent'
import { WhatsAppSendIcon } from './icons/WhatsAppSendIcon'
import type { JourneyContext } from './VerticalProgress'

type PaymentTerm = 'new' | '30' | '90' | null

type Props = {
  onProgressChange: (activeStep: number, complete: boolean, context: JourneyContext) => void
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const timeNow = () => new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false })

const totals: Record<Exclude<PaymentTerm, null>, string> = {
  new: '$266.000',
  '30': '$300.000',
  '90': '$326.000',
}

export function InventoryChatPanel({ onProgressChange }: Props) {
  const [messages, setMessages] = useState<Message[]>(() => [{
    id: 1,
    role: 'assistant',
    kind: 'text',
    text: 'Hola 👋 Soy el asistente de inventario. ¿Qué medicamento necesitas cotizar?',
    time: timeNow(),
  }])
  const [step, setStep] = useState(0)
  const [paymentTerm, setPaymentTerm] = useState<PaymentTerm>(null)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)
  const chatScrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const container = chatScrollRef.current
      if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(frame)
  }, [messages, typing])

  const appendText = (role: Message['role'], text: string) => {
    setMessages((current) => [...current, { id: Date.now() + Math.random(), role, kind: 'text', text, time: timeNow() }])
  }

  const respond = async (text: string, delay = 620) => {
    setTyping(true)
    await wait(delay)
    appendText('assistant', text)
    setTyping(false)
  }

  const requestProduct = async () => {
    if (typing) return
    appendText('user', 'Necesito acetaminofén de 500 mg')
    onProgressChange(0, false, { title: 'Producto consultado', detail: 'Acetaminofén · 500 mg', tool: 'product' })
    await respond('Sí, tengo acetaminofén de 500 mg, caja por 100. ¿Cuántas unidades necesitas?')
    setStep(1)
  }

  const requestUnavailableProduct = async () => {
    if (typing) return
    appendText('user', 'Necesito cotizar un producto que no aparece en la lista')
    onProgressChange(0, false, { title: 'Producto por consultar', detail: 'El precio no está disponible en el catálogo', tool: 'product' })
    await respond('Claro. Dame un momento para consultar la disponibilidad y el precio con la persona encargada. Te mantendré informado.')
    onProgressChange(0, false, { title: 'Consulta escalada', detail: 'Solicitud enviada a la persona encargada', tool: 'product' })
    setDone(true)
  }

  const selectQuantity = async () => {
    if (typing) return
    appendText('user', 'Necesito 100 unidades')
    onProgressChange(0, false, { title: 'Solicitud completa', detail: 'Acetaminofén 500 mg · 100 unidades', tool: 'product' })
    await respond('Perfecto. Para preparar el precio correcto, ¿eres cliente nuevo o ya estás registrado?')
    onProgressChange(1, false, { title: 'Identificando al cliente', detail: 'Validación de datos y condición comercial', tool: 'customer' })
    setStep(2)
  }

  const selectCustomer = async (type: 'new' | 'registered') => {
    if (typing) return
    appendText('user', type === 'new' ? 'Soy cliente nuevo' : 'Ya estoy registrado')

    if (type === 'new') {
      await respond('Con gusto. Para crear tu cotización formal necesito tu nombre, datos de contacto, NIT, RUT y Cámara de Comercio.')
      onProgressChange(1, false, { title: 'Solicitando datos', detail: 'Nombre, contacto, NIT, RUT y Cámara de Comercio', tool: 'customer' })
      setStep(3)
      return
    }

    await respond('Hola, Javier. Ya encontré tus datos. ¿Deseas pagar a 30 días o entre 30 y 90 días?')
    onProgressChange(1, false, { title: 'Cliente reconocido', detail: 'Javier · datos recuperados, sin volver a solicitarlos', tool: 'customer' })
    setStep(4)
  }

  const submitNewCustomerData = async () => {
    if (typing) return
    appendText('user', 'Compartir datos para la cotización')
    setPaymentTerm('new')
    onProgressChange(1, false, { title: 'Cliente registrado', detail: 'Datos comerciales recibidos correctamente', tool: 'customer' })
    await showQuote('new')
  }

  const selectPaymentTerm = async (term: '30' | '90') => {
    if (typing) return
    setPaymentTerm(term)
    appendText('user', term === '30' ? 'Pago a 30 días' : 'Pago entre 30 y 90 días')
    await showQuote(term)
  }

  const showQuote = async (term: Exclude<PaymentTerm, null>) => {
    const total = totals[term]
    onProgressChange(2, false, { title: 'Calculando cotización', detail: 'Precio calculado según la condición comercial', tool: 'quote' })
    await respond(`Esta es tu cotización:\n\nAcetaminofén 500 mg · 100 unidades\nValor total: ${total}\n\n¿Deseas recibir la cotización formal en PDF?`, 760)
    onProgressChange(2, false, { title: 'Cotización presentada', detail: `100 unidades · total ${total}`, tool: 'quote' })
    setStep(5)
  }

  const generatePdf = async () => {
    if (typing || !paymentTerm) return
    appendText('user', 'Sí, generar cotización formal')
    setTyping(true)
    await wait(700)
    setMessages((current) => [...current, {
      id: Date.now() + Math.random(),
      role: 'assistant',
      kind: 'quote-document',
      time: timeNow(),
      documentName: 'Cotización-COT-1048.pdf',
      documentTotal: totals[paymentTerm],
    }])
    setTyping(false)
    onProgressChange(2, false, { title: 'PDF generado', detail: 'Cotización formal enviada por WhatsApp', tool: 'quote' })
    setStep(6)
  }

  const continueWithoutPdf = async () => {
    if (typing) return
    appendText('user', 'Continuar sin PDF')
    await respond('Entendido. ¿Confirmas que deseas realizar el pedido con esta cotización?')
    setStep(6)
  }

  const confirmOrder = async () => {
    if (typing || !paymentTerm) return
    appendText('user', 'Confirmar pedido')
    onProgressChange(3, false, { title: 'Creando orden previa', detail: 'Cotización aceptada por el cliente', tool: 'order' })
    await respond('¡Listo! He tomado tu pedido, preparé la orden de compra previa y la envié a la persona encargada. Te mantendré informado.', 820)
    onProgressChange(3, true, { title: 'Pedido enviado', detail: `Orden previa · ${totals[paymentTerm]} · pendiente de gestión`, tool: 'order' })
    setDone(true)
  }

  const quickActions: { label: string; onClick: () => void }[] =
    step === 0 ? [
      { label: 'Cotizar acetaminofén', onClick: requestProduct },
      { label: 'Consultar producto sin precio', onClick: requestUnavailableProduct },
    ]
      : step === 1 ? [{ label: '100 unidades', onClick: selectQuantity }]
        : step === 2 ? [
          { label: 'Soy cliente nuevo', onClick: () => selectCustomer('new') },
          { label: 'Ya estoy registrado', onClick: () => selectCustomer('registered') },
        ]
          : step === 3 ? [{ label: 'Compartir datos', onClick: submitNewCustomerData }]
            : step === 4 ? [
              { label: 'Pago a 30 días', onClick: () => selectPaymentTerm('30') },
              { label: 'Pago entre 30 y 90 días', onClick: () => selectPaymentTerm('90') },
            ]
              : step === 5 ? [
                { label: 'Generar PDF', onClick: generatePdf },
                { label: 'Continuar sin PDF', onClick: continueWithoutPdf },
              ]
                : step === 6 ? [{ label: 'Confirmar pedido', onClick: confirmOrder }]
                  : []

  return (
    <section className="wa-wallpaper flex h-[620px] w-full min-w-0 max-w-[400px] flex-1 flex-col overflow-hidden rounded-[22px] shadow-[0_24px_60px_-24px_rgba(0,0,0,.55)] transition-shadow duration-300 sm:h-[650px] xl:h-[670px]">
      <div className="flex h-[66px] shrink-0 items-center gap-3 bg-[#008069] px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,.25)] sm:px-[18px]">
        <div className="grid size-[38px] shrink-0 place-items-center rounded-full bg-white/15 text-white"><PackageSearch className="size-4" /></div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[13px] font-extrabold text-white sm:text-sm">Asistente de inventario</h2>
          <p className="mt-px text-[11.5px] text-white/70" aria-live="polite">{typing ? 'escribiendo…' : 'en línea'}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3.5 text-white/90 sm:gap-4">
          <Video className="size-[19px]" strokeWidth={1.75} />
          <Phone className="size-[16px]" strokeWidth={1.75} />
          <MoreVertical className="size-[18px]" strokeWidth={1.75} />
        </div>
      </div>

      <div ref={chatScrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5">
        <div className="mx-auto max-w-[368px]">
          {messages.map((message) => <MessageBubble key={message.id} message={message} />)}
          {typing && <TypingIndicator />}
        </div>
      </div>

      {!done && !typing && quickActions.length > 0 && (
        <div className="px-4 pb-2 pt-1 sm:px-5">
          <div className="mx-auto flex max-w-[368px] flex-wrap justify-center gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                className="inline-flex min-h-[34px] animate-in-up items-center rounded-full bg-white px-4 py-1.5 text-[12.5px] font-medium text-[#111b21] shadow-[0_1px_3px_rgba(0,0,0,.2)] transition hover:bg-[#f5f5f5] active:scale-[0.98]"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="chat-input px-4 py-2.5 sm:px-5">
        <div className="mx-auto flex max-w-[368px] items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
          <input
            value=""
            readOnly
            disabled
            placeholder={done ? 'La demostración terminó.' : typing ? 'El asistente está respondiendo…' : 'Elige una opción arriba para continuar'}
            className="min-w-0 flex-1 cursor-not-allowed bg-transparent px-1 py-2 text-[13px] text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
          />
          <button disabled className="grid size-9 shrink-0 place-items-center rounded-full bg-[#00a884] text-white" aria-label="Enviar mensaje">
            <WhatsAppSendIcon className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
