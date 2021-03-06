const express = require('express')
const router = express.Router()
const Merchant = require('../model/merchantschema')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Customer = require('../model/customerschema')

const { ObjectId } = require("bson")


const addMerchant = async (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const data = new Merchant({
                
                firstName: req.body.firstName,
                lastName: req.body.lastName,

                Gender: req.body.Gender,
                DOB: req.body.DOB,
                phoneNumber: req.body.phoneNumber,
                Email: req.body.Email,
                countryCode: req.body.countryCode,
               address: {
                   houseNumber:req.body.address.houseNumber,
                   street:req.body.address.street,
                   Locality:req.body.address.Locality,
                   city:req.body.address.city,
                   state:req.body.address.state,
                   pincode:req.body.address.pincode
               },
                password: hash
            })
            data.save()
                .then(result => {
                    res.status(200).json({
                        status:true,
                    error:{},
                        response: result


                    })
                })
                .catch(error => {
                    res.status(500).json({
                        status:"false",
                        response:"null",
                        error: error.message
                    })
                })

        }

    })
}
const loginMerchant = (req, res) => {
    Merchant.find({ Email: req.body.Email })
        .exec()
        .then(data => {
            if (data.length < 1) {
                return res.status(401).json({
                    response:"null",
                    message: "admin not found"
                })
            }
            else {
                var privateKey = "wertyuiosfssdfkjljljhfdvtfgvhecvsrhvnjhiu"
                bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                    if (!result) {
                        res.status(401).json({
                           // message: "password matching fail"
                           status:"true",
                           response:"null",
                           code:"200",
           
                           error:{
                               errCode:"Authorize_Failed",
                               errMsg:"Failed to Authorized"
                           },
                        })
                    }
                    if (result) {
                        const token = jwt.sign({
                           
                            //email: data[0].email,
                           id:data[0]._id

                        },
                            privateKey,

                            {
                                expiresIn: "48h"
                            }
                        );
                        res.status(200).json({
                            code:"200",
                            error:{},
                           message:"successfully authorized",
                            Email: data[0].Email,
                            

                            token: token

                        })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
               
                //err: err
            })

        })
}
const getMerchant = async (req, res) => {
    try {
        const val = await Merchant.find()
        res.json({
            status:true,
            error:{},
            response:val
        })
    } catch (err) {
        res.send({
            error:{
                status:false,
                error:err.message
            }
        })
    }

}




const updateMerchant = async (req, res) => {
//console.log(req.merchant)
    var pass;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            } else {
                pass = hash;
                // console.log(pass)

                await Merchant.findOneAndUpdate({_id:req.merchant},
                    {
                        $set: {
                           
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,

                            Gender: req.body.Gender,
                            DOB: req.body.DOB,
                            phoneNumber: req.body.phoneNumber,
                            Email: req.body.Email,
                            countryCode: req.body.countryCode,
                            //address: req.body.address,
                            createdAt: req.body.createdAt,
                            password: hash
                        }

                    },{new:true,runValidators:true}).then((data)=>{
                        res.json({
                            status:"true",
                            code:200,
                            message:"updated successfully",
                            response:data,
                           
                        })
                    }).catch(error=>{
                        res.json({
                           status:"false",
                            response:"null",
                            error:error.message
                        })
                    })
                
            }
        })
    })
}

const updateMerchantByAdmin = async (req, res) => {

    var pass;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            } else {
                pass = hash;
              

                await Merchant.findByIdAndUpdate({_id:req.params.id},
                    {
                        $set: {
                           
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,

                            Gender: req.body.Gender,
                            DOB: req.body.DOB,
                            phoneNumber: req.body.phoneNumber,
                            Email: req.body.Email,
                            countryCode: req.body.countryCode,
                            //address: req.body.address,
                            createdAt: req.body.createdAt,
                            password: hash
                        }

                    },{new:true,runValidators:true}).then((data)=>{
                        res.json({
                            status:"true",
                            code:200,
                            message:"updated successfully",
                            response:data,
                           
                        })
                    }).catch(error=>{
                        res.json({
                           status:"false",
                            response:"null",
                            error:error.message
                        })
                    })
                
            }
        })
    })
}
const deleteMerchant = async (req, res) => {
    try {
        const val = await Merchant.findByIdAndUpdate(ObjectId(req.merchant),{$set:{isActive:false}})
      //  res.json(val)
      res.json({
        status:true,
        error:{},
        message:"merchant deleted successfully",
        response:val
    })
    } catch (err) {
        res.send({
            error:err.message
        })
    }
}
const deleteMerchantByAdmin = async (req, res) => {
    try {
        const val = await Merchant.findByIdAndUpdate(ObjectId(req.params.id),{$set:{isActive:false}})
      //  res.json(val)
      res.json({
        status:true,
        error:{},
        message:"merchant deleted successfully",
        response:val
    })
    } catch (err) {
        res.send({
            error:err.message
        })
    }
}

const blockedCustomerByMerchant=async(req,res)=>
{
    
await Customer.findOne({_id:req.query.id})
await Merchant.findOneAndUpdate({_id:ObjectId(req.merchant)},{$push:{blockedCustomer:req.query.id}},{new:true})
.then((data)=>{
    
    res.json({
        status:true,
        error:{},
        response:data
    })
})
    .catch(error=>
        {
            res.json({
                status:"false",
                response:"null",
                error:error.message
            })
        })


}
const unblockedCustomerByMerchant=async(req,res)=>
{

await Customer.findOne({_id:req.query.id})
await Merchant.findOneAndUpdate({_id:ObjectId(req.merchant)},{$pull:{blockedCustomer:req.query.id}},{new:true})
.then((data)=>{
  
    res.json({
        status:true,
        error:{},
        response:data
    })
})
    .catch(error=>
        {
            res.json({
                status:"false",
                response:"null",
                error:error.message
            })
        })


}

    

    




module.exports = {
    addMerchant,
    loginMerchant,
    getMerchant,
    updateMerchant,
    deleteMerchant,
   deleteMerchantByAdmin,
    updateMerchantByAdmin,
    blockedCustomerByMerchant,
    unblockedCustomerByMerchant
}
