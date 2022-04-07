const express = require('express')
const router = express.Router()
const Admin = require('../model/adminschema')
//var bodyParser = require('body-parser')
const midd  =require ("../middleware/middleware2")



 const adm = require('../controller/superadmincontroller')
 router.get('/getAdmin',adm.getAdmin)
 router.post('/addAdmin',adm.addAdmin)
 router.post('/loginAdmin',adm.loginAdmin)

module.exports = router;