const express = require('express')
const router = express.Router()
const Customer = require('../model/customerschema')
const otp =require('../model/otpmodel');
 const middCustomer = require ("../middleware/middleware1")

const cust= require('../controller/customercontroller')
router.post('/login',cust.loginUser)
router.post('/addCustomer',cust.addCustomer)
//router.post('/addAddress',cust.addAddress)
router.post('/verifyOtp',cust.verifyOtp)
router.put('/updateCustomer/:id',middCustomer.JWT,cust.updateCustomer)
router.delete('/deleteCustomer/:id',middCustomer.JWT,cust.deleteCustomer)

module.exports = router;