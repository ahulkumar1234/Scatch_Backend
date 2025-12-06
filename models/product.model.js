const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    stock: {
        type: String,
    }
},{timestamps: true});

module.exports = mongoose.model('product',productSchema);