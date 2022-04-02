const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')
const Category = require('../model/Categoryschema')
const addCategory = async(req,res)=>
{
    const data = new Category({
        name:req.body.name,
        brandName:req.body.brandName
          })
          data.save()
          .then(result=>{
              res.status(200).json({
                  new_data :result

              })
           })
           .catch(err=>{
               res.status(500).json({
                   error:err
               })
           })
          
  }
  module.exports = {
      addCategory
  }

  
