const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uuid = require('uuid')

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

let db;
const url = "mongodb+srv://pasinduf:pasi1231@cluster-dev-test-odwgg.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err)
    db = client.db('test_db')
    app.listen(3001, () => { console.log('server started') });
})

app.get('/data', (req, res) => {
    db.collection('items').find().toArray((err, result) => {
        res.send(result);
    })
})

app.post('/data', (req, res) => {
    const record = req.body;
    record._id = uuid();
    record.createdDate = new Date();
    db.collection('items').save(record, (err, result) => {
        if (err) return console.log(err)
        res.send(true);
    })
})