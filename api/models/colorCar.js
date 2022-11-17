const mongoose = require("mongoose")

const colorSchema = mongoose.Schema({
    color: String,
    date: {type: Date, default: Date.now()}
})

module.exports = mongoose.model("Color", colorSchema)