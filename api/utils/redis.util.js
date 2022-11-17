const {createClient} = require("redis")


const client = createClient({
    url: "redis://185.196.214.145:5006"
})


async function setDataToRedis(key, value, time) {
    await client.connect()
    await client.set(key, value, {
        EX: time
    })

    await client.disconnect()
}

async function getDataFromRedis(key) {
    await client.connect()

    const response = new Promise(async (resolve) => {
        resolve(client.get(key))
    })

    return response.then( (data) => {
        return data
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        client.disconnect()
    })
}

module.exports = {
    getDataFromRedis,
    setDataToRedis
}