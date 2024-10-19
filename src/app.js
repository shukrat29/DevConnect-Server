const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

//Require routes
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const userRouter = require("./routes/userRouter");

// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", requestRouter);
app.use("/api/v1", userRouter);

// DB connection and server start
connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(port, () => {
      console.log(`Server running successfully on ${port}`);
    });
  })
  .catch((err) => {
    console.error("database can not connect" + err.message);
  });
