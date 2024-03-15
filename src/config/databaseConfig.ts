import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
    trace: process.env.ENV === 'dev' ? true : false,
});

export default dbPool;
