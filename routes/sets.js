'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Set = require('../models/set');
const Session = require('../models/session');

router.post('/:id/sets', (req, res, next) => {
  const { id } = req.params;
  const { reps, weight } = req.body;
  const setObj = { reps, weight, id};
	
  let setId;

  Set.create(setObj)
    .then(result => {
      setId = result.id;
      return setId;
    })
    .then(resultId => {
      Session.findByIdAndUpdate(id, {$push: {'sets': resultId}}, {new:true});
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;