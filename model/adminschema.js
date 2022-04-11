const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({

    firstName : {
        type:String,
        require:true

    },
    lastName : {
        type:String,
        require:true

    },
    email:{
       type:String,
       require : true 
    },
    password:{
        type : String,
        require : true
    },
     role:{
        type:String,
        enum:["ceo","manager","chairman","director"]
     },
     isActive:{
         type:Boolean,
         default:true,
         require:true
     }


});

module.exports = mongoose.model('Admin',AdminSchema)