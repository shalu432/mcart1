const express = require('express')
const router = express.Router()
const Merchant= require('../model/merchantschema')
//var bodyParser = require('body-parser')
const midadmin  =require ("../middleware/middleware2")
const midmerchant  =require ("../middleware/middleware")



 const ven= require('../controller/merchantcontroller')
 router.get('/getmerchant',midadmin.adminJWT,ven.getMerchant)
 //router.get('/merchantproduct',midmerchant.midJWT,ven.getProductByMerchant)
 router.post('/addmerchant',midadmin.adminJWT,ven.addMerchant)
 router.put('/block',midmerchant.midJWT,ven.blockedCustomerByMerchant)
 router.put('/unblock',midmerchant.midJWT,ven.unblockedCustomerByMerchant)

router.post('/loginmerchant',ven.loginMerchant)
router.put('/updatemerchant/:id',ven.updateMerchantByAdmin)
router.put('/updatemerchant',midmerchant.midJWT,ven.updateMerchant)
router.delete('/deletemerchant',midmerchant.midJWT,ven.deleteMerchant)
router.delete('/deletemerchant/:id',midadmin.adminJWT,ven.deleteMerchantByAdmin)




module.exports = router;