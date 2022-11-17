const express = require('express')
const router = express.Router()

const {
    add, one, delet, getAllUser,byUserId
} = require('../controller/likeController')

router.post('/add', add)
router.get("/all", getAllUser)
router.get('/:id', one)
router.get('/user/:id', byUserId)
router.delete('/:id', delet)


module.exports = router
