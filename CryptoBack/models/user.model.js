const mongoose = require('mongoose')

const roleOptions = ["user","moderator","owner"]

const userSchema = new mongoose.Schema({
    userId : {type : String,} ,
    firstName : {type : String, require : true} ,
    lastName : {type : String, require : true} ,
    bnsName : {type : String},
    email : {type : String, require : true , unique : true ,} ,
    password : {type : String, require : true} ,
    phoneNum : {type : Number , require : true} ,
    walletId : {type : String},
    role : {type : String , enum : roleOptions , default : "user", require : false },
    activeAddress : {type : String , default : ""}
})


const User = mongoose.model("Users" , userSchema)

module.exports = { User }