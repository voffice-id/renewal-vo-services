const GenericResponseEntity = require('../libs/GenericResponseEntity');
const axios = require('axios');
const appConfig = require('../config/app');

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

	/**
	 * Sending Reminder Message for renewal
	 * @param {object} client client plan data
	 * @return {object}
	 */
	async sendMessage(client) {
		try {
			const payload = {
				phone: client.company.phone,
				message: appConfig.waBlast.templateText(client),
			};
			const config = {
				headers: {
					Authorization: appConfig.waBlast.token,
					'Content-Type': 'application/json',
				},
			};
			const {data} = await axios.post(`${appConfig.waBlast.url}/send-message`, JSON.stringify(payload), config);
			console.info('response wa blast',data);

			return data;
		} catch (e) {
			console.error(`Error sending message: ${e.message}`);
		}
	}
}

module.exports = VoService;
