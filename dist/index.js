"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
// ----- Routes -----
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config();
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use('/api/user', user_1.default);
const PORT = process.env.PORT || "3001";
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
