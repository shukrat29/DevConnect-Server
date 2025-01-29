const mongoose = require("mongoose");
require("dotenv").config();
console.log("MONGODB_URL:", process.env.MONGODB_URL);

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
};

module.exports = connectDB;
