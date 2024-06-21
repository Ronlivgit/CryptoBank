const {Web3} = require("web3")
const bcrypt = require('bcryptjs')
const { Wallet } = require("../models/wallet.model");
const { Tx } = require("../models/txs.model");
const { User } = require("../models/user.model");
const { config } = require("../config/config");
const { completeSignedTx , decryptAccountInfo , readTxByTxHash , dollarToEth , serializeBigInt , serializeObject} = require("../middleware/walletFunctions");
const { creditCardAbi } = require("../smartContracts/ABIs");
const axios = require('axios');
const { Authentication } = require("../middleware/authentication");
const { transferEligibility } = require("./operator.controller");


const web3 = new Web3(new Web3.providers.HttpProvider(config.webProvider));

const myAccount = web3.eth.accounts.privateKeyToAccount(config.devPk)
const devAddress = '0x5322f9A185d91480ED04eE09F10f0fE4aA6efC14'
const cardContract = new web3.eth.Contract(creditCardAbi,"0xfed70824BF57193993Dc801a81E5cCE26fC79AA1")
const cardCA = "0xfed70824BF57193993Dc801a81E5cCE26fC79AA1"


const getCardStatus = async (req,res) => {
    try {
        const userWallet = await Wallet.findById(req.user.walletId)
        const result = await cardContract.methods.creditCards(`0x${userWallet.accounts[0].data.address}`).call({from:devAddress})
        const cleanResult = serializeObject(result)
        const resultForReturn = {
            creditLimit : cleanResult.creditLimit,
            usedBalance : cleanResult.usedBalance,
            blocked : cleanResult.blocked,
        }
        return res.status(200).send({Message : "Done successfully : " , result : resultForReturn})
    } catch (error) {
        console.error(error);   
    }
}

const getCardHistory = async (req,res) => {
    try {
        const userWallet = await Wallet.findById(req.user.walletId)
        const result = await cardContract.methods.getUsageHistory(`0x${userWallet.accounts[0].data.address}`).call({from:devAddress})
        const fixedResult = result.map((item)=>{
            const tempItem = serializeObject(item)
            const payload = {
                amount : tempItem.amount,
                timeStamp : tempItem.timestamp
            }
            return payload
        })
        return res.status(200).send({Message : "Done successfully : " , result : fixedResult})
    } catch (error) {
        console.error(error);
    }
}

const useCreditCard = async (req,res) => {
    const {_amount , _to , description } = req.body
    const userToken = req.headers.authorization;
    // console.log("req.header : " , req.header);
    try {
        const userWallet = await Wallet.findById(req.user.walletId)
        const _user = `0x${userWallet.accounts[0].data.address}`
        const estimateGas = await cardContract.methods.changeBalance(_user , _amount).estimateGas({from : devAddress})
        const gasPrice = await web3.eth.getGasPrice()
        const data = cardContract.methods.changeBalance(_user , _amount).encodeABI()
        const tx = {
            from : devAddress,
            to : cardCA,
            amount : _amount,
            gas : estimateGas,
            gasPrice : gasPrice,
            data : data
        }
        const signedTx = await myAccount.signTransaction(tx)
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        console.log("useCard receipt : " , receipt);
        const operateData = {toAddress : _to , _amount : _amount}
        const operateBalance = await axios.post(`${config.baseApi}/api/operator/transfer`,operateData , {headers : {"Authorization" : `${userToken}`}})
        return res.status(200).send({message : `Transfered ${_amount} successfully` , "receipt : " : serializeObject(receipt)})

    } catch (error) {
        console.error(error);
    }
}
//? User requests to create credit card, sends request and admin/owner can create card with inserted limit based on optiosn
const createCard = async (req,res) => {
    const {limit , userAddress} = req.body
    try {
        const estimateGas = await cardContract.methods.createCreditCard(userAddress,limit).estimateGas({from : devAddress})
        const data = cardContract.methods.createCreditCard(userAddress,limit).encodeABI()
        const txPayload = {
            from : devAddress,
            to : cardCA,
            gas : estimateGas,
            // limit : limit,
            gasPrice : await web3.eth.getGasPrice(),
            data : data
        }
        const signedTx = await myAccount.signTransaction(txPayload)
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        console.log("receipt : " , receipt);
    } catch (error) {
        console.error(error);
    }
}

const updateLimit = async (req,res) => {

    try {
        
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getCardStatus , getCardHistory , useCreditCard , createCard , updateLimit}