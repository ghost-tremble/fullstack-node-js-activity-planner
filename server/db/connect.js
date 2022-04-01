const mongoose = require("mongoose");

// mongo db connection
// connection string will be in .env file will be shared
const connectDb = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("  Connected to the db..."))
    .catch((err) => {
      console.log(err);
    });
}; // connct database
module.exports = connectDb;
