const express = require('express');
const UserBalancesController = require('../controllers/UserBalancesController');
const Auth = require('../middleware/Auth');
const router = new express.Router();

router.get('/get-quota/:userId', Auth, async (req, res, next) => {
	await new UserBalancesController().getUserBalances(req, res, next);
});

module.exports = router;
