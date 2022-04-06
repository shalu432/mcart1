const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({

    name : {
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
    // roll:{
    //     type:Enumerator
    // }
});

module.exports = mongoose.model('Admin',AdminSchema)