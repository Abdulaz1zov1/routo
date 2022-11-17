const Mowina = require('../models/exel')

exports.add = async (req, res, next) => {
    const rasmla = req.files
    let photos = []
    rasmla.forEach(photo => photos.push(`http://185.196.214.145:5000/${photo.path.slice(7)}`))
    try {
        const car = new Mowina({
            photo: photos
        })
        car.save()
        res.status(201).json(
            {
                message: "success created",
                data: car
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
        const getId = await Mowina.findById({ _id: req.params.id })
        res.status(200).json(
            {
                message: "success",
                data: getId
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "car not found"
            }
        )
    }
}

exports.getAllUser = async(req, res)=>{
    try {
        const getAllmowina = await Mowina.find({})
        .sort({date: -1})
        res.status(200).json(
            {
                message: "success",
                 data: getAllmowina
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "car not found"
            }
        )
    }
}






exports.delet = async (req, res, next) => {
    try {
        await Mowina.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json(
            {
                message: "success",
                data: []
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "car not found"
            }
        )
    }
}

