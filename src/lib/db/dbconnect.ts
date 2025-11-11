import {Client} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const dbPool = new Client({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),

    ssl: { rejectUnauthorized: false }
})

dbPool.connect()
.then(()=> console.log('Database connected successfully'))
.catch((err)=> console.error('Database connection error:', err));

export default dbPool;