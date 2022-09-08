declare interface Events {
  events: any
}

class Events {
  constructor() {
    this.events = {}
  }

  $emit(name, ...param) {
    if (this.events[name]) {
      this.events[name].forEach((item) => {
        item(...param)
      })
    }
  }
  $on(name: string, cb: (...params: any) => void) {
    if (this.events[name]) {
      this.events[name].push(cb)
    } else {
      this.events[name] = [cb]
    }
  }
  $pop(name: string, cb: (...params: any) => void) {
    this.events[name] = this.events[name].filter((item) => {
      return item !== cb
    })
  }
}

export default new Events()
