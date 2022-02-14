const {Model, DataTypes} = require('sequelize');
const db = require('./dbConn');
const InvoicesDt = require('./invoices_dt');

const VoPlans = db.define(
	'vo_plans',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		company_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		start_date: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		end_date: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		contract_term: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		extend_period: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		did_number: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		domicile_letter_no: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		created_by: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		activated_by: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		status: {
			type: DataTypes.TINYINT({length: 1}),
			allowNull: false,
			defaultValue: '0',
			comment: '0 = unpaid, 3 = active, 4 = expired, 6 = cancelled, 7 = terminated',
		},
	},
	{
		underscored: true,
	}
);

VoPlans.hasOne(InvoicesDt, {foreignKey: 'company_plan_id'});
InvoicesDt.belongsTo(VoPlans, {foreignKey: 'company_plan_id'});

module.exports = VoPlans;
