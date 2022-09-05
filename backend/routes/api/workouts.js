const express = require('express');
const router = express.Router();
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require('../../controllers/workoutController');

const auth = require('../../middlewares/auth');

router.use(auth);

// @route   GET api/workouts
// @desc    Get all workouts
// @access  Public
router.get('/', getWorkouts);

// @route   POST api/workouts
// @desc    Post a new workout
// @access  Public
router.post('/', createWorkout);

// @route   GET api/workouts/:id
// @desc    Get a workout
// @access  Public
router.get('/:id', getWorkout);

// @route   DELETE api/workouts/:id
// @desc    Delete a workout
// @access  Public
router.delete('/:id', deleteWorkout);

// @route   PATCH api/workouts/:id
// @desc    Update a workout
// @access  Public
router.patch('/:id', updateWorkout);

module.exports = router;
