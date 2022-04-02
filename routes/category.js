const express = require('express')
const router = express.Router()
const Category = require('../model/Categoryschema')


//const midd  =require ("../middleware/middleware")

const categ = require('../controller/categorycontroller')
router.post('/addCategory',categ.addCategory)


module.exports = router