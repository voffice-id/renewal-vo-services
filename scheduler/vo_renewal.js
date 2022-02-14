const {Op} = require('sequelize');
const {format, parseISO, addMonths} = require('date-fns');
const InvoicesDt = require('../models/invoices_dt');
const ActivationData = require('../models/activation_data');
const VoPlans = require('../models/vo_plans');

/**
 * @class VoRenewalScheduler
 */
class VoRenewalScheduler {
	/**
	 * Send renewal message to all users who have not renewed their account
	 * @return {object}
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
							end_date: {
								[Op.gte]: currentDate,
							},
						},
					});

					console.info(`Running scheduler sendReminderMessage() at ${currentDate}`);

					if (clientPlans.length >= 0) {
						await Promise.allSettled(
							clientPlans.map(async (clientPlan) => {
								// Checking if the next renewal date is the current date
								if (format(parseISO(clientPlan.end_date), 'yyyy-MM-dd') === currentDate) {
									console.info(`Sending renewal reminder to ${clientPlan.clientId}`);
									// const {clientId, end_date} = clientPlan;
									// const client = await clientPlan.getClient();
									// const {email} = client;
									// const {name} = clientPlan;
									// const {end_date: end_dateFormatted} = clientPlan;

									// const mailOptions = {
									// 	to: email,
									// 	subject: 'Your account will expire in 1 day',
									// 	html: `<p>Dear ${name},</p>
									// <p>Your account will expire on ${formatDate(end_dateFormatted)}</p>
									// <p>Please renew your account to continue using our services.</p>
									// <p>Thank you.</p>`,
									// };

									// return await sendMail(mailOptions);
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

	/**
	 * Deactivate product status of all users who have not renewed their account
	 * @return {object}
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
