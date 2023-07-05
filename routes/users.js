const router = require('express').Router();

// controllers
const { signup, login } = require("../controllers/AuthController");

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
