const Validator = require('fastest-validator');

const v = new Validator();

const validator = {
	query: (schema) => {
		const compiledSchema = v.compile(schema);

		return async (req, res, next) => {
			const result = compiledSchema(req.query);

			if (Array.isArray(result)) {
				res.status(400).json({
					message: 'Validation Error',
					type: 'QueryValidationError',
					detail: result,
				});
			} else {
				await next();
			}
		};
	},
	body: (schema) => {
		const compiledSchema = v.compile(schema);

		return async (req, res, next) => {
			const result = compiledSchema(req.body);

			if (Array.isArray(result)) {
				res.status(400).json({
					message: 'Validation Error',
					type: 'BodyValidationError',
					detail: result,
				});
			} else {
				await next();
			}
		};
	},
	params: (schema) => {
		const compiledSchema = v.compile(schema);

		return async (req, res, next) => {
			const result = compiledSchema(req.params);

			if (Array.isArray(result)) {
				res.status(400).json({
					message: 'Validation Error',
					type: 'ParamsValidationError',
					detail: result,
				});
			} else {
				await next();
			}
		};
	},
};

module.exports = validator;
