const mongoose = require('mongoose')
const PaymentSchema = new mongoose.Schema({

  customerId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Customer"
  },
//     email:
//    {
//        type:String,
//        required:true
//    },
    cardnumber:
    {
        type: Number,
         minlength:16,
        maxlength:16,
        unique:true,
        required: true,

    },

    

    cardholdername:
    {
        type: String,
        uppercase:true,
        match:[/^[A-Za-z]+$/,'Please fill a valid firstName'],
        required: true
    },
    cardname:
    {
        type:String,
        enum:["mastercard","visa"],
        required:true
    },

    cvv:
    {
        type: Number,

        required:true

    },
    expdate:
    {
        type: Date,
        min: Date.now,
        required:true
    },
    paymentId: {
        type: String
    }
});

module.exports = mongoose.model('Payment', PaymentSchema)