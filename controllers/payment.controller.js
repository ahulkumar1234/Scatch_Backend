const razorpay = require("../configs/razorpay");

const createRazorpayOrder = async (req, res) => {
    try {
        let { amount } = req.body;

        amount = Math.round(Number(amount));

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount",
            });
        }

        const order = await razorpay.orders.create({
            amount: amount * 100, // paise
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        });

        res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        console.error("Razorpay Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



module.exports = { createRazorpayOrder }