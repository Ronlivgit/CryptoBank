//! Backup code, TXS controller changed to the operator controller, operated fully by smart contract without on-chain usage from users

// const {Web3} = require("web3")
// const bcrypt = require('bcryptjs')
// const { Wallet } = require("../models/wallet.model");
// const { Tx } = require("../models/txs.model");
// const { User } = require("../models/user.model");
// const { config } = require("../config/config");
// const { completeSignedTx , decryptAccountInfo , readTxByTxHash , dollarToEth} = require("../middleware/walletFunctions");


// const web3Provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/14bf7a4ba6194ff3b1f6b419426fcda2");
// const web3 = new Web3(web3Provider);


// //? Returns all the logged user's transactions data (whole data, of every tx)
// const getTxs = async (req,res) => {
//     try {
//         const userTxHashs = await Tx.find({walletId : req.user.walletId})
//         const allTxs = await readTxByTxHash([userTxHashs])
//         allTxs.map((transaction) => {
//             transaction.value = web3.utils.fromWei(transaction.value,"ether")
//             for(let [key,value] of Object.entries(transaction)){
//                 transaction[key] = value.toString()
//             }
//         })
//         return res.status(200).send({message: "Transfered successfully." , allTxs : allTxs})
//     } catch (error) {
//         console.error(error);
//     }
// }

// //? Execution of transaction, from logged user to chosen reciever, add Tx history to db so can be used later.
// //! stableValue is boolean, allows user to decide if he wants to transfer in $ or Eth
// const sendTx = async(req,res) => { 
//     const {_to , _value , stableValue} = req.body
//     try {
//         const findWallet = await Wallet.findOne({ownerUserId : req.user.userId})
//         const decrypedWallet = await web3.eth.accounts.decrypt(findWallet.accounts[0].data,config.encryptPass)
//         const finalValue = stableValue ? dollarToEth(_value) : web3.utils.toWei(_value,"ether")
//         const signedTx = await decrypedWallet.signTransaction({
//             from : decrypedWallet.address,
//             to : `0x${_to}`,
//             gas : 42000,
//             value : finalValue,
//             gasPrice : await web3.eth.getGasPrice(),
//             chain : "sepolia",
//             chainId : 11155111,
//         })
//         const tx = await completeSignedTx(decrypedWallet.privateKey,signedTx)
//         const txData = new Tx({txHash : tx.transactionHash , walletId : findWallet.walletId})
//         await txData.save()
//         return res.status(200).send({message: "Transfered successfully." , receipt : 
//             {from : tx.from , to : tx.to , blockNumber : tx.blockNumber.toString() , txHash : tx.transactionHash , value : _value}})
//     } catch (error) {
//         console.error(error);
//     }
// }





// module.exports = { sendTx , getTxs }