const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
require("dotenv").config();
const cors = require("cors");
const http = require("http");

const port = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Require routes
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const userRouter = require("./routes/userRouter");
const paymentRouter = require("./routes/paymentRouter");
const initializeSocket = require("./utils/socket");

// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", requestRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", paymentRouter);

// create server for socket.io
const server = http.createServer(app);
initializeSocket(server);

// DB connection and server start
connectDB()
  .then(() => {
    console.log("database connected successfully");
    server.listen(port, () => {
      console.log(`Server running successfully on ${port}`);
    });
  })
  .catch((err) => {
    console.error("database can not connect" + err.message);
  });
