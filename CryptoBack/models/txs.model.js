const mongoose = require('mongoose')

const txSchema = new mongoose.Schema({
    txHash : {type : String , require : true},
    walletId : {type : String , default : ""}
})


const Tx = mongoose.model("Txs" , txSchema)

module.exports = { Tx }