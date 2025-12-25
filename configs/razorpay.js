const Razorpay = require("razorpay");
const envVariables = require("./envVariables");

const razorpay = new Razorpay({
  key_id: envVariables.razorpay.key_id,
  key_secret: envVariables.razorpay.key_secret,
});

module.exports = razorpay;
