const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

//router.use(authController.isLoggedIn);

router.get('/', authController.isLoggedIn, viewsController.getHome);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);

// Protect all routes
router.use(authController.protect);

router.get('/overview', authController.isLoggedIn, viewsController.getOverview);
router.get('/learning', authController.isLoggedIn, viewsController.getLearning);

router.get('/route/:slug', authController.isLoggedIn, viewsController.getRoute);

module.exports = router;
