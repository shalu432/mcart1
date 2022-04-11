const mongoose = require('mongoose')
const Category = require('../model/Categoryschema')
const Brand = require('../model/brandschema')
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
        type:Number
    },
    discountedCost:{
        type:Number,
      required:true
    },
   
    shortDescription:{
        type:String,
        minlength:5,
        maxlength:150,
        require:true
    },
    longDescription:{
        type:String,
       minlength:10,
        maxlength:500,
        require:true
    },
    quantity:{
        type:Number,
        min:1,
        max:10,
        required:true
    },
   
    size:{
        type:String,
        uppercase:true,
        enum:['S','M','L','XL','XXL']
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