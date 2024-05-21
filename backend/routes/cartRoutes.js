const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// Get user cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add product to cart
router.post("/add", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, products: [] });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Remove product from cart
router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === req.params.productId
    );

    if (productIndex < 0) {
      return res.status(404).json({ msg: "Product not found in cart" });
    }

    cart.products.splice(productIndex, 1);
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
