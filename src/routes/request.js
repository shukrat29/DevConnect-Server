const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  // sending connection request

  res.send(user.firstName + " " + "sent connection request");
});

module.exports = requestRouter;
