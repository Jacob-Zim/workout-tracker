'use strict';
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Exercise = require('../models/exercise');

// GET/READ ALL
router.get('/', (req, res, next) => {
  Exercise.find()
    .sort('name')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const { name, description } = req.body;
  const exerciseObj = { name, description };
  Exercise.create(exerciseObj)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const exerciseObj = { name, description };
  Exercise.findByIdAndUpdate(id, exerciseObj, {new:true})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;