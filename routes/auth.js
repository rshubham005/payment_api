const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

router.post('/login', async (req, res) => {
    const { phoneNumber } = req.body;

    let user = await User.findOne({ phoneNumber });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (!user) {
        user = new User({ phoneNumber, otp, otpExpires: Date.now() + 300000 }); // OTP valid for 5 minutes
    } else {
        user.otp = otp;
        user.otpExpires = Date.now() + 300000;
    }

    await user.save();

    // Send OTP via email (use SMS in production)


    res.json({ message: 'OTP sent',otp:otp });
});

router.post('/verify', async (req, res) => {
    const { phoneNumber, otp } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.token = token;

    await user.save();

    res.json({ token });
});

module.exports = router;
