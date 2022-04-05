const mongoose = require('mongoose')
const Customer = require('../model/customerschema')
const Cart = require('../model/cartschema')
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
      
      // address: {
      //   type:mongoose.Schema.Types.ObjectId,
      //   ref:"Address",
      // },
      // paymentId: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref:"Payment",
      // },
     

    
      // Delivered: {
      //   type: Boolean,
      //   default: false,
      // },
      status:{
        type : String,
        enum:["pending","shipped","delivered","cancled"]
      },
     

},{timestamps:true})
module.exports = mongoose.model('Order',OrderSchema)