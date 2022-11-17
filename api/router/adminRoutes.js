const express = require('express')

const router = express.Router();

const {CreateAdmin, GetByIdAdmin, GetAdmin, EditAdmin, DeleteAdmin, login} = require('../controller/authController')

router.post('/add',  CreateAdmin)
router.post('/login',  login)
router.get('/all', GetAdmin)
router.get('/:id', GetByIdAdmin)
router.put('/:id', EditAdmin)
router.delete('/:id', DeleteAdmin)


module.exports = router
