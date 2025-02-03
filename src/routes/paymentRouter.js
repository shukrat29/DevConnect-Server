const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { createPayment } = require("../controllers/paymentController");

const paymentRouter = express.Router();

paymentRouter.post("/payment/create", userAuth, createPayment);

module.exports = paymentRouter;
