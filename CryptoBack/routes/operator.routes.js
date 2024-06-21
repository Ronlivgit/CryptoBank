const { Router } = require("express");
const router = Router();
const {
  addAccountToWallet,
  getAccountWallet,
} = require("../controllers/bns.controller");
const { Authentication } = require("../middleware/authentication");
const {
  getCurrentBalance,
  transferBalance,
  changeBalance,
  globalCurrentBalance,
  balanceHistory,
} = require("../controllers/operator.controller");

router.get("/", Authentication, getCurrentBalance);

router.get("/balanceOf/:walletAddress", globalCurrentBalance);

router.get('/history' , Authentication , balanceHistory)

router.post("/transfer", Authentication, transferBalance);

router.post("/increase", Authentication, changeBalance);


module.exports = router;
