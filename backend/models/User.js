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
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
