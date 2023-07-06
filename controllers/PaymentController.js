const paymentModel = require("../models/Payment");
const joi = require("joi");
const https = require("https");
const { v4: uuidv4 } = require("uuid");

exports.payment = async (req, res) => {
  const { email, amount, currency, bank, description, payment_status } =
    req.body;

  // validate input
  const Schema = joi.object({
    email: joi.string().required(),
    amount: joi.number().required(),
    currency: joi.string().required(),
    bank: joi.string().required(),
    description: joi.string().required(),
    payment_status: joi.string().required(),
  });

  const { error } = Schema.validate(req.body);
  if (error) {
    const errorMessage = `Bad Request ${error.details[0].message}`;
    return res.json({ error: errorMessage, code: 400 });
  }

  const params = JSON.stringify({
    email: req.body.email,
    amount: req.body.amount * 100,
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
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        // res.json(data);
        res.json({
          code: 200,
          msg: "payment created successfully",
          data: new_payment,
          paystack: data,
        });
        // console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  // generate uuid for user
  const userId = uuidv4();

  const new_payment = new paymentModel({
    _id: userId,
    email,
    amount,
    currency,
    bank,
    description,
    payment_status,
  });
  await new_payment.save();

  reqpaystack.write(params);
  reqpaystack.end();
};

exports.getPayment = async (req, res) => {
  const payment = await paymentModel.find().exec();
  res.send(payment);
};

exports.paystackList = async (req, res) => {
  const https = require("https");

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction",
    method: "GET",
    headers: {
      Authorization: "Bearer pk_test_e215b12f3e69ab69e6391a8c40ae3bc7ca194f9d",
    },
  };

  https
    .request(options, (respaystack) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });
};
