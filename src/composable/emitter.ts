export interface IEvent {
  name: string
  callback: (payload?: any) => void
}

export class EventEmitter {
  private events: IEvent[] = []

  public emit(name: string, payload: any) {
    const ev = this.events.filter((item) => item.name == name)
    for (const item of ev) {
      item.callback && item.callback(payload)
    }
  }

  public on(name: string, callback: (payload?: any) => void) {
    this.events.push({ name, callback })
  }

  public remove(name: string, callback: (payload?: any) => void) {
    let index = -1
    const isValidEvent = this.events.some((item, idx) => {
      index = idx
      item.name === name && callback == item.callback
    })

    if (isValidEvent && index > -1) {
      this.events.splice(index, 1)
    }
  }

  public clear(name: string) {
    const l = this.events.length - 1
    for (let i = l; i >= 0; i--) {
      const event = this.events[i]
      if (event.name == name) {
        this.events.splice(i, 1)
      }
    }
  }
}

export const emitter = new EventEmitter()
