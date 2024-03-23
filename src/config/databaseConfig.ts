import dotenv from 'dotenv';
import mariadb from 'mariadb';

dotenv.config();

const dbPool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
    trace: process.env.ENV === 'dev' ? true : false,
});

export default dbPool;
