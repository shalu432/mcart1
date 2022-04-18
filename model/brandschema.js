const mongoose = require('mongoose')
const Category = require('../model/Categoryschema')
const BrandSchema = new mongoose.Schema({
    


    categoryId:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
       
        brandName :{
         type:String,
         required:true
         
         
        }
    
})
module.exports = mongoose.model('Brand',BrandSchema)
