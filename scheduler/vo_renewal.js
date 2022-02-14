const {Op} = require('sequelize');
const {format, parseISO, addMonths} = require('date-fns');
const InvoicesDt = require('../models/invoices_dt');
const ActivationData = require('../models/activation_data');
const VoPlans = require('../models/vo_plans');
const VoService = require('../services/VoService');
const Companies = require('../models/companies');

/**
 * @class VoRenewalScheduler
 */
class VoRenewalScheduler {
	/**
	 * Define UserBalancesService
	 *
	 * @hideconstructor
	 */
	constructor() {
		this.voService = new VoService();
	}

	/**
	 * Send renewal message to all users who have not renewed their account
	 * @return {{timeConfig, callback}}
	 */
	sendReminderMessage() {
		return {
			timeConfig: '0 9 * * *',
			callback: async () => {
				try {
					const currentDate = format(new Date(), 'yyyy-MM-dd');
					const clientPlans = await VoPlans.findAll({
						where: {
							status: 3,
							end_date: currentDate, // Checking if the next renewal date is the current date
						},
						include: Companies,
					});

					console.info(`Running scheduler sendReminderMessage() at ${currentDate}`);

					if (clientPlans.length >= 0) {
						await Promise.allSettled(
							clientPlans.map(async (clientPlan) => {
								console.info(`Sending renewal reminder to ${clientPlan.clientId}`);

								await this.voService.sendMessage(clientPlan);
							}),
						);
					}
				} catch (e) {
					console.error(`Error: ${e}`);
				}
			},
		};
	}

	/**
	 * Deactivate product status of all users who have not renewed their account
	 * @return {{timeConfig, callback}}
	 */
	deactivateNotRenewProduct() {
		return {
			timeConfig: '0 9 * * *',
			callback: async () => {
				try {
					const currentDate = format(new Date(), 'yyyy-MM-dd');
					const clientPlans = await VoPlans.findAll({
						where: {
							status: 3,
							end_date: {
								[Op.gte]: currentDate,
							},
						},
						include: {
							model: InvoicesDt,
							include: [ActivationData],
						},
					});

					console.info(`Running scheduler deactivateNotRenewProduct() at ${currentDate}`);

					if (clientPlans.length >= 0) {
						await Promise.allSettled(
							clientPlans.map(async (clientPlan) => {
								// Checking if the next renewal date + extend period is the current date
								if (format(addMonths(parseISO(clientPlan.end_date), 2), 'yyyy-MM-dd') === currentDate) {
									// Update status plans into expired
									await VoPlans.update({status: 4}, {where: {id: clientPlan.id}});

									console.info(`Plan ${clientPlan.id} has expired`);
								}
							})
						);
					}
				} catch (e) {
					console.error(`Error: ${e}`);
				}
			},
		};
	}
}

module.exports = VoRenewalScheduler;
