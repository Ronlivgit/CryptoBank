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
const devAddress = '0x5322f9A185d91480ED04eE09F10f0fE4aA6efC14'
const myContract = new web3.eth.Contract(balanceAbi,"0x541481976Dd87ECCd6B4914aCbaAd8298E7C13b2")
const myCA = "0x541481976Dd87ECCd6B4914aCbaAd8298E7C13b2"

//! admin only!! can get every address's eligibility
const globalCurrentBalance = async(req,res) => {
    const {walletAddress} = req.params
    try {
        const result = await myContract.methods.currentBalance(walletAddress).call({from : devAddress})
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
        const result = await myContract.methods.currentBalance(`0x${userAccount.accounts[0].data.address}`).call({ from: myAccount.address });
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
        let _from = `0x${userAccount.accounts[0].data.address}`
        const estimateGas = await myContract.methods.transferBalance(_from,toAddress,amount).estimateGas({from : devAddress})
        const gasPrice = await web3.eth.getGasPrice()
        const data = myContract.methods.transferBalance(_from,toAddress,amount).encodeABI()
        const tx = {
            from : devAddress,
            to : myCA,
            amount : amount,
            gas : estimateGas,
            gasPrice : gasPrice,
            data : data
        }
        const signedTx = await myAccount.signTransaction(tx)
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        const tempPayload = serializeObject(receipt)
        const finalPayload = {
            from : _from,
            to : toAddress,
            blockNumber : tempPayload.blockNumber,
            transactionHash : tempPayload.transactionHash,
        }
        const newBalance = await myContract.methods.currentBalance(userAccount.accounts[0].data.address).call({ from: myAccount.address });
        return res.status(200).send({finalPayload})
    } catch (error) {
        return res.status(401).send({Error : error.cause.message})
        console.error(error);
    }
}

//! admin only. will be used to deposit funds into account (Deposit eligibility)
const changeBalance = async(req,res) => {
    const {_to , amount} = req.body
    try {
        const oldBalance = await myContract.methods.currentBalance(_to).call({ from: myAccount.address });
        const estimateGas = await myContract.methods.changeBalance(_to , amount).estimateGas({from : devAddress})
        const gasPrice = await web3.eth.getGasPrice()
        const data = myContract.methods.changeBalance(_to , amount).encodeABI()
        const tx = {
            from : devAddress,
            to : myCA,
            amount : amount,
            gas : estimateGas,
            gasPrice : gasPrice,
            data : data
        }
        const signedTx = await myAccount.signTransaction(tx)
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        const newBalance = await myContract.methods.currentBalance(_to).call({ from: myAccount.address });
        return res.status(200).send({Msg :`${_to} Previous Balance : ${oldBalance} , New Balance : ${newBalance}`})
    } catch (error) {
        console.error(error);
    }
}

const balanceHistory = async(req,res) => {
    try {
        let userAccount = await Wallet.findById(req.user.walletId)
        const result = await myContract.methods.userHistory(userAccount.accounts[0].data.address).call({ from: myAccount.address });
        const userHistory = result.map((item)=>{
            return serializeObject(item)
        })
        return res.status(200).send({message : "Got Eligibility successfully , " , history : userHistory})
    } catch (error) {
        console.error(error);
    }
}



module.exports = {getCurrentBalance , transferBalance , changeBalance , globalCurrentBalance , balanceHistory}