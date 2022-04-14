const express = require('express')
const router = express.Router()
const Customer = require('../model/customerschema')
const otp =require('../model/otpmodel');
 const middCustomer = require ("../middleware/middleware1")

const cust= require('../controller/customercontroller')
router.post('/login',cust.loginUser)
router.get('/getcustomer',cust. getCustomer)
router.get('/getproduct',middCustomer.JWT,cust.getProductByCustomer)

router.post('/addCustomer',cust.addCustomer)
//router.post('/addAddress',cust.addAddress)
router.post('/verifyOtp',cust.verifyOtp)
router.put('/updateCustomer/:id',middCustomer.JWT,cust.updateCustomer)
router.put('/updateAddress',middCustomer.JWT,cust.updateAddress)
router.delete('/deleteCustomer/:id',middCustomer.JWT,cust.deleteCustomer)

module.exports = router;