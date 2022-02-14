const fs = require('fs');
const cron = require('node-cron');

/**
 * Initialize Scheduler
 */
async function initializeScheduler() {
	const files = await fs.promises.readdir(__dirname);

	files
		.filter((file) => !file.startsWith('index'))
		.map((file) => file.replace('.js', ''))
		.map((file) => {
			const Class = require(`./${file}`);
			const instance = new Class();
			const methods = Object.getOwnPropertyNames(Class.prototype).filter((method) => method !== 'constructor');

			methods.map((method) => {
				const config = instance[method]();

				cron.schedule(config.timeConfig, config.callback, {
					scheduled: true,
					timezone: 'Asia/Jakarta',
				});
			});
		});
}

module.exports = initializeScheduler;
