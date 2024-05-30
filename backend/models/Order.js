const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // orderDate: {
  //   type: Date,
  //   required: true
  // },
  
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
  // orderId: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  cart_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  }],
  total: {
    type: Number,
    // required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
