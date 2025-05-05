const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./error/errorHandller');
const Router = require('./Router');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3005
// const PORT = 3009;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017/workshiLog', (error) => {

  // mongoose.connect('mongodb://admin:admin@ac-endetpj-shard-00-00.5rzqf4o.mongodb.net:27017,ac-endetpj-shard-00-01.5rzqf4o.mongodb.net:27017,ac-endetpj-shard-00-02.5rzqf4o.mongodb.net:27017/?ssl=true&replicaSet=atlas-5zbco1-shard-0&authSource=admin&retryWrites=true&w=majority',(error)=>{
  if (error) {
    console.log(error);
  } else {
    console.log('We are connected to the database');
  }
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', Router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
