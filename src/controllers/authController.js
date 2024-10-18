const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const { validateSignUpData } = require("../utils/validation");

const signup = async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully in database");
  } catch (error) {
    res.status(400).send("Error saving the user: " + error.message);
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await userModel.findOne({ emailId });
    if (!user) {
      throw new Error("Email is not registered");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours
      });
      res.send("Login successful");
    } else {
      throw new Error("Password is not correct");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

const logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successful");
};

module.exports = {
  signup,
  login,
  logout,
};
