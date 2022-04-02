const express = require('express')
const router = express.Router()
const Payment = require('../model/paymentschema')
const Customer = require("../model/customerschema")
var key = require("crypto")
//const midd  =require ("../middleware/middleware")

const pay = require('../controller/cardcontroller')
router.post('/addPayment',pay.addPayment)
router.patch('/updatePayment/:key',pay.updatePayment)
//router.get('/updatePayment',pay.getPayment)
module.exports = router