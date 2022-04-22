const express = require('express')
const router = express.Router()
const Order = require('../model/orderschema')
const Refund=require('../model/refundschema')
 const middCustomer = require ("../middleware/middleware1")

const cust= require('../controller/ordercontroller')
router.post('/addorder',middCustomer.JWT,cust.addOrder)
router.post('/orderPayment',middCustomer.JWT,cust. orderPayment)
router.get('/getorder',middCustomer.JWT,cust.getAllOrder)
router.get('/ordercus',middCustomer.JWT,cust.orderOfCustomer)
router.delete('/cancelorder',middCustomer.JWT,cust.cancelOrder)
//router.put('/deleteorder',cust.deleteOrder)
router.get('/getorder/:id',middCustomer.JWT,cust.getOrder)
//router.patch('/orderstatus',cust.orderStatus)


module.exports = router;