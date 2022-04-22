const express = require('express')
const router = express.Router()
 const Payment = require('../model/paymentschema')
 const Customer = require('../model/customerschema')


var key = require("crypto")

const addPayment = async(req,res)=>{
    try{
      //  var customerId = req.query.customerId
await Payment.findOne({customerId:req.customer})
{

    if(req.body.cardnumber && req.body.cardname && req.body.cardholdername && req.body.cvv && req.body.expdate && (req.body.cardnumber.toString().length)>=16 && (req.body.cardnumber.toString().length)<=16 && req.body.cvv.toString().length>=3 && req.body.cvv.toString().length <=3)
   {
 
   
    var cardnumber = req.body.cardnumber;
    var cardname = req.body.cardname;
    var cardholdername = req.body.cardholdername;
    var cvv = req.body.cvv;
    var expdate = req.body.expdate
    var customerId=req.customer
    
    var paymentId = key.randomBytes(6).toString('hex')
    Payment.findOne({cardnumber:req.body.cardnumber}).then(async(result)=>{
         if(!result){
              var token =await Customer.find({customerId:req.customer})
     if(token.length!=0){
     
        var data = {
    
    'customerId':customerId,
    // 'email' : email,
     'cardnumber': cardnumber,
      'cardname' : cardname,
     'cardholdername': cardholdername,
      'cvv' : cvv,
     'expdate' : expdate,
     'paymentId':paymentId
    }
    
    var val=new Payment(data);
    await val.save().then(()=>res.send({
        status:true,
        response:"successfully",
        error:{},
        response:val
    })).catch((err)=>res.json({
        error:err.message
    }))
    
 }else{res.send('customer  Not Found')}
   }
else{
    res.json({
        status:"false",
        error:{},
        message:"cardnumber is already exist"
    })
}

})

}





else{
    res.json('Enter correct data');
}}



}
catch(error){
res.json({
    error:error.message
})
}
}



const updatePayment=async (req,res) => {
    try{
         if(req.body.cardnumber && req.body.cardname && req.body.cardholdername && req.body.cvv && req.body.expdate && (req.body.cardnumber.toString().length)>=16 && (req.body.cardnumber.toString().length)<=16 && req.body.cvv.toString().length>=3 && req.body.cvv.toString().length <=3)
         {
    await Payment.findOneAndUpdate({_id:req.params.id},{$set:{
        cardnumber:req.body.cardnumber,
        cardholdername:req.body.cardholdername,
        cardname:req.body.cardname,
        cvv:req.body.cvv,
        expdate:req.body.expdate
    }},{new:true,runValidators:true})
.then((result)=>
    {
        res.json({
            status:true,
            message : "successfully Updated",
            response:result
        })
    })
    .catch(()=>
    {res.json({
        error:
        {
            error:"payment not found",
            error:error.message
        }
    })

    })
        
}
else{
    res.json("enter valid data")
}        
        
    }
    catch(error){
        res.json({
            error:error.message
        })
    }
    
   
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
           const cus = await Payment.findById(req.params.id)
           res.json({
               status:"true",
               response:cus,
               error:{}
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

