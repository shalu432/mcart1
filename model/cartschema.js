const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  

  CustomerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    
  },
  cartItems: [
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 },

        // totalQty: {
        //   type: Number,
        //   default: 0,
        //   required: true,
        // },
        totalCost: {
          type: Number,
          default: 0,
          required: true,
        },
   
      }



]
   
     
    
});

module.exports = mongoose.model("Cart", cartSchema);