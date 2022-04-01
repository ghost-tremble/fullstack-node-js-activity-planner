const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { collection: "User-Data" }
);

const model = mongoose.model("User-Data", User);

module.exports = model;
