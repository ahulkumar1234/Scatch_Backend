const envVariables = require('../configs/envVariables');


const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body; // amount in rupees

        const order = await razorpay.orders.create({
            amount: amount * 100, //paise
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        });

        res.status(200).json({
            success: true,
            order,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    };
};




module.exports = { createRazorpayOrder }