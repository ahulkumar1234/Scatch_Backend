const ordersModel = require('../models/orders.model');
const ProductModel = require('../models/product.model');
const Cartmodel = require('../models/cart.model');

const createOrder = async (req, res) => {
    try {

        const { orderItems, shippingAddress, paymentMethod } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No order items",
            });
        };

        // 🔒 Recalculate price on backend
        let itemsPrice = 0;

        for (const item of orderItems) {
            const product = await ProductModel.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            };

            if (item.quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid quantity"
                });
            }


            itemsPrice += product.price * item.quantity;

            // snapshot price
            item.price = product.price;
            item.name = product.name;

        };

        const taxPrice = itemsPrice * 0.18;
        const shippingPrice = itemsPrice > 500 ? 0 : 50;
        const totalPrice = itemsPrice + taxPrice + shippingPrice;

        //order creation
        const createdOrder = await ordersModel.create({
            userId: req.user.id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        //Cart clear after Order succesfully!
        await Cartmodel.deleteMany({ userId: req.userId });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            orderData: createdOrder,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    };
};



module.exports = { createOrder }