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
        res.send('Error ' + err)
    }
 }
 const addOrder = async(req,res)=>
 {
  try{
    var customerId=req.query.customerId;
    var paymentId=req.body.paymentId;
    const addressId=req.query.addressId;
    //await customerProfile.findOne({_id:ObjectId(customerId)}).then(data=>{})
    const cart = await Cart.findOne({ customerId: customerId});
    //console.log(cart);
    //await customerProfile.findOne({_id:ObjectId(customerId)}).populate("address").then({
    await Cart.deleteOne({ customerId: customerId })
    .then(()=>{
        if(cart){
            let transId;
            // console.log(cart.map(item=>item.items));
            // result.populate('items').execPopulate(() => {
            //     res.send(result);
            // });
           //function transaction(cId,pId){
               var transaction = async(cId,pId)=>{
                     await Payment.findOne({customerId:cId,paymentId:pId},{}).then(async(data)=>{
                        if(data){
                            var transactionid   = await crypto.randomBytes(6).toString('hex');
                            //console.log(transactionid)
                            transId=transactionid
                            return transactionid
                        }
                        else{
                            res.json("add Payment");
                        }
                        //status='Ordered'
                    })
                    //console.log(transactionid);
                    //return transactionid;
        }
            //let status='Ordered';
            //let indexFound = cart.items.map(item=>it;
            //Order.items.push({i:cart});
            let transactionId=transaction(customerId,paymentId);
            console.log(transId);
            const orderdata={
            customerId:customerId,
            items:cart.items,
            //status:status,
            totalCost:cart.subTotal,
            address:addressId,
            transactionId:transactionId
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