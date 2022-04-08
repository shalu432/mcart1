const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
    

category:

    {
         type:
        {
            type:String,
            require:true
        },
    
        // categoryName :{
        //     type:String,
            
        // }
    categoryId:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
       
        brandName :[{
         type:String,
         
         
        }]}
    // ]
})
module.exports = mongoose.model('Category',CategorySchema)
