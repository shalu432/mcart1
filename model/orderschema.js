const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    
        customerName:{
          type: String,
          required: true,
        },
        orderId: {
          type: Number,
          required: true,
        },
        product: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
            quantity: {
              type: Number,
              default: 0,
            },
            discountedCost:{
              type:Number,
              required:true
          },
           
           
          },
        ],
        totalCost:
        {
          type : Number
        },
      
      address: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
      },
      paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Payment",
      },
      customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
      },

    
      // Delivered: {
      //   type: Boolean,
      //   default: false,
      // },
      orderStatus:{
        type : String,
        enum:["pending","shipped","delivered"]
      },
     

},{timestamps:true})
module.exports = mongoose.model('Order',OrderSchema)