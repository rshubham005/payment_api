const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const paymentsModel = require("../models/payments");
const transfersModel = require("../models/transfers");

// Cron job to transfer funds periodically
cron.schedule("* * * * *", async () => {
  try {
    // Implement your fund transfer logic here
    let totalAmount = 0;
    let paymentsData = await paymentsModel.find();
    paymentsData.forEach((item) => {
      totalAmount += item.amount;
    });

    let transfersData = await transfersModel.find();

    if (transfersData.length === 0) {
      let transferPreflight = new transfersModel({
        merchant: totalAmount * 0.7,
        user: totalAmount * 0.2,
        commission: totalAmount * 0.1,
      });
      let transferRes = await transferPreflight.save();
      console.log("Transfer created:", transferRes);
    } else {
      let updateRes = await paymentsModel.updateMany(
        {},
        {
          merchant: totalAmount * 0.7,
          user: totalAmount * 0.2,
          commission: totalAmount * 0.1,
        }
      );
      console.log("Payments updated:", updateRes);
    }

    console.log("Fund transfer process completed.");
  } catch (error) {
    console.error("Error in fund transfer process:", error);
  }
});

// Example route handler (if needed)
router.get("/", (req, res) => {
  res.send("Fund transfer service is running.");
});

module.exports = router;
