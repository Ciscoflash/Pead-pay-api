require("dotenv").config();
const express = require("express");
const app = express.Router();
const treblle = require("@treblle/express");
const https = require("https");
const paymentModel = require("../Model/Payment");

app.route("/").post(async (req, res) => {
  let data;
  const params = JSON.stringify({
    email: req.body.email,
    amount: req.body.amount,
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack) => {
      data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        // res.send(data);
        res.json({
          code: 200,
          msg: "payment saved successfully proceed with the link",
          data: new_payment,
          paystack: data,
        });
      });
      // console.log(JSON.parse(data));
    })
    .on("error", (error) => {
      console.error(error);
    });

  // if the paystack status is true then save the user information
  const payment = new paymentModel({
    _id: req.body._id,
    customer_id: req.body.customer_id,
    email: req.body.email,
    amount: req.body.amount,
    currency: req.body.currency,
    bank: req.body.bank,
    description: req.body.description,
    payment_status: req.body.payment_status,
  });

  if (!payment)
    return response.json({ code: 402, message: "payment required" });

  const new_payment = await payment.save();

  reqpaystack.write(params);
  reqpaystack.end();
});

module.exports = app;
