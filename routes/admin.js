const express = require('express')
const router = express.Router()
const Admin = require('../model/adminschema')
//var bodyParser = require('body-parser')



 const adm = require('../controller/superadmincontroller')
 router.get('/getAdmin',adm.getAdmin)
 router.post('/addAdmin',adm.addAdmin)
 router.post('/loginAdmin',adm.loginAdmin)
 router.put('/updateAdmin/:id',adm.updateAdmin)
 router.delete('/deleteAdmin/:id',adm.deleteAdmin)
 


module.exports = router;