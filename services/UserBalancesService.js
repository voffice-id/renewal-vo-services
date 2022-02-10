const GenericResponseEntity = require('../libs/GenericResponseEntity');
const {getQuotaByUserId} = require('../models/UserBalances');

/**
 * @class UserBalancesService
 */
class UserBalancesService {
	/**
	 * Get User Balance
	 * @param {object} payload optional
	 * @return {object}
	 */
	async getBalance(payload) {
		const response = new GenericResponseEntity();
		const userId = payload.params.userId;
		const data = await getQuotaByUserId(userId);

		response.data = data;

		return response;
	}
}

module.exports = UserBalancesService;
