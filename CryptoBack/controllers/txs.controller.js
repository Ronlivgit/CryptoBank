const {Web3} = require("web3")
const bcrypt = require('bcryptjs')
const { Wallet } = require("../models/wallet.model");
const { User } = require("../models/user.model");


const web3Provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/14bf7a4ba6194ff3b1f6b419426fcda2");
const web3 = new Web3(web3Provider);



const sendTx = async(req,res) => { 
    const {_to , _value} = req.body
    try {
        const userWallet = await Wallet.findOne({ownerUserId : req.user.id})
        
    } catch (error) {
        
    }
}