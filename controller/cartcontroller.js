const express = require('express')
const router = express.Router()
 const Cart = require('../model/cartschema')
 const addProductToCart = async (req, res) => {
//cart
//
    const val = new Cart({
        productName: req.body.productName,
        baseCost: req.body.baseCost,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        discount: req.body.discount,
        discountedCost:(req.body.baseCost-(req.body.discount*req.body.baseCost/100)),
        quantity: req.body.quantity,
       size: req.body.size,
        categoryName:req.body.categoryName,
        brandName:req.body.brandName,
        totalCost:(req.body.discountedCost*req.body.quantity)
        


    })
    val.save()
        .then(result => {
            
            res.status(200).json({ 
                
                status:'true',
                    Response:val
                 })
            
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

   
}
module.exports ={
    addProductToCart
}
