const express = require('express');
const mongodb = express('mongodb');
const app = express();
const port = 3001;

const MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://riteshinkpursuits:<Lt.Bxtchless@19!>@book-rack.qggbk9c.mongodb.net/";
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    db.close();
  });

app.get('/',(req,res)=>{
    res.send('Hello World!')
});

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
});

