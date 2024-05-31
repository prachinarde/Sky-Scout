require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');

const corsConfig = {
    origin: "*",
    credential: "true",
    methods: ["GET", "PUT", "POST", "DELETE"]
}
const app = express();
app.use(cors(corsConfig));
app.options("", cors(corsConfig))

const uri = "mongodb+srv://Sashank:TovH1z4y7fVtJMV1@weather.i9eog8d.mongodb.net/?retryWrites=true&w=majority&appName=Weather";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
}
run().catch(console.dir);

async function fetchRandomQuote() {
    try {
        const collection = client.db("Weather").collection("Facts");
        const docCount = await collection.countDocuments();
        const index = Math.floor(Math.random() * docCount);
        const fact = await collection.findOne({}, { skip: index });
        return (fact);
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

app.get('/', async (req, res) => {
    try {
        const randomFact = await fetchRandomQuote();
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.json(randomFact);
        //console.log(randomFact);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ Error: "An error occurred" });
    }
});

app.get('*', async (req, res) => {
    try {
        res.send("Heyaa")
    }
    catch (err) {
        console.log("OOps")
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});

module.exports = app

/*async function insertData() {
    try {
        const collection = client.db("Weather").collection("Facts");

        const multipleInsertResult = await collection.insertMany([]);

        if (multipleInsertResult.acknowledged) {
            console.log('Inserted document ID:', multipleInsertResult.insertedIds);
        } else {
            console.log('Failed to insert document.');
        }
    }
    catch (error) {
        console.error("Error Inserting Data: ", error);
    }
    finally {
        await client.close();
    }
}
insertData().catch(console.error);*/


/*async function insertData() {
    try {
        const collection = client.db("Weather").collection("Facts");

        const multipleInsertResult = await collection.insertMany([]);

        if (multipleInsertResult.acknowledged) {
            console.log('Inserted document ID:', multipleInsertResult.insertedIds);
        } else {
            console.log('Failed to insert document.');
        }
    }
    catch (error) {
        console.error("Error Inserting Data: ", error);
    }
    finally {
        await client.close();
    }
}
insertData().catch(console.error);*/