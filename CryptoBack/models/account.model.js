const mongoose = require('mongoose')


const accountSchema = new mongoose.Schema({
    ownerWalletId : {type : String, } ,
    accountId : {type : String},
    address : {type : String},
    privateKey : {type : String},
    accountName : {type : String, default : "Account 0"}
})


const Account = mongoose.model("Accounts" , accountSchema)

module.exports = { Account }