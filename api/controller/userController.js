const User = require("../models/user")
const {getDataFromRedis, setDataToRedis} = require("../utils/redis.util")
const {smsSend} = require("../utils/playmobile.util")
const {sign, verify} = require('../utils/jwt.util')
const {generateCode} = require("../utils/generate.util")
const { v4: uuidv4 } = require('uuid');

exports.CreateUser = async (req, res) => {
    try {
        const phoneCode = generateCode()
        const smsStatus = await smsSend(req.body.phone, phoneCode)
        if (!smsStatus) return res.status(500).json({message: "SMS is not sending this phone"})

        const redis = {
            key: uuidv4(),
            code: phoneCode,
            data: await sign(req.body)
        }

        await setDataToRedis(redis.key, JSON.stringify({code: redis.code, user: redis.data}), 60)

        delete redis.code
        res.status(201).json(
            {
                message: "success created",
                data: redis
            }
        )
    } catch (err) {
        console.log(err)

        res.status(500).json(
            {
                message: err.message
            }
        )
    }
}



exports.VerifyUser = async(req, res)=>{
    try {
        if(!req.body.code || !req.body.key) return res.status(500).json({message: "Please enter all arguments"})
        const redisData = await getDataFromRedis(req.body.key)

        if(typeof redisData == "object") return res.status(500).json({message: "This key is not found!"})
        const data = JSON.parse(redisData)

        if(data.code != req.body.code) return res.status(500).json({message: "Code incorrect number"})
        const userData = await verify(data.user)
        const user = await new User(userData)

        res.status(201).json(
            {
                message: "success created",
                data: user
            }
        )
    } catch (err) {
        console.log(err)
        res.status(500).json(
            {
                message: err.message
            }
        )
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        res.status(404).json({success: false})
    }
    else if (!password) {
        res.status(404).json({success: false})
    }
    const user = await User.findOne({ email: email, password: password })
    .select(["email", "password"]);
    if (!user) {
        res.status(404).json({success: false})
    }else{
        res.status(200).json({success: true, data: user})
    }
};


exports.GetByIdUser = async(req, res)=>{
    try {
        const user = await User.findById({_id: req.params.id})
        res.status(200).json(
            {
                message: "success",
                data: user
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "editor not found"
            }
        )
    }
}


exports.GetUser = async(req, res)=>{
    try {
        const user = await User.find({roles: "user"}).sort({date: -1})
        res.status(200).json(
            {
                message: "success",
                data: user
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "editor not found"
            }
        )
    }
}


exports.EditUser = async(req, res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            ...req.body
        })
        res.status(200).json(
            {
                message: "success",
                data: user
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "editor not found"
            }
        )
    }
}




exports.DeleteUser = async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete({_id: req.params.id}).sort({date: -1})
        res.status(200).json(
            {
                message: "success",
                data: []
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "editor not found"
            }
        )
    }
}