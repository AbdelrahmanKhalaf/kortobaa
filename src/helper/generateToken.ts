
import jwt from 'jsonwebtoken'

export const generateToken = (id: any) => {
    console.log('from json web token', process.env.SECRET)
    return jwt.sign({ id }, process.env.SECRET!)
}