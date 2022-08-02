const express = require('express');
const router = express.Router();

// @route   GET api/workouts
// @desc    Get all workouts
// @access  Public
router.get('/', (req, res) => {
  res.json({ msg: 'Get all workouts' });
});
// @route   POST api/workouts
// @desc    Post a new workout
// @access  Public
router.post('/', (req, res) => {
  res.json({ msg: 'Post a new workout' });
});
// @route   GET api/workouts/:id
// @desc    Get a workout
// @access  Public
router.get('/:id', (req, res) => {
  res.json({ msg: 'Get a workout' });
});
// @route   DELETE api/workouts/:id
// @desc    Delete a workout
// @access  Public
router.delete('/:id', (req, res) => {
  res.json({ msg: 'Delete a workout' });
});
// @route   PATCH api/workouts/:id
// @desc    Update a workout
// @access  Public
router.patch('/:id', (req, res) => {
  res.json({ msg: 'Update a workout' });
});

module.exports = router;
