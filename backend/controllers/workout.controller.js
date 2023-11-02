const mongoose = require("mongoose");
const Workout = require("../models/workout.model.js");

// Return 
const getWorkoutsController = async (req, res) => {
  const user_id = req.user._id;

  const workouts = await getWorkoutsService(user_id);
  res.status(200).json(workouts);
};

// @DESC  Get single workout
const getWorkoutController = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(400).json({ error: "Workout not found" });
  }
  res.status(200).json(workout);
};

// @DESC  Create a new workout
const createWorkoutController = async (req, res) => {
  const { title, reps, weight } = req.body;

  // Error checking
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!weight) {
    emptyFields.push("weight");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, weight, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkoutController = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }
  const workout = await Workout.findByIdAndDelete({ _id: id });
  if (!workout) {
    return res.status(400).json({ error: "Workout not found" });
  }
  res.status(200).json(workout);
};

const updateWorkoutController = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }
  const workout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    return res.status(400).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkoutController,
  getWorkoutsController,
  getWorkoutController,
  deleteWorkoutController,
  updateWorkoutController,
};
