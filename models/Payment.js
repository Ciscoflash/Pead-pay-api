const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const paymentModel = mongoose.Schema(
  {
    _id: { type: String },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    bank: { type: String, required: true },
    description: { type: String, required: true },
    payment_status: {
      type: String,
      required: true,
      enum: ["success", "failed"],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("payments", paymentModel);

module.exports = Payment;
