const router = require('express').Router()

const {CreateXodim, GetByIdXodim, EditXodim, DeleteXodim, getAll} = require('../controller/totalController')

router.post('/add',  CreateXodim)
router.get('/all', getAll)
router.get('/:id', GetByIdXodim)
router.put('/:id', EditXodim)
router.delete('/:id', DeleteXodim)


module.exports = router
