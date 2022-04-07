const mongoose = require('mongoose')
const Address = require('../model/addressschema')
const CustomerSchema = new mongoose.Schema({

    

    firstName: {
        type: String,
        minlength:2,
        maxlength:30,
        match:[/^[A-Za-z]+$/,'Please fill a valid firstName'],
       required: true
    },
    lastName: {
        type: String,
        minlength:4,
        maxlength:15,
        match:[/^[A-Za-z]+$/,'Please fill a valid firstName'],
        required: true
    },
    Gender: {
        type: String,
        enum:["male","female","others"],
      require: true
    },
    DOB: {
        type:Date,
        min:Date[1960-01-01],
        max:Date[2022-01-01],
        require: true
        
    },

    phoneNumber:
    {

        type: Number,
        unique: true,
        validate(value) {
            if (value.toString().length != 10 || value < 0) {
                throw new Error("Enter a valid  phone number")
            }
        },
        require:true
    }, 
      

   
    email:
    {
        type: String,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        required: true

    },
    countryCode:

    {
        type: String,
        match: [/^(\+?\d{1,3}|\d{1,4})$/gm],
       require: true
    },



    address:
 [ {
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Addresses"
            
     }],
  

//  cardItems:[{
// type:mongoose.SchemaTypes.ObjectId,
// ref:'Cart'
//  }]

})
   
module.exports = mongoose.model('Customer', CustomerSchema)

