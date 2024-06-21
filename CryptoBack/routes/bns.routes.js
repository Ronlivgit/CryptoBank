const { Router } = require("express");
const router = Router();
const { registerBns , userByBns, removeBns } = require("../controllers/bns.controller");
const { Authentication } = require("../middleware/authentication");

router.get("/:bnsName", Authentication, userByBns);

router.post("/newBNS", Authentication, registerBns);

router.delete('/deleteBNS/:bnsName' , Authentication , removeBns)

module.exports = router;
