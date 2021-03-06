const express = require('express')
const router = express.Router()
const Admin = require('../model/adminschema')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAdmin = async(req,res)=>
{
    try{
        const ord = await Admin.find()
        res.json({
         status:true,
         code:"200",
          response:ord
        })
     
 }catch(err){
     res.send({
       error:{
         message:"error",
         response: null,
         error:err.message
       }
     })
 }

}
const addAdmin = async(req,res)=>
{
//var salt = bcrypt.genSaltSync(10);
Admin.findOne({email:req.body.email}).then((data)=>{


if(!data)
bcrypt.hash(req.body.password,10,(err,hash)=>
{
    if(err)
    {
        return res.status(500).json({
            error:err
        })
    }
        else
        {
            const data = new Admin({
               firstName: req.body.firstName,
               lastName: req.body.lastName,
                email:req.body.email,
                password :hash,
                role:req.body.role
                })
                data.save()
                .then(result=>{
                    res.status(200).json({
                        status:true,
                        code:"200",
                        new_data :result

                    })
                 })
                 .catch(err=>{
                     res.status(500).json({
                         status:"false",
                         response:"null",
                         error:err.message
                     })
                 })
                
        }
     
        })
        else{
            res.json("email  already exist")
        }
    })
    }
    const loginAdmin = (req,res)=>
    {
        Admin.find({email:req.body.email})
        .exec()
        .then(data=>
            {
                if(data.length<1)
                {
                    return res.status(401).json({
                        message: "admin not found"
                    })
                }
                else{
                    var privateKey= "shrakdfglessocttufddijeidscmsdicidskci"
                    bcrypt.compare(req.body.password,data[0].password,(err,result)=>{
                        if(!result){
                            res.status(401).json({
                                message:"password matching fail"
                            })
                        }
                        if(result)
                        {
                            const token =jwt.sign({
                              //  name:data[0].name,
                                email:data[0].email,

                            },
                            privateKey,
                            {
                                expiresIn:"48h"
                            }
                            );
                            res.status(200).json({
                               // name:data[0].name,
                                email:data[0].email,
                                token:token

                            })
                        }
                    })
                }
            })
            .catch(err=>
                {
                    res.status(500).json({
                        status:"false",
                        response:"null",
                        err:err.message
                    })

                })
    }
    const updateAdmin = async (req, res) => {

       // var pass;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    pass = hash;
                    // console.log(pass)
    
                     await Admin.findByIdAndUpdate({ _id: req.params.id },
                        {
                            $set: {
                               
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                 email: req.body.email,
                                password: hash,
                                role:req.body.role
                            }
    
                        },{new:true,runValidators:true}).then((data)=>
                        {
                            res.json({
                                status:"true",
                                code:200,
                                message:"updated successfully",
                                response:data,
                        })
                   
                       
                    }).catch(err=>{
                        res.json({
                            status:"false",
                            response:"null",
                            error:err.message,
                            
                    })
               
                        
                    })
                }
            })
        })
    }
    

    const deleteAdmin = async (req, res) => {
        try {
            const val = await Admin.findByIdAndDelete(req.params.id)
            .then((data)=>
            {
                res.json({
                    status:true,
                    error:{},
                    response:data})
            })
          
        } catch (err) {
            res.send({
                status:"false",
                response:"null",
                error:err.message
            })
        }
    }


    

module.exports = {
    getAdmin,
    addAdmin,
    loginAdmin,
    updateAdmin,
    deleteAdmin
}
   