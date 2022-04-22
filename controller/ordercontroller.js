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
         const ord = await Order.findById(req.params.id)
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
  //var customerId=req.query.customerId;
  var addressId= req.query.addressId;
  const cart = await Cart.findOne({ customerId:req.customer})
     await Cart.deleteOne({ customerId:req.customer})
    .then(()=>{
       
           if(cart){
             let status="ordered"
             let paymentStatus="pending"
            const orderdata={
            customerId:req.customer,
            addressId:addressId,
            items:cart.items,
            totalCost:cart.subTotal,
            status:status,
            paymentStatus:paymentStatus
         
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
                message:"add to cart",
                
              
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
  //var customerId =req.query.customerId;
  var paymentId =req.query.paymentId;
  var orderId = req.query.orderId
  await Order.findOne({_id:orderId}).then(async(data)=>{
    if(data){
      await Payment.findOne({ customerId:req.customer,paymentId:paymentId}).then(async(pay)=>{
        if(pay)
        { var transactionid = crypto.randomBytes(6).toString('hex');
     
        let paymentStatus='payment successfully'
       
        if(data.paymentStatus=="pending"){

              data.paymentStatus=paymentStatus,
             data.transactionId=transactionid
              data.save().then((data)=>{
                res.send({
                  status:true,
                  message:"payment successfully",
                  error:{},
                  response:data
                });
              })
          }
            else{
              res.json({
                message:"payment already done"
              })
            }
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
    else{
      res.json("order not found")
    }
  })
   
    } 





 const cancelOrder = async(req,res)=>
 {
   var orderId=req.query.orderId
   
try {
   
  await Order.findOne({_id:orderId,paymentStatus:"payment successfully"}).then((data)=>
  {
    if(data)
    {
      
    var doc = new Refund({
      customerId:data.customerId,
      orderId:data.orderId,
      refundAmount:data.totalCost,
      transactionId:data.transactionId
  
    })
    doc.save().then(async(data)=>
    {
      //console.log(data)
      await Order.findByIdAndUpdate({_id:orderId},{
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
}
else{
  
  res.json({
    status:"false",
    error:{},
    message:"payment incompleted"
  })
}
  })
 
 
  
}
catch(error) {
  res.send({
    status:"false",
    response:"null",
    error: error.message
  })
}
}

// const orderStatus = async(req,res) => {
//   try{
//          const ord = await Order.findByIdAndUpdate(req.query.orderId).then((data)=>
//          {
//           data.status = req.body.status
//           data.save().then((result)=>{
//             res.json(result)
//            })
//         })
         
         
        
//       //  res.json(ord)
//   }catch(err){
//       res.send({
//         error:{
//           message:"order not placed ",
          
//         }
//       })
//   }
// }
 

// const deleteOrder = async(req, res) => {
//   try{
// await Order.findOneAndUpdate({customerId :(req.query.customerId)}, { $pull: { items : {productId:(req.query.productId) }}}, {multi: true}).then(data=>{
//     res.json({
//         status:"true",
//         error:{},
//      message  :"deleted successfully",
//        response:data
//     })
//   })
//   }
//   catch(err){
//     res.json(err);
//   }
//   }
 
   const orderOfCustomer=async(req,res)=>{
     await Customer.findOne({_id:req.query.id})
     await Order.find({customerId:req.query.id}).then((data)=>{
       res.json({
         status:"true",
         message:"order history",
         response:data
       })
     })
   }
 
module.exports={
    getAllOrder,
    addOrder,
    orderPayment,
    cancelOrder,
    getOrder,
    orderOfCustomer
   // orderStatus,
    //deleteOrder
    
    
    
}