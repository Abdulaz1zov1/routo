const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {
    add, one, renew, pending, delet, getAllUser, filterMain, agregat, getAllPasgination, getQuery
} = require('../controller/carCantroller')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    },
})

const upload = multer({ storage })

router.post('/add', upload.array('photo', 20), add)
router.get("/all", getAllUser)
router.get("/allPage", getAllPasgination)
router.get("/query", getQuery)
router.get("/m1", filterMain)
router.get("/v1", agregat)
router.get('/:id', one)
router.put("/a/:id", pending)
router.put('/:id', upload.array('photo', 20), renew)
router.delete('/:id', delet)








module.exports = router
