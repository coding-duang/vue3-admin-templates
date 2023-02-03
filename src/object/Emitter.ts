type EventHandler = (...args: any[]) => void

export class Emitter<EventType extends string | number> {
  private topics: Map<EventType, EventHandler[]> = new Map()

  private getTopic(type: EventType) {
    if (!this.topics.has(type)) {
      this.topics.set(type, [])
    }

    return this.topics.get(type)
  }

  private removeHandler(type: EventType, handler: EventHandler) {
    if (!this.topics.has(type)) return

    const handlers = this.topics.get(type)

    const lastHandlers = handlers.filter((h: EventHandler) => h !== handler)

    this.topics.set(type, lastHandlers)
  }

  public on(type: EventType, handler: EventHandler) {
    const handlers = this.getTopic(type)

    handlers.push(handler)

    return () => this.removeHandler(type, handler)
  }

  public emit(type: EventType, ...args: any[]) {
    const handlers = this.topics.get(type)

    handlers?.forEach((h: EventHandler) => h(...args))
  }
}
