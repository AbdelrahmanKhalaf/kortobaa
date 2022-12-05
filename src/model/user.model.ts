import { Roles } from './../enum/Roles'
import mongoose, { Schema } from 'mongoose'
import { ObjectId } from 'mongodb'
import Joi, { array } from 'joi'

export interface IUser {
  name: String
  password: string
  email: String
  phone: String
  image: String
  role: String
  _id: ObjectId
}
const userSchema = new Schema(
  {
    name: { type: String },
    password: { type: String },
    email: { type: String },
    phone: { type: Number },
    role: {
      type: String,
      enum: [Roles],
      default: 'user',
    },
    image: {
      type: String,
      default: 'uploads/avatr.png',
    },
    resetLink: String,
  },
  { timestamps: true },
)

const User = mongoose.model('User', userSchema)
export default User

export const userValidation = (user: IUser) => {
  const schema = Joi.object({
    name: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    password: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    email: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    phone: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    role: Joi.string().valid(Roles),
    image: Joi.string(),
  })
  return schema.validate(user)
}

