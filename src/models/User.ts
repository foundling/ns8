export default class User {

  private _email: string
  private _password: string
  private _phoneNumber: string

  constructor(email, password, phoneNumber?) {

    this._password = password
    this._email = email
    this._phoneNumber = phoneNumber

  }

  get email() {
    return this._email
  }

  set email(newEmail) {
    this._email = newEmail
  }

  get password() {
    return this._password
  }

  set password(newPassword) {
    this._password = newPassword
  }

  get phoneNumber() {
    return this._phoneNumber
  }

  set phoneNumber(newPhoneNumber) {
    this._phoneNumber = newPhoneNumber
  }

}
