const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  merchant: Number,
  user: Number,
  commission: Number,
});

module.exports =
  mongoose.models.transfers || mongoose.model("transfers", transferSchema);
