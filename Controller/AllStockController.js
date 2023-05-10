import Culture from '../Model/Culture'
import Main from '../Model/Main'
const date = require("date-and-time"); 
const MongoClient = require('mongodb').MongoClient;
 
const url = 'mongodb+srv://tharb221:e181740e@cluster0.z8rlqdf.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'test';
const AllStock={

  async  all(req,res,next){
   
    const {name,RequiredAnalysis,} = req.body;
 
    let d1 = date.parse(req.body.from, "YYYY/MM/DD");
    let d2 = date.parse(req.body.to, "YYYY/MM/DD");
    // const {name,RequiredAnalysis} = req.body;
    
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) throw err;
  
      // Select the database to use
      const db = client.db(dbName);
  
      // Define a filter object
      // const filter = {name,$and:[{date:{$gte:d1}},{date:{$lte:d2}}]};
      const filter = { name,RequiredAnalysis,$and:[{date:{$gte:d1}},{date:{$lte:d2}}]};
  
      // Define an array to hold the data
      const pre = [];
  
      // Loop through each collection and retrieve the data
      db.listCollections().toArray((err, collections) => {
        if (err) throw err;
  
        let counter = 0;
  
        collections.forEach((collection) => {
          db.collection(collection.name).find(filter).toArray((err, collectionData) => {
            if (err) throw err;
  
            // Add the collection data to the array
            pre.push(...collectionData);
  
            counter++;
  
            // If this is the last collection, send the data back to the client
            if (counter === collections.length) {
              // Close the database connection
              client.close();
  
              // Send the data back to the client
              res.json(pre);
            }
          });
        });
      });
    });
}
}
export default AllStock
