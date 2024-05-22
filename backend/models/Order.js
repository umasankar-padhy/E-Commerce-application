const mongoose = require('mongoose');

// Order Summary Schema
const orderSummarySchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  }
}, { _id: false });

// Order Schema
const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    required: true
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  isCancelled: {
    type: Boolean,
    required: true,
    default: false
  },
  isReturned: {
    type: Boolean,
    required: true,
    default: false
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  orderSummary: [orderSummarySchema],
  total: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
