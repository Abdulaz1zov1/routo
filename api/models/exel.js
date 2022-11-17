const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    photo: {
        type: Array,
        data: Buffer
    },
    date: {type: Date, default: Date.now}
})
module.exports = mongoose.model("Exel", carSchema)
