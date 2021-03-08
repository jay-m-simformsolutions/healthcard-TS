import {    Model,
            ModelDefined,
            DataTypes,
            HasManyGetAssociationsMixin,
            HasManyAddAssociationMixin,
            HasManyHasAssociationMixin,
            Association,
            HasManyCountAssociationsMixin,
            HasManyCreateAssociationMixin,
            Optional    } from 'sequelize'
import sequelize from '../middleware/db'
import { getHashedPass, comparePass } from '../middleware/bcrypt'

interface UserAttributes {
    patientID: number;
    patientPass: string;
    patientName: string;
    dateOfBirth: Date;
    bloodGrp: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'patientID'> {}

class Patient extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public patientID!: number;
    public patientPass!: string;
    public patientName!: string;
    public dateOfBirth!: Date;
    public bloodGrp!: string;
}

Patient.init({
    patientID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            len: {
                args: [10,13],
                msg: 'Error!, length for patientID should be minimum 10 and maximum 13!'
            }
        }
    },
    patientPass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    patientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    bloodGrp: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    hooks: {
        beforeCreate: async (user) => {
            try {
                user.patientPass = await getHashedPass(user.patientPass)
            } catch(error) {
                console.log(error);
            }
        }
    },
    sequelize
})

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

Patient.sync({ alter: true, force: true, logging: false })

export default Patient
