const {formatDate} = require('../libs/helpers');

/**
 * @class Default
 */
class Default {
	/**
	 * Default
	 * @return {object}
	 */
	default() {
		return {
			timeConfig: '* * * * *',
			callback: async () => {
				console.info(`Current Time: ${formatDate(new Date())}, You will see this message every minute`);
			},
		};
	}
}

module.exports = Default;
