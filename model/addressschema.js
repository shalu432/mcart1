const mongoose = require("mongoose");
const Customer = require('../model/customerschema')
const AddressSchema = new mongoose.Schema({
    
 customerId:
  {
   type:mongoose.SchemaTypes.ObjectId,
   ref:"Customer",
  },
    /* address:
    [
        {
             type:
            {
                type:String,
                require:true
            }, */
        
            houseNumber:{
                type:String
            },
           
            Street : {
             type:String
            },
            Locality : {
                type:String
            },
            city:{
                type:String
            },
            state:{
                type:String
            },
            pincode:{
                type :String,
                minlength:6,
                maxlength:6

            }
           
        
        



})
module.exports = mongoose.model('Addresses',AddressSchema)
