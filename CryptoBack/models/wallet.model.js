const mongoose = require('mongoose')


const walletSchema = new mongoose.Schema({
    ownerUserId : {type : String, } ,
    walletId : {type : String},
    accounts : {type : Array},
    bnsName : {type : String, default : ''},
})


const Wallet = mongoose.model("Wallets" , walletSchema)

module.exports = { Wallet }