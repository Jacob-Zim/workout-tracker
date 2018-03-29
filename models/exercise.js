'use strict';
const mongoose = require('mongoose');
const exerciseSchema = new mongoose.Schema({
  name: { type: String, unique: true},
  description: { type: String }
});

exerciseSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Exercise', exerciseSchema);