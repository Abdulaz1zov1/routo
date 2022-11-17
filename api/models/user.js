const mongoose = require("mongoose")
const randtoken = require("rand-token");

const userSchema = mongoose.Schema({
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
    region: String,
    roles: {
        type: String, 
        enum: ["user", "moderator"]
    },
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model("User", userSchema)