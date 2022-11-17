const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {
    add, one, delet, getAllUser
} = require('../controller/exeController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    },
})

const upload = multer({ storage })

router.post('/add', upload.array('photo', 6), add)
router.get("/all", getAllUser)
router.get('/:id', one)
router.delete('/:id', delet)








module.exports = router
