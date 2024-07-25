const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const payments = require("../models/payments");

dotenv.config();

router.post("/payment", async (req, res) => {
  const { amount } = req.body;
  const headers = req.headers;
  console.log(headers.authorization.substring(7));

  try {
    const decoded = jwt.verify(
      headers.authorization.substring(7),
      process.env.JWT_SECRET
    );
    console.log(decoded);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const merchantShare = amount * 0.7; // 70%
    const userShare = amount * 0.2; // 20%
    const commission = amount * 0.1; // 10%

    // Save payment data to the database
    // Implement your logic here
    let payment = new payments({ userId: user, amount: amount });
    let result = await payment.save();
    res.json({
      message: "Payment successful",
      merchantShare,
      userShare,
      commission,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
