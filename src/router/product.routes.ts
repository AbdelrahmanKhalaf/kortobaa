import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from './../controller/product.controller'
import { productValidation } from './../model/product.model'
import { validator } from './../middlewares/validate'
import { Roles } from './../enum/Roles'
import { checkRole } from './../middlewares/acsses'
import { AuthenticationMiddleWare } from './../middlewares/auth'
import { Router } from 'express'
const router: Router = Router()
router
  .route('/')
  .all(AuthenticationMiddleWare, checkRole(Roles.USER))
  .post(validator(productValidation, 'post'), addProduct)
  .get(getProducts)
router
  .route('/:id')
  .all(AuthenticationMiddleWare, checkRole(Roles.USER))
  .put(validator(productValidation, 'put'), updateProduct)
  .delete(deleteProduct)
  .get(getProduct)
export default router
