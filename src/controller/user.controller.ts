import { Response } from 'express'
import { generateToken } from '../helper/generateToken'
import { AuthenticatedRequest } from '../middlewares/auth'
import User, { IUser } from '../model/user.model'
import bcrypt from 'bcryptjs'

//DESC  Register
//Route /PoST /store/api/v1/auth/register
//access: Public
export const register = async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findOne({ email: req.body.email })
  if (user)
    return res
      .status(400)
      .send({ success: true, message_en: 'User Already Exist' })
  if (req.body.role)
    return res
      .status(400)
      .send({ success: true, message_en: "You can't add role" })
  let newUser: any
  // what is the use of this in the register
  newUser = new User({
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 10),
  })
  newUser.save()
  res.status(200).send({
    success: true,
    message_en: 'user created successfully',
    user: newUser,
  })
}
//DESC LoginUser
// Route /Post /sotre/api/v1/auth/login
//access: public
export const loginUser = async (req: AuthenticatedRequest, res: Response) => {
  // check if email is the exist to that user
  const user = await User.findOne({ email: req.body.email })
  const isMatch = user
    ? bcrypt.compareSync(req.body.password, user.password)
    : false
  if (!isMatch || !user)
    return res.status(400).send({
      success: false,
      message_en: 'Invalid Email Or Password',
      message_ar: 'خطا في الاميل او الباسورد',
    })
  // check if password match

  // how this possible
  const token = user._id ? generateToken(user._id?._id) : ''
  res.header('Authorization', token).send({
    success: true,
    message_en: 'User Loged in Successfully',
    res: { user, token: token },
  })
}

//@DESC getAll Users
//@Route GET /tala/api/v1/user
//@access : private
export const getAllusers = async (req: AuthenticatedRequest, res: Response) => {
  const users = await User.find({})
  if (users.length <= 0)
    return res
      .status(400)
      .send({ success: false, message_en: 'Users Are Not Found' })
  res.status(200).send({
    success: true,
    message_en: 'Users Are Fetched Successfully',
    count: users.length,
    users,
  })
}
//DESC get user by id
//Route GET /tala/api/v1/user/:id
//access: private(super admin , admin , sub admin)
export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id
  const user = await User.findById(id)
  if (!user)
    return res
      .status(400)
      .send({ success: false, message_en: 'Users Are Not Found' })
  res
    .status(200)
    .send({ success: true, message_en: 'User is Fetched Successfully', user })
}
//DESC get user by id
//Route GET /tala/api/v1/user/me
//access: private(user)
export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id
  const user = await User.findById(req.user?._id)
  if (!user)
    return res
      .status(400)
      .send({ success: false, message_en: 'Users Are Not Found' })
  res
    .status(200)
    .send({ success: true, message_en: 'User is Fetched Successfully', user })
}
//DESC get user by id
//Route GET /tala/api/v1/user/:id
//access: private(user,super admin , admin )
export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id
  let user

  user = await User.findByIdAndUpdate(id, { ...req.body }, { new: true })

  if (!user)
    return res
      .status(400)
      .send({ success: false, message_en: 'Users Are Not Found' })
  res
    .status(200)
    .send({ success: true, message_en: 'User is updated Successfully', user })
}
