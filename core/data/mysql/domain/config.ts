import { ConnectionOptions } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const config: ConnectionOptions = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "MyNotes"
}