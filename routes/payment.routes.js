const express = require("express");
const router = express.Router();
const { createRazorpayOrder, verifyRazorpayOrder } = require("../controllers/payment.controller");
const auth = require("../middlewares/auth.middleware");


router.post("/create", auth, createRazorpayOrder);

router.post("/verify", auth, verifyRazorpayOrder)


module.exports = router;