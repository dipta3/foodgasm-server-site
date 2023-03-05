const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('Foodgasm server Running')
})

app.listen(port, () => {
    console.log(`Foodgasm running on ${port}`)
})