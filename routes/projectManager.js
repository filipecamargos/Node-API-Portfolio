const express = require('express');
const projectManagerApp = require('../controllers/projectManagerApp');
const router = express.Router();

//Serve the project Manager App
router.get('/projectManagerApp', projectManagerApp.getProjectManagerApp);

module.exports = router;