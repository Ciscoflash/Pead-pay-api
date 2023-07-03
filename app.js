require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const Treblle = require("@treblle/express");
const cors = require("cors");

// Initialize Cores with allowed origins
app.use(cors(require("./Config/corsOptions")));

// Initializing the Treblle Sdk as a global instance
app.use(
  Treblle({
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_PROJECT_ID,
  })
);

app.use(express.urlencoded(true));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to PEAD-PAY Payment Server");
});

app.use("/api/v1/payment", require("./Routes/Payment"));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
