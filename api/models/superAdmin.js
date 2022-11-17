const mongoose = require("mongoose")
const randtoken = require("rand-token");

const SuperAdminSchema = mongoose.Schema({
    token: {
        type: String,
        default: function() {
            return randtoken.generate(128);
        }
    },
    name: String,
    email: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model("SuperAdmin", SuperAdminSchema)