const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Excercise = new Schema(
  {
    username: { type: String },
    name: { type: String },
    description: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    fitnessGoals: { type: String },
    achievements: { type: String },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Models = mongoose.model("Excersise", Excercise);
module.exports = Models;
