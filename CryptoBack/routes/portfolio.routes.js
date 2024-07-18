const { Router } = require("express");
const { Investment } = require("../models/portfolio.model");
const { operateInvestment , userTokenAmount, investmentHistory , getAllInvestments, getTokenExpendedData} = require("../controllers/portfolio.controller");
const { Authentication } = require("../middleware/authentication");
const router = Router();

router.post('/operate',Authentication,operateInvestment)

router.get('/historyOf/:tokenSymbol' , Authentication , investmentHistory)

router.get('/holdingsOf/:tokenSymbol' , Authentication , userTokenAmount)

router.get('/allHoldings' , Authentication , getAllInvestments)

router.get('/tokenSummary/:tokenSymbol' , Authentication , getTokenExpendedData)

module.exports = router;
