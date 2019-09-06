import { expect } from 'chai' 
import Event, { IEvent } from '../models/Event'
import EventStore from './EventStore'

describe('Event Store', () => {

  it('should initially have currentId of 0', () => {

    const store = new EventStore()
    expect(store.currentId).to.equal(0)

  })

  it('should return a new event once it has been added with a create method', async () => {

    const store = new EventStore()
    const eventData = { eventType: 'LOGIN' }
    const startTime = (new Date()).getTime()
    const createdEvent = await store.create(eventData)
    const endTime = (new Date()).getTime()

    expect(store.currentId).to.equal(1)
    expect(createdEvent.eventId).to.equal(1)
    expect(createdEvent.eventType).to.equal('LOGIN')

    expect(createdEvent.created).to.be.within(startTime, endTime)
  })


})
