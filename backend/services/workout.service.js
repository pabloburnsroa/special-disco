const mongoose = require("mongoose");
const Workout = require("../models/workout.model.js");

const getWorkoutsService = async (user_id) => {
  return await Workout.find({ user_id }).sort({ createdAt: -1 });
};



module.exports = {
  getWorkoutsService,
};
