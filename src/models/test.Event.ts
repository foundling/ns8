import { expect } from 'chai' 
import Event from './Event'

describe('Event Model', () => {

  it('Should bind eventType on constructor call', () => {
    const userEvent1 = new Event({ eventType: 'LOGIN', eventId: 1, created: (new Date()).getTime(), userId: 1 })
    expect(userEvent1.eventType).to.equal('LOGIN')
  })

  it('Should bind and eventId on constructor call', () => {
    const userEvent1 = new Event({ eventType: 'LOGIN', eventId: 1, created: (new Date()).getTime(), userId: 2 })
    expect(userEvent1.eventId).to.equal(1)
  })

  it('Should internally create "created" date on construction and make it available via ".created" property  ', () => {
    const start = (new Date()).getTime()
    const userEvent = new Event({ eventType: 'LOGIN', eventId: 1, created: (new Date()).getTime(), userId: 3})
    const end = (new Date()).getTime()

    expect(userEvent.created).to.be.within(start, end)
  })

})

