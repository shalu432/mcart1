const express = require('express')
const mongoose = require('mongoose')
var bodyParser= require('body-parser')
mongoose.connect("mongodb://localhost:27017/mcart",{})
.then(()=>console.log("connected"))
.catch((err)=>console.log(err))
//console.log("hello")
require('dotenv').config();


const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

const customerRouter = require('./routes/customer')
app.use('/',customerRouter)

const PaymentRouter = require('./routes/payment')
app.use('/',PaymentRouter)

const ProductRouter = require('./routes/product')
app.use('/',ProductRouter)

//const AdminRouter = require('./routes/admin1')
//app.use('/admin',AdminRouter)

const MerchantRouter = require('./routes/merchant')
app.use('/',MerchantRouter)
const CategoryRouter = require('./routes/category')
app.use('/',CategoryRouter)

  const cartRouter = require('./routes/cart')
   app.use('/',cartRouter)

app.get('/',function(req,res)
{
  res.send("working")
})


const port = process.env.PORT ||7500
app.listen(port, () => {
    console.log('Server started')
})