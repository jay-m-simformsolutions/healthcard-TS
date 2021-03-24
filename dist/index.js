"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
const cookiesSessionOptions = {
    name: 'session',
    keys: ['healthcardcookies'],
    maxAge: 24 * 60 * 60 * 1000 //24hrs
};
app.use(cookie_session_1.default(cookiesSessionOptions));
app.use('/api/user', user_1.default);
const PORT = parseInt(process.env.PORT, 10) || 3001;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
