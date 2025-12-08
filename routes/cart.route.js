const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { addtoCart, getCartItems } = require('../controllers/cart.controller')




router.post("/add", auth, addtoCart);

router.get("/cartItems", auth, getCartItems);



module.exports = router;