const express = require('express')
const router = express.Router()
const Order = require('../model/orderschema')
const Cart = require('../model/cartschema')
const Customer = require('../model/customerschema')
const Payment=require('../model/paymentschema')
const crypto = require("crypto")
const Refund=require('../model/refundschema')
const getAllOrder = async(req,res) => {
    try{
           const ord = await Order.find()
           res.json({
            status:true,
             response:ord
           })
        //  res.json(ord)
    }catch{
        res.send({
          error:{
            message:"error",
            response: null
          }
        })
    }
 }
 const getOrder = async(req,res) => {
  try{
         const ord = await Order.findOne(req.query.id)
         res.json({
           status:true,
           response:ord
         })
      //  res.json(ord)
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
 // try{
  var customerId =req.query.customerId;
  var paymentId =req.query.paymentId;
  var cart = await Order.findOne({customerId:customerId})
  
   await Payment.find({ customerId: customerId,paymentId:paymentId}).then((pay)=>{
  if(pay)
  {
    //let transId;
  var transactionid = crypto.randomBytes(6).toString('hex');
   pay.transactionid=transactionid
    let status='ordered';
       
     
      const orderdata={
        customerId:customerId,
        paymentId:paymentId,
        items:cart.items,
        status:status,
        totalCost:cart.subTotal,
      //  address:addressId,
        transactionId:transactionid
        }
        const order=new Order(orderdata);
         order.save().then((data)=>{
          // console.log(data)
          res.send({
            status:true,
            message:"payment successfully",
            error:{},
            response:data
          });
        })
          }  
           else{
            res.json("error")
        }
      })
    } 
// }catch(error){
// res.send("errorrrrr")
// }
// } 




 const cancelOrder = async(req,res)=>
 {
   
try {
  const order = await Order.findOne(req.query.id)
  console.log(order)
  var doc = new Refund({
    customerId:order.customerId,
    orderId:req.query.id,
    refundAmount:order.totalCost,
    transactionId:order.transactionId

  })
  doc.save().then(async(data)=>
  {
    console.log(data)
    await Order.findByIdAndUpdate(req.query.id,{
      $set:{
        status:"cancled"
      }
    },{new:true,runValidator:true
  })
  res.json({
    status:true,
    message:"order deleted",
    response:data
  })
} ).catch((err)=>{
      res.json(err.message)
})





}catch(error) {
  res.send({
    error: error
  })
}
}

const orderStatus = async(req,res) => {
  try{
         const ord = await Order.findByIdAndUpdate(req.query.orderId).then((data)=>
         {
          data.status = req.body.status
          data.save().then((result)=>{
            res.json(result)
           })
        })
         
         
        
      //  res.json(ord)
  }catch(err){
      res.send({
        error:{
          message:"order not placed ",
          
        }
      })
  }
}
 

const deleteOrder = async(req, res) => {
  try{
await Order.findOneAndUpdate({customerId :(req.query.customerId)}, { $pull: { items : {productId:(req.query.productId) }}}, {multi: true}).then(data=>{
    res.json({
        status:"true",
        error:{},
     message  :"deleted successfully",
       response:data
    })
  })
  }
  catch(err){
    res.json(err);
  }
  }
 
   
 
module.exports={
    getAllOrder,
    addOrder,
    orderPayment,
    cancelOrder,
    getOrder,
    orderStatus,
    deleteOrder
    
    
    
}