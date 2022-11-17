const mongoose = require("mongoose")
const randtoken = require("rand-token");

const editorSchema = mongoose.Schema({
    token: {
        type: String,
        default: function() {
            return randtoken.generate(128);
        }
    },
    name: String,
    email: String,
    password: String,
    phone: Number,
    bank: String,
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Editor", editorSchema)