const Mowina = require('../models/carInfo')


exports.add = async (req, res, next) => {
    const rasmla = req.files
    let photos = []
    rasmla.forEach(photo => photos.push(`http://185.196.214.145:5000/${photo.path.slice(7)}`))
    try {
        const car = new Mowina({
            ...req.body,
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


exports.getAllUser = async (req, res) => {
    try {
        const car = await Mowina.find({}).sort({ date: -1 })
            .populate(["userId", "SuperAdminId", "adminId"])
        res.status(200).json({
            total: car.length,
            data: car
        })
    } catch (err) {
        res.status(500).json(
            {
                message: "car not found"
            }
        )
    }
}



// region, madel, marka, color, yili, yurgani, narxi
exports.getQuery = async (req, res) => {
    try {
        let condition = {};
        const {
            yili_dan,
            yili_ga,
            yurgani_dan,
            yurgani_ga,
            narxi_dan,
            narxi_ga,
            region,
            madel,
            marka,
            color
        } = req.query
        console.log(typeof yili_dan);
        if (yili_dan) condition = { ...condition, yili: { $gte: +yili_dan } }
        if (yili_ga) condition = { ...condition, yili: condition.yili ? { ...condition.yili, $lte: +yili_ga } : { $lte: +yili_ga } }
        if (yurgani_dan) condition = { ...condition, yurgani: { $gte: +yurgani_dan } }
        if (yurgani_ga) condition = { ...condition, yurgani: condition.yurgani ? { ...condition.yurgani, $lte: +yurgani_ga } : { $lte: +yurgani_ga } }
        if (narxi_dan) condition = { ...condition, narxi: { $gte: +narxi_dan } }
        if (narxi_ga) condition = { ...condition, narxi: condition.narxi ? { ...condition.narxi, $lte: +narxi_ga } : { $lte: +narxi_ga } }
        if (region) condition = { ...condition, region }
        if (madel) condition = { ...condition, madel }
        if (marka) condition = { ...condition, marka }
        if (color) condition = { ...condition, color }
        const data = await Mowina.find(condition)
        return res.status(200).json({
            data
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}





exports.getAllPasgination = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const condition = { userId: req.query.userId }
        !condition.userId && delete condition.userId;
        const car = await Mowina.find(condition)
            .populate(["userId", "adminId", "SuperAdminId"])
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const count = await Mowina.count()
        res.status(200).json({
            pagination: {
                totol: Math.round(count / limit),
                page: +page,
                limit: +limit
            }, car
        })
    } catch (err) {
        res.status(500).json(
            {
                message: "car not found"
            }
        )
    }
}



exports.renew = async (req, res, next) => {
    try {
        const rasmla = req.files
        let photos = []
        rasmla.forEach(photo =>
            photos.push(`http://185.196.214.145:5000/${photo.path.slice(7)}`)
        )
        const updateMowina = await Mowina.findByIdAndUpdate(req.params.id, {
            ...req.body,
            photo: photos,
        })
        res.status(200).json(
            {
                message: "success",
                data: updateMowina
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

exports.pending = async (req, res) => {
    const user = await Mowina.findByIdAndUpdate(req.params.id, { $set: { status: true } })
    res.json(user)
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


exports.filterMain = async (req, res) => {
    let yili, yurgani, narxi, madel;
    if (!!req.query.from || !!req.query.to) {
        yili = { from: req.query.from, to: req.query.to };
    }
    else {
        yili = req.query.yili;
    }
    if (!!req.query.from || !!req.query.to) {
        yurgani = { from: req.query.from, to: req.query.to };
    }
    else {
        yurgani = req.query.yurgani;
    }
    if (!!req.query.from || !!req.query.to) {
        narxi = { from: req.query.from, to: req.query.to };
    }
    else {
        narxi = req.query.narxi;
    }
    if (!!req.query.from) {
        madel = { name: req.query.name };
    }
    else {
        madel = req.query.madel;
    }

    let options = {
        $gte: yili
    }
    let options1 = {
        $gte: yurgani,
    }
    let options2 = {
        $gte: narxi,
    }
    let options3 = {
        $regex: madel,
    }
    let foutcomes = await Mowina.find({
        yili: options,
        yurgani: options1,
        narxi: options2,
        madel: options3,
    })
    res.json(foutcomes)
}




exports.agregat = async (req, res) => {
    try {
        let yili, yurgani, narxi, madel, color, yoqilgi, region, transmission;
        if (!!req.query.from || !!req.query.to) {
            yili = { from: req.query.from, to: req.query.to };
        }
        else {
            yili = req.query.yili;
        }
        if (!!req.query.from || !!req.query.to) {
            yurgani = { from: req.query.from, to: req.query.to };
        }
        else {
            yurgani = req.query.yurgani;
        }
        if (!!req.query.from || !!req.query.to) {
            narxi = { from: req.query.from, to: req.query.to };
        }
        else {
            narxi = req.query.narxi;
        }
        if (!!req.query.from) {
            madel = { name: req.query.name };
        }
        else {
            madel = req.query.madel;
        }
        if (!!req.query.from) {
            color = { name: req.query.name };
        }
        else {
            color = req.query.color;
        }
        if (!!req.query.from) {
            yoqilgi = { name: req.query.name };
        }
        else {
            yoqilgi = req.query.yoqilgi;
        }
        if (!!req.query.from) {
            transmission = { name: req.query.name };
        }
        else {
            transmission = req.query.transmission;
        }
        if (!!req.query.from) {
            region = { name: req.query.name };
        }
        else {
            region = req.query.region;
        }

        let options = {
            $gte: yili
        }
        let options1 = {
            $gte: yurgani,
        }
        let options2 = {
            $gte: narxi,
        }
        let options3 = {
            $regex: madel,
        }
        let options4 = {
            $regex: color,
        }
        let options5 = {
            $regex: yoqilgi,
        }
        let options6 = {
            $regex: transmission,
        }
        let options7 = {
            $regex: region,
        }
        let foutcomes = await Mowina.find({
            yili: options,
            yurgani: options1,
            narxi: options2,
            madel: options3,
            color: options4,
            yoqilgi: options5,
            transmission: options6,
            region: options7
        })
        res.json(foutcomes)
    } catch (err) {
        res.status(404).json({ message: "not found" })
    }
}


