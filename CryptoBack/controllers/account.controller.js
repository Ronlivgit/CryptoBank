const {Web3} = require("web3")
const bcrypt = require('bcryptjs')
const { Wallet } = require("../models/wallet.model");
const { User } = require("../models/user.model");


const web3Provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/14bf7a4ba6194ff3b1f6b419426fcda2");
const web3 = new Web3(web3Provider);


const addAccountToWallet = async (req,res) => { 
    //! req.body should get the wallet objective with body of walletId, add another account to it and return the accounts
    //! consider adding PFP for the account through the body and make a logo option
    const {accountName} = req.body
    try {
        const userWallet = await Wallet.findOne({ownerUserId : req.user.id})
        const newAccount = web3.eth.accounts.create(1)
        newAccount.accountName = accountName
        userWallet.accounts.push(newAccount)
        await userWallet.save()
        return res.status(200).send({message: "Added account successfully." , userWallet : userWallet})
    } catch (error) {
        console.error(error);
    }
}

const getWalletsAccounts = async (req,res) => {
    //! body should have walletId
    try {
        const userWallet = await Wallet.findOne({ownerUserId : req.user.id})
        return res.status(200).send({message : "Found wallets : " , userWallet : userWallet})
    } catch (error) {
        console.error(error);
    }
}


// web3.eth.getBlockNumber().then((result => {console.log(result)}))
module.exports = { addAccountToWallet , getWalletsAccounts , }