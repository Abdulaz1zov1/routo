const Editor = require("../models/total")


exports.CreateXodim = async(req, res)=>{
    try {
        const editor = new Editor({...req.body})
        await editor.save()
        res.status(201).json(
            {
                message: "success created",
                data: editor
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




exports.GetByIdXodim = async(req, res)=>{
    try {
        const editor = await Editor.findById({_id: req.params.id})
        res.status(200).json(
            {
                message: "success",
                data: editor
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "editor not found"
            }
        )
    }
}


exports.getAll = async(req, res)=>{
    const user = await Editor.find({}).sort({date: -1})
    res.status(200).json({data: user})
}

exports.EditXodim = async(req, res)=>{
    try {
        const editor = await Editor.findByIdAndUpdate(req.params.id, {
            ...req.body
        })
        res.status(200).json(
            {
                message: "success",
                data: editor
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "editor not found"
            }
        )
    }
}




exports.DeleteXodim = async(req, res)=>{
    try {
         await Editor.findByIdAndDelete({_id: req.params.id}).sort({date: -1})
        res.status(200).json(
            {
                message: "success",
                data: []
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "editor not found"
            }
        )
    }
}