const express = require('express')
const router = express.Router()
const Merchant= require('../model/merchantschema')
//var bodyParser = require('body-parser')
const middadd  =require ("../middleware/middleware2")




 const ven= require('../controller/merchantcontroller')
 router.get('/getmerchant',middadd.adminJWT,ven.getMerchant)
 router.post('/addmerchant',middadd.adminJWT,ven.addMerchant)
router.post('/loginmerchant',ven.loginMerchant)
router.put('/updatemerchant/:id',middadd.adminJWT,ven.updateMerchant)
router.delete('/deletemerchant/:id',middadd.adminJWT,ven.deleteMerchant)



module.exports = router;