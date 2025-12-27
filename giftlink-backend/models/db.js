// db.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

// Use the URL from .env (make sure it includes ?authSource=admin if needed)
const url = process.env.MONGO_URL;

const dbName = "giftlinkdb";
let dbInstance = null;

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }

    try {
        const client = new MongoClient(url);
        await client.connect();
        dbInstance = client.db(dbName);
        console.log("✅ Connected successfully to MongoDB");
        return dbInstance;
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB", err);
        throw err; // propagate error so backend knows
    }
}

module.exports = connectToDatabase;
