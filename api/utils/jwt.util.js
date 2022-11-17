const JWT = require("jsonwebtoken")


module.exports = {
    sign: async (payload) => JWT.sign(payload, "hello_world", { expiresIn: '24h' }),
    verify: async (payload) => JWT.verify(payload, "hello_world"),
};
