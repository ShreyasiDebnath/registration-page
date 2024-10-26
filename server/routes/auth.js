const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Resend } = require('resend');
const User = require('../models/UserSchema');

const router = express.Router();

console.log("Resend API Key:", process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// Sign Up
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(10000000 + Math.random() * 90000000);

    user = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiresAt: Date.now() + 3600000, // 1 hour
    });

    await user.save();

    // Send OTP using Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Customize with your verified domain on Resend
      to: email,
      subject: 'Verify your account',
      text: `Your OTP is ${otp}`,
    });

    res.send('OTP sent to your email!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.isVerified) return res.status(400).send('Invalid request.');

    if (user.otp !== parseInt(otp) || user.otpExpiresAt < Date.now()) {
      return res.status(400).send('Invalid or expired OTP.');
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.send('Account verified!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found.');
    if (user.isVerified) return res.status(400).send('Account is already verified.');

    const otp = Math.floor(10000000 + Math.random() * 90000000);
    user.otp = otp;
    user.otpExpiresAt = Date.now() + 3600000; // Reset OTP expiration
    await user.save();

    // Resend OTP email
    await resend.emails.send({
      from: 'no-reply@yourdomain.com',
      to: email,
      subject: 'Resend OTP for Account Verification',
      text: `Your new OTP is ${otp}`,
    });

    res.send('OTP resent to your email!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) return res.status(400).send('Invalid credentials or account not verified.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials.');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token)
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
