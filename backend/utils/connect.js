const mongoose = require('mongoose');
const log = require('./logger');

const connectToMongoDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  log.info(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectToMongoDB;
