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
  .get(authController.protect, routeController.getRoute)
  .patch(routeController.updateRoute)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'dev'),
    routeController.deleteRoute
  );

module.exports = router;
