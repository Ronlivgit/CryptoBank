const { Web3 } = require("web3");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");
const { Wallet } = require("../models/wallet.model");
const { verifyToken , generateToken } = require('../utils/jwt');
const { config } = require("../config/config");
const web3 = new Web3(new Web3.providers.HttpProvider(config.webProvider));
const { v4 : uuidv4 } = require('uuid')

const registerUser = async (req, res) => {
  const body = req.body
  try {
    const encryptedPassword = await bcrypt.hash(body.password, 10);
    body.password = encryptedPassword;
    const newUser = new User(body)
    newUser.userId = newUser._id
    const account = web3.eth.accounts.create(1)
    const walletPayload = {
        walletId : "",
        ownerUserId : newUser.userId,
        accounts : []
    }
    walletPayload.accounts.push({data : await web3.eth.accounts.encrypt(account.privateKey,config.encryptPass),
       accountName : body.fullName})
    const userWallet = new Wallet(walletPayload)
    userWallet.walletId = userWallet._id;
    newUser.walletId = userWallet.walletId
    //! activeAccount will !! LATER !! allow user to chose which account to operate through the accountId generated above.
    newUser.activeAccount = walletPayload.accounts[0].accountId
    await newUser.save()
    await userWallet.save()
    return res.status(200).send({message: "Registered successfully.", newUser , userWallet})
  } catch (error) {
    console.error(error);
  }
};

const logUser = async (req,res) => {
    const {email,password} = req.body
    try {
        const checkUser = await User.findOne({ email })
        if(checkUser){
            const checkPassword = await bcrypt.compare(password,checkUser.password);
            if(checkPassword){
              const token = generateToken(
                {email : checkUser.email , role : checkUser.role ,
                walletId : checkUser.walletId,activeAddress : checkUser.activeAccount.address })
              return res.status(200).send({user : checkUser , token})
            }
            return res.status(401).json("User not found or invalid credentials");
        }
        return res.status(401).json("User not found or invalid credentials");
    } catch (error) {
        console.error(error);
    }
}

// const body = { fullName: "DemoAccount", email: "a@a.com", password: "123123" };

// registerUser(body);


module.exports = { registerUser , logUser }