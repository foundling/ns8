import { expect } from 'chai'
import axios from 'axios'

describe('/api/users', () => {

  it('[GET] should return a users property containing an array and a 200 status code', async () => {

    const response = await axios.get('http://localhost:3000/api/users') 

    expect(response.status).to.equal(200)
    expect(response.data.data.users).to.be.an('array')

  })

  it('[POST] should post a new user and receive the same user data back from the server, with a 201 code.', async () => {

    const { data, status } = await axios.post('http://localhost:3000/api/users', {
      email: 'A@B.com',
      password: 'PASSWORD',
      phoneNumber: '781-030-0987'
    }) 
    const newUser = data.data.user

    expect(status).to.equal(201)
    expect(newUser).to.be.an('object')
    expect(newUser).to.have.property('email', 'A@B.com')
    expect(newUser).to.have.property('password', 'PASSWORD')
    expect(newUser).to.have.property('phoneNumber', '781-030-0987')

  })

  it('[POST] should fail with a 409 on attempt to create a new user if that email is already in the system.', async () => {

    const userResponse1 = await axios.post('http://localhost:3000/api/users', {
      email: 'Z@O.com',
      password: 'PASSWORD',
    }) 

    try {
      const userResponse2 = await axios.post('http://localhost:3000/api/users', {
        email: 'A@B.com',
        password: 'PASSWORD',
      }) 
    } catch(e) {
      expect(e.response.status).to.equal(409)
    }

  })

  it('[POST] should fail with a 400 on attempt to create a new user with an invalid phone number.', async () => {

    try {
      const userResponse = await axios.post('http://localhost:3000/api/users', {
        email: 'AlexR@verizon.net',
        password: 'PASSWORD',
        phoneNumber: '781-303-30491' // extra digit
      }) 
    } catch(e) {
      expect(e.response.status).to.equal(400)
    }

  })


})

describe('/api/users/:userId', () => {

  it('should return an existing user by id', async () => {

     const newUserResponse = await axios.post('http://localhost:3000/api/users', {
      email: 'B@C.com',
      password: 'PASSWORD',
    }) 
    const newUserId = newUserResponse.data.data.user.userId
    const userFetchedById = await axios.get(`http://localhost:3000/api/users/${newUserId}`)

    expect(userFetchedById.status).to.equal(200)
    expect(userFetchedById.data.data.user.userId).to.equal(newUserId)

  })

})

describe('/api/users/:userId/events', () => {

  it('should return all events for an existing user by id', async () => {

    const newUserResponse1 = await axios.post('http://localhost:3000/api/users', {
      email: 'C@D.com',
      password: 'PASSWORD'
    })
    const newUserResponse2 = await axios.post('http://localhost:3000/api/users', {
      email: 'D@Z.com',
      password: 'PASSWORD'
    })
    const targetUserId = newUserResponse2.data.data.user.userId
    const eventsForNewUserResponse = await axios.all([
      axios.post('http://localhost:3000/api/events', { eventType: 'TEST1', userId: targetUserId }),
      axios.post('http://localhost:3000/api/events', { eventType: 'TEST2', userId: targetUserId }),
      axios.post('http://localhost:3000/api/events', { eventType: 'TEST3', userId: targetUserId }),
      axios.post('http://localhost:3000/api/events', { eventType: 'TEST4', userId: targetUserId }),
    ])

    const newUserEventsResponse = await axios.get(`http://localhost:3000/api/users/${targetUserId}/events`)
    const userEvents = newUserEventsResponse.data.data.events

    expect(newUserEventsResponse.status).to.equal(200)
    expect(userEvents).to.be.an('array')
    expect(userEvents).to.have.property('length', 4)
    expect(userEvents.every(e => e.userId === targetUserId)).to.be.true

  })

})
