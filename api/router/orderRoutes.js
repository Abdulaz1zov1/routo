const express = require('express')
const {
    CreateOrder, GetByIdOrder, GetOrder, EditXodim, DeleteXodim
} = require('../controller/orderController')
const router = express.Router()

router.post('/add', CreateOrder)
router.get('/all', GetOrder)
router.get('/:id', GetByIdOrder)
router.put('/:id', EditXodim)
router.delete('/:id', DeleteXodim)

module.exports = router
