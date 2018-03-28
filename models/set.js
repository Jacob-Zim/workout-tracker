'use strict';

const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  reps: Number,
  weight: Number,
  exercise: { type: mongoose.Schema.Types.ObjectId, ref:'Exercise' }
});

setSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Set', setSchema);