const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { error } = require('console');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hc7ua.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const foodGasmCollention = client.db('foodGasm').collection('foods');

        app.get('/foods', async (req, res) => {
            const query = {}
            const cursor = foodGasmCollention.find(query)
            const foods = await cursor.toArray();
            res.send(foods)
        })
        app.get('/foods/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const food = await foodGasmCollention.findOne(query);
            res.send(food)
        })
    }
    finally {

    }
}
run().catch(error => console.log(error))


app.get('/', (req, res) => {
    res.send('Food Gasm Server Running')
})

app.listen(port, () => {
    console.log(`Food Gasm Running On ${port}`)
})