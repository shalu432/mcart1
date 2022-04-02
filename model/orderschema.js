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
        type: String,
        required: true,
      },
      paymentId: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      Delivered: {
        type: Boolean,
        default: false,
      },

})
module.exports = mongoose.model('Order',OrderSchema)