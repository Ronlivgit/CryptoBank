const mongoose = require('mongoose')


const operationsArray = ["buy","sell"]

const investSchema = new mongoose.Schema({
    walletAddress : {type : String , default : ""},
    investmentId : {type : mongoose.SchemaTypes.ObjectId},
    tokenSymbol : {type : String , required : true},
    tokenAddress : {type : String , required : true},
    tokenDecimals : {type : Number , default : 18},
    isValid : {type : Boolean , default : true},
    purchaseTimestamp : {type : Date , default : Date.now()},
    // operations : {type : Array } //! Smart contract
})

//! Buy/Sell payload example
//! Sell = 
// {
// 	"tokenSymbol": "WETH",
// 	"tokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
// 	"tokenAmount": 0.1984,
// 	"tokenPrice":3148,
//     "operationType" : "sell" 
// }

const Investment = mongoose.model("Investments" , investSchema)

module.exports = { Investment }