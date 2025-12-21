const express = require("express");
const router = express.Router();
const { createRazorpayOrder } = require("../controllers/payment.controller");
const auth = require("../middlewares/auth.middleware");


router.post("/create", auth, createRazorpayOrder);



module.exports = router;