const express = require('express')
const router = express.Router()
const Cart = require('../model/cartschema')

const middCustomer = require ("../middleware/middleware1")

const cart = require('../controller/cartcontroller')
router.post('/cart',cart.addProductToCart)
router.put('/deletecart',middCustomer.JWT,cart.deleteCart)
router.put('/getcart',middCustomer.JWT,cart.getCart)
module.exports = router
