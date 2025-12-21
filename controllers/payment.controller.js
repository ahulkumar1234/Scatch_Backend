const razorpay = require("../configs/razorpay");

const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body; // amount in rupees
       
        if (!amount) {
            return res.status(400).json({
                success: false,
                message: "Amount is required",
            });
        }
       
        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), //paise
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