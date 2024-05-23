const mongoose = require('mongoose');


// Cart Summary Schema
const cartSummarySchema = new mongoose.Schema({
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
    required: false
  },
  color: {
    type: String,
    required: false
  },
  isChecked: {
    type: Boolean,
    required: true,
    default: false
  },
  isOrdered: {
    type: Boolean,
    required: true,
    default: false
  }
}, { _id: false });

// Cart Schema
const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cartSummary: [cartSummarySchema],
  total: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
