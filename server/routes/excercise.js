const router = require("express").Router();
let Exercise = require("../models/excercise");
let User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route("/").get((req, res) => {
  const token = req.headers["x-access-token"];

  const decoded = jwt.verify(token, "secret123");
  const email = decoded.email;
  Exercise.find({
    username: email,
  })
    .then((exercises) => {
      res.json(exercises);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create").post(async (req, res) => {
  const token = req.headers["x-access-token"];

  const decoded = jwt.verify(token, "secret123");
  const email = decoded.email;

  const username = email;
  const name = req.body.name;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const startDate = Date.parse(req.body.startDate);
  const endDate = Date.parse(req.body.endDate);
  const fitnessGoals = req.body.fitnessGoals;
  const newExercise = new Exercise({
    username,
    name,
    description,
    duration,
    startDate,
    endDate,
    fitnessGoals,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  exercise = Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json({ status: "ok", exercise: exercise }))
    .catch((err) => res.status(400).json({ error: err }));
});
router.route("/update/:id").put(async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body);
    const { id: id } = req.params;
    const excercise = await Exercise.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      upsert: true,
    });
    if (!excercise) {
      return res.status(404).json({ msg: `no Goal with id : ${id}` });
    }
    res.status(200).json({ excercise });
  } catch (err) {
    res.json({ msg: "eodif" });
    console.log(err);
  }
});

module.exports = router;
