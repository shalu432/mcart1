const express = require('express')
const router = express.Router()
const Cart = require('../model/cartschema')

const middCustomer = require ("../middleware/middleware1")

const cart = require('../controller/cartcontroller')
router.post('/cart',cart.addProductToCart)
router.put('/deletecart',middCustomer.JWT,cart.deleteCart)
router.get('/getcart',middCustomer.JWT,cart.getAllCart)
router.get('/getcart/:id',middCustomer.JWT,cart.getCart)
//router.post('/getcart',cart.pop)
module.exports = router
