"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || '';
exports.getToken = (values) => {
    return jsonwebtoken_1.default.sign({ ...values }, secret, { expiresIn: '1h' });
};
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]) || null;
    if (token) {
        try {
            const user = jsonwebtoken_1.default.verify(token, secret);
            req.body.user = user;
            next();
        }
        catch (error) {
            res.status(403).json({ message: 'You are not authorized', errors: error });
        }
    }
    else {
        res.status(403).json({ message: 'You are not authorized' });
    }
};
