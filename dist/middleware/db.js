"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_str = process.env.CONNECTION_STR || '';
console.log(connect_str);
const sequelize = new sequelize_1.Sequelize('healthcard_db', 'postgres', 'postgreSQL', {
    host: 'localhost',
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
