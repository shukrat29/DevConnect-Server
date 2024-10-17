const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // read the token from the req cookies
    const cookies = req.cookies;
    const { token } = cookies;
    // const {token} = req.cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }
    // validate the token
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;

    // find the user
    const user = await userModel.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
};

module.exports = { userAuth };
