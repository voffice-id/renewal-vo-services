const GenericResponseEntity = require('../libs/GenericResponseEntity');

/**
 * @class VoService
 */
class VoService {
	/**
	 * Define UserBalancesService
	 *
	 * @hideconstructor
	 */
	constructor() {}

	/**
	 * Get User Balance
	 * @param {object} payload optional
	 * @return {object}
	 */
	async getTestService(payload) {
		const response = new GenericResponseEntity();

		response.message = 'Success';
		response.success = true;

		return response;
	}
}

module.exports = VoService;
