'use strict';
const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');
const Exercise = require('../models/exercise');
const Session = require('../models/session');

const seedExercises = require('../db/seed/exercises');
const seedSessions = require('../db/seed/sessions');

mongoose.connect(MONGODB_URI)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      Exercise.insertMany(seedExercises),
      Exercise.createIndexes(),
      Session.insertMany(seedSessions),
      Session.createIndexes()
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });