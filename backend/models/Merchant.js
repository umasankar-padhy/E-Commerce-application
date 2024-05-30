const mongoose = require('mongoose');

// Merchant Schema
const merchantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    alternatePhoneNo: {
        type: Number,
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
    product_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    address_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    merchantId: {
        type: String,
        // required: true,
        // unique: true
    },
    productId: [{
        type: String,
        required: false
    }]
}, { timestamps: true });

module.exports = mongoose.model('Merchant', merchantSchema);
