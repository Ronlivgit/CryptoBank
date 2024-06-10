const { Router } = require("express");
const router = Router();
const { Account } = require("../models/account.model");
const { addAccountToWallet , getAccountWallet } = require("../controllers/account.controller");
const { Authentication } = require('../middleware/authentication')



router.get('/' , Authentication , getAccountWallet)

router.post("/newAcc", Authentication ,addAccountToWallet);

module.exports = router;
