const {Web3} = require("web3")
const bcrypt = require('bcryptjs')
const { Wallet } = require("../models/wallet.model");
const { User } = require("../models/user.model");
const { config } = require("../config/config");

const web3Provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/14bf7a4ba6194ff3b1f6b419426fcda2");
const web3 = new Web3(web3Provider);


const addAccountToWallet = async (req,res) => { 
    //! req.body should get the wallet objective with body of walletId, add another account to it and return the accounts
    //! consider adding PFP for the account through the body and make a logo option
    const {accountName} = req.body
    try {
        const userWallet = await Wallet.findOne({ownerUserId : req.user.id})
        const newAccount = web3.eth.accounts.create(1)
        userWallet.accounts.push({data : await web3.eth.accounts.encrypt(newAccount.privateKey,config.encryptPass) , accountName : accountName})
        await userWallet.save()
        return res.status(200).send({message: "Added account successfully." , userWallet : userWallet.accounts})
    } catch (error) {
        console.error(error);
    }
}

const getAccountWallet = async (req,res) => {
    //! body should have walletId
    try {
        const userWallet = await Wallet.findById(req.user.walletId)
        console.log(userWallet.accounts);
        return res.status(200).send({message : `Found wallets :` , userWallet : `${JSON.stringify(userWallet.accounts)} `})
    } catch (error) {
        console.error(error);
    }
}


module.exports = { addAccountToWallet , getAccountWallet , }