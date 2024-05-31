const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNo: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  alternatePhoneNo: {
    type: Number,
  },
  address_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }],
  order_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  cart_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  }], otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
