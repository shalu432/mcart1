const mongoose = require('mongoose')
const Category = require('../model/Categoryschema')
const Customer = require('../model/customerschema')
const Order = require('../model/orderschema')
const RefundSchema = new mongoose.Schema({
    


      
    customerId:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
    },
    orderId:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
    },
    transactionId:{
        type:String
    },

    refundAmount:
    {
        type:Number
    }
       
        
})
module.exports = mongoose.model('Refund',RefundSchema)