const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({

    firstName : {
        type:String,
        match:[/^[A-Za-z]+$/,'Please fill a valid firstName'],
        require:true

    },
    lastName : {
        type:String,
        match:[/^[A-Za-z]+$/,'Please fill a valid firstName'],
        require:true

    },
    email:{
       type:String,
       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
       unique:true,
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