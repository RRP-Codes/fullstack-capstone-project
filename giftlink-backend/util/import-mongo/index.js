/*jshint esversion: 8 */
require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');

const url = process.env.MONGO_URL;
const dbName = 'giftlinkdb';
const collectionName = 'gifts';
const filename = `${__dirname}/gifts.json`;

const data = JSON.parse(fs.readFileSync(filename, 'utf8')).docs;

async function loadData() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB for data import");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const existing = await collection.find({}).toArray();
        if (existing.length === 0) {
            const insertResult = await collection.insertMany(data);
            console.log('Inserted documents:', insertResult.insertedCount);
        } else {
            console.log("Gifts already exist in DB");
        }

    } catch (err) {
        console.error("Error loading data:", err);
    } finally {
        await client.close();
    }
}

module.exports = { loadData };
