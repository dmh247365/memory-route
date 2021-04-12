const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A route must have a name'],
    unique: true,
    trim: true,
    maxlength: [25, 'A routeName must be 25 characters or less'],
    minlength: [3, 'image string must be 3 charcters or more']
  },
  number: {
    type: Number,
    required: [true, 'A route must have a number'],
    unique: true
  },
  learn: {
    type: String,
    required: [true, 'A route must have something to learn'],
    trim: true,
    maxlength: [500, 'to learn must be 500 characters or less'],
    minlength: [5, 'image string must be 5 charcters or more']
  },
  imageCover: {
    type: String,
    required: [true, 'A route must have an image'],
    maxlength: [30, 'image string must be 30 charcters or less'],
    minlength: [8, 'image string must be 8 charcters or more']
  },
  elements: {
    type: Number,
    required: [true, 'A route must a number of elements to learn']
  }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
