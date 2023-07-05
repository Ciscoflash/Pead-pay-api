const express = require('express')
const app = express()
const treblle = require('@treblle/express')
const cors = require('cors')
const bodyParser = require('body-parser');
require("dotenv").config();
const run = require('./Config/mongoDBConfig')
const port = 5000

// Initialize Cores with allowed origins
app.use(cors(require("./Config/corsOptions")));

// Initializing the Treblle Sdk as a global instance
app.use(
  treblle({
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_PROJECT_ID,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to PEAD-PAY Payment Server");
});

app.use("/api/v1/payment", require("./Routes/Payment"));


app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
