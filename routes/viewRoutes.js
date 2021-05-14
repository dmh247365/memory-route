const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

// router.get('/', viewsController.getOverview);
router.get('/', viewsController.getHome);

router.get('/route/:slug', viewsController.getRoute);
router.get('/login', viewsController.getLoginForm);

module.exports = router;
