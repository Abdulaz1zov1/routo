const mongoose = require("mongoose")

const markaSchema = mongoose.Schema({
    marka: String,
    date: {type: Date, default: Date.now()}
})

module.exports = mongoose.model("Marka", markaSchema)