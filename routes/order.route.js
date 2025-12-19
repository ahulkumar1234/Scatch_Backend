const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { createOrder, getOrder } = require('../controllers/order.controller')




router.post('/create', auth, createOrder);

router.get('/:orderId', auth, getOrder);









module.exports = router;