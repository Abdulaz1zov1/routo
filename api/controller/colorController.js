const Color = require('../models/colorCar')

exports.CreateColor = async(req, res)=>{
    try {
        const color = new Color({...req.body})
        await color.save()
        res.status(201).json(
            {
                success: true,
                status: 201,
                data: color
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


exports.GetByIdColor = async(req, res)=>{
    try {
        const color = await Color.findById({_id: req.params.id})
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: color
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


exports.GetColor = async(req, res)=>{
    try {
        const color = await Color.find({}).sort({date: -1})
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: color
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


exports.EditColor = async(req, res)=>{
    try {
        const color = await Color.findByIdAndUpdate(req.params.id, {
            ...req.body
        })
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: color
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "color not found"
            }
        )
    }
}




exports.DeleteColor = async(req, res)=>{
    try {
        await Color.findByIdAndDelete({_id: req.params.id}).sort({date: -1})
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
                message: "color not found"
            }
        )
    }
}