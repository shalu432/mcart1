const mongoose = require('mongoose')
const PaymentSchema = new mongoose.Schema({

  customerId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Customer"
  },
    email:
   {
       type:String,
       require:true
   },
    cardnumber:
    {
        type: Number,

        minlength:16,
        maxlength:16,
        required: true,

    },

    

    cardholdername:
    {
        type: String,
        uppercase:true,
        match:[/^[A-Za-z]+$/,'Please fill a valid firstName'],
        require: true
    },
    cardname:
    {
        type:String,
        enum:["mastercard","visa"]
    },

    cvv:
    {
        type: Number,

    },
    expdate:
    {
        type: Date,
        min: Date.now
    },
    paymentId: {
        type: String
    }
});

module.exports = mongoose.model('Payment', PaymentSchema)