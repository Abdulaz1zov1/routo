const router = require('express').Router()

const {CreateXodim, GetByIdXodim, EditXodim, DeleteXodim, getAll, login} = require('../controller/EditorController')

router.post('/add',  CreateXodim)
router.post('/login',  login)
router.get('/all', getAll)
router.get('/:id', GetByIdXodim)
router.put('/:id', EditXodim)
router.delete('/:id', DeleteXodim)


module.exports = router
