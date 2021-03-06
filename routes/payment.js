const express = require('express')
const router = express.Router()
const Payment = require('../model/paymentschema')
const Customer = require("../model/customerschema")
var key = require("crypto")
const middCustomer = require ("../middleware/middleware1")

const pay = require('../controller/cardcontroller')
router.post('/addPayment',middCustomer.JWT,pay.addPayment)
router.put('/updatePayment/:id',middCustomer.JWT,pay.updatePayment)
router.delete('/deletePayment/:id',middCustomer.JWT,pay.deleteCard)
router.get('/getPayment/:id',middCustomer.JWT,pay.getPayment)
module.exports = router