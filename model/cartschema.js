const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  

  
  // customerId:
  // {
  //  type:mongoose.SchemaTypes.ObjectId,
  //  ref:"Customer",
  // },
  //customer:{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
//   cartItems: 
//   [
//     {
//         productId:
//          { type: mongoose.Schema.Types.ObjectId, 
//           ref: 'Product', required: true
//          },

//         quantity: 
//         { type: Number,
//            default: 1 
//           },


//          price:{type:Number},
//         // totalQty: {
//         //   type: Number,
//         //   default: 0,
//         //   required: true,
//         // },
        
   
//       }],




// totalCost: {
//   type: Number,
//   default: 0,
//   required: true,
// }
   
     
    
// },{timestamps:true});

  
    CustomerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        productId: Number,
        quantity: Number,
        productName: String,
        price: Number
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Cart", cartSchema);