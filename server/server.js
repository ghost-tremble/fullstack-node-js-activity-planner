//Dependency
const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/user.model");
const Excercise = require("./models/excercise");
const login = require("./routes/login");
const signUp = require("./routes/signUp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const exercisesRouter = require("./routes/excercise");
const connectDB = require("./db/connect");
require("dotenv").config();
// access port
const port = 5000; // please change port if port 5000 is unavialaible

const start = async () => {
  try {
    // connect to database
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is running on port ${port}`));
  } catch (err) {
    app.all("*", (req, res) => {
      res
        .status(503)
        .send(" request timeout service unavailable please check server");
    });
    console.log(err);
  }
};

start();
app.use(express.json());
app.use(cors()); // cross origin access
app.use("/api/", login);
app.use("/api/", signUp);
app.use("/exercises/", exercisesRouter);
app.get("/logout", (req, res) => {
  const token = jwt.sign(
    {
      name: "",
      email: "",
    },
    "secret123",
    {
      expiresIn: "1s",
    } // expires in 1second
  ); // logout controller

  res.status(200).json({ user: token });
});

// error 404
app.all("*", (req, res) => {
  res.status(404).send("Error 404 has occured page does not exist");
});
//crud operrations on activity planner
