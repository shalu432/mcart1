const express = require('express')
const router = express.Router()
const Category = require('../model/Categoryschema')
const Brand = require('../model/brandschema')

//const midd  =require ("../middleware/middleware")

const categ = require('../controller/categorycontroller')
router.post('/addCategory',categ.addCategory)
router.post('/addBrand',categ.addBrand)


module.exports = router