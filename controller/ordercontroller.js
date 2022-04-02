const express = require('express')
const router = express.Router()
const Order = require('../model/orderschema')
//const Vendor= require('../model/vendor')

const getOrderDetails = async(req,res) => {
    try{
           const val = await Product.find()
           res.json(val)
    }catch(err){
        res.send('Error ' + err)
    }
 }
 const addOrder = async(req,res)=>
 {
    const val = new Product({
       
        customerName : req.body.customerName,
        productName: req.body.productName,
        discount: req.body.discount,
        discountedCost:(req.body.baseCost-(req.body.discount*req.body.baseCost/100)),
        quantity: req.body.quantity,
       size: req.body.size,
        categoryName:req.body.categoryName,
    
        brandName:req.body.brandName
        


    })
    val.save()
        .then(result => {
            
            res.status(200).json({ 
                
                status:'true',
                    Response:result
                 })
            
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

   
}
 
 
module.exports={
    getOrderDetails,
    addOrder
    
    
}