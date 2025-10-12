import express from 'express'
const router = express.Router()

const {
  createOrder,
  capturePaymentAndFinalizeOrder,
} = require("../../controllers/student-controller/order-controller");

router.post("/create", createOrder);
router.post("/capture", capturePaymentAndFinalizeOrder);

export default router;
