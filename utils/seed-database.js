'use strict';
const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');
const Exercise = require('../models/exercise');

const seedExercises = require('../db/seed/exercises');

mongoose.connect(MONGODB_URI)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      Exercise.insertMany(seedExercises),
      Exercise.createIndexes(),
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });