const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { createOrder } = require('../controllers/order.controller')




router.post('/create', auth, createOrder);











module.exports = router;