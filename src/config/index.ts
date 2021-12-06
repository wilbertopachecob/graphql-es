import dotenv from "dotenv";

dotenv.config();

export default {
    dbname: process.env.DB_NAME,
    host: process.env.host,
    port: process.env.PORT,
    dbPort: process.env.DB_PORT
};