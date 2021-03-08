"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 12;
exports.getHashedPass = (pass) => {
    return bcrypt_1.default.hash(pass, saltRounds);
};
exports.comparePass = async (userpass, dbpass) => {
    try {
        const result = bcrypt_1.default.compare(userpass, dbpass);
        return result;
    }
    catch (error) {
        return error;
    }
};
