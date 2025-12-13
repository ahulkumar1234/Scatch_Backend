const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { addtoCart, getCartItems, deleteCart } = require('../controllers/cart.controller')




router.post("/add", auth, addtoCart);

router.get("/cartItems", auth, getCartItems);

router.delete("/delete/:productId", auth, deleteCart)


module.exports = router;