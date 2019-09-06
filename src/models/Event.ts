export interface IEvent {
  eventType: string
  eventId: number
  created: number
  userId: number
}

export default class Event implements IEvent {

  eventType: string
  eventId: number
  created: number
  userId: number


  constructor({ eventType, eventId, created, userId }:IEvent) {

    this.eventType = eventType
    this.created = created
    this.eventId = eventId 
    this.userId = userId

  }


}
