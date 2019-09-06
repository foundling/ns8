import { expect } from 'chai'
import axios from 'Axios'

describe('/api/events', () => {

  it('[GET] should return an array of events with a 200 status code', async () => {

    const { status, data:eventData } = await axios.get('http://localhost:3000/api/events')

    expect(status).to.equal(200)

    expect(eventData).to.have.own.property('data')
    expect(eventData.data).to.have.own.property('events')
    expect(eventData.data.events).to.be.an('array')

  })

  it('[GET /api/events?start=DATETIME] should return an array of events after a certain DATETIME', async () => {

    // create new user
    const newUserResponse = await axios.post('http://localhost:3000/api/users', { email: 'X@Y.com', password: 'PASSWORD' })
    const newUserId = newUserResponse.data.data.user.userId

    // create events for that user
    const eventBeforeCutoff = await axios.post('http://localhost:3000/api/events', { eventType: 'LOGIN', userId: newUserId  })
    const cutoffDate = (new Date()).getTime()
    const eventAfterCutoff = await axios.post('http://localhost:3000/api/events', { eventType: 'LOGOUT', userId: newUserId })

    // get events, filtering by cutoff
    const { status, data } = await axios.get(`http://localhost:3000/api/events?start=${cutoffDate}`)

    expect(data.data.events.every(e => e.created >= cutoffDate)).to.be.true
    expect(status).to.equal(200)

  })

})
