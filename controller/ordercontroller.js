const express = require('express')
const router = express.Router()
const Order = require('../model/orderschema')
const Cart = require('../model/cartschema')
const Customer = require('../model/customerschema')
const Payment=require('../model/paymentschema')
const getOrderDetails = async(req,res) => {
    try{
           const val = await Cart.find()
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
  const addressId= req.query.addressId;
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
  var customerId =req.query.customerId;
  var paymentId =req.query.paymentId;
  const cart = await Cart.findOne({ customerId: customerId}).then(()=>{
  if(cart)
  {
    let transId;
         var transaction = async(pId)=>{
                 await Payment.findOne({customerId:customerId,paymentId:pId},{}).then(async(data)=>{
                    if(data){
                        var transactionid   = await crypto.randomBytes(6).toString('hex');
                        console.log(transactionid)
                        transId=transactionid
                        return transactionid
                    }
                    else{
                        res.json("add Payment");
                    }
                    //status='Ordered'
                })
                console.log(transactionid);
                //return transactionid;
    }
        //let status='Ordered';
       
       let transactionId=transaction(customerId,paymentId);
       console.log(transId);
      const orderdata={
        customerId:customerId,
      //  items:cart.items,
        //status:status,
        totalCost:cart.subTotal,
      //  address:addressId,
      //  transactionId:transactionId
        }
        const order=new Order(orderdata);
         order.save().then(()=>{
            res.end('payment Successfully!');
        })
          }   else{
            res.json(error)
        }
      })

  
 

}
 
   
 
module.exports={
    getOrderDetails,
    addOrder,
    orderPayment
    
    
}