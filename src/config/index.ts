import dotenv from "dotenv";

dotenv.config();

export default {
    dbname: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    port: process.env.PORT,
    
};