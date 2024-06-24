const { Router } = require("express");
const router = Router();
const { registerBns , userByBns, removeBns , bnsByAddress, checkIfExist } = require("../controllers/bns.controller");
const { Authentication } = require("../middleware/authentication");

router.get("/byBns/:bnsName", Authentication, userByBns);

router.get("/byAddress/:address", Authentication, bnsByAddress);

router.post('/checkBns' , Authentication , checkIfExist);

router.post("/createBNS", Authentication, registerBns);

router.delete('/deleteBNS/:bnsName' , Authentication , removeBns)

module.exports = router;
