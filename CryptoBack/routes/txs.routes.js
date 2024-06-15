const { Router } = require("express");
const router = Router();
const {
  addAccountToWallet,
  getAccountWallet,
} = require("../controllers/account.controller");
const { Authentication } = require("../middleware/authentication");
const { sendTx, getTxs } = require("../controllers/txs.controller");
const { signTxWithAccount } = require("../middleware/walletFunctions");
const { getEligibility } = require("../controllers/operator.controller");


router.get('/' , Authentication , getTxs)

router.post("/newTx", Authentication, sendTx);

// router.post('/newTx' , Authentication , signTxWithAccount)

module.exports = router;
