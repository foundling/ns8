import User, { IUser } from '../models/User'
import Event, { IEvent } from '../models/Event'

export default class EventStore {

  events: Map<number,IEvent>
  currentId:number

  constructor() {
    this.currentId = 0
    this.events = new Map()
  }

  // how to type a subset of an interface?
  create({ eventType, userId }:any):Promise<Event> {

    this.currentId += 1

    const newEvent = new Event({ 
      userId,
      eventType,
      eventId: this.currentId, 
      created: (new Date()).getTime()
    })

    this.events.set(newEvent.eventId, newEvent)

    return Promise.resolve(newEvent)

  }

  find(properties):Promise<Event[]> {
    const keys = Object.keys(properties).filter(key => properties[key])
    const matched = [...this.events.values()].filter(userEvent => keys.every(k => userEvent[k] == properties[k])) 

    return Promise.resolve(matched)
  }

  findAll():Promise<Event[]> {
    const allEvents = [...this.events.values()]
    return Promise.resolve(allEvents)
  }

  findById(eventId: number):Promise<Event> {
    return Promise.resolve(this.events.get(eventId))
  }

}
