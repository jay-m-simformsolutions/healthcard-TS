import { RequestHandler } from 'express'
import Patient from '../models/user'
import { getToken } from '../utils/jwt'

export const userData : RequestHandler = async (req, res, next) => {
    console.log('user route');
    res.status(200).json({ message: 'user route' })
}

export const signup: RequestHandler = async (req, res, next) => {
    try {
        const { patientPass, patientName, bloodGrp } = req.body 
        const userObj = {
            patientName,
            patientPass,
            dateOfBirth: new Date(),
            bloodGrp
        }
        const user = await Patient.create(userObj) 
        res.status(201).json({ 
            user: {
                patientID: user?.patientID,
                patientName: user?.patientName,
                dateOfBirth: user?.dateOfBirth,
                bloodGrp: user?.bloodGrp
            } 
        })
    } catch(error) {
        res.status(404).json({ message: 'Something went wrong please try again!' })
    }
}

export const signin: RequestHandler = async (req, res, next) => {
    try {
        const { userID, userPass } = req.body
        const user = await Patient.findOne({
            where: {
                patientID: userID
            }
        })
        const auth = await user?.authenticate(userPass)

        if(auth){
            const token = getToken({ _id: userID, role: '"Patient"' })
            res.status(200).json({ user , token })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch(error) {
        res.status(403).json({ message: 'Something went wrong please try again!' })
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
    console.log(req.params.id)
    if(req.body.user._id){
        try {
            const user = await Patient.findOne({ where: {
                patientID: req.params.id
            },
            attributes: ['patientID', 'patientName', 'dateOfBirth', 'bloodGrp'] })
            res.status(200).json({ user: user })
        } catch (error) {
            res.status(200).json({ message: 'User not found', error: error })
        }
    } else {
        res.status(403).json({ message: 'You are not autorized!' })
    }
}
