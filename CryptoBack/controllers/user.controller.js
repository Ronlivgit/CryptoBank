const { Web3 } = require("web3");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");
const { Wallet } = require("../models/wallet.model");
const { verifyToken , generateToken } = require('../utils/jwt')
const web3Provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/14bf7a4ba6194ff3b1f6b419426fcda2");
const web3 = new Web3(web3Provider);


const registerUser = async (req, res) => {
  const body = req.body
  try {
    const encryptedPassword = await bcrypt.hash(body.password, 10);
    body.password = encryptedPassword;
    const newUser = new User(body)
    newUser.userId = newUser._id
    const walletPayload = {
        walletId : "",
        ownerUserId : newUser.userId,
        accounts : web3.eth.accounts.wallet.create(1)
    }
    const userWallet = new Wallet(walletPayload)
    userWallet.walletId = userWallet._id;
    newUser.walletId = userWallet.walletId
    walletPayload.accounts[0].accountName = body.fullName
    newUser.defaultAccount = walletPayload.accounts[0]
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
              const token = generateToken({id:checkUser.userId , email : checkUser.email , role : checkUser.role})
              return res.status(200).send({message : "Logged in successfully" , user : checkUser , token})
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