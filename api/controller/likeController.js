const Like = require('../models/like')

exports.add = async(req, res, next) => {
    try {
        const like = new Like({
            ...req.body
        })
        await like.save()
        res.status(201).json(
            {
                success: true,
                status: 201,
                data: like
            }
        )
    } catch (err) {
        res.status(500).json(
            {
                message: "error"
            }
        )
    }
}

exports.one = async (req, res, next) => {
    try {
        const getId = await Like.findById({ _id: req.params.id })
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: getId
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "like not found"
            }
        )
    }
}

exports.getAllUser = async(req, res)=>{
    try {
        const { page = 1, limit = 20 } = req.query;
        const condition = {userId: req.query.userId}
        !condition.userId&&delete condition.userId;
        const car = await Like.find(condition)
        .populate(["likes","userId"])
        .limit(limit *1)
        .skip((page-1)*limit);
        const count =  await Like.count()
        res.status(200).json({pagination:{
            totol: Math.round(count/limit),
            page:+page,
            limit:+limit
        }, car})
    } catch (err) {
        res.status(500).json(
            {
                success: false,
                err: "error"
            }
        )
    }
}

exports.byUserId = async(req, res)=>{
    try {
        const getAllLike = await Like.find({userId:req.params.id})
        .sort({date: -1})
        .populate(["likes","userId"])
        res.status(200).json(
            {
                message: "success",
                 data: getAllLike
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "like not found"
            }
        )
    }
}




exports.delet = async (req, res, next) => {
    try {
        await Like.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: []
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "like not found"
            }
        )
    }
}

