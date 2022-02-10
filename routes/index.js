const express = require('express');
const VoController = require('../controllers/VoController');
const router = new express.Router();

router.get('/tes', async (req, res, next) => {
	await new VoController().getTest(req, res, next);
});

module.exports = router;
