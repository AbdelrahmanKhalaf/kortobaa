import { loginUser, register } from './../controller/user.controller';
import { Router } from 'express'
const router: Router = Router()
router.route('/login').post(loginUser)
router.route('/register').post(register)
export default router
