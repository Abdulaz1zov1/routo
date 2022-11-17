const express = require('express')
const {
    CreateColor, GetByIdColor, GetColor, EditColor, DeleteColor
} = require('../controller/colorController')
const router = express.Router()

router.post('/add', CreateColor)
router.get('/all', GetColor)
router.get('/:id', GetByIdColor)
router.put('/:id', EditColor)
router.delete('/:id', DeleteColor)

module.exports = router
