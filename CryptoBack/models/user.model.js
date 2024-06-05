const mongoose = require('mongoose')

const roleOptions = ["user","admin","manager"]

const userSchema = new mongoose.Schema({
    userId : {type : String,} ,
    fullName : {type : String, require : true} ,
    email : {type : String, require : true , unique : true ,} ,
    password : {type : String, require : true} ,
    phoneNum : {type : Number , require : true} ,
    walletId : {type : String},
    role : {type : String , enum : roleOptions , default : "user", require : false },
    defaultAccount : {type : Object , default : ""}
})


const User = mongoose.model("Users" , userSchema)

module.exports = { User }