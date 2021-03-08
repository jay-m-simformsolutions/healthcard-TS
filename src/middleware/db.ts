import { Sequelize } from 'sequelize'

const connect_str : string = process.env.CONNECTION_STR || ''
console.log(connect_str);

const sequelize: Sequelize = new Sequelize('healthcard_db','postgres','postgreSQL', {
    host: 'localhost',
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
