const mongoose = require("mongoose");
const paymentModel = mongoose.Schema({
  customer_id: { type: String, ref: "users", required: true },
  amount: { type: String },
});
