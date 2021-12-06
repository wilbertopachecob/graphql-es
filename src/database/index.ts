import { MongoClient } from "mongodb";
import { Db } from "mongodb";
import config from "../config";

let db: Db | undefined;
const getURI = () => {
    let userInfo = '';
    if (config.dbUsername && config.dbPassword) {
        userInfo = `${config.dbUsername}:${config.dbPassword}@`
    }    
    let url = `mongodb://${userInfo}${config.dbHost}:${config.dbPort}`;
    
    return url;
}

// Database Name
const dbName = config.dbname;
// Connect using MongoClient
const mongoClient = new MongoClient(getURI());

async function connect() {
    if (!db) {
        try {
            await mongoClient.connect();
            db = mongoClient.db(dbName);
            console.log('MongoClient connection success');
            return db;
        } catch (error) {
            console.error(error);
        }    
    }
    return db;
}

export default connect; 
