const express = require('express')
const router = express.Router()
const Customer = require('../model/customerschema')
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");
const Otp  = require('../model/otpmodel');
const jwt = require('jsonwebtoken');

//const { findOne } = require('../model/customerschema');
//const { updateOne } = require('../model/customerschema')
const Address = require('../model/addressschema')

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




const addCustomer = async(req,res) => {
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
    pincode:req.body.address.pincode
})
await add.save()
//res.json(add)
 


const addr= await Address.findOne({
    houseNumber : req.body.address.houseNumber,
    street:req.body.address.street,
    Locality : req.body.address.Locality,
    city : req.body.address.city,
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
    res.status(404).json({
        error: err
    })
})
   
}





 const loginUser = async (req, res) => {
  
    const user = await Otp.findOne({
        phoneNumber: req.body.phoneNumber
    });
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
            return err
        })
 
}

const verifyOtp= (req,res)=>
{
    Customer.findOne({phoneNumber:req.body.phoneNumber}).then(result=>{
    Otp.find({ phoneNumber:req.body.phoneNumber})
    .exec()
    .then(data=>
        {
            if(data.length<1)
            {
                return res.status(401).json({
                    message: "OTP Expired"
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
                            expiresIn:"48h"
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
                        "code": 200,
                        "error": {
                        "errCode": "FAILED",
                        "errMsg": "Failed to login"
                        },
                    })
            })
}


 
 const updateCustomer = async(req,res)=> {


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
     }) 
     
      const a1 = await cus.save()
        
            res.status(200).json({
                message : "successfully Updated",
                response:a1
        })   
   
  .then(()=>{

      res.json({
          message : "successfully Updated",
          response:cus
      })
  }).catch((err)=>{
     console.log(err) 
     res.send(err)
  })

}
const updateAddress = async(req,res)=> {

var flagcustomer = await Customer.findOne({_id:req.query.customer},{})
  var flagaddress = await Address.findOne({_id:req.query.address},{})
 // console.log(flagaddress,flagcustomer)
  if(flagcustomer==null){
    res.status(201).json({status:"false",
    respone:"null",
    code:"403",
    errors:{
        error_code:"failed_to_update",
        error_msg:"invalid_customer_id"
    },
    message:"Unable_to_update_customer_address"
    })
  }
  if(flagaddress==null){
    res.status(201).json({status:"false",
    respone:"null",
    code:"403",
    errors:{
        error_code:"failed_to_update",
        error_msg:"invalid_address_id"
    },
    message:"Unable_to_update_customer_address"
    })
  }
   else if (flagcustomer!=null&&flagaddress!=null)
    {
      var houseNumber=req.body.houseNumber
     var street=req.body.street
     var Locality=req.body.Locality
     var city=req.body.city
     var pincode =req.body.pincode
     
    await Address.updateOne({ _id:req.query.address,customerId:req.query.customer },{
      $set: {
        houseNumber,street,Locality,city,pincode
      }
    }).then(() => res.status(201).json(
      {status:"true",
      respone:null,
      code:"201",
      errors:{
      },
      message:"address_updated_succesfully"
    }))
    .catch((err) => res.status(201).json({status:"false",
    respone:"null",
    code:"403",
    errors:{
        error_code:"failed_to_update",
        error_msg:err
    },
    message:"Unable_to_update_customer_address"
    }));
    //resp.send(result)
  }else{
    res.status(201).json({status:"false",
    respone:"null",
    code:"403",
    errors:{
        error_code:"Authorization_failed",
        error_msg:"something_went_wrong"
    },
    message:"Unable_to_update_customer_address"
    })
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
        res.send('Error')
    }
   

}

module.exports={
    getCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    loginUser,
    verifyOtp,
    updateAddress
}
   
   

