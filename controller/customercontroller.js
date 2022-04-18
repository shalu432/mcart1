const express = require('express')
const router = express.Router()
const Customer = require('../model/customerschema')
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");
const Otp  = require('../model/otpmodel');
const jwt = require('jsonwebtoken');
const Product = require('../model/productschema')

//const { findOne } = require('../model/customerschema');
//const { updateOne } = require('../model/customerschema')
const Address = require('../model/addressschema');
//const { status } = require('express/lib/response');

const getCustomer= async(req,res) => {
    try{
           const cus = await Customer.find()
           res.json({
               status:200,
               response:cus
           })
    }catch(err){
        res.send({
            error:
            {
                message :"null",
                error:error
            }
        })
    }
}

const getProductByCustomer= async(req,res) => {
    try{
        const currentPage = req.query.currentPage;//2
           const pageSize = req.query.pageSize; //10

           const skip = pageSize * (currentPage-1);
            const limit = pageSize;
            let query={};
       
            if(req.query.keyword){
                query.$or=[
                 
                    { "productName" : { $regex: req.query.keyword, $options: 'i' }},
                    { "shortDescription" : { $regex: req.query.keyword, $options: 'i' }},
                    { "longDescription" : { $regex: req.query.keyword, $options: 'i' }}
                ];
            }
            Product.find(query).skip(skip).limit(limit).sort({[req.query.key]:req.query.value})
       // await Product.find()
        .select({"productName":1,"baseCost":1,"longDescription":1,"shortDescription":1,"discountedCost":1,"_id":0}).populate("brandId")
        
        .then((data)=>
           { res.json({
            status:200,
            response:data
        })})
           
          
    }catch(error){
        res.send({
            error:
            {
                message :"null",
                error:error
            }
        })
    }
}



const addCustomer = async(req,res) => {
  
  
  try{
    const use= new Customer({
        firstName: req.body.firstName,
                lastName: req.body.lastName,
                 Gender: req.body.Gender,
                DOB: req.body.DOB,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                countryCode: req.body.countryCode,

               
    })
   await use.save()
    //res.send(use)

    const custId = await Customer.findOne({firstName: req.body.firstName,
        lastName: req.body.lastName,
         Gender: req.body.Gender,
        DOB: req.body.DOB,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        countryCode: req.body.countryCode,
        

    })
  

const add = new Address({
    customerId:custId._id,
    houseNumber : req.body.address.houseNumber,
    street:req.body.address.street,
    Locality : req.body.address.Locality,
    city : req.body.address.city,
    state:req.body.address.state,
    pincode:req.body.address.pincode
})
await add.save()
//res.json(add)
 


const addr= await Address.findOne({
    houseNumber : req.body.address.houseNumber,
    street:req.body.address.street,
    Locality : req.body.address.Locality,
    city : req.body.address.city,
    state:req.body.address.state,
    pincode:req.body.address.pincode},{_id:1})

   // console.log(addr)

   await Customer.updateOne(
      { email:req.body.email},
      {$push:{address:addr._id}}
   ).populate("address") .then(() => {
    res.status(200).json({
        status:true,
        "code":200,
        "error": {
                },
    message:"successfully added",
    response:{use,
        add
    }
    })
})
.catch(err => {
    res.status(403).json({
        error: {
            error:error,
            message:"failed to add "
        }
    })
})
}
catch(error)
{
    res.status(500).json({
        use:error.message,
      //  add:error.message
    })
}
}





 const loginUser = async (req, res) => {
  try{
    Otp.findOne({phoneNumber:req.body.phoneNumber}).then(async(result)=>{
    if(!result)
    {
    await Customer.findOne({phoneNumber:req.body.phoneNumber}).then(async(data)=>
    {
if(data)
{
  var OTP = otpGenerator.generate(6, {
        digits: true, alphabets: false, upperCase: false, specialChars: false
    });
    res.json({
response:"otp sent successfully",
        otp:OTP});
    const phoneNumber = req.body.phoneNumber;
   
    const otp = new Otp({ phoneNumber: phoneNumber, otp: OTP });
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save()
    //console.log(otp)
    .then(()=>
    
    { return res.status(200).send("otp send successfully");

    })
    .catch(err=>
        {
            res.status(404).json({
                error:err
            })
        })
}
else{
    res.json("phone number not exist")
}
  })
}
  else{
      res.json("try after sometimes otp is not expired")
}
  })

  }
  
  catch(error)
    {
        res.status(404).json("error")
    }
 }

const verifyOtp= async(req,res)=>
{
    try{
     await Customer.findOne({phoneNumber:req.body.phoneNumber}).then(async()=>{
      await Otp.find({ phoneNumber:req.body.phoneNumber})
    .exec()
    .then(data=>
        {
            if(data.length<1)
            {
                return res.status(401).json({
                    message: "OTP Expired "
                })
            }
            else{
                var privateKey= "wwfdkol.kdscxghykjkgdfsdfscsfetreutiyrhwfw"
                bcrypt.compare(req.body.otp,data[0].otp,(err,result)=>{
                    if(!result){
                        res.status(401).json({
                            message:"otp wrong"
                        })
                    }
                    if(result)
                    {
                        const token =jwt.sign({
                            //name:data[0].name,
                            phoneNumber:data[0].phoneNumber,
                        },
                        privateKey,
                        {
                            expiresIn:"24h"
                        }
                        );
                        res.status(200).send ({
                            "status": "true",
                            "msg": "Successfully login",
                            "response": result,
                            "code":200,
                            "error": {
                            },
                            token:token
                        })
                    }
                })
            }
        })
     
     })
        .catch(err=>
            {
                res.status(500).json(
                    {
                        "status": true,
                        "response": null,
                        "code":500,
                        "error": {
                        "errCode": "FAILED",
                        "errMsg": "Failed to login"
                        },
                    })
            })

        }
        
        catch(error)
        {
            res.json({
                "status":false,
                "response": null,
                "code":500,
                "error": {
                "errCode": "FAILED",
                "errMsg": "Failed to login"
                },
            })
        }
       
        }



 
 const updateCustomer = async(req,res)=> {

try{
        const cus = await Customer.findByIdAndUpdate({_id:req.params.id},{
       $set:{
        
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                 Gender: req.body.Gender,
                DOB: req.body.DOB,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                countryCode: req.body.countryCode,
                //address: req.body.address,
                 
        }
     },{new:true,runValidators:true})
     
     // const a1 = await cus.save()
        
        //     res.status(200).json({
        //         message : "successfully Updated",
        //         response:a1
        // })   
   
  .then((data)=>{

      res.json({
          message : "successfully Updated",
          response:data
      })
  }).catch((err)=>{
    // console.log(err) 
     res.send({
         error_code:500,
         message:"null",
         response:err

     })
  })
}catch(error)
{
    res.json(error.message)
}
}





const updateAddress = async(req,res)=> {
try{
  var flagaddress = await Address.findOne({_id:req.query.address},{})
  if(flagaddress==null){
    res.status(500).json({status:"false",
    respone:"null",
    code:"500",
    errors:{
        error_code:"failed_to_update",
        error_msg:"invalid_address_id"
    },
    message:"Unable_to_update_customer_address"
    })
  }
   else if (flagaddress!=null)
    {
      var houseNumber=req.body.houseNumber
     var street=req.body.street
     var Locality=req.body.Locality
     var city=req.body.city
     var state=req.body.state
     var pincode =req.body.pincode
     
    await Address.findByIdAndUpdate(req.query.address,{
      $set: {
        houseNumber:houseNumber,
        street:street,
        Locality:Locality,
        city:city,
        state:state,
        pincode:pincode
      }
    },{new:true,runValidators:true}).then((result) => res.status(201).json(
      {status:"true",
      respone:result,
      code:"200",
      errors:{
      },
      message:"address_updated_succesfully"
    }))
    .catch((err) => res.status(201).json({status:"false",
    respone:"null",
    code:"500",
    errors:{
        error_code:"failed_to_update",
        error_msg:err
    },
    message:"Unable_to_update_customer_address"
    }))
    //resp.send(result)
  }else{
    res.status(500).json({status:"false",
    respone:"null",
    code:"500",
    errors:{
        error_code:"Authorization_failed",
        error_msg:"something_went_wrong"
    },
    message:"Unable_to_update_customer_address"
    })
  }
}catch(error)
{
    res.json(error)
}
}


const deleteCustomer = async(req,res)=> {
    try{
        const cus = await Customer.findByIdAndDelete(req.params.id) 
        res.json({
            status : 200,
            message:"successfully deleted",
         response:cus
    })  
    }catch(err){
        res.status(500).send({
            error_code:500,

        })
    }
   

}

module.exports={
    getCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    loginUser,
    verifyOtp,
    updateAddress,
    getProductByCustomer
}
   
   

