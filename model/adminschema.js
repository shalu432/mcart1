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
    
    email:
    {
        type: String,
      
       unique:true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        
    },
    password:{
        type : String,
       // unique:true,
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