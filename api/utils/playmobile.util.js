const axios = require("axios")
const { v4: uuidv4 } = require('uuid');

async function smsSend(phone, text) {
    try {
        const response = await axios.post("http://91.204.239.44/broker-api/send", {
            messages: [
                {
                    recipient: phone,
                    "message-id": uuidv4(),
                    sms: {
                        originator: "3700",
                        content: {
                            text
                        }
                    }
                }
            ]
        }, {
            headers: {
                Authorization: "Basic cmV0YWlsYXV0bzpjMio0ejJZQlUoZio=",
                'Content-Type': 'application/json',
            }
        });

        return !!response.data
    }catch (err) {
        console.log(err)
    }
}


module.exports = {
    smsSend
}
