const express = require("express");
const SignUp = require("../controllers/SignUpcontroller");

const router = express.Router();
router.route("/signUp").post(SignUp);

module.exports = router;
