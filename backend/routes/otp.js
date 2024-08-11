const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const OTP = require('../models/otp');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }   
}, {
    from: process.env.EMAIL,
});

// Verify email configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error with email configuration:', error);
    } else {
        console.log('Server is ready to take our messages:', success);
    }
});

// Generate a 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Route to send OTP
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();

    const mailOptions = {
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    try {
        // Send the OTP email
        await transporter.sendMail(mailOptions);

        // Save the OTP in the database
        const newOTP = new OTP({ email, otp });
        await newOTP.save();

        res.status(200).json({ message: 'OTP sent' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
});

// Route to verify OTP
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Check if the OTP is valid
        const otpRecord = await OTP.findOne({ email, otp });

        if (otpRecord) {
            res.status(200).json({ message: 'OTP verified' });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Error verifying OTP' });
    }
});

module.exports = router;
