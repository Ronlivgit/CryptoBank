const { Investment } = require("../models/portfolio.model");
const { config } = require("../config/config");
const {Web3} = require("web3")
const { Wallet } = require("../models/wallet.model");
const { demoTxsAbi } = require("../smartContracts/ABIs");
const { executeOnChain, convertToWei, serializeObject, convertReceiptFromWei, serializeBigInt, convertFromWei } = require("../middleware/walletFunctions");
const BigNumber = require('bignumber.js')
const web3 = new Web3(new Web3.providers.HttpProvider(config.webProvider));

const myAccount = web3.eth.accounts.privateKeyToAccount(config.devPk)
const devAddress = config.devAddress
const txContract = new web3.eth.Contract(demoTxsAbi,config.demoTxContract)
const txCA = config.demoTxContract


const operateInvestment = async (req,res) => {
    const body = req.body
    //! Method Fields that are required in order to use exeucteOnChain, 
    //! placed here because used in multiple cases.
    const unitsInWei = convertToWei(body.tokenAmount,body.tokenPrice,body.tokenDceimals)
    const methodPayload = [
        `0x${req.user.activeAddress}`,
        body.tokenSymbol.toUpperCase(),
        body.tokenAddress,
        unitsInWei.amountInWei,
        unitsInWei.priceInWei,
        body.operationType
    ]

    try {
        const investmentInfo = await Investment.find({walletAddress : req.user.activeAddress , tokenSymbol : req.body.tokenSymbol})
        console.log("investmentInfo : " , investmentInfo)
        if(investmentInfo.length >= 1){
            if(investmentInfo[0].isValid){
                const operationReceipt = await executeOnChain(txContract,txCA,"recordOperation",methodPayload)
                operationReceipt.logs != null ? null : null
                return res.status(200).send({msg : `${body.operationType} of ${body.tokenAmount} ${body.tokenSymbol} for ${(body.tokenAmount * body.tokenPrice)} filled successfully`,operationReceipt})
            }
        }
        else{
            if(body.operationType ===  "buy"){
                const userInvestment = new Investment(body)
                userInvestment.investmentId = userInvestment._id
                userInvestment.walletAddress = req.user.activeAddress
                userInvestment.tokenDecimals = body.tokenDecimals
                await userInvestment.save()
                const operationReceipt = await executeOnChain(txContract,txCA,"recordOperation",methodPayload)
                operationReceipt.logs != null ? null : null
                return res.status(200).send({msg : `${body.operationType} of ${body.tokenAmount} ${body.tokenSymbol} for ${(body.tokenAmount * body.tokenPrice)} filled successfully`,operationReceipt})
            }
            else{
                return res.status(404).send({msg : `Error, cannot sell non-existent amount of ${body.tokenSymbol}!!!`})
            }
        }
    } catch (error) {
        console.error("operateInvestment error : " ,error)
        return res.status(400).send({Message : "Something went wrong, try again."})
    }
}

const investmentHistory = async(req,res) => {
    const {tokenSymbol} = req.params
    try {
        const investmentInfo = await Investment.find(
            {walletAddress : req.user.activeAddress , tokenSymbol}
        )
        console.log("investmentInfo : " , investmentInfo)
        if(investmentInfo.length > 0){
            const getHistoryReceipt = await txContract.methods.getOperations(req.user.activeAddress,tokenSymbol).call({from : devAddress})
            if(getHistoryReceipt.length === 0){
                console.log("getHistoryReceipt : " , getHistoryReceipt)
                return res.status(404).send({Message : "Investment doesn't exist"})
            }
            const cleanReceipt = getHistoryReceipt.map((item) => serializeObject(item))
            const convertedUnitsReceipt = convertReceiptFromWei(cleanReceipt)
            return res.status(200).send({convertedUnitsReceipt})
        }
        else{
            return res.status(404).send({Message : "Investment doesn't exist"})
        }
    } catch (error) {
        console.error(error);
    }
}


//! make sure to transfer InvestmentID as the investment card's key (!!!)
const userTokenAmount = async (req,res) => {
    const {tokenSymbol} = req.params
    try {
        const investmentInfo = await Investment.find(
            {walletAddress : req.user.activeAddress , tokenSymbol}
        )
        if(investmentInfo.length > 0){
            const getAmount = await txContract.methods.getTokenAmount(req.user.activeAddress,tokenSymbol).call({from : devAddress})
            const convertedAmount = convertFromWei(getAmount,0,investmentInfo[0].tokenDecimals)
            return res.status(200).send({tokenAmount : `${convertedAmount.adjustedAmount} ${tokenSymbol}`})
        }
        else{
            throw new Error("Can't fetch holdings of non exist investment.")
        }
    } catch (error) {
        console.error(error);
        return res.status(404).send({msg : "Can't fetch holdings of non exist investment."})
    }
}

const getAllInvestments = async(req,res) => {
    try {
        const userInvestments = await txContract.methods.getTokenHoldings(req.user.activeAddress).call({from : devAddress})
        if(userInvestments['1'].length === 0 ){
            return res.status(200).send({msg : "The user doesn't have any investemnts."})
        }
        else{
            for (const [key, value] of Object.entries(userInvestments['1'])) {
                userInvestments['1'][key] = web3.utils.fromWei(`${value}`,"ether")
            }
            return res.status(200).send({Message : "User holdings : " , receipt : {
                tokens : userInvestments['0'],
                amounts : userInvestments['1']
            }})
        }
    } catch (error) {
        console.error("error in getAllInvestments : " , error);
    }
}


const getTokenExpendedData = async(req,res) => {
    const {tokenSymbol} = req.params
    let finalPayload = {}
    try {
        const investmentInfo = await Investment.find({walletAddress : req.user.activeAddress , tokenSymbol})
        if(investmentInfo.length = 0){
            return res.status(200).send({msg : "Fetched successfully, investment doesn't exist"})
        }
        else{
            const tokenExpenses = await txContract.methods.getExpenses(req.user.activeAddress , tokenSymbol).call({from : devAddress})
            const tokenIncomes = await txContract.methods.getIncome(req.user.activeAddress , tokenSymbol).call({from : devAddress})
            const expensesEmpty = tokenExpenses && Object.keys(tokenExpenses).length > 0 ? false : true
            const incomeEmpty = tokenIncomes && Object.keys(tokenIncomes).length > 0 ? false : true
            if(!expensesEmpty || !incomeEmpty){
                const cleanExpenses = tokenExpenses.length > 0 ? tokenExpenses.map((item)=> {
                    const cleanWeiUnits = convertFromWei(item.tokenAmount,item.tokenPrice,investmentInfo.tokenDecimals)
                    item.tokenAmount = cleanWeiUnits.adjustedAmount
                    item.tokenPrice = cleanWeiUnits.price
                    return serializeObject(item)
                }) : null
                const cleanIncomes = tokenIncomes.length > 0 ? tokenIncomes.map((item)=>{
                    const cleanWeiUnits = convertFromWei(item.tokenAmount,item.tokenPrice,investmentInfo.tokenDecimals)
                    item.tokenAmount = cleanWeiUnits.adjustedAmount
                    item.tokenPrice = cleanWeiUnits.price
                    return serializeObject(item)
                }) : null
                finalPayload.expenses = cleanExpenses
                finalPayload.incomes = cleanIncomes
                return res.status(200).send({message : "Fetched successfully : " , finalPayload})
            }
            else{
                return res.status(404).send({Message : "There are no incomes or expenses of this token."})
            }
        }
    } catch (error) {
        console.error("error in getTokenExpendedData : " , error);
        return res.status(500).send({Message : "Internal error fetching data, try again"})
    }
}


module.exports = {
        operateInvestment ,
        userTokenAmount ,
        investmentHistory ,
        getAllInvestments ,
        getTokenExpendedData
    }