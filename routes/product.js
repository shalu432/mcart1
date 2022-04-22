const express = require('express')
const router = express.Router()
const Product = require('../model/productschema')
const midmerchant  =require ("../middleware/middleware")
const middCustomer = require ("../middleware/middleware1")

const prod = require('../controller/productcontroller')
router.get('/getAllProduct',midmerchant.midJWT,prod.getAllProduct)
router.get('/getProduct/:id',midmerchant.midJWT,prod.getProductBYId)
router.get('/productRecord',midmerchant.midJWT,prod.productRecord)
router.get('/searchingRecord',prod.searchingRecord)
router.get('/searchingProduct',middCustomer.JWT,prod.searchingProductByCustomer)
router.post('/addProduct',midmerchant.midJWT,prod.addProductbyMerchant)
 router.put('/updateProduct/:id',midmerchant.midJWT,prod.updateProductbyMerchant)
 router.delete('/deleteProduct/:id',midmerchant.midJWT,prod.deleteProductbyMerchant)
 router.post('/addcategory',prod.addCategory)


 router.get('/merchantproduct',midmerchant.midJWT,prod.getProductByMerchant)
module.exports = router