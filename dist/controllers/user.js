"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
exports.userData = async (req, res, next) => {
    console.log('user route');
    res.status(200).json({ message: 'user route' });
};
exports.signup = async (req, res, next) => {
    try {
        const { patientPass, patientName, bloodGrp } = req.body;
        const userObj = {
            patientName,
            patientPass,
            dateOfBirth: new Date(),
            bloodGrp
        };
        const user = await user_1.default.create(userObj);
        res.status(201).json({ user: {
                patientID: user === null || user === void 0 ? void 0 : user.patientID,
                patientName: user === null || user === void 0 ? void 0 : user.patientName,
                dateOfBirth: user === null || user === void 0 ? void 0 : user.dateOfBirth,
                bloodGrp: user === null || user === void 0 ? void 0 : user.bloodGrp
            } });
    }
    catch (error) {
        res.status(404).json({ message: 'Something went wrong please try again!' });
    }
};
