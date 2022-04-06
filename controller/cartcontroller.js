const express = require('express')
const router = express.Router()
const Customer = require('../model/customerschema')
const Cart = require('../model/cartschema')
const Product = require('../model/productschema')
const { add } = require('lodash')
const Address = require('../model/addressschema')
//const res = require('express/lib/response')

const getAllCart= async(req,res) => {
    try{
           const cus = await Cart.findOne()
           res.json({
               status:true,
          response:cus
           })
    }catch(err){
        res.send({
            error:{
                message:error,
                response: "cart is empty"
            }
        })
    }
}
const getCart= async(req,res) => {
    try{
           const cus = await Cart.findById(req.params.id)
           res.json({
               status:true,
          response:cus
           })
    }catch(err){
        res.send({
            error:{
                message:error,
                response: "cart is empty"
            }
        })
    }
}

const addProductToCart = async (req, res) => {

try{
    const customerId= req.body.customerId;
     const productId=req.body.productId;
    let data = null;
    const quantity = Number.parseInt(req.body.quantity);
    let cart = await Cart.findOne({ customerId: customerId});
    const productDetails = await Product.findById(productId);
    //console.log("cartDetails", cart)
    //-- Check if cart Exists and Check the quantity if items -------
    if (cart){
        let indexFound = cart.items.findIndex(p => p.productId == productId);
        //console.log("Index", indexFound)
        //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
        if (indexFound != -1) {
            cart.items[indexFound].quantity = parseInt(cart.items[indexFound].quantity + quantity);
            cart.items[indexFound].total = parseInt(cart.items[indexFound].quantity * productDetails.discountedCost);
            cart.items[indexFound].price = productDetails.baseCost
            cart.subTotal = parseInt(cart.items.map(item => item.total).reduce((acc, curr) => acc + curr));
        }
        //----Check if Quantity is Greater than 0 then add item to items Array ----
        else if (quantity > 0) {
            cart.items.push({
                productId: productId,
                productName:productDetails.productName,
                quantity: quantity,
                price: productDetails.baseCost,
                discountedCost: productDetails.discountedCost,
                size:productDetails.size,
                shortDescription: productDetails.shortDescription,
                longDescription: productDetails.longDescription,
                categoryName:productDetails.categoryName,
                brandName:productDetails.brandName,
                available:productDetails.available,
                total: parseInt(productDetails.discountedCost * quantity),
            })
            cart.subTotal = parseInt(cart.items.map(item => item.total).reduce((acc, curr) => acc + curr));
        }
        //----if quantity of price is 0 throw the error -------
        else {
            return res.status(400).json({
                code: 400,
                message: "Invalid request"
            })
        }
        data = await cart.save();
    }
    //------if there is no user with a cart then it creates a new cart and then adds the item to the cart that has been created---------
    else {
        const cartData = {
            customerId: customerId,
            
            items: [{
                productId: productId,
                productName:productDetails.productName,
                quantity: quantity,
                total: parseInt(productDetails.discountedCost* quantity),
                price: productDetails.baseCost,
                shortDescription:productDetails.shortDescription,
                longDescription:productDetails.longDescription,
                categoryName:productDetails.categoryName,
                brandName:productDetails.brandName,
                available:productDetails.available
                //note: note
            }],
            subTotal: (productDetails.discountedCost * quantity)
        }
        cart = new Cart(cartData);
        data = await cart.save();
    }
    return res.status(200).send({
        code: 200,
        message: "Add to Cart successfully!",
        data: data
    });
    }catch(err){
          res.json(err)
    }
    }
    const deleteCart = async(req, res) => {
      try{
    var cus =  await Cart.findOneAndUpdate({customerId :(req.query.customerId)}, { $pull: { items : {productId:(req.query.productId) }}}, {multi: true}).then(data=>{
        res.json({
         message  :"deleted successfully",
            error:"null",
            response:cus
        })
      })
      }
      catch(err){
        res.json(err);
      }
      }
    

module.exports = {
    addProductToCart,
    deleteCart,
    getAllCart,
    getCart
}
