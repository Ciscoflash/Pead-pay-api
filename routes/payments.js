const router = require("express").Router();
const verifyJwt = require("../middlewares/verifyJwt")
const paymentController = require("../controllers/PaymentController");

router.post("/",verifyJwt(), paymentController.payment);
router.get("/",verifyJwt(), paymentController.getPayment);
router.get("/paystack", paymentController.paystackList);
module.exports = router;
