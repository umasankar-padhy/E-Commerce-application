const mongoose = require('mongoose');

// Merchant Schema
const merchantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    altPhoneNo: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    merchantId: {
        type: String,
        required: true,
        unique: true
    },
    productId: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Merchant', merchantSchema);
