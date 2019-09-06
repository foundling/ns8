
export interface IUserEvent {
  type: string
  created: Date
}

export interface IUser {
  email: string
  password: string
  phoneNumber?: string
}
