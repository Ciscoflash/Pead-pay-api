const router = require("express").Router();
const paymentController = require("../controllers/PaymentController");
const compression = require("compression");

router.post("/", paymentController.payment);
router.get("/", paymentController.getPayment);
router.get("/paystack", paymentController.paystackList);
module.exports = router;
