const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    country: String,
    region: String,
    number: Number,
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    madel: String,
    madelru: String,

    marka: String,
    markaru: String,

    color: String,
    colorru: String,

    yili: Number,

    divigitel:Number,

    yoqilgi: String,
    yoqilgiru: String,

    transmission: String,
    transmissionru: String,

    kuzuv: String,
    kuzuvru:String,

    perevod:String,
    perevodru: String,

    yurgani: Number,

    narxi: Number,

    aksiya: String,

    opisaniya:  String,

    opisaniyaru: String,

    video: {
        type: Array,
        data: Buffer
    },
    credit: String,
    status: {
        type: Boolean, default: false
    },
    date: {type: Date, default: Date.now}
})
module.exports = mongoose.model("Video", videoSchema)
