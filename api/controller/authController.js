const Admin = require("../models/user")


exports.CreateAdmin = async(req, res)=>{
    try {
        const auth = new Admin({...req.body})
        await auth.save()
        res.status(201).json(
            {
                message: "success created",
                data: auth
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
    const { email, password } = req.body;
    if (!email) {
        res.status(404).json({success: false})
    }
    else if (!password) {
        res.status(404).json({success: false})
    }
    const user = await Admin.findOne({ email: email, password: password })
    .select(["email", "password"]);
    if (!user) {
        res.status(404).json({success: false})
    }else{
        res.status(200).json({success: true, data: user})
    }
};


exports.GetByIdAdmin = async(req, res)=>{
    try {
        const auth = await Admin.findById({_id: req.params.id})
        res.status(200).json(
            {
                message: "success",
                data: auth
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


exports.GetAdmin = async(req, res)=>{
    try {
        const auth = await Admin.find({roles: "moderator"}).sort({date: -1})
        res.status(200).json(
            {
                message: "success",
                data: auth
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "auth not found"
            }
        )
    }
}


exports.EditAdmin = async(req, res)=>{
    try {
        const auth = await Admin.findByIdAndUpdate(req.params.id, {
            ...req.body
        })
        res.status(200).json(
            {
                message: "success",
                data: auth
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "auth not found"
            }
        )
    }
}




exports.DeleteAdmin = async(req, res)=>{
    try {
        const auth = await Admin.findByIdAndDelete({_id: req.params.id}).sort({date: -1})
        res.status(200).json(
            {
                message: "success",
                data: auth
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "auth not found"
            }
        )
    }
}