import { MongoClient } from "mongodb";
import { Db } from "mongodb";

let db: Db | undefined;
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'graphql-es';
// Connect using MongoClient
const mongoClient = new MongoClient(url);

async function connect() {
    if (!db) {
        try {
            await mongoClient.connect();
            db = mongoClient.db(dbName);
            return db;
        } catch (error) {
            console.error(error);
        }    
    }
    return db;
}

export default connect; 
