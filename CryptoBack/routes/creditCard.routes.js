const { Router } = require("express");
const router = Router();
const { Authentication } = require("../middleware/authentication");
const {
  getCardStatus,
  getUsageHistory,
  getSubscriptionHistory,
  useCreditCard,
  createCard,
  updateLimit,
} = require("../controllers/creditCard.controller");

router.get("/", Authentication, getCardStatus);

router.get("/history", Authentication, getUsageHistory);

router.get("/subscriptions", Authentication, getSubscriptionHistory);

router.post("/useCard", Authentication, useCreditCard);

router.post("/updateLimit", Authentication, updateLimit);

router.post("/createCard", Authentication, createCard);

module.exports = router;
