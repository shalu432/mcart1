const express = require('express')
const router = express.Router()
const Payment = require('../model/paymentschema')
const Customer = require("../model/customerschema")
var key = require("crypto")
const middCustomer = require ("../middleware/middleware1")

const pay = require('../controller/cardcontroller')
router.post('/addPayment',middCustomer.JWT,pay.addPayment)
router.patch('/updatePayment/:key',middCustomer.JWT,pay.updatePayment)
router.delete('/deletePayment/:id',middCustomer.JWT,pay.deleteCard)

module.exports = router