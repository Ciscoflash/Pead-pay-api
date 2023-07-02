const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Welcome to PEAD-PAY Payment Server");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
