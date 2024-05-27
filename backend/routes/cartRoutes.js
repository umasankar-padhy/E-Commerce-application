const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const { requireSignIn } = require('../middleware/authMiddleware');

router.post('/add-to-cart', requireSignIn, addToCart);
router.get('/get-cart', requireSignIn, getCart);
router.put('/update-cart-item', requireSignIn, updateCartItem);
router.delete('/remove-from-cart', requireSignIn, removeFromCart);

module.exports = router;
