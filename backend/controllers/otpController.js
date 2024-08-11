const Otp = require('../models/otpModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const generateOtp = () => crypto.randomInt(100000, 999999).toString();

const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();

  const newOtp = new Otp({ email, otp });
  await newOtp.save();

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    res.status(200).send('OTP sent');
  });
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const validOtp = await Otp.findOne({ email, otp });

  if (validOtp) {
    return res.status(200).send('OTP verified');
  } else {
    return res.status(400).send('Invalid OTP');
  }
};

module.exports = { sendOtp, verifyOtp };
