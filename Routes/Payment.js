const express = require("express");
const app = express.Router();
const treblle = require("@treblle/express");

app.route("/").post(async (req, res) => {
  res.json("Welcome the offiial post request for payment");
});

module.exports = app;
