const fs = require('fs');

const initializeRoute = async (app, router) => {
	try {
		const files = await fs.promises.readdir(__dirname);

		files
			.filter((file) => !file.startsWith('index'))
			.map((file) => file.replace('.js', ''))
			.map((file) => {
				const module = require(`./${file}`);
				const route = module(router);

				app.use(route.path, route.router);
			});
	} catch (e) {
		console.error(e);
	}
};

module.exports = initializeRoute;
