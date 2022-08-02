require('dotenv').config();

const express = require('express');
const app = express();
const workouts = require('./routes/api/workouts');

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());

// Request handlers
app.use('/api/workouts', workouts);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Listening on PORT 4000');
});
