const mongoose = require('mongoose')
const connectDB = async () => {
    // await mongoose.connect("mongodb+srv://user:123@cluster0.5wrygo3.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true})
    await mongoose.connect("mongodb://localhost:27017/assaxc", {useNewUrlParser: true})
    .then(()=>{
        console.log(`MongoDB Connected`)
    }).catch((err)=>{
        console.log("err")
    })
}
module.exports = connectDB
