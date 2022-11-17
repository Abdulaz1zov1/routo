const Madel = require('../models/madelCar')

exports.CreateMadel = async(req, res)=>{
    try {
        const madel = new Madel({...req.body})
        await madel.save()
        res.status(201).json(
            {
                success: true,
                status: 201,
                data: madel
            }
        )
    } catch (err) {
        res.status(500).json(
            {
                success: false,
                status: 500,
                message: "error"
            }
        )
    }
}


exports.GetByIdMadel = async(req, res)=>{
    try {
        const madel = await Madel.findById({_id: req.params.id})
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: madel
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "madel not found"
            }
        )
    }
}


exports.GetMadel = async(req, res)=>{
    try {
        const madel = await Madel.find({}).sort({date: -1})
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: madel
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "madel not found"
            }
        )
    }
}


exports.EditMadel = async(req, res)=>{
    try {
        const madel = await Madel.findByIdAndUpdate(req.params.id, {
            ...req.body
        })
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: madel
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




exports.DeleteMadel = async(req, res)=>{
    try {
        await Madel.findByIdAndDelete({_id: req.params.id}).sort({date: -1})
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
                message: "madel not found"
            }
        )
    }
}