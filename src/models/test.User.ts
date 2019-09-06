import { expect } from 'chai' 
import User from './User'

describe('User Model', () => {

  it('Should bind email, password and userId properties on constructor call', () => {

    const email = 'alexramsdell@gmail.com'
    const password = 'ZXCVASDFQWER1234'
    const userId = 5
    const user = new User({ email, password, userId })

    expect(user.email).to.equal(email)
    expect(user.password).to.equal(password)
    expect(user.userId).to.equal(userId)

  })

})
