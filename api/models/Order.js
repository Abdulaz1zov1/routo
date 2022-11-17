const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        name: String,
        phone: Number,
        carId: {type: mongoose.Schema.ObjectId, ref: "Car"}
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('order', orderSchema)
