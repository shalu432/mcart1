const express = require('express')
const router = express.Router()
const Merchant= require('../model/merchantschema')
//var bodyParser = require('body-parser')
//const midd  =require ("../middleware/middleware")




 const ven= require('../controller/merchantcontroller')
 router.get('/getmerchant/:id',ven.getMerchant)
 router.post('/addmerchant',ven.addMerchant)
router.post('/loginmerchant',ven.loginMerchant)
router.put('/updatemerchant/:id',ven.updateMerchant)
router.delete('/deletemerchant/:id',ven.deleteMerchant)



module.exports = router;