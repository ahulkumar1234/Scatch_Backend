const Razorpay = require("razorpay");
const envVariables = require("./envVariables");

let razorpay;

function getRazorpayInstance() {
  if (!razorpay) {
    if (!envVariables.razorpay.key_id) {
      throw new Error("Razorpay key missing");
    }

    razorpay = new Razorpay({
      key_id: envVariables.razorpay.key_id,
      key_secret: envVariables.razorpay.key_secret,
    });
  }
  return razorpay;
}

module.exports = getRazorpayInstance;
