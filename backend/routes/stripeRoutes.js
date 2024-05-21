const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/Order");

const router = express.Router();

// Pay for order using Stripe
router.post("/pay", authMiddleware, async (req, res) => {
  const { amount, currency, source } = req.body;

  try {
    const order = await Order.findById(req.body.orderId);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // convert amount to cents
      currency,
      payment_method: source,
      confirmation_method: "manual",
      confirm: true,
    });

    order.paid = true;
    order.paymentIntentId = paymentIntent.id;
    await order.save();

    res.json({ msg: "Payment successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
