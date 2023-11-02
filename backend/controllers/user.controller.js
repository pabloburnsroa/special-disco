const { signUpUser } = require("../services/user.service");

// Sign Up User
const signUpUserHandler = async (req, res) => {
  const { email, password } = req.body;
  // res.status(200).json({ email, password });
  try {
    // create user
    const { user, token } = await signUpUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
const loginUserHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signUpUserHandler,
  loginUserHandler,
};
