const express = require("express");
const app = express.Router();
const treblle = require("@treblle/express");

app.route("/").post(async (req, res) => {
  if (!req.body) return res.json({ code: 404, message: "field Required" });
  res.json(req.body);
});

module.exports = app;
