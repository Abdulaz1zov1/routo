const mongoose = require("mongoose")

const bankSchema = mongoose.Schema(
    {
        name: String,
        surname: String,
        father_name: String,
        phone: String,
        relative_number: String,
        house_number: String,
        relative_number2: String,
        maosh: String,
        photo: Array,
        pending: {type: Boolean, default: false},
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        INN: String,
        bank_name: String,
        status: {type: Boolean, default: false},
        date: {type :Date, default: Date.now()}
    }
)

module.exports = mongoose.model("Bank", bankSchema)
