import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || ''
export const getToken = (values: object): String => {
    return jwt.sign({...values}, secret, { expiresIn: '1h' })
}

export const verifyToken: RequestHandler = ( req, res, next) => {

    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1] || null
    if (token) {
        try{
            const user = jwt.verify(token, secret)
            req.body.user = user
            next()   
        } catch(error) {
            res.status(403).json({ message: 'You are not authorized', errors: error })
        }
    } else {
        res.status(403).json({ message : 'You are not authorized'})
    }
}
