'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Session = require('../models/session');

router.get('/', (req, res, next) => {
	console.log('SESSION LOG');
  Session.find()
    .sort('date')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/', (req, res, next) => {
  const { sets } = req.body;
  const sessionObj = {sets};
  Session.create(sessionObj)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;