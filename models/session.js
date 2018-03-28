'use strict';

const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  sets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }]
});

sessionSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Session', sessionSchema);