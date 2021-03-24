"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const jwt_1 = require("../utils/jwt");
exports.userData = async (req, res, next) => {
    console.log('user route');
    res.status(200).json({ message: 'user route' });
};
exports.signup = async (req, res) => {
    try {
        const { patientPass, patientName, bloodGrp } = req.body;
        const userObj = {
            patientName,
            patientPass,
            dateOfBirth: new Date(),
            bloodGrp
        };
        const user = await user_1.default.create(userObj);
        res.status(201).json({
            user: {
                patientID: user === null || user === void 0 ? void 0 : user.patientID,
                patientName: user === null || user === void 0 ? void 0 : user.patientName,
                dateOfBirth: user === null || user === void 0 ? void 0 : user.dateOfBirth,
                bloodGrp: user === null || user === void 0 ? void 0 : user.bloodGrp
            }
        });
    }
    catch (error) {
        res.status(404).json({ message: 'Something went wrong please try again!' });
    }
};
exports.signin = async (req, res) => {
    try {
        const { userID, userPass } = req.body;
        const user = await user_1.default.findOne({
            where: {
                patientID: userID
            }
        });
        const auth = await (user === null || user === void 0 ? void 0 : user.authenticate(userPass));
        if (auth) {
            const token = jwt_1.getToken({ _id: userID, role: '"Patient"' });
            res.status(200).json({ user, token });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(403).json({ message: 'Something went wrong please try again!' });
    }
};
exports.getUser = async (req, res) => {
    if (req.body.user._id == req.params.id) {
        try {
            const user = await user_1.default.findOne({ where: {
                    patientID: req.params.id
                },
                attributes: ['patientID', 'patientName', 'dateOfBirth', 'bloodGrp'] });
            res.status(200).json({ user: user });
        }
        catch (error) {
            res.status(200).json({ message: 'User not found', error: error });
        }
    }
    else {
        res.status(403).json({ message: 'You are not autorized!' });
    }
};
