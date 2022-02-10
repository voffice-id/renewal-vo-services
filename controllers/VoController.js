const {httpResponse} = require('../libs/Responses');
const VoService = require('../services/VoService');

/**
 * @class VoController
 */
class VoController {
	/**
	 * Define UserBalancesService
	 *
	 * @hideconstructor
	 */
	constructor() {
		this.voService = new VoService();
	}

	/**
	 * @function getUserBalances
	 * @param {object} req
	 * @param {object} res
	 * @param {object} next
	 */
	async getTest(req, res, next) {
		httpResponse(await this.voService.getTestService(req), res);
	}
}

module.exports = VoController;
