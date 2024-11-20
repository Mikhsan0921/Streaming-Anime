import mysql from "mysql2/promise";

export const createConnection = () => {
    return mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
    });
};

export const closeConnection = (connection: any) => connection.end();