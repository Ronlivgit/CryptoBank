const { Router } = require("express");
const router = Router();
const {
  addAccountToWallet,
  getAccountWallet,
} = require("../controllers/account.controller");
const { Authentication } = require("../middleware/authentication");
const { getEligibility , transferEligibility, increaseEligibility , globalGetEligibility } = require("../controllers/operator.controller");


router.get('/' , Authentication , getEligibility)

router.post('/transfer' , Authentication , transferEligibility)

router.post('/increase', Authentication , increaseEligibility)

router.get('/?=walletAddress' , globalGetEligibility)


module.exports = router;