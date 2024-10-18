const connectionRequestModel = require("../models/connectionRequest");
const userModel = require("../models/user");

const sendConnectionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status type: " + status,
      });
    }

    const toUser = await userModel.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const existingConnectionRequest = await connectionRequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "Connection request already sent",
      });
    }

    const connectionRequest = new connectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    res.json({
      message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
      data,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = {
  sendConnectionRequest,
};
