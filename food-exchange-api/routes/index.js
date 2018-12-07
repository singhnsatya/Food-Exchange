const express = require('express');
const router = express.Router();
const foodController = require('../controllers');

router.get('/v1/search', foodController.searchByDate)
router.get('/ping', (req, res) => {
	res.send('pong')
})

module.exports = router;