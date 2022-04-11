const mongoose = require('mongoose')
const Customer = require('../model/customerschema')
const Cart = require('../model/cartschema')
const Payment=require('../model/paymentschema')
const OrderSchema = new mongoose.Schema({
    
  customerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customer"
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
      
      address: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Addresses",
      },
      paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Payment",
       },
     

    
      // Delivered: {
      //   type: Boolean,
      //   default: false,
      // },
      status:{
        type : String,
        enum:["pending","shipped","delivered","cancled","ordered"]
      },
     

},{timestamps:true})
module.exports = mongoose.model('Order',OrderSchema)