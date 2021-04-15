const express = require('express');
const routeController = require('../controllers/routeController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', routeController.checkID);

router
  .route('/')
  .get(authController.protect, routeController.getAllRoutes)
  .post(routeController.createRoute);

router
  .route('/:id')
  .get(routeController.getRoute)
  .patch(routeController.updateRoute)
  .delete(routeController.deleteRoute);

module.exports = router;
