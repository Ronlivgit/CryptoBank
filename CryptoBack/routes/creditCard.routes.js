const { Router } = require("express");
const router = Router();
const { Authentication } = require("../middleware/authentication");
const { getCardStatus , getCardHistory , useCreditCard , createCard , updateLimit } = require("../controllers/creditCard.controller");


router.get('/' , Authentication , getCardStatus)

router.get('/history' , Authentication , getCardHistory)

router.post('/useCard' , Authentication , useCreditCard)

router.post('/updateLimit', Authentication , updateLimit)

router.post('/createCard', Authentication , createCard)


module.exports = router;