const dotEnv = require('dotenv');
dotEnv.config();
const Razorpay = require("razorpay");

// 🔥 Razorpay INSTANCE
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const envVariables = {
    PORT: process.env.PORT,
    mongodbURI: process.env.MONGODB_URI,
    accessToken: process.env.ACCESS_TOKEN,

    cloudinary: {
        cloudName: process.env.CLOUD_NAME,
        apiKey: process.env.CLOUD_KEY,
        apiSecret: process.env.CLOUD_SECRET,
    },


    // ✅ INSTANCE export
    razorpay: razorpayInstance,

};



Object.freeze(envVariables);


module.exports = envVariables;