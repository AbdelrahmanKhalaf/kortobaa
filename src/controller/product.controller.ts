import { Response } from 'express'
import Product from '../model/product.model'
import { AuthenticatedRequest } from './../middlewares/auth'

//DESC  :  Add new product
//Route :  POST /store/api/v1/prodact
//access:  Private (user)
export const addProduct = (req: AuthenticatedRequest, res: Response) => {
  const prodact = new Product({ ...req.body, userId: req.user?._id })
  prodact.save()
  res.send({
    sucsess: true,
    message_en: 'Product created successfully',
  })
}
//DESC  :  Update product user
//Route :  POST /store/api/v1/prodact/:id
//access:  Private (user)
export const updateProduct = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const product = await Product.findOne({
    _id: req.params.id,
    userId: req.user?._id,
  })
  if (!product)
    return res.status(400).send({
      error_en: 'The prodact with the given ID is not found in your products',
    })
  await Product.updateOne(
    { _id: req.params.id, userId: req.user?._id },
    {
      $set: { ...req.body },
    },
  )
  res.send({
    sucsess: true,
    message_en: 'Product updated successfully',
  })
}
//DESC  :  delete product user
//Route :  POST /store/api/v1/prodact/:id
//access:  Private (user)
export const deleteProduct = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const product = await Product.findOne({
    _id: req.params.id,
    userId: req.user?._id,
  })
  if (!product)
    return res.status(400).send({
      error_en: 'The prodact with the given ID is not found in your products',
    })
  await Product.deleteOne({ _id: req.params.id, userId: req.user?._id })
  res.send({
    sucsess: true,
    message_en: 'Product deleted successfully',
  })
}
//DESC  :  get product user
//Route :  POST /store/api/v1/prodact/:id
//access:  Private (user)
export const getProduct = async (req: AuthenticatedRequest, res: Response) => {
  const product = await Product.findOne({
    _id: req.params.id,
    userId: req.user?._id,
  })
  if (product)
    return res.status(400).send({
      error_en: 'Product with the given ID is not found in your products ',
    })
   res.send({
    sucsess: true,
    message_en: 'Product fetched successfully',
    product,
  })
}
//DESC  :  get products user
//Route :  POST /store/api/v1/prodact/
//access:  Private (user)
export const getProducts = async (req: AuthenticatedRequest, res: Response) => {
    const products = await Product.find({
      userId: req.user?._id,
    })
    if (!products[0])
      return res.status(400).send({
        error_en: 'You do not have any prodact yet..',
      })
    res.send({
      sucsess: true,
      message_en: 'Products fetched successfully',
      products,
    })
  }