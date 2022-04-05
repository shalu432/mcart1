const express = require('express')
const router = express.Router()
const Order = require('../model/orderschema')
const Cart = require('../model/cartschema')
const Customer = require('../model/customerschema')

const getOrderDetails = async(req,res) => {
    try{
           const val = await Cart.find()
           res.json(val)
    }catch(err){
        res.send('Error ' + err)
    }
 }
 const addOrder = async(req,res)=>
 {
  var customerId=req.query.customerId;
 Cart.findOne({customerId:customerId})
    .then(cart => {
      if (!cart) {
        return res.status(404).json({
          message: "cart not found"
        });
      }
      let status='Ordered';
      const order = new Order({
        // _id: mongoose.Types.ObjectId(),
        // quantity: req.body.quantity,
        // product: req.body.productId
        customerId:customerId,
                  items:cart.items,
                  status:status,
                  totalCost:cart.subTotal
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          customerId: result.customerId,
          items: result.items,
          totalCost: result.totalCost
        },
       
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}






//    try{
//   var customerId=req.query.customerId;
//   //var cartId=req.query.cartId;
// const cart = await Cart.find({ customerId:customerId});
//   //console.log(cart)
  
//   await Cart.deleteOne({ customerId: customerId },{cartId:cartId})
//   .then(()=>{
//       if(cart){
       
          
//           let status='Ordered';
//          const orderdata={
//           customerId:customerId,
//           cartId:cartId,
//           items:cart.items,
//           status:status,
//           totalCost:cart.subTotal
//          }
//           const order=new Order(orderdata);
//            order.save().then(()=>{
//               res.end('Order Successfully!');
//           })
//       }
//       else{
//           res.json("Add to cart");
//       }
//   })
// }catch(err){
//   res.json(err);
// }
//  }
   
 
module.exports={
    getOrderDetails,
    addOrder
    
    
}