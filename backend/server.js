require("dotenv").config();

const express = require("express");
const app = express();
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");
const connectToMongoDB = require("./utils/connect");
const log = require("./utils/logger");
const swaggerDocs = require("./utils/swagger");

app.use(express.json());

app.use((req, res, next) => {
  log.info(req.path, req.method);
  next();
});

// Request handlers
app.use("/api/v1/workouts", workoutRoutes);
app.use("/api/v1/auth", userRoutes);

const port = process.env.PORT || 4000;

const connectDB = async () => {
  try {
    await connectToMongoDB();
    app.listen(port, () => {
      log.info(`App is running at http://localhost:${port}`);
      swaggerDocs(app, port);
    });
  } catch (error) {
    log.info(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();
