const mongoose = require('mongoose');

const OTPschema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } } 
});

module.exports = mongoose.model('OTP', OTPschema);
