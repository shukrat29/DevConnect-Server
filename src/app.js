const express = require("express");
const connectDB = require("./config/database");
const userModel = require("./models/user");

const port = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    res.send("User added successfully in database");
  } catch (error) {
    res.status(400).send("Error saving the user:" + error.message);
  }
});

// Get a user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await userModel.findOne({ emailId: userEmail });
    if (user.length == 0) {
      res.send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Feed API // getting all users
app.get("/feed", async (req, res) => {
  try {
    const users = await userModel.find({});
    if (!users) {
      res.send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// delete a user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await userModel.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await userModel.findByIdAndUpdate({ _id: userId }, data);
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(port, () => {
      console.log(`Server running successfully on Port ${port}`);
    });
  })
  .catch((err) => {
    console.error("database can not connect");
  });
