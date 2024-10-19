const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  userConnections,
  userRequestsReceived,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, userRequestsReceived);

userRouter.get("/user/connections", userAuth, userConnections);

module.exports = userRouter;
