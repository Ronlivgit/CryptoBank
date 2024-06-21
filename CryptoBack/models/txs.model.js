const mongoose = require('mongoose')


const enumArr = ["transfer","deposit","withdraw","payment","subscription"]

const txSchema = new mongoose.Schema({
    txHash : {type : String , required : true},
    walletId : {type : String , default : ""},
    txType : {type : String , enum : enumArr , default : "transfer", required : true},
    txPayload : {type : Object }
})


const Tx = mongoose.model("Txs" , txSchema)

module.exports = { Tx }