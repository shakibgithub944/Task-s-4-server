const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express();

app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ofvswtt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const SectorsCollection = client.db("Task-s-4").collection("sectors");
        const UsersCollection = client.db("Task-s-4").collection("users");

        app.get('/', (req, res) => {
            res.send('server is Runninng.....')
        })
        app.get('/sector', async (req, res) => {
            const query = {}
            const result = await SectorsCollection.find(query).toArray()
            res.send(result)
        })
        app.post('/user', async (req, res) => {
            const user = req.body
            const result = await UsersCollection.insertOne(user);
            res.send(result)
        })



    }
    finally {

    }
}
run().catch(error => console.log(error));


app.listen(port, () => {
    console.log('Server is Runnig on port', port)
})
