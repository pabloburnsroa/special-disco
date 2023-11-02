const { Schema, mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Add Signup function to user model
userSchema.statics.signup = async function (email, password) {
  // Error checking using validator
  if (!email || !password) {
    throw Error("Please enter email and/or password");
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter valid email address");
  } 
  if (!validator.isStrongPassword(password)) {
    throw Error("Please enter strong password");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const saltRounds = process.env.SALTROUNDS;
  // Auto-generate a salt and hash
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // .create method used to create a new user
  const user = await this.create({ email, password: hashedPassword });
  return user;
};

// Login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Please enter email and/or password");
  }
  const user = await this.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }
  // If user exists, compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
