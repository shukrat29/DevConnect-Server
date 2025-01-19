const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  userConnections,
  userRequestsReceived,
  userFeed,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, userRequestsReceived);

userRouter.get("/user/connections", userAuth, userConnections);

userRouter.get("/user/feed", userAuth, userFeed);
module.exports = userRouter;
