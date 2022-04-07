const express = require('express')
const router = express.Router()
const Order = require('../model/orderschema')
const Cart = require('../model/cartschema')
const Customer = require('../model/customerschema')
const Payment=require('../model/paymentschema')
const getOrderDetails = async(req,res) => {
    try{
           const val = await Order.findById(req.params.id)
           res.json({
             status:true,
             response:val
           })
    }catch(err){
        res.send({
          error:{
            message:"error",
            response: null
          }
        })
    }
 }
 const addOrder = async(req,res)=>
 {
  try{
  var customerId=req.query.customerId;
  var addressId= req.query.addressId;
  const cart = await Cart.findOne({ customerId: customerId,addressId:addressId})
     await Cart.deleteOne({ customerId: customerId })
    .then(()=>{
       
           if(cart){
            const orderdata={
            customerId:customerId,
            addressId:addressId,
            items:cart.items,


            //status:status,
            totalCost:cart.subTotal,
         
            }
            const order=new Order(orderdata);
             order.save().then(()=>{
                res.end('Order Successfully!');
            })
       }
        else{
             res.json("order not placed");
        }
    })
}catch(err){
    res.json(err);
}
}
const orderPayment = async(req,res)=>
{
  try{
  var customerId =req.query.customerId;
  var paymentId =req.query.paymentId;
  var cart = await Order.findOne({customerId:customerId})
  {
  const pay = await Payment.findOne({ customerId: customerId,paymentId:paymentId}).then(()=>{
  if(pay)
  {
    let transId;
  var transactionid = crypto.randomBytes(6).toString('hex');
   transId=transactionid
                       let status='Ordered';
       
     
      const orderdata={
        customerId:customerId,
        paymentId:paymentId,
        items:cart.items,
        status:status,
        totalCost:cart.subTotal,
      //  address:addressId,
        transactionId:transId
        }
        const order=new Order(orderdata);
         order.save().then(()=>{
            res.end('payment Successfully!');
        })
          }  
           else{
            res.json(error)
        }
      })
    } 
}catch(error){
res.send("error")
}
} 
 const cancelOrder = async(req,res)=>
 {
try {
  const ord = await Order.findByIdAndDelete(req.params.id)
  res.json({
    status:true,
    message:"deleted successfully",
    response:ord
  })
} catch (err) {
  res.send({
    error: error
  })
}
}
 


 
   
 
module.exports={
    getOrderDetails,
    addOrder,
    orderPayment,
    cancelOrder
    
    
}