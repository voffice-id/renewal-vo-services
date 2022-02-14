const {DataTypes} = require('sequelize');
const db = require('./dbConn');
const InvoicesHt = require('./invoices_ht');
const VoPlans = require('./vo_plans');

const Companies = db.define(
	'companies',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		pic_id: {
			type: DataTypes.INTEGER,
		},
		location_id: {
			type: DataTypes.INTEGER,
		},
		company_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: null,
		},
		npwp_no: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
		mail_handling_whatsapp_notification: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: null,
		},
		call_handling_whatsapp_notification: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: null,
		},
		call_handling_email_notification: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: null,
		},
		credit: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'active',
			comment: 'Value : active,suspended,terminated',
		},
		created_by: {
			type: DataTypes.INTEGER,
		},
	},
	{
		underscored: true,
	}
);

// Companies.belongsTo(Pic, {foreignKey: 'pic_id'});
// Companies.hasMany(Plans, {foreignKey: 'company_id'});
// Plans.belongsTo(Companies, {foreignKey: 'company_id'});
Companies.hasMany(InvoicesHt, {foreignKey: 'company_id'});
InvoicesHt.belongsTo(Companies, {foreignKey: 'company_id'});
Companies.hasMany(VoPlans, {foreignKey: 'company_id'});
VoPlans.belongsTo(Companies, {foreignKey: 'company_id'});

module.exports = Companies;
