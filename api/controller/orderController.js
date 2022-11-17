const Order = require('../models/Order')


exports.CreateOrder = async(req, res)=>{
    try {
        const order = new Order({...req.body})
        await order.save()
        res.status(201).json(
            {
                message: "send message",
                data: order
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


exports.GetByIdOrder = async(req, res)=>{
    try {
        const order = await Order.findById({_id: req.params.id})
        res.status(200).json(
            {
                message: "success",
                data: order
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "order not found"
            }
        )
    }
}


exports.GetOrder = async(req, res)=>{
    try {
        const order = await Order.find({}).sort({date: -1})
        .populate("carId")
        res.status(200).json(
            {
                message: "success",
                data: order
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "order not found"
            }
        )
    }
}


exports.EditXodim = async(req, res)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {
            ...req.body
        })
        res.status(200).json(
            {
                message: "success",
                data: order
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "order not found"
            }
        )
    }
}




exports.DeleteXodim = async(req, res)=>{
    try {
        const order = await Order.findByIdAndDelete({_id: req.params.id}).sort({date: -1})
        res.status(200).json(
            {
                message: "success",
                data: []
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "order not found"
            }
        )
    }
}