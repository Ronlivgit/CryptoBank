const { Web3 } = require("web3");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");
const { Wallet } = require("../models/wallet.model");
const { verifyToken , generateToken } = require('../utils/jwt');
const { config } = require("../config/config");
const web3 = new Web3(new Web3.providers.HttpProvider(config.webProvider));
const { v4 : uuidv4 } = require('uuid');
const { balanceAbi } = require("../smartContracts/ABIs");
const { encryptField, serializeObject } = require("../middleware/walletFunctions");

const devAccount = web3.eth.accounts.privateKeyToAccount(config.devPk)
const devAddress = '0x5322f9A185d91480ED04eE09F10f0fE4aA6efC14'
const myContract = new web3.eth.Contract(balanceAbi,"0x541481976Dd87ECCd6B4914aCbaAd8298E7C13b2")
const myCA = "0x541481976Dd87ECCd6B4914aCbaAd8298E7C13b2"

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
    walletPayload.accounts.push({data : await web3.eth.accounts.encrypt(account.privateKey,config.encryptPass)})
    const userWallet = new Wallet(walletPayload)
    userWallet.walletId = userWallet._id;
    //! activeAccount will !! LATER !! allow user to chose which account to operate through the accountId generated above.
    newUser.activeAccount = userWallet.accounts[0].data.address
    await newUser.save()
    await userWallet.save()
    const encryptedWalletId = encryptField(userWallet.walletId,config.encryptPass)
    const estimateGas = await myContract.methods.createUser(newUser.activeAccount,encryptedWalletId).estimateGas({from : devAddress})
    const gasPrice = await web3.eth.getGasPrice()
    const data = myContract.methods.createUser(newUser.activeAccount,encryptedWalletId).encodeABI()
    const tx = {
      from : devAddress,
      to : myCA,
      gas : estimateGas,
      gasPrice : gasPrice,
      data : data
  }
  const signedTx = await devAccount.signTransaction(tx)
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
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
              const wallet = await Wallet.findOne({ownerUserId : checkUser.userId})
              const token = generateToken(
                {email : checkUser.email , role : checkUser.role ,
                walletId : wallet.walletId, activeAddress : checkUser.activeAddress })
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