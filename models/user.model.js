const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: [],
    },
    orders: {
        type: [],
    },
    contact: {
        type: Number,
    },
    picture: {
        type: String,
    }
}, { timestamps: true });




module.exports = mongoose.model('user', userSchema);