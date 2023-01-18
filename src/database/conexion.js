import pg from "pg";
import * as dotenv from 'dotenv' 
const { Pool } = pg;

dotenv.config()

const pool = new Pool({
    user: process.env.USUARIO,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    dialectOptions: {
        ssl: {
            require: false,
            rejectUnauthorized: false
        }
    }
});



export default pool