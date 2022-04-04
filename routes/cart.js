const express = require('express')
const router = express.Router()
const Cart = require('../model/cartschema')

const middCustomer = require ("../middleware/middleware1")

const cart = require('../controller/cartcontroller')
router.post('/cart',middCustomer.JWT,cart.addProductToCart)
module.exports = router
