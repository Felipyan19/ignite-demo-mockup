export type ProgressTool = 'info' | 'calendar' | 'bold' | 'crm' | 'product' | 'customer' | 'quote' | 'order'

export type ProgressBeat = {
  type: 'progress'
  step: number
  complete: boolean
  title: string
  detail: string
  tool: ProgressTool
}

export type WaitBeat = {
  type: 'wait'
  ms: number
  showTyping?: boolean
}

export type MessageBeat = {
  type: 'message'
  kind: 'text' | 'plans' | 'payment-link' | 'quote-document'
  delay?: number
  text?: string
  plansStep?: string
  plansKey?: string
  paymentUrl?: string
  paymentAmount?: string
  paymentConcept?: string
  documentName?: string
  documentTotal?: string
}

export type CompleteBeat = {
  type: 'complete'
  result: 'reservation' | 'order'
  fields: Record<string, string | number | boolean>
}

export type EndBeat = { type: 'end' }

export type GotoBeat = { type: 'goto'; step: string }

export type FlowBeat = ProgressBeat | WaitBeat | MessageBeat | CompleteBeat | EndBeat | GotoBeat

export type FlowOption = {
  id: string
  label: string
  userText?: string
  data?: Record<string, unknown>
  captures?: string[]
  sequence: FlowBeat[]
}

export type FlowStep = {
  id: string
  options?: FlowOption[]
  onPaid?: FlowBeat[]
  placeholder?: string
}

export type FlowDefinition = {
  header: {
    title: string
    icon: string
    onlineText: string
    typingText: string
  }
  greeting: string
  placeholder: {
    idle: string
    typing: string
    done: string
  }
  start: string
  steps: FlowStep[]
}

export type FlowsConfig = {
  agenda: FlowDefinition
  inventory: FlowDefinition
}
