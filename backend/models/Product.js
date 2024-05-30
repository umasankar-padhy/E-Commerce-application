const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl:[ {
    type: String,
    required: true
  }],
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
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  merchant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
    required: true
  },
  comment_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    // required: true
  }],
  MFG_Date: {
    type: Date,
    required: true
  },
  EXP_Date: {
    type: Date,
    required: true
  },
  productId: {
    type: String,
    // required: true,
    // unique: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
    min: 0,
    max: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
