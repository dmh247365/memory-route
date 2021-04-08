const express = require('express');
const routeController = require('./../controllers/routeController');
const router = express.Router();

router.param('id', routeController.checkID);

router
  .route('/')
  .get(routeController.getAllRoutes)
  .post(routeController.checkBody, routeController.createRoute);


router
  .route('/:id')
  .get(routeController.getRoute)
  .patch(routeController.updateRoute)
  .delete(routeController.deleteRoute);

module.exports = router;