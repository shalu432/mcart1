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
   try{
  var customerId=req.query.customerId;
  var cartId=req.query.cartId;
  //var paymentId=req.query.paymentId;
  //const addressId=req.query.addressId
  const cart = await Cart.find({ customerId:customerId},{cartId:cartId});

  
  await Cart.deleteOne({ customerId: customerId })
  .then(()=>{
      if(cart){
        console.log(cart)
          // console.log(cart.map(item=>item.items));
          // result.populate('items').execPopulate(() => {
          //     res.send(result);
          // });
      //     function transaction(cId,pId){
      //         try{
      //              Payment.findOne({customerId:cId},{paymentId:pId}).then(data=>{
      //                 let transactionid = crypto.randomBytes(6).toString('hex');
      //                 console.log(transactionid);
      //                 return transactionid;
      //                 //status='Ordered'
      //             })
      //         }
      //         catch{
      //             res.json("Enable to Order");
      //         }
      // }
          let status='Ordered';
          //let indexFound = cart.items.map(item=>it;
          //Order.items.push({i:cart});
          //let transactionId=transaction(customerId,paymentId);
          const orderdata={
          customerId:customerId,
          cartId:cartId,
          items:cart.items,
          status:status,
          totalCost:cart.subTotal
          //address:address,
          //transactionId:transactionId
          }
          const order=new Order(orderdata);
           order.save().then(()=>{
              res.end('Order Successfully!');
          })
      }
      else{
          res.json("Add to cart");
      }
  })
}catch(err){
  res.json(err);
}
 }
   
 
module.exports={
    getOrderDetails,
    addOrder
    
    
}