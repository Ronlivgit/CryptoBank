const {Web3} = require("web3")
const bcrypt = require('bcryptjs')
const { Wallet } = require("../models/wallet.model");
const { Tx } = require("../models/txs.model");
const { User } = require("../models/user.model");
const { config } = require("../config/config");
const { completeSignedTx , decryptAccountInfo , readTxByTxHash , dollarToEth , serializeBigInt} = require("../middleware/walletFunctions");
const { operatorAbi } = require("../smartContracts/BILS");

const web3Provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/14bf7a4ba6194ff3b1f6b419426fcda2");
const web3 = new Web3(web3Provider);

const myAccount = web3.eth.accounts.privateKeyToAccount(config.devPk)
const devAddress = '0x5322f9A185d91480ED04eE09F10f0fE4aA6efC14'
const myContract = new web3.eth.Contract(operatorAbi,"0xb38051727B955bEf69D8F0185EC2D9CA3F944e61")
const myCA = "0xb38051727B955bEf69D8F0185EC2D9CA3F944e61"

//! admin only!! can get every address's eligibility
const globalGetEligibility = async(walletAddress) => {
    try {
        const result = await myContract.methods.eligibilityOf(walletAddress).call({from : devAddress})
        return serializeBigInt(result)
    } catch (error) {
        console.error(error);        
    }
}

//! returns logged user's eligibility
const getEligibility = async (req,res) => {
    try {
        let userAccount = await Wallet.findById(req.user.walletId)
        const result = await myContract.methods.eligibilityOf(userAccount.accounts[0].data.address).call({ from: myAccount.address });
        return res.status(200).send({message : "Got Eligibility successfully , " , eligibility : serializeBigInt(result)})
    } catch (error) {
        console.error(error);
    }
}

//! will be used to transfer funds from X to Y , can be used by both admin and user
const transferEligibility = async(req,res) => {
    const {toAddress , _amount} = req.body
    try {
        let userAccount = await Wallet.findById(req.user.walletId)
        let _from = `0x${userAccount.accounts[0].data.address}`
        const estimateGas = await myContract.methods.transferEligibility(_from,toAddress,_amount).estimateGas({from : devAddress})
        const gasPrice = await web3.eth.getGasPrice()
        const data = myContract.methods.transferEligibility(_from,toAddress,_amount).encodeABI()
        const tx = {
            from : _from,
            to : myCA,
            amount : _amount,
            gas : estimateGas,
            gasPrice : gasPrice,
            data : data
        }
        const signedTx = await myAccount.signTransaction(tx)
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        const newBalance = await myContract.methods.eligibilityOf(userAccount.accounts[0].data.address).call({ from: myAccount.address });
        return res.status(200).send({message : `Transfered ${_amount} successfully` , "Current eligibility : " : serializeBigInt(newBalance)})
    } catch (error) {
        console.error(error);
    }
}

//! admin only. will be used to get all teller's clients in a click
const getMultipleEligibilities = async(req,res,[addresses]) => {
    try {
        const data = await myContract.methods.eligibilityOfMultiple([addresses]).call({ from: myAccount.address })
        return res.status(200).send({Message : `Done , requested balances : ${data}`})
    } catch (error) {
        console.error(error);
    }
}

//! admin only. will be used to deposit funds into account (Deposit eligibility)
const increaseEligibility = async(req,res) => {
    const {_to , _amount} = req.body
    try {
        const oldBalance = await globalGetEligibility(_to)
        const estimateGas = await myContract.methods.increaseEligibility(_to , _amount).estimateGas({from : devAddress})
        const gasPrice = await web3.eth.getGasPrice()
        const data = myContract.methods.increaseEligibility(_to , _amount).encodeABI()
        const tx = {
            from : devAddress,
            to : myCA,
            amount : _amount,
            gas : estimateGas,
            gasPrice : gasPrice,
            data : data
        }
        const signedTx = await myAccount.signTransaction(tx)
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        const newBalance = await globalGetEligibility(_to)
        return res.status(200).send({Msg :`Previous Balance : ${oldBalance} , New Balance : ${newBalance}`})
    } catch (error) {
        console.error(error);
    }
}



module.exports = {getEligibility , transferEligibility , increaseEligibility , globalGetEligibility}