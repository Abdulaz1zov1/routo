const mongoose = require("mongoose")

const madelSchema = mongoose.Schema({
    madel: String,
    date: {type: Date, default: Date.now()}
})

module.exports = mongoose.model("Madel", madelSchema)