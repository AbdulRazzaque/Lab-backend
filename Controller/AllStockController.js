const Culture = require('../Model/Culture');
const Main = require('../Model/Main');
const date = require("date-and-time");
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://tharb221:e181740e@cluster0.z8rlqdf.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'test';

const AllStock = {
  all: function(req, res, next) {
    const { name, RequiredAnalysis } = req.body;

    let d1 = date.parse(req.body.from, "YYYY/MM/DD");
    let d2 = date.parse(req.body.to, "YYYY/MM/DD");
  
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
      if (err) throw err;

      const db = client.db(dbName);
  
      const filter = { name, RequiredAnalysis, $and:[{date:{$gte:d1}}, {date:{$lte:d2}}] };
  
      const pre = [];
  
      db.listCollections().toArray(function(err, collections) {
        if (err) throw err;
  
        let counter = 0;
  
        collections.forEach(function(collection) {
          db.collection(collection.name).find(filter).toArray(function(err, collectionData) {
            if (err) throw err;
  
            pre.push(...collectionData);
  
            counter++;
  
            if (counter === collections.length) {
              client.close();
              res.json(pre);
            }
          });
        });
      });
    });
  }
};

module.exports = AllStock;
