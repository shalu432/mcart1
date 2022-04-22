const express = require('express')
const router = express.Router()
const Product = require('../model/productschema')
const Merchant = require('../model/merchantschema')
const Category = require('../model/Categoryschema')
const Brand = require('../model/brandschema')
const { ObjectId } = require("bson")

const getAllProduct = async (req, res) => {
    try {
        const val = await Product.find()
        res.json({
            status: "true",
            code: "200",
            response: val
        })
    } catch (err) {
        res.send({
            status: "false",
            response: "null",
            error: err.message
        })
    }
}
const getProductByMerchant = async (req, res) => {
    try {

        await Product.find({ merchantId: req.merchant })
            .populate([
                { path: "categoryId", select: "categoryName" },
                { path: "brandId", select: "brandName" },
                { path: "merchantId", select: "firstName lastName" }

            ]).then((data) => {
                res.json({
                    status: true,
                    error: {},
                    response: data
                })
            })

    } catch (err) {
        res.send({
            error: {
                status: false,
                error: err.message
            }
        })
    }

}





const getProductBYId = async (req, res) => {
    try {
        const val = await Product.findById(req.params.id)
        res.json({
            status: "true",
            code: "200",
            response: val
        })
    } catch (err) {
        res.send({
            status: "false",
            response: "null",
            error: err.message
        })
    }
}




const productRecord = (req, res, next) => {
    try {

        const currentPage = req.query.currentPage;
        const pageSize = req.query.pageSize;

        const skip = pageSize * (currentPage - 1);
        const limit = pageSize;

        Product.find().skip(skip).limit(limit).sort({ [req.query.key]: req.query.value }).exec((err, docs) => {
            if (err) {
                responseObj = {
                    "status": "error",
                    "msg": "Input is missing.",
                    "body": {}
                }
                res.status(500).send(responseObj);
            } else {
                responseObj = {
                    "status": "true",
                    "msg": "Record found.",
                    "body": docs
                }
                res.status(200).send(responseObj);
            }
        })

    } catch (error) {
        // console.log('Error::', error);
        res.json({
            status: "false",
            response: "null",
            error: error.message
        })
    }
}

const searchingRecord = async (req, res) => {
    var pageSize = 1;

    pageSize = Number(req.query.pageSize);

    const skip = Number(req.query.skip);
    //const limit = pageSize;

    let value = await Product.aggregate([
        {
            $lookup:
            {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "Category"
            }
        },
        { $unwind: "$Category" },
        {
            $lookup:
            {
                from: "brands",
                localField: "brandId",
                foreignField: "_id",
                as: "Brand"
            }
        },
        { $unwind: "$Brand" },
        {
            $match: {
                $or: [


                    { productName: { $regex: req.query.keyword, $options: 'i' } },
                    { "Category.categoryName": { $regex: req.query.keyword, $options: 'i' } },
                    { "Brand.brandName": { $regex: req.query.keyword, $options: 'i' } },
                    { shortDescription: { $regex: req.query.keyword, $options: 'i' } },
                    { longDescription: { $regex: req.query.keyword, $options: 'i' } }
                ]
            }
        },
        {
            $limit: pageSize
        },
        { $skip: skip }
    ])

    if (value.length == 0) {
        responseObj = {
            "status": "error",
            "msg": "no matched product",
            "body": {}
        }
        res.status(500).send(responseObj);
    } else {
        responseObj = {
            "status": "true",
            "msg": "Record found.",
            "body": value
        }
        res.status(200).send(responseObj);
    }

}






const searchingProductByCustomer = async (req, res) => {
  
  try{
  //console.log(req.customer);
   await Merchant.find({blockedCustomer:req.customer}).then(async(data)=>
   {
       if(!data)
       {
          const prod= await Product.find()
           {
               res.json({
                   status:"true",
                   response:prod
               })
           }
       } 
       else{
       // console.log({merchantId:{$nin:data}});
           await Product.find({merchantId:{$nin:data}})
       }
   var pageSize = 1;
    const skip = Number(req.query.skip);
    pageSize =Number(req.query.pageSize);
    

    
    let value = await Product.aggregate([
        {
            $lookup:
            {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "Category"
            }
        },
        { $unwind: "$Category" },
        {
            $lookup:
            {
                from: "brands",
                localField: "brandId",
                foreignField: "_id",
                as: "Brand"
            }
        },
        { $unwind: "$Brand" },
        {
            $match:{merchantId:{$nin:data}}
        },
        {
            $match: {
                $or: [


                    { productName: { $regex: req.query.keyword, $options: 'i' } },
                    { "Category.categoryName": { $regex: req.query.keyword, $options: 'i' } },
                    { "Brand.brandName": { $regex: req.query.keyword, $options: 'i' } },
                    { shortDescription: { $regex: req.query.keyword, $options: 'i' } },
                    { longDescription: { $regex: req.query.keyword, $options: 'i' } }
                ]
            }
        },
        {
            $limit: pageSize
        },
        { $skip: skip },
       
    ])

    if (value.length == 0) {
        responseObj = {
            "status": "error",
            "msg": "no matched product",
            "body": {}
        }
        res.status(500).send(responseObj);
    } else {
        responseObj = {
            "status": "true",
            "msg": "Record found.",
            "body": value
        }
        res.status(200).send(responseObj);
    } 
})
}catch(error){
res.json({
    status:"false",
    error:error.message

})
}

}











const addProductbyMerchant = async (req, res) => {
    try {
        //var merchantId=req.query.merchantId
        var categoryId = req.query.categoryId
        var brandId = req.query.brandId
        await Product.findOne({ productName: req.body.productName }).then(async (result) => {
            if (!result) {
                await Merchant.findById(req.merchant).then(async (data) => {
                    if (data) {
                        var merchantId = data._id;
                        await Brand.findOne({ categoryId: categoryId, _id: brandId }).then(() => {
                            var quantity = req.body.quantity;
                            var available = avail(quantity);
                            function avail(q) {
                                if (q > 0) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                            const val = new Product({
                                merchantId: merchantId,
                                productName: req.body.productName,
                                baseCost: req.body.baseCost,
                                shortDescription: req.body.shortDescription,
                                longDescription: req.body.longDescription,
                                discount: req.body.discount,
                                discountedCost: (req.body.baseCost - (req.body.discount * req.body.baseCost / 100)),
                                size: req.body.size,
                                categoryId: categoryId,
                                brandId: brandId,
                                quantity: req.body.quantity,
                                available: available



                            })
                            val.save()
                                .then(result => {

                                    res.status(200).json({

                                        status: 'true',
                                        error: {},
                                        Response: result
                                    })

                                })
                                .catch(err => {
                                    res.status(500).json({
                                        status: "false",
                                        response: "null",
                                        error: err.message,
                                        //val:error.message

                                    })
                                })
                        })

                    }
                })
            } else {
                res.json({
                    status: "false",
                    message: "product already exist"
                })
            }
        })

    }

    catch (error) {
        res.json(error.message)

    }
}



const addCategory = async (req, res) => {
    const category = new Category({
        categoryName: req.body.categoryName,
        // brandName: req.body.brandNam
    })
    category.save()
        .then(result => {

            res.status(200).json({

                status: 'true',
                error: {},
                Response: result
            })

        })
        .catch(err => {
            res.status(500).json({
                status: "false",
                response: "null",
                error: err.message
            })
        })

}



const updateProductbyMerchant = async (req, res) => {
    await Merchant.findOne({ merchantId: req.query.merchantId })
    await Product.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {

            productName: req.body.productName,
            baseCost: req.body.baseCost,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            quantity: req.body.quantity,
            discount: req.body.discount,
            size: req.body.size,
            categoryId: req.body.categoryId,
            brandId: req.body.brandId



        }
    }, { new: true, runValidator: true }).then((data) => {
        res.json({
            status: "true",
            code: 200,
            message: "updated successfully",
            response: data,
        })

    }).catch((err) => {

        res.json({
            status: "true",
            response: "null",
            error: {
                error: err.message
            }

        })
    })

}

const deleteProductbyMerchant = async (req, res) => {
    console.log(req.params.id);
    try {
        const val = await Product.findByIdAndUpdate(ObjectId(req.params.id),{$set:{isActive:false}})
        res.json({
            status: "true",
            message: "successfully deleted",
            response: val

        })
    } catch (err) {
        res.send({
            response: "null",
            error: err.message
        })
    }
}
module.exports = {
    getAllProduct,
    getProductBYId,
    addProductbyMerchant,
    updateProductbyMerchant,
    deleteProductbyMerchant,
    productRecord,
    addCategory,
    searchingRecord,
    getProductByMerchant,
    searchingProductByCustomer



}