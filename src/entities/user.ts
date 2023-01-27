import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/IUser.js'

const user = new Schema<IUser>({
  name: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
})

const User = model<IUser>('user', user)

export { User }
