const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    orderItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "product",
            },
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
    shippingAddress: {
        fullName: String,
        phone: String,
        address: String,
        city: String,
        pincode: String,
    },
    paymentMethod: {
        type: String,
        default: "COD",
    },

    itemsPrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,

    isPaid: {
        type: Boolean,
        default: false,
    },

    status: {
        type: String,
        default: "Processing",
    },
    paymentResult: {
        razorpay_order_id: String,
        razorpay_payment_id: String,
        razorpay_signature: String,
    },
    paidAt: Date,
}, { timestamps: true });


module.exports = mongoose.model("order", orderSchema);