const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  address_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    // required: true
  },
  // orderId: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
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
  // isAdded: {
  //   type: Boolean,
  //   required: true,
  //   default: true
  // },
  isOrdered: {
    type: Boolean,
    required: true,
    default: false
  },
  orderDate: {
    type: Date,
    // required: true
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
  }
}, {
  timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
