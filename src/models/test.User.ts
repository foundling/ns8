import { expect } from 'chai' 
import User from './User'

describe('User Model', () => {

  it('Should bind email and password properties on constructor call', () => {

    const email = 'alexramsdell@gmail.com'
    const password = 'ZXCVASDFQWER1234'
    const user = new User(email, password)

    expect(user.email).to.equal(email)
    expect(user.password).to.equal(password)
    
  })

  it('Should allow email or password to be changed', () => {

    const email = 'alexramsdell@gmail.com'
    const password = 'ZXCVASDFQWER1234'
    const user = new User(email, password)

    expect(user.email).to.equal(email)
    expect(user.password).to.equal(password)

    user.email = 'alexramsdell@netscape.net'
    user.password = 'ASDFASDFASDF1234'

    expect(user.email).to.equal('alexramsdell@netscape.net')
    expect(user.password).to.equal('ASDFASDFASDF1234')
    
  })

})

