exports.randomizer = (length) => {
	if (typeof length !== 'number' && typeof length !== 'undefined') {
		throw new Error('Randomizer length should be an integer!');
	}

	if (length < 1) {
		throw new Error('Randomizer length needs to be at least 1 character!');
	}

	const result = '';
	const characters = 'ABCD&^EFGHI==JKLMNOPQRSTUVW_-XYZabcdefghijklmnopqrstuvwxyz01^23456789';
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
};

/**
 * @param {array} allowedParam Array of allowed parameters
 * @param {object} receivedParam Data that retrieved from req.query
 * @return {object} Return filtered object
 */
exports.paramFilter = (allowedParam = [], receivedParam) => {
	const result = {};

	allowedParam.map((v) => {
		if (receivedParam[v]) {
			result[v] = receivedParam[v];
		}
	});

	return result;
};

exports.paginate = async (model, pageSize, pageLimit, options = {}, transform) => {
	try {
		const limit = parseInt(pageLimit, 10) || 10;
		const page = parseInt(pageSize, 10) || 1;

		// create an options object
		options.offset = this.getOffset(page, limit);
		options.limit = limit;

		// check if the search object is empty
		// if (Object.keys(search).length) {
		//     options.where = search;
		// }

		// check if the order array is empty
		// if (order && order.length) {
		//     options.order = order;
		// }

		// // check if the include array is empty
		// if (include && include.length) {
		//     options.include = include;
		// }

		// take in the model, take in the options
		let {count, rows} = await model.findAndCountAll(options);

		// check if the transform is a function and is not null
		if (transform && typeof transform === 'function') {
			rows = transform(rows);
		}

		return {
			previousPage: this.getPreviousPage(page),
			currentPage: page,
			totalPage: Math.ceil(count / limit),
			nextPage: this.getNextPage(page, limit, count),
			total: count,
			limit: limit,
			data: rows,
		};
	} catch (error) {
		console.error(error);
	}
};

exports.getOffset = (page, limit) => {
	return page * limit - limit;
};

exports.getNextPage = (page, limit, total) => {
	if (total / limit > page) {
		return page + 1;
	}

	return null;
};

exports.getPreviousPage = (page) => {
	if (page <= 1) {
		return null;
	}

	return page - 1;
};
