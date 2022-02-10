const validator = require('../libs/validation');

const validatorFacilitySchedule = validator.query({
	booking_date: 'string',
	facility_id: {type: 'number', convert: true},
});

const validatorCalculateCredit = validator.query({
	facility_id: {type: 'number', convert: true},
	company_id: {type: 'number', convert: true},
	booking_slot: {type: 'number', convert: true},
});

const validatorGetBooking = validator.query({
	page: {type: 'number', convert: true, optional: true},
	page_size: {type: 'number', convert: true, optional: true},
	facility_id: {type: 'number', convert: true, optional: true},
	location_id: {type: 'number', convert: true, optional: true},
	booking_date: {type: 'string', optional: true},
});

const validatorCancelBooking = validator.params({
	id: {type: 'number', convert: true},
});

const validatorCreateBooking = validator.body({
	facility_id: {type: 'number', convert: true},
	location_id: {type: 'number', convert: true},
	company_id: {type: 'number', convert: true},
	booking_date: 'string',
	booked_slot: {type: 'array', items: {type: 'number', convert: true}},
	number_of_attendees: {type: 'number', convert: true},
	booking_source: {type: 'string', nullable: true, default: 'vox'},
	notes: 'string',
});

module.exports = {
	validatorFacilitySchedule,
	validatorCalculateCredit,
	validatorGetBooking,
	validatorCancelBooking,
	validatorCreateBooking,
};
