const connectionRequestModel = require("../models/connectionRequest");

const USER_SAFE_DATA = " firstName lastName photoUrl age gender about skills";
const userRequestsReceived = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Connection requests:",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
};

const userConnections = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await connectionRequestModel
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() == loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { userRequestsReceived, userConnections };
