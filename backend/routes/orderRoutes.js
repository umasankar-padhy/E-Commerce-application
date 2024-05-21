const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const router = express.Router();

// Create a new order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );

    if (!cart) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    const orderProducts = cart.products.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const order = new Order({
      user: req.user.id,
      products: orderProducts,
      total: cart.products.reduce(
        (acc, curr) => acc + curr.product.price * curr.quantity,
        0
      ),
    });

    await order.save();

    // Clear the cart after placing the order
    cart.products = [];
    await cart.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get orders by user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "products.product"
    );
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
