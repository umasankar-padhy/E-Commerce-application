const express = require('express');
const router = express.Router();
const { requireSignIn } = require('../middleware/authMiddleware');
const { createOrder } = require('../controllers/orderController');
const { createNotification } = require('../controllers/notificationController');

router.post('/create', requireSignIn, createOrder, createNotification);
// router.get('/get-cart', requireSignIn, getCart);
// router.put('/update-cart-item', requireSignIn, updateCartItem);
// router.delete('/remove-from-cart', requireSignIn, removeFromCart);

module.exports = router;
