const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return { status: "error", error: "Invalid login" };
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secret123"
        // {
        //   expiresIn: "24hr",
        // } // expires in 24 hours
      );

      return res.json({ status: "ok", user: token });
    } else {
      return res.json({
        status: "error",
        user: false,
        msg: "username or password incorrect",
      });
    }
  } catch (e) {
    return res.status(503).json({ status: "false", err: "connection loss" });
  }
};

module.exports = login;
