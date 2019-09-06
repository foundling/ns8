export interface IUser {
  email: string
  password: string
  phoneNumber?: string
  userId: number
}

export default class User implements IUser {

  email: string
  password: string
  phoneNumber: string
  userId: number

  constructor({ email, password, userId, phoneNumber }:IUser) {

    this.password = password
    this.email = email
    this.userId = userId
    this.phoneNumber = phoneNumber

  }


}
