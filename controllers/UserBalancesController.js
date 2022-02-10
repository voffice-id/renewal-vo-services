const {httpResponse} = require('../libs/Responses');
const UserBalancesService = require('../services/UserBalancesService');

/**
 * @class UserBalancesController
 */
class UserBalancesController {
	/**
	 * Define UserBalancesService
	 *
	 * @hideconstructor
	 */
	constructor() {
		this.userBalancesService = new UserBalancesService();
	}

	/**
	 * @function getUserBalances
	 * @param {object} req
	 * @param {object} res
	 * @param {object} next
	 */
	async getUserBalances(req, res, next) {
		httpResponse(await this.userBalancesService.getBalance(req), res);
	}
}

module.exports = UserBalancesController;
