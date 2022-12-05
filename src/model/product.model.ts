import Joi from 'joi';
import mongoose,{ Schema } from 'mongoose'
import { ObjectId } from 'mongodb'
export interface IProdact {
  title: String
  image: string
  price: number
  userId: ObjectId
  _id: String
}
const shcema = new Schema<IProdact>(
  {
    title: String,
    image: {
      type: String,
      default: '/uploads/product.png',
    },
    price: Number,
    userId: ObjectId,
  },
  { timestamps: true },
)
const Product = mongoose.model<IProdact>('product', shcema)
export const productValidation = (prodact: IProdact,reqType:string) => {
    const schema = Joi.object<IProdact>({
      title: Joi.string().alter({
        post: (schema: any) => schema.required(),
      }),
      price: Joi.string().alter({
        post: (schema: any) => schema.required(),
      }),
      image: Joi.string(),
    })
    return schema.tailor(reqType).validate(prodact)
  }
export default Product