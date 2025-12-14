const Order = require('../models/orders.model');
const Product = require('../models/product.model');


const createOrder = async (req, res) => {
    try {

        const { orderItems, shippingAddress, paymentMethod } = req.body;

        if (!orderItems || orderItems.lenght === 0) {
            return res.status(404).json({
                success: false,
                message: "No order items",
            });
        };


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}






module.exports = { createOrder }