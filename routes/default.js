const VoController = require('../controllers/VoController');

const DefaultRoute = (router) => {
	router.get('/', async (req, res, next) => {
		await new VoController().getTest(req, res, next);
	});

	return {
		router: router,
		path: '/default',
	};
};

module.exports = DefaultRoute;
