const mongoose = require('mongoose');


const CartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //User ka document ID
        ref: "user",
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId, //Kaunsa product add kiya gaya 
                ref: "product",
            },
            quantity: { type: Number, default: 1 }
        }
    ]
})


module.exports = mongoose.model("cart", CartSchema);