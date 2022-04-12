const mongoose = require('mongoose')
const Customer = require('../model/customerschema')
const Cart = require('../model/cartschema')
const Payment=require('../model/paymentschema')
const Product = require('../model/productschema')
const Address = require('../model/addressschema')
const OrderSchema = new mongoose.Schema({
    
  customerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customer"
  },
  addressId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Address",
  },
        items: {
          type:Array,
          require:true
        },
        
        totalCost:
        {
          type : Number
        },
        transactionId:{
          type:String
        },
      
     
      paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Payment",
       },
     

    
      
      status:{
        type : String,
        enum:["pending","shipped","delivered","cancled","ordered"]
      },
     

},{timestamps:true})
module.exports = mongoose.model('Order',OrderSchema)