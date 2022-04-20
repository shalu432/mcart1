const express = require('express')
const router = express.Router()
const Customer = require('../model/customerschema')
const otp =require('../model/otpmodel');
 const middCustomer = require ("../middleware/middleware1")

const cust= require('../controller/customercontroller')
router.post('/login',cust.loginUser)
router.get('/getcustomer',cust. getCustomer)

router.post('/addCustomer',middCustomer.JWT,cust.addCustomer)
router.post('/verifyOtp',cust.verifyOtp)
router.put('/updateCustomer',middCustomer.JWT,cust.updateCustomer)
router.put('/updateAddress',middCustomer.JWT,cust.updateAddress)
router.delete('/deleteCustomer',middCustomer.JWT,cust.deleteCustomer)

module.exports = router;