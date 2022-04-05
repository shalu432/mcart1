const express = require('express')
const router = express.Router()
 const Payment = require('../model/paymentschema')
 const Customer = require('../model/customerschema')


var key = require("crypto")

const addPayment = async(req,res)=>{
    try{
        var customerId = req.query.customerId
await Customer.findOne({_id:req.query.id})
{

    if(req.body.cardnumber && req.body.cardname && req.body.cardholdername && req.body.cvv && req.body.expdate && (req.body.cardnumber.toString().length)>=16 && (req.body.cardnumber.toString().length)<=16 && req.body.cvv.toString().length>=3 && req.body.cvv.toString().length <=3)
   {
 //  var firstName= req.body.firstName;
    //var lastName=req.body.lastName
    var email= req.body.email
    var cardnumber = req.body.cardnumber;
   // var cardname = req.body.cardname;
    var cardholdername = req.body.cardholdername;
    var cvv = req.body.cvv;
    var expdate = req.body.expdate
     // console.log(req.body)
    var paymentId = key.randomBytes(6).toString('hex')
    //console.log(rollnumber)
     var token =await Customer.find({email:email})
     if(token.length!=0){
     
        var data = {
    //  'firstName' : firstName,
    //  'lastName' : lastName,
    'customerId':customerId,
     'email' : email,
     'cardnumber': cardnumber,
     // 'cardname' : cardname,
     'cardholdername': cardholdername,
      'cvv' : cvv,
     'expdate' : expdate,
     'paymentId':paymentId
    }
    // console.log("fkjshfkfsfkjhsjf",data)
    var val=new Payment(data);
    await val.save().then(()=>res.send("Successfully")).catch((err)=>res.send(err))
    
 }else{res.send('email  Not Found')}
}

else{
    res.json('Enter correct data');
}}
}
catch(error){
res.json("error")
}
}



const updatePayment=async (req,res) => {
    
   var cardnumber = req.body.cardnumber;
 var cardholdername = req.body.cardholdername;
   var cvv = req.body.cvv;
   var expdate = req.body.expdate
    const key = req.params.key
    var value = await Payment.updateOne({paymentId:key},{$set:{cardnumber,cardholdername,cvv,expdate}});
    res.send(value) 
   // console.log(value)
   
}

const deleteCard = async(req,res)=>
{
    try {
        const val = await Payment.findByIdAndDelete(req.params.id)
        res.json({
            status:"true",
            code:200,
            message:"deleted successfully",
            response:val,
        })
    } catch (err) {
        res.send('Error')
    }
}

const getPayment= async(req,res) => {
    try{
           const cus = await Payment.find()
           res.json({
               status:"true",
               response:cus
           })
    }catch(err){
        res.send('Error ' + err)
    }
}

module.exports={
    addPayment,
    updatePayment,
    deleteCard,
    getPayment
}

