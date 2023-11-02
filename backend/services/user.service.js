const { omit } = require("lodash");

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// jwt helper function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

async function signUpUser(email, password) {
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    return { user: omit(user.toJSON(), "password"), token };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
    signUpUser
}