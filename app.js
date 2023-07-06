const express = require("express");
const compression = require("compression");
const app = express();
const treblle = require('@treblle/express');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();
const logger = require('./utils/logger');
const mongoDB = require('./configs/mongoConfig')
const port = 5000
const userRoutes = require("./routes/users");
const paymentRoutes = require("./routes/payments");
const rateLimit = require("express-rate-limit");

// initialize DB
mongoDB();
// Compression middleware is used to compress the response bodies before sending them to the client.
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }

      return compression.filter(req, res);
    },
  })
);

app.use(cors());
app.options("*", cors());

// Initializing the Rate Limiter Feature

const limiter = rateLimit({
  windowMs: 60 * 50 * 1000, // 1 minute
  max: 100, // Maximum 100 requests per minute
  message: "Rate limit exceeded. Please try again later.",
  headers: true,
});
// Apply the rate limit feature
app.use(limiter);

// Initializing the Treblle Sdk as a global instance
app.use(
  treblle({
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_PROJECT_ID,
  })
);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to PEAD-PAY Payment Server");
});

app.use(`/api/v1/auth/`, userRoutes);

app.use(`/api/v1/payment/`, paymentRoutes);
/* Connecting to the database. */


/* Listening to the port 5000 and printing the api and the server is running on port 5000. */
app.listen(5000, () => {
  logger.info(`server is running ${port}`);
});
