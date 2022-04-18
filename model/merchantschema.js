const mongoose = require('mongoose')
const MerchantSchema = new mongoose.Schema({

    firstName: {
        type: String,
        minlength:2,
        maxlength:30,
       required: true
    },
    lastName: {
        type: String,
        minlength:4,
        maxlength:15,
        required: true
    },
    Gender: {
        type: String,
        enum:["male","female","others"],
      required: true
    },
    DOB: {
        type: Date,
        min:Date[1960-01-01],
        max:Date.now,
        required: true
        
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
        required:true
    },
    Email:
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
       required: true
    },



    address:
    [
        {
             type:
            {
                type:String,
                required:true
            },
        
            houseNumber:{
                type:String,
               // required:true
            },
           
            Street : {
             type:String,
             //required:true
            },
            Locality : {
                type:String,
               // required:true
            },
            city:{
                type:String,
               // required:true
            },
            state:{
                type:String,
                //required:true
            },
            pincode:{
                type :Number,
                minlength:6,
                maxlength:6,
                //required:true
            }
           
        }
        ],

        createdAt: {
            type: Date,
            
          },


    password:{
        type : String,
        required : true,


    }
   
});

module.exports = mongoose.model('Merchant',MerchantSchema)