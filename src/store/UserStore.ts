import User, { IUser } from '../models/User'
import Event, { IEvent } from '../models/Event'

interface UserData {
  email: string
  password: string
  phoneNumber?: string
}

type UserMap = Map<number, IUser> 

export default class UserStore {

  users: UserMap
  currentId: number

  constructor() {
    this.users = new Map()
    this.currentId = 0
  }

  
  findById(userId:number):Promise<IUser> {
    const user = this.users.get(userId)
    return Promise.resolve(user)
  }

  findAll():Promise<IUser[]> {
    return Promise.resolve([ ...this.users.values() ])
  }

  create({ email, password, phoneNumber }:UserData) {

    if ([...this.users.values()].find(user => user.email === email))
      return

    this.currentId += 1

    const newUser = new User({ 
      email,
      password,
      phoneNumber,
      userId: this.currentId 
    })
    this.users.set(this.currentId, newUser) 

    return Promise.resolve(newUser) 
  }

  find(properties) {

  }

}
