const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A route must have a name'],
    unique: true
  },
  number: {
    type: Number,
    required: [true, 'A route must have a number'],
    unique: true
  },
  learn: {
    type: String,
    required: [true, 'A route must have something to learn']
  }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
