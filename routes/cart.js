const express = require('express')
const router = express.Router()
const Cart = require('../model/cartschema')
const cart = require('../controller/cartcontroller')
router.post('/cart',cart. addProductToCart)
module.exports = router
