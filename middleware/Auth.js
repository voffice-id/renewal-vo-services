const jwt = require('jsonwebtoken');
const GenericResponseEntity = require('../libs/GenericResponseEntity');
const {httpResponse} = require('../libs/Responses');
const appConfig = require('../config/app');

const Auth = async (req, res, next) => {
	try {
		const response = new GenericResponseEntity();

		response.statusCode = 401;
		response.message = 'Auth Failed';
		if (!req.headers.authorization) return httpResponse(response, res);

		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, appConfig.jwtSecret);

		if (!decoded) return httpResponse(response, res);

		req.authData = decoded.data;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = Auth;
