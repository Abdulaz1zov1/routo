const mongoose = require("mongoose")

const bankSchema = mongoose.Schema(
    {
        total: Number,
        date: {type :Date, default: Date.now()}
    }
)

module.exports = mongoose.model("TotalClient", bankSchema)
