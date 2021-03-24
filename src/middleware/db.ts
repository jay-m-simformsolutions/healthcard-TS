import { Sequelize } from 'sequelize'
import env from 'dotenv'
env.config()

const DB_NAME: string = process.env.DB_NAME?.toString() || ''
const NAME: string = process.env.UNAME?.toString() || ''
const PASS: string = process.env.UPASS?.toString() || ''
const HOST: string = process.env.HOST?.toString() || ''

const sequelize: Sequelize = new Sequelize(DB_NAME,NAME,PASS, {
    host: HOST,
    dialect: 'postgres',
    define: {
        freezeTableName: true,
    }
})

async function connection() : Promise<void> {
    try {
        await sequelize.authenticate()
        console.log('Database connected');
    } catch(error) {
        console.log(error);
    }
}

connection()

export default sequelize
