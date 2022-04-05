const express = require('express')
const router = express.Router()
const Orderr = require('../model/orderschema')

 const middCustomer = require ("../middleware/middleware1")

const cust= require('../controller/ordercontroller')
router.post('/addorder',cust.addOrder)


module.exports = router;