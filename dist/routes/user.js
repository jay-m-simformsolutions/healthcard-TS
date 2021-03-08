"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const userRoute = express_1.Router();
userRoute.get('/', user_1.userData);
userRoute.post('/signup', user_1.signup);
exports.default = userRoute;
