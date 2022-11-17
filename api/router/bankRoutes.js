const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { 
    creatBank, login, getById, getAll, getUpdate, getDelete, getStatus, pending
} = require('../controller/bankController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    },
})

const upload = multer({ storage })

router.post('/add', upload.array('photo', 3), creatBank)
router.post("/login", login)
router.get("/all", getAll)
router.get('/:id', getById)
router.put('/:id', upload.array('photo', 3), getUpdate)
router.put('/active/:id',  getStatus)
router.put('/proccess/:id',  pending)
router.delete('/:id', getDelete)








module.exports = router
