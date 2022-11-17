const Mowina = require('../models/video')


exports.add = async (req, res, next) => {
    const rasmla = req.files
    let videos = []
    rasmla.forEach(video => videos.push(`http://185.196.214.145:5000/${video.path.slice(7)}`))
    try {
        const car = new Mowina({
            ...req.body,
            video: videos
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
        const { page = 1, limit = 20 } = req.query;
        const condition = {userId: req.query.userId}
        !condition.userId&&delete condition.userId;
        const car = await Mowina.find(condition)
          .populate(["userId"])
          .limit(limit * 1)
          .skip((page - 1) * limit);
        const count =  await Mowina.count()
        res.status(200).json({pagination:{
            totol: Math.round(count/limit), 
            page:+page,
            limit:+limit
        }, car})
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
        let videos = []
        rasmla.forEach(video =>
            videos.push(`http://185.196.214.145:5000/${video.path.slice(7)}`)
        )
        const updateMowina = await Mowina.findByIdAndUpdate(req.params.id, {
            ...req.body,
            video: videos,
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




