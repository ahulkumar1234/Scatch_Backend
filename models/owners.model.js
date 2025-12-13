const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
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
    product: {
        type: Number,
    },
    picture: {
        type: String,
    }
}, { timestamps: true });




module.exports = mongoose.model('owner', ownerSchema);