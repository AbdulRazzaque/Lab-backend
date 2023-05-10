import express from 'express'
import mongoose from 'mongoose'
import errorhandller from './error/errorHandller'
import Router from './Router'
const bodyParser = require('body-parser')
const cors = require('cors')
const app= express()
const PORT= 3002

// mongodb+srv://tharb221:<password>@cluster0.z8rlqdf.mongodb.net/?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://tharb221:e181740e@cluster0.z8rlqdf.mongodb.net/?retryWrites=true&w=majority',(error)=>{
// mongoose.connect('mongodb+srv://admin:admin@test-inventory.5rzqf4o.mongodb.net/?retryWrites=true&w=majority',(error)=>{
// mongoose.connect('mongodb://localhost:27017/Lab',(error)=>{
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
    console.log('App Running On 3002')

})