import { expect } from 'chai' 
import User, { IUser } from '../models/User'
import UserStore from './UserStore'

describe('User Store', () => {

  it('should initially have currentId of 0', () => {

    const store = new UserStore()
    expect(store.currentId).to.equal(0)

  })

  it('should return a new user once it has been added with create method', async () => {

    const store = new UserStore()
    const userData = { email: 'A@B.com', password: 'PASSWORD' }
    const createdUser = await store.create(userData)

    expect(createdUser.userId).to.equal(1)
    expect(store.currentId).to.equal(1)

  })

  it('should fetch an existing user by id', async () => {

    const store = new UserStore()
    const userData = { email: 'A@B.com', password: 'PASSWORD' }
    const createdUser = await store.create(userData)
    const fetchedUser = await store.findById(createdUser.userId)

    expect(fetchedUser.userId).to.equal(createdUser.userId)
    expect(fetchedUser.email).to.equal(createdUser.email)
    expect(fetchedUser.password).to.equal(createdUser.password)
    expect(fetchedUser.phoneNumber).to.equal(createdUser.phoneNumber)

  })

  it('should not create a new user if the same email already exists', async () => {

    const store = new UserStore()
    const userA = { email: 'A@B.com', password: 'PASSWORD' }
    const userB = { email: 'A@B.com', password: 'ASDF1234' }
    const createdUserA = await store.create(userA)
    const createdUserB = await store.create(userB)

    expect(createdUserA.userId).to.equal(1)
    expect(createdUserA.email).to.equal('A@B.com')
    expect(createdUserA.password).to.equal('PASSWORD')

    expect(store.currentId).to.equal(1)
    expect(createdUserB).to.equal(undefined)

  })


})
