const {Web3} = require("web3")
const bcrypt = require('bcryptjs')
const { Wallet } = require("../models/wallet.model");
const { User } = require("../models/user.model");
const { config } = require("../config/config");
const { decryptAccountInfo, serializeObject, encryptField } = require("../middleware/walletFunctions");
const { bnsAbi } = require("../smartContracts/ABIs");

const web3 = new Web3(new Web3.providers.HttpProvider(config.webProvider));

const devAddress = '0x5322f9A185d91480ED04eE09F10f0fE4aA6efC14'
const devAccount = web3.eth.accounts.privateKeyToAccount(config.devPk)

const bnsContract = new web3.eth.Contract(bnsAbi,"0xc9E3c3324B8DA10Ce5C272964DD7B325d9930e6F")
const bnsCA = "0xc9E3c3324B8DA10Ce5C272964DD7B325d9930e6F"
//! remove walletId field on both here and operator, reduces the gas required for the operation on blockchain.
const registerBns = async (req,res) => {
    const { bnsName } = req.body
    try {
        const userWallet = await Wallet.findById(req.user.walletId)
        const encryptedWalletId = encryptField(userWallet.walletId, config.encryptPass)
        const userAccount = userWallet.accounts[0].data
        const estimateGas = await bnsContract.methods.addUser(userAccount.address ,
             bnsName , encryptedWalletId).estimateGas({from : devAddress});
        const gasPrice = await web3.eth.getGasPrice();
        const data = bnsContract.methods.addUser(`0x${userAccount.address}` , bnsName , encryptedWalletId).encodeABI()
        const tx = {
            from : devAddress,
            to : bnsCA,
            gas : estimateGas,
            gasPrice : gasPrice,
            data : data
        }
        const signedTx = await devAccount.signTransaction(tx)
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        userWallet.bnsName = bnsName
        await userWallet.save()
        return res.status(200).send({Message : `Attached BNS : ${bnsName} to : ${userAccount.address}`})
    } catch (error) {
        console.error(error);
    }
}

const userByBns = async (req,res) => {
    const {bnsName} = req.params
    try {
        const userData = await bnsContract.methods.getUserByBNS(bnsName).call({from : devAddress})
        return res.status(200).send({Message : "Got user details by bnsName : " , data : userData})
    } catch (error) {
        console.error(error);
    }
}

const bnsByAddress = async (req,res) => {
//!! final contract change : Make sure it returns the WALLET ID and BNS, return of address is useless when its the input.
    const {address} = req.params 
    try {
        const userData = await bnsContract.methods.getUserByAddress(address).call({from : devAddress})
        return res.status(200).send({Message : "Got user details by bnsName : " , data : userData})
    } catch (error) {
        return res.status(404).send({Message : `${address} has no BNS attached to it`})
    }
}

const checkIfExist = async(req,res) => {
    const {bnsName} = req.body
    try {
        const bnsExist = await bnsContract.methods.userExists(bnsName).call({from : devAddress})
        return res.status(200).send({message : `${bnsName} ${bnsExist ? "Is taken already" : "Is available"}` , isValid : !bnsExist})
    } catch (error) {
        console.error(error);
    }
}

const removeBns = async (req,res) => {
    const {bnsName} = req.params
    try {
        const estimateGas = await bnsContract.methods.removeUser(bnsName).estimateGas({from : devAddress})
        const gasPrice = await web3.eth.getGasPrice()
        const data = bnsContract.methods.removeUser(bnsName).encodeABI()
        const tx = {
            from : devAddress,
            to : bnsCA,
            gas : estimateGas,
            gasPrice : gasPrice,
            data : data
        }
        const signedTx = await devAccount.signTransaction(tx)
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        return res.status(200).send({Message : `bnsName ${bnsName} removed successfully. : `})
    } catch (error) {
        console.error(error);
    }
}

module.exports = { registerBns , userByBns , removeBns , bnsByAddress , checkIfExist }