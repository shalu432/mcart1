const express = require('express')
const router = express.Router()
 const Payment = require('../model/paymentschema')
 const Customer = require('../model/customerschema')


var key = require("crypto")

const addPayment = async(req,res)=>{
    if(req.body.cardnumber && req.body.cardname && req.body.cardholdername && req.body.cvv && req.body.expdate && (req.body.cardnumber.toString().length)>=16 && (req.body.cardnumber.toString().length)<=16 && req.body.cvv.toString().length>=3 && req.body.cvv.toString().length <=3)
   {
 //  var firstName= req.body.firstName;
    //var lastName=req.body.lastName
    var email= req.body.email
    var cardnumber = req.body.cardnumber;
    var cardname = req.body.cardname;
    var cardholdername = req.body.cardholdername;
    var cvv = req.body.cvv;
    var expdate = req.body.expdate
     // console.log(req.body)
    var paymentId = key.randomBytes(5).toString('hex')
    //console.log(rollnumber)
     var token =await Customer.find({email:email})
     if(token.length!=0){
     
        var data = {
    //  'firstName' : firstName,
    //  'lastName' : lastName,
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
    

const updatePayment=async (req,res) => {
    
   // var {cardnumber,cardname,cardholdername,cvv,expdate} = res.body;
   var cardnumber = req.body.cardnumber;
 //  var cardname = req.body.cardname;
   var cardholdername = req.body.cardholdername;
   var cvv = req.body.cvv;
   var expdate = req.body.expdate
    const key = req.params.key
    var value = await Payment.updateOne({paymentId:key},{$set:{cardnumber,cardname,cardholdername,cvv,expdate}});
    res.send(value) 
    console.log(value)
   
}


module.exports={
    addPayment,
    updatePayment
}

