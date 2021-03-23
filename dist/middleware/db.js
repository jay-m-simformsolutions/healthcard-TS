"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_NAME = ((_a = process.env.DB_NAME) === null || _a === void 0 ? void 0 : _a.toString()) || '';
const NAME = ((_b = process.env.UNAME) === null || _b === void 0 ? void 0 : _b.toString()) || '';
const PASS = ((_c = process.env.UPASS) === null || _c === void 0 ? void 0 : _c.toString()) || '';
const HOST = ((_d = process.env.HOST) === null || _d === void 0 ? void 0 : _d.toString()) || '';
const sequelize = new sequelize_1.Sequelize(DB_NAME, NAME, PASS, {
    host: HOST,
    dialect: 'postgres',
    define: {
        freezeTableName: true,
    }
});
async function connection() {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
    }
    catch (error) {
        console.log(error);
    }
}
connection();
exports.default = sequelize;
