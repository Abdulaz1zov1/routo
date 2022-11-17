const express = require('express')
const {
    CreateMadel, GetByIdMadel, GetMadel, EditMadel, DeleteMadel
} = require('../controller/madelController')
const router = express.Router()

router.post('/add', CreateMadel)
router.get('/all', GetMadel)
router.get('/:id', GetByIdMadel)
router.put('/:id', EditMadel)
router.delete('/:id', DeleteMadel)

module.exports = router
