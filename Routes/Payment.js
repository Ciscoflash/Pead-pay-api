const express = require("express");
const app = express.Router();
const treblle = require("@treblle/express");

app.route("/api/v1/").post(async (req, res) => {
  res.json("Welcome the official post request for payment");
});

module.exports = app;
