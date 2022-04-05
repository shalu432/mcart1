const express = require('express')
const router = express.Router()
const Order = require('../model/orderschema')
const Cart = require('../model/cartschema')

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
   Cart.findOne({_id:req.query.customerId},{_id:req.query.productId})
   {
     var quantity;
  Cart.findOne(quantity>0)
  .then(product => {
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    if(product)
    {

    
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId
    });
   } return order.save();
  
  })


  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Order stored",
      createdOrder: {
        _id: result._id,
        product: result.product,
        quantity: result.quantity
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
 }

        


   
 
module.exports={
    getOrderDetails,
    addOrder
    
    
}