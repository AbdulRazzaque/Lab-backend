import express from 'express'
import mongoose from 'mongoose'
import errorhandller from './error/errorHandller'
import Router from './Router'
const bodyParser = require('body-parser')
const cors = require('cors')
const app= express()
const PORT= 3005


mongoose.connect('mongodb+srv://tharb221:e181740e@cluster0.z8rlqdf.mongodb.net/?retryWrites=true&w=majority',(error)=>{

// mongoose.connect('mongodb://admin:admin@ac-endetpj-shard-00-00.5rzqf4o.mongodb.net:27017,ac-endetpj-shard-00-01.5rzqf4o.mongodb.net:27017,ac-endetpj-shard-00-02.5rzqf4o.mongodb.net:27017/?ssl=true&replicaSet=atlas-5zbco1-shard-0&authSource=admin&retryWrites=true&w=majority',(error)=>{
if(error){

    console.log(error)
}else{
    console.log('WE are Connect to the Data Base')
}
})



app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/api',Router)



app.use(errorhandller)


app.listen(PORT,()=>{
    console.log('App Running On 3005')

})