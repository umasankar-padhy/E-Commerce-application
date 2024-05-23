const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
     merchant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Merchant"
    },
    houseNo: {
        type: String,
        required: true
    },
    streetName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);
