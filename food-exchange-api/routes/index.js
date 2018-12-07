const express = require('express');
const router = express.Router();
const foodController = require('../controllers');

router.get('/v1/search', foodController.searchByDate)

module.exports = router;