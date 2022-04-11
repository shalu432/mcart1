const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')
const Category = require('../model/Categoryschema')
const Brand = require('../model/brandschema')
const addCategory = async(req,res)=>
{
    const data = new Category({
        CategoryName:req.body.CategoryName,
      //  brandName:req.body.brandName
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
  const addBrand = async(req,res)=>
{ var categoryId = req.query.categoryId 
    await Brand.find({categoryId:categoryId})
    {
    const data = new Brand({
        categoryId:categoryId,
        brandName:req.body.brandName,
      //  brandName:req.body.brandName
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
          
  }}
  module.exports = {
      addCategory,
      addBrand
  }

  
