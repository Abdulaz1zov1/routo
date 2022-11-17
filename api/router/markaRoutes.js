const express = require('express')
const {
    CreateMarka, GetByIdMarka, GetMarka, EditMarka, DeleteMarka
} = require('../controller/markaController')
const router = express.Router()

router.post('/add', CreateMarka)
router.get('/all', GetMarka)
router.get('/:id', GetByIdMarka)
router.put('/:id', EditMarka)
router.delete('/:id', DeleteMarka)

module.exports = router
