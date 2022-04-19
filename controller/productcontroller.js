const express = require('express')
const router = express.Router()
const Product = require('../model/productschema')
const Merchant = require('../model/merchantschema')
const Category= require('../model/Categoryschema')
const Brand = require('../model/brandschema')

const getAllProduct = async (req, res) => {
    try {
        const val = await Product.find()
        res.json({
            status:"true",
            code:"200",
            response:val
        })
    } catch (err) {
        res.send({
            status:"false",
            response:"null",
            error:err.message
        })
    }
}
const getProductBYId = async (req, res) => {
    try {
        const val = await Product.findById(req.params.id)
        res.json({
            status:"true",
            code:"200",
            response:val
        })
    } catch (err) {
        res.send({
            status:"false",
            response:"null",
            error:err.message
        })
    }
}




const productRecord = (req, res, next) => {
    try{
        if(!req.body) {
            responseObj = {
                "status": "error",
                "msg": "Input is missing.",
                "body": {}
            }
            res.status(500).send(responseObj);
        }else{
            //pagination
            // page number
            // no of records

            const currentPage = req.query.currentPage;
           const pageSize = req.query.pageSize; 

           const skip = pageSize * (currentPage-1);
            const limit = pageSize;
            let query={};
       
            if(req.query.keyword){
                query.$or=[
                   
                    //{ "categoryName" : { $regex: req.query.keyword, $options: 'i' }},
                   // { "brandName" : { $regex: req.query.keyword, $options: 'i' }},
                    { "productName" : { $regex: req.query.keyword, $options: 'i' }},
                    { "shortDescription" : { $regex: req.query.keyword, $options: 'i' }},
                    { "longDescription" : { $regex: req.query.keyword, $options: 'i' }}
                ];
            }
            Product.find(query).skip(skip).limit(limit).sort({[req.query.key]:req.query.value}).exec((err, docs) =>{
                if(err) {
                    responseObj = {
                        "status": "error",
                        "msg": "Input is missing.",
                        "body": {}
                    }
                    res.status(500).send(responseObj);
                }else{
                    responseObj = {
                        "status": "true",
                        "msg": "Record found.",
                        "body": docs
                    }
                    res.status(200).send(responseObj);
                }
            })
        }
    }catch(error) {
       // console.log('Error::', error);
       res.json({
           status:"false",
           response:"null",
           error:err.message
       })
    }
}

const searchingRecord= (req,res)=>
{
    let query={};
    if(req.query.keyword){
        query.$or=[
           
            //{ "categoryName" : { $regex: req.query.keyword, $options: 'i' }},
           // { "brandName" : { $regex: req.query.keyword, $options: 'i' }},
            { "productName" : { $regex: req.query.keyword, $options: 'i' }},
            { "shortDescription" : { $regex: req.query.keyword, $options: 'i' }},
            { "longDescription" : { $regex: req.query.keyword, $options: 'i' }}
        ];
        Product.find({}).exec((err, docs) =>{
            if(err) {
                responseObj = {
                    "status": "error",
                    "msg": "Input is missing.",
                    "body": {}
                }
                res.status(500).send(responseObj);
            }else{
                responseObj = {
                    "status": "true",
                    "msg": "Record found.",
                    "body": docs
                }
                res.status(200).send(responseObj);
            }
        })
    }
    }



const addProductbyMerchant = async (req, res) => {
    try{
//var merchantId=req.query.merchantId
var categoryId=req.query.categoryId
var brandId=req.query.brandId
//console.log(req.merchant);
await Merchant.findById(req.merchant).then(async(data)=>{
   if(data) {
//console.log(data)
 var merchantId=data._id;
    await Brand.findOne({categoryId:categoryId,_id:brandId}).then(()=>{
        var quantity = req.body.quantity;
        var available=avail(quantity);
        function avail(q){
            if(q>0){
                return true;
            }
            else{
                return false;
            }
        }
        const val = new Product({
            merchantId:merchantId,
            productName: req.body.productName,
            baseCost: req.body.baseCost,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            discount: req.body.discount,
            discountedCost:(req.body.baseCost-(req.body.discount*req.body.baseCost/100)),
           size: req.body.size,
           categoryId: categoryId,
           brandId:brandId,
           quantity: req.body.quantity,
            available:available
            
    
    
        })
        val.save()
            .then(result => {
                
                res.status(200).json({ 
                    
                    status:'true',
                    error:{},
                        Response:result
                     })
                
            })
            .catch(err => {
                res.status(500).json({
                    status:"false",
                    response:"null",
                    error: err.message,
                    //val:error.message
    
                })
            })
    })

}
})
}

catch(error)
{
res.json(error.message)

}
}



const  addCategory = async(req,res)=>
{
    const category = new Category({
        categoryName: req.body.categoryName,
       // brandName: req.body.brandNam
    })
    category.save()
    .then(result => {
        
        res.status(200).json({ 
            
            status:'true',
            error:{},
                Response:result
             })
        
    })
    .catch(err => {
        res.status(500).json({
            status:"false",
            response:"null",
            error: err.message
        })
    })

}



const updateProductbyMerchant = async (req, res) => {
await Merchant.findOne({merchantId:req.query.merchantId})
await Product.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
    
            productName: req.body.productName,
            baseCost: req.body.baseCost,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            quantity: req.body.quantity,
            discount: req.body.discount,
            size: req.body.size,
           categoryId:req.body.categoryId,
           brandId:req.body.brandId
        


        }
    },{new:true,runValidator:true}).then((data) => {
            res.json({
                status:"true",
                code:200,
                message:"updated successfully",
                response:data,
              })
           
        }).catch((err) => {
           
            res.json({
                status:"true",
                response:"null",
            error:{
                error:err.message
            }
                
              })
        })

}

const deleteProductbyMerchant = async (req, res) => {
    try {
        const val = await Product.findByIdAndDelete(req.params.id)
        res.json({
            status:"true",
            message:"successfully deleted",
            response:val

        })
    } catch (err) {
        res.send({
            response:"null",
            error:err.message
        })
    }
}
module.exports = {
    getAllProduct,
    getProductBYId,
    addProductbyMerchant,
    updateProductbyMerchant,
    deleteProductbyMerchant,
   productRecord ,
   addCategory,
   searchingRecord
  
   
   
}