import { Router } from 'express'
import { getUser, signin, signup, userData } from '../controllers/user'
import { verifyToken } from '../utils/jwt'

const userRoute = Router()

userRoute.get('/', userData)

userRoute.post('/signup', signup)

userRoute.post('/signin', signin)

userRoute.use(verifyToken)

userRoute.get('/:id', getUser)

export default userRoute
