const Bank = require("../models/bank")

exports.creatBank = async(req, res, next)=>{
    const rasmla = req.files
    let photos = []
    rasmla.forEach(photo => photos.push(`http://185.196.214.145:5000/${photo.path.slice(7)}`))
    try {
        const bank = new Bank({
            ...req.body,
            photo: photos
        })
        await bank.save()
        res.status(201).json(
            {
                message: "success created",
                data: bank
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


exports.login = async (req, res) => {
    const { INN, phone } = req.body;
    if (!INN) {
        res.status(404).json({success: false})
    }
    else if (!phone) {
        res.status(404).json({success: false})
    }
    const user = await Bank.findOne({ INN: INN, phone: phone })
    .select(["INN", "phone"]);
    if (!user) {
        res.status(404).json({success: false})
    }else{
        res.status(200).json({success: true, data: user})
    }
};



exports.getById = async(req, res, next)=>{
    try {
        const bank = await Bank.findById(req.params.id)
        res.status(200).json(
            {
                message: "success",
                data: bank
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "error"
            }
        )
    }
}


exports.getAll = async(req, res, next)=>{
    try {
        const bank = await Bank.find({}).sort({date: -1}).populate("userId")
        res.status(200).json(
            {
                message: "success",
                data: bank
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "error"
            }
        )
    }
}

exports.getUpdate = async(req, res, next)=>{
    try {
        const rasmla = req.files
        let photos = []
        rasmla.forEach(photo =>
            photos.push(`http://185.196.214.145:5000/${photo.path.slice(7)}`)
        )
        const bank = await Bank.findByIdAndUpdate(req.params.id, {
            ...req.body,
            photo: photos,
        })
        res.status(200).json(
            {
                message: "success",
                data: bank
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "error"
            }
        )
    }
}

exports.getStatus = async(req, res, next)=>{
    try {
        const bank = await Bank.findByIdAndUpdate(req.params.id, {$set: {pending: true} })
        res.status(200).json(
            {
                message: "success",
                data: bank
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "error"
            }
        )
    }
}

exports.pending = async(req, res)=>{
    const user = await Bank.findByIdAndUpdate(req.params.id, {$set: {status: true} })
    res.json(user)
}

exports.getDelete = async(req, res, next)=>{
    try {
        const bank = await Bank.findByIdAndDelete(req.params.id)
        res.status(200).json(
            {
                message: "success",
                data: []
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "error"
            }
        )
    }
}