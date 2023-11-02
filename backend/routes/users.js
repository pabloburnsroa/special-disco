const express = require("express");
const router = express.Router();
const {
  loginUserHandler,
  signUpUserHandler,
} = require("../controllers/user.controller");

/**
 * @openapi
 * /api/v1/auth/signup/:
 *  post:
 *    tags:
 *    - User
 *    summary: Register a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterUserInput'
 *    responses:
 *      '200':
 *        description: A JSON array of workouts
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

router.post("/login", loginUserHandler);
// router.post("/login", (req,res) => {
//   res.send('Login route')
// });

router.post("/signup", signUpUserHandler);

module.exports = router;
