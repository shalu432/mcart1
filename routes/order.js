const express = require('express')
const router = express.Router()
const Order = require('../model/orderschema')

 const middCustomer = require ("../middleware/middleware1")

const cust= require('../controller/ordercontroller')
router.post('/addorder',cust.addOrder)
router.post('/orderPayment',cust. orderPayment)
router.get('/getorder',cust.getAllOrder)
router.delete('/deleteorder',cust.cancelOrder)
router.put('/deleteorder',cust.deleteOrder)
router.get('/getorder',cust.getOrder)
router.patch('/orderstatus',cust.orderStatus)

module.exports = router;