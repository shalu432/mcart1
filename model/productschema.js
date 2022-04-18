const mongoose = require('mongoose')
const Category = require('../model/Categoryschema')
const Brand = require('../model/brandschema')
const Merchant = require('../model/merchantschema')
const ProductSchema = new mongoose.Schema({


    productName:{
        type:String,
        required:true
    },
    baseCost:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    discountedCost:{
        type:Number,
      required:true
    },
   
    shortDescription:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    },
    longDescription:{
        type:String,
       minlength:10,
        maxlength:100,
        required:true
    },
    quantity:{
        type:Number,
        min:1,
       // max:10,
        required:true
    },
   
    size:{
        type:String,
        uppercase:true,
        enum:['S','M','L','XL','XXL'],
        required:true
    },
   
   categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Category"
   },
   brandId:
   {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Brand" 
   },
   
     
    
        
    available: {
        type: Boolean,
        required: true,
     },
     merchantId:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"Merchant"
     },
    created_at    : { type: Date, required: true, default: Date.now }
    
})



module.exports = mongoose.model('Product',ProductSchema)