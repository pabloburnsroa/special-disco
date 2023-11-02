const express = require("express");

// Create instance of the router
const router = express.Router();

const {
  createWorkoutController,
  getWorkoutController,
  getWorkoutsController,
  deleteWorkoutController,
  updateWorkoutController,
} = require("../controllers/workout.controller");

//
const auth = require("../middlewares/auth");

router.use(auth);

/**
 * @openapi
 * /api/v1/workouts/:
 *  get:
 *    tags:
 *    - Workouts
 *    summary: Returns all workouts for an authenticated user
 *    responses:
 *      '200':
 *        description: A JSON array of workouts
 *  post:
 *    tags:
 *    - Workouts
 *    summary: Create a new workout
 *    requestBody:
 *      required: true

 *      responses:
 *       '200':
 *          description: Workout created
 */
router.get("/", getWorkoutsController);
router.post("/", createWorkoutController);

/**
 * @openapi
 * /api/v1/workouts/{id}:
 *  get:
 *    tags:
 *    - Workouts
 *    summary: Get a single workout by workoutId
 *  put:
 *    tags:
 *    - Workouts
 *    summary: Update a single workout
 *  delete:
 *    tags:
 *    - Workouts
 *    summary: Delete a single workout
 */

// @route   GET api/workouts/:id
// @desc    Get a workout
// @access  Public
router.get("/:id", getWorkoutController);

// @route   DELETE api/workouts/:id
// @desc    Delete a workout
// @access  Public
router.delete("/:id", deleteWorkoutController);

// @route   PATCH api/workouts/:id
// @desc    Update a workout
// @access  Public
router.put("/:id", updateWorkoutController);

module.exports = router;
