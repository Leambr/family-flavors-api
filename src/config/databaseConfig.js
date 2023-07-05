import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const dbPool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    })
    .promise();

dbPool.connect((err) => {
    if (err) {
        console.log("An error occured");
        throw err;
    }
    console.log("Mysql connected...");
});

module.exports = dbPool;
