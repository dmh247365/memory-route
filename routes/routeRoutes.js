const express = require('express');
const routeController = require('../controllers/routeController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', routeController.checkID);
// dave working to be deleted
router.route('/').get(routeController.getAllRoutes);

// router
//   .route('/')
//   .get(authController.protect, routeController.getAllRoutes)
//   .post(routeController.createRoute);

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
