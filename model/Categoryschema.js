const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
    

category:
[
    {
         type:
        {
            type:String,
            require:true
        },
    
        categoryName :{
            type:String,
            
        },
       
        brandName : {
         type:String,
         
         
        }}]
})
module.exports = mongoose.model('Category',CategorySchema)
