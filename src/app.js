const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

//Import routes
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");

// Apply route handlers
app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", requestRouter);

// DB connection and server start
connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(port, () => {
      console.log(`Server running successfully on ${port}`);
    });
  })
  .catch((err) => {
    console.error("database can not connect");
  });
