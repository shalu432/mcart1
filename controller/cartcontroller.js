const express = require('express')
const router = express.Router()
const Customer = require('../model/customerschema')
const Cart = require('../model/cartschema')
const Product = require('../model/productschema')



const addProductToCart = async (req, res) => {

  
    const { productId, quantity, productName, price } = req.body;

    const CustomerId = (req.query.id); //TODO: the logged in user id
  
    try {
      let cart = await Cart.findOne({ CustomerId });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ 
            
              productId:req.body.productId, 
              quantity:req.body.quantity, 
              productName:req.body.productName,
               price:req.body.price
             });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      }
      else {
      //  no cart for user, create new cart
        const newCart = await Cart.create({
          CustomerId,
          products: [{
               productId:req.body.productId, 
               quantity:req.body.quantity,
               productName:req.body.productName, 
               price:req.body.price }]
        });
  
       return res.status(201).send(newCart);
     }
     } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
      }
    }




module.exports = {
    addProductToCart
}
