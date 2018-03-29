'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Set = require('../models/set');
const Session = require('../models/session');

router.post('/:id/sets', (req, res, next) => {
  const { id } = req.params;
  const { reps, weight, exerciseId } = req.body;
  const setObj = { reps, weight, exerciseId};
	
  let setId;

  Set.create(setObj)
    .then(result => {
      setId = result.id;
      return setId;
    })
    .then(resultId => {
      Session.findByIdAndUpdate(id, {$push: {'sets': resultId}}, {new:true})
        .then(result => {
          res.json(result);
        })
        .catch(err => {
        });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id/sets', (req, res, next) => {
  const { id } = req.params;

  Session.findById(id).populate('sets')
    .then(result => {
      res.json(result.sets);
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id/sets/:setId', (req, res, next) => {
  const { setId } = req.params;
  Set.findById(setId)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:id/sets/:setId', (req, res, next) => {
  const { setId } = req.params;
  const updateSetObj = req.body;
  Set.findByIdAndUpdate(setId,  updateSetObj, {new:true})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id/sets/:setId', (req, res, next) => {
  const { id, setId } = req.params;
  Set.findByIdAndRemove(setId)
    .then(result => {
      Session.findByIdAndUpdate(id, {$pull: {'sets': result.id}}, {new:true})
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;