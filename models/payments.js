const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  amount: Number,
});

module.exports =
  mongoose.models.payments || mongoose.model("payments", paymentSchema);
