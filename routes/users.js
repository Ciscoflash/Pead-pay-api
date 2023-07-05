const router = require('express').Router();

// controllers
const {
  signup
} = require("../controllers/AuthController");

router.post("/signup", signup);

module.exports = router;
