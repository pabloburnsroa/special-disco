const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect API routes w/ auth middleware function

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization required' });
  }
  const token = authorization.split(' ')[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
};

module.exports = auth;
