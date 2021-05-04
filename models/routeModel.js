const { NetworkAuthenticationRequire } = require('http-errors');
const mongoose = require('mongoose');
const slugify = require('slugify');

const routeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A route must have a title'],
    unique: true,
    trim: true,
    maxlength: [25, 'A route name must be 25 characters or less'],
    minlength: [3, 'A route name must be 3 characters or more']
  },
  slug: String,
  number: {
    type: Number,
    required: [true, 'A route must have a number'],
    unique: true
  },
  learn: {
    type: String,
    required: [true, 'A route must have something to learn'],
    trim: true,
    maxlength: [500, 'Learn information must be 500 characters or less'],
    minlength: [5, 'Learn information must be 5 characters or more']
  },
  image: {
    type: String,
    required: [true, 'A route must have an image'],
    maxlength: [30, 'image string must be 30 charcters or less'],
    minlength: [8, 'image string must be 8 characters or more']
  },
  elements: [
    {
      prompt: String,
      order: Number
    }
  ],
  details: {
    type: String,
    required: [true, 'A route must have details'],
    maxlength: [500, 'image string must be 500 characters or less'],
    minlength: [8, 'image string must be 8 charcters or more']
  }
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
routeSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
