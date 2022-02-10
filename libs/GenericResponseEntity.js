/**
 * @class GenericResponseEntity
 * @classdesc This class is used to create a standardized response format.
 */
class GenericResponseEntity {
	/**
	 * Declare a variable to be used in the response.
	 */
	constructor() {
		this.success = false;
		this.message = null;
		this.data = null;
		this.summary = null;
		this.statusCode = 400;
		this.startTime = new Date().getTime();
	}

	/**
	 * @return {object}
	 */
	toResponse() {
		this.statusCode = this.success ? 200 : this.statusCode ?? 400;

		return {
			statusCode: this.statusCode,
			success: this.success,
			message: this.message,
			summary: this.summary,
			data: this.data,
			responseTime: this.startTime ? new Date().getTime() - this.startTime + ' ms.' : 'unknown',
		};
	}
}

module.exports = GenericResponseEntity;
