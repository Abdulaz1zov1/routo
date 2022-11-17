const Marka = require('../models/markaCar')

exports.CreateMarka = async(req, res)=>{
    try {
        const marka = new Marka({...req.body})
        await marka.save()
        res.status(201).json(
            {
                success: true,
                status: 201,
                data: marka
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


exports.GetByIdMarka = async(req, res)=>{
    try {
        const marka = await Marka.findById({_id: req.params.id})
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: marka
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


exports.GetMarka = async(req, res)=>{
    try {
        const marka = await Marka.find({}).sort({date: -1})
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: marka
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "marka not found"
            }
        )
    }
}


exports.EditMarka = async(req, res)=>{
    try {
        const marka = await Marka.findByIdAndUpdate(req.params.id, {
            ...req.body
        })
        res.status(200).json(
            {
                success: true,
                status: 200,
                data: marka
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




exports.DeleteMarka = async(req, res)=>{
    try {
        await Marka.findByIdAndDelete({_id: req.params.id}).sort({date: -1})
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
                message: "order not found"
            }
        )
    }
}