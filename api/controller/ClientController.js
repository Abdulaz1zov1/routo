const Client = require('../models/client')

exports.add = async (req, res) => {
    try {
        const calient = new Client({
            ...req.body,
            photo: `http://185.196.214.145:5000/${req.file.path.slice(7)}`,
        })
        await calient.save()
        res.status(201).json(
            {
                message: "success created",
                data: calient
            }
        )
    } catch (e) {
        res.status(500).json(
            {
                message: "error"
            }
        )
    }
}

exports.one = async (req, res) => {
    try {
        const getId = await Client.findById({ _id: req.params.id })
        res.status(200).json(
            {
                message: "success",
                data: getId
            }
        )
    } catch (e) {
        res.status(404).json(
            {
                message: "client not found"
            }
        )
    }
}

exports.all = async (req, res) => {
    try {
        const clientAll = await Client.find({}).sort({ date: -1 })
        res.status(200).json(
            {
                message: "success",
                data: clientAll
            }
        )
    } catch (e) {
        res.status(404).json(
            {
                message: "client not found"
            }
        )
    }
}

exports.updat = async (req, res) => {
    console.log(req.body)
    try {
        const updateId = await Client.findByIdAndUpdate(req.params.id, {
            ...req.body,
            photo: `http://185.196.214.145:5000/${req.file.path.slice(7)}`,
        })
        res.status(200).json(
            {
                message: "success",
                data: updateId
            }
        )
    } catch (e) {
        res.status(404).json(
            {
                message: "client not found"
            }
        )
    }
}

exports.delet = async (req, res) => {
    try {
        const deleteId = await Client.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json(
            {
                message: "success",
                data: []
            }
        )
    } catch (e) {
        res.status(404).json(
            {
                message: "client not found"
            }
        )
    }
}
