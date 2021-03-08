"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../middleware/db"));
const bcrypt_1 = require("../middleware/bcrypt");
class Patient extends sequelize_1.Model {
}
Patient.init({
    patientID: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            len: {
                args: [10, 13],
                msg: 'Error!, length for patientID should be minimum 10 and maximum 13!'
            }
        }
    },
    patientPass: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    patientName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    bloodGrp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    hooks: {
        beforeCreate: async (user) => {
            try {
                user.patientPass = await bcrypt_1.getHashedPass(user.patientPass);
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    sequelize: db_1.default
});
// const Patient = sequelize.define('Patient', {
//     patientID: {
//         type: DataTypes.BIGINT,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true 
//     },
//     patientPass: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     patientName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     dateOfBirth: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     bloodGrp: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     timestamps: false
// });
Patient.sync({ alter: true, force: true, logging: false });
exports.default = Patient;
