const {Web3} = require("web3")
const bcrypt = require('bcryptjs')
const { Wallet } = require("../models/wallet.model");
const { Tx } = require("../models/txs.model");
const { User } = require("../models/user.model");
const { config } = require("../config/config");
const { decryptAccountInfo , readTxByTxHash , dollarToEth , serializeBigInt , serializeObject} = require("../middleware/walletFunctions");
const { balanceAbi } = require("../smartContracts/ABIs");

const web3 = new Web3(new Web3.providers.HttpProvider(config.webProvider));

const myAccount = web3.eth.accounts.privateKeyToAccount(config.devPk)
const devAddress = config.devAddress
const balanceContract = new web3.eth.Contract(balanceAbi,config.balanceContract)
const balanceCA = config.balanceContract

//! admin only!! can get every address's eligibility
const globalCurrentBalance = async(req,res) => {
    const {walletAddress} = req.params
    try {
        const result = await balanceContract.methods.currentBalance(walletAddress).call({from : devAddress})
        const finalResult = serializeBigInt(result)
        return res.status(200).send({MSG : "Done : " , finalResult})
    } catch (error) {
        console.error(error);        
    }
}

//! returns logged user's eligibility
const getCurrentBalance = async (req,res) => {
    try {
        let userAccount = await Wallet.findById(req.user.walletId)
        const result = await balanceContract.methods.currentBalance(`0x${userAccount.accounts[0].data.address}`).call({ from: myAccount.address });
        return res.status(200).send({message : "Got Balance successfully , " , balance : serializeBigInt(result)})
    } catch (error) {
        console.error(error);
    }
}

//! will be used to transfer funds from X to Y , can be used by both admin and user
const transferBalance = async(req,res) => {
    const {toAddress , amount} = req.body
    try {
        let userAccount = await Wallet.findById(req.user.walletId)
        let _from = userAccount.accounts[0].data.address
        const estimateGas = await balanceContract.methods.transferBalance(_from,toAddress,amount).estimateGas({from : devAddress})
        const gasPrice = await web3.eth.getGasPrice()
        const nonce = await web3.eth.getTransactionCount(devAddress,'pending')
        console.log("nonce : " , nonce);
        const data = balanceContract.methods.transferBalance(_from,toAddress,amount).encodeABI()
        const tx = {
            from : devAddress,
            to : balanceCA,
            amount : amount,
            gas : estimateGas,
            gasPrice : gasPrice,
            data : data,
            nonce : nonce
        }
        const signedTx = await myAccount.signTransaction(tx)
        console.log("signedTx : " , signedTx)
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        console.log("receipt : " , receipt)
        const tempPayload = serializeObject(receipt)
        const finalPayload = {
            from : _from,
            to : toAddress,
            amount : amount,
            blockNumber : tempPayload.blockNumber,
            transactionHash : tempPayload.transactionHash,
        }
        const newBalance = await balanceContract.methods.currentBalance(userAccount.accounts[0].data.address).call({ from: myAccount.address });
        return res.status(200).send({finalPayload})
    } catch (error) {
        console.error(error);
        return res.status(401).send({Error : error})
    }
}

//! admin only. will be used to deposit funds into account (Deposit eligibility)
const changeBalance = async(req,res) => {
    const {_to , amount} = req.body
    try {
        const oldBalance = await balanceContract.methods.currentBalance(_to).call({ from: myAccount.address });
        const estimateGas = await balanceContract.methods.changeBalance(_to , amount).estimateGas({from : devAddress})
        const gasPrice = await web3.eth.getGasPrice()
        const data = balanceContract.methods.changeBalance(_to , amount).encodeABI()
        const tx = {
            from : devAddress,
            to : balanceCA,
            amount : amount,
            gas : estimateGas,
            gasPrice : gasPrice,
            data : data
        }
        const signedTx = await myAccount.signTransaction(tx)
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        const newBalance = await balanceContract.methods.currentBalance(_to).call({ from: myAccount.address });
        return res.status(200).send({Msg :`${_to} Previous Balance : ${oldBalance} , New Balance : ${newBalance}`})
    } catch (error) {
        console.error(error);
    }
}

const balanceHistory = async(req,res) => {
    try {
        let userAccount = await Wallet.findById(req.user.walletId)
        const result = await balanceContract.methods.userHistory(userAccount.accounts[0].data.address).call({ from: myAccount.address });
        const userHistory = result.map((item)=>{
            return serializeObject(item)
        })
        return res.status(200).send({message : "Got Eligibility successfully , " , history : userHistory})
    } catch (error) {
      return res.status(401).send({message : "Couldn't Fetch Transactions History , contact Support for help."})
    }
}



module.exports = {getCurrentBalance , transferBalance , changeBalance , globalCurrentBalance , balanceHistory}