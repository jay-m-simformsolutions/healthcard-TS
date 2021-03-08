import { Router } from 'express'
import { signup, userData } from '../controllers/user'

const userRoute = Router()

userRoute.get('/', userData)

userRoute.post('/signup', signup)

export default userRoute
