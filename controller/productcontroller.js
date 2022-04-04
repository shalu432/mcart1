const express = require('express')
const router = express.Router()
const Product = require('../model/productschema')

//product
const getAllProduct = async (req, res) => {
    try {
        const val = await Product.find()
        res.json(val)
    } catch (err) {
        res.send('Error ' + err)
    }
}
const getProductBYId = async (req, res) => {
    try {
        const val = await Product.findById(req.params.id)
        res.json(val)
    } catch (err) {
        res.send('Error ' + err)
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

            const currentPage = req.query.currentPage;//2
           const pageSize = req.query.pageSize; //10

           const skip = pageSize * (currentPage-1);
            const limit = pageSize;
            let query={};
       
            if(req.query.keyword){
                query.$or=[
                   
                    { "categoryName" : { $regex: req.query.keyword, $options: 'i' }},
                    { "brandName" : { $regex: req.query.keyword, $options: 'i' }},
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
        console.log('Error::', error);
    }
}




const addProductbyMerchant = async (req, res) => {

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
        productName: req.body.productName,
        baseCost: req.body.baseCost,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,

        discount: req.body.discount,
        discountedCost:(req.body.baseCost-(req.body.discount*req.body.baseCost/100)),
       
       size: req.body.size,
        categoryName:req.body.categoryName,
    
        brandName:req.body.brandName,
        quantity: req.body.quantity,
        available:available
        


    })
    val.save()
        .then(result => {
            
            res.status(200).json({ 
                
                status:'true',
                    Response:result
                 })
            
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

   
}

const updateProductbyMerchant = async (req, res) => {

    const val = await Product.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
           
            productName: req.body.productName,
            baseCost: req.body.baseCost,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            quantity: req.body.quantity,
            discount: req.body.discount,
        
           size: req.body.size,
           categoryName:req.body.categoryName,
    
           brandName:req.body.brandName
        


        }
    })

    const a1 = await val.save()
  //  res.json(a1)
  res.json({
    status:"true",
    code:200,
    message:"updated successfully",
    response:a1,
  })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })

}

const deleteProductbyMerchant = async (req, res) => {
    try {
        const val = await Product.findByIdAndDelete(req.params.id)
        res.json(val)
    } catch (err) {
        res.send('Error')
    }
}
module.exports = {
    getAllProduct,
    getProductBYId,
    addProductbyMerchant,
    updateProductbyMerchant,
    deleteProductbyMerchant,
   productRecord ,
  
   
   
}