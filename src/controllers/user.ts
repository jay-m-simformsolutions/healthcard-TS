import { RequestHandler } from 'express'
import Patient from '../models/user'

export const userData : RequestHandler = async (req, res, next) => {
    console.log('user route');
    res.status(200).json({ message: 'user route' })
}

export const signup: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { patientPass, patientName, bloodGrp } = req.body 
        const userObj = {
            patientName,
            patientPass,
            dateOfBirth: new Date(),
            bloodGrp
        }
        const user = await Patient.create(userObj) 
        res.status(201).json({ user: {
            patientID: user?.patientID,
            patientName: user?.patientName,
            dateOfBirth: user?.dateOfBirth,
            bloodGrp: user?.bloodGrp
        } })
    } catch(error) {
        res.status(404).json({ message: 'Something went wrong please try again!' })
    }
}
