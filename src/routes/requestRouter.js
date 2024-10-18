const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { sendConnectionRequest } = require("../controllers/requestController");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  sendConnectionRequest
);

module.exports = requestRouter;
