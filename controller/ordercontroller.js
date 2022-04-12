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
            code:200,
             response:ord
           })
        //  res.json(ord)
    }catch{
        res.send({
          status:true,
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
  const cart = await Cart.findOne({ customerId: customerId})
     await Cart.deleteOne({ customerId: customerId })
    .then(()=>{
       
           if(cart){
             let status="pending"
            const orderdata={
            customerId:customerId,
            addressId:addressId,
            items:cart.items,
            totalCost:cart.subTotal,
            status:status
         
            }
            const order=new Order(orderdata);
             order.save().then((data)=>{
                res.send({
                  state:true,
                  code:200,
                  message:"order successfully",
                  response:data
                });
            })
       }
        else{
             res.json({
              
                state:false,
                code:403,
                message:"order not placed",
                
              
             });
        }
    })
}catch(err){
    res.json(error);
}
}
const orderPayment = async(req,res)=>
{
 // try{
  var customerId =req.query.customerId;
  var paymentId =req.query.paymentId;
  var orderId = req.query.orderId
  var order = await Order.findOne({orderId:orderId})
  
   await Payment.find({ customerId: customerId,paymentId:paymentId}).then((pay)=>{
  if(pay)
  {
    //let transId;
  var transactionid = crypto.randomBytes(6).toString('hex');
   //pay.transactionid=transactionid
    let status='ordered';
        order.status=status,
       order.transactionId=transactionid
        order.save().then((data)=>{
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
      }).catch(error=>
        {
          res.json({
            status:false,
            message:"payment unsucessful",
            code:404
          })
        })
    } 





 const cancelOrder = async(req,res)=>
 {
   var orderId=req.query.orderId
try {
   await Order.findOne(req.query.id)
   {

  const order = await Order.findOne({orderId:orderId})
 
 // console.log(order)
  var doc = new Refund({
    customerId:order.customerId,
    orderId:orderId,
    refundAmount:order.totalCost,
    transactionId:order.transactionId

  })
  doc.save().then(async(data)=>
  {
    //console.log(data)
    await Order.findByIdAndUpdate(req.query.id,{
      $set:{
        status:"cancelled"
      }
    },{new:true,runValidator:true
  })
  res.json({
    status:true,
    message:"order cancelled",
    response:data
  })
} ).catch((err)=>{
      res.json(err.message)
})
}}
catch(error) {
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