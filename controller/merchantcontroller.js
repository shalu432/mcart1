const express = require('express')
const router = express.Router()
const Merchant = require('../model/merchantschema')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { updateOne } = require('../model/merchantschema')


const addMerchant = async (req, res) => {
    //var salt = bcrypt.genSaltSync(10);
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const data = new Merchant({
                //  name :req.body.name,
                firstName: req.body.firstName,
                lastName: req.body.lastName,

                Gender: req.body.Gender,
                DOB: req.body.DOB,
                phoneNumber: req.body.phoneNumber,
                Email: req.body.Email,
                countryCode: req.body.countryCode,
                address: req.body.address,

                createdAt: req.body.createdAt,
                password: hash
            })
            data.save()
                .then(result => {
                    res.status(200).json({
                        status:true,
                    
                        response: result


                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
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
                           
                            email: data[0].email,

                        },
                            privateKey,

                            {
                                expiresIn: "24h"
                            }
                        );
                        res.status(200).json({
                            code:"200",
                            error:{},
                           message:"successfully authorized",
                            email: data[0].email,

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
        const vend = await Merchant.findById(req.params.id)
        res.json(vend)
    } catch (err) {
        res.send('Error')
    }

}
const updateMerchant = async (req, res) => {

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

                var vali = await Merchant.updateOne({ _id: req.params.id },
                    {
                        $set: {
                            // name:req.body.name,
                            // password:pass

                            firstName: req.body.firstName,
                            lastName: req.body.lastName,

                            Gender: req.body.Gender,
                            DOB: req.body.DOB,
                            phoneNumber: req.body.phoneNumber,
                            Email: req.body.Email,
                            countryCode: req.body.countryCode,
                            address: req.body.address,
                            createdAt: req.body.createdAt,
                            password: hash
                        }

                    })
                res.json({
                    status:"true",
                    code:200,
                    message:"updated successfully",
                    response:vali,
                   
                })
            }
        })
    })
}
const deleteMerchant = async (req, res) => {
    try {
        const val = await Merchant.findByIdAndDelete(req.params.id)
        res.json(val)
    } catch (err) {
        res.send('Error')
    }
}
module.exports = {
    addMerchant,
    loginMerchant,
    getMerchant,
    updateMerchant,
    deleteMerchant
}
