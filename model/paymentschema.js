const mongoose = require('mongoose')
const PaymentSchema = new mongoose.Schema({

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
        require: true
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