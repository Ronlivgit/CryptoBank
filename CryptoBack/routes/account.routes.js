const { Router } = require("express");
const router = Router();
const { Account } = require("../models/account.model");
const { addAccountToWallet , getWalletsAccounts } = require("../controllers/account.controller");
const { Authentication } = require('../middleware/authentication')

router.post("/newAcc", Authentication ,addAccountToWallet);

router.get('/' , Authentication , getWalletsAccounts)

module.exports = router;
