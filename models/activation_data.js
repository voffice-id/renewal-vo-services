const {DataTypes} = require('sequelize');
const db = require('./dbConn');

const ActivationData = db.define(
	'activation_data',
	{
		invoice_id: DataTypes.INTEGER,
		plan_id: DataTypes.STRING,
		company_name: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		id_card_no: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		id_card_file: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		company_reg_file: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		tax_id_no: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		tax_id_file: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		company_tax_id_no: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		company_tax_id_file: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		so_id: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		fax_number: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		did_no: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		address_npwp_company: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		address_ktp: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		type: {
			allowNull: false,
			defaultValue: 0,
			comment: '1 = Have company | 2 = Company is being created | 3 = Use a personal name	',
			type: DataTypes.TINYINT,
		},
		last_follow_up: {
			allowNull: true,
			type: DataTypes.DATE,
		},
		last_follow_up_operator: {
			allowNull: true,
			type: DataTypes.INTEGER,
		},
		location_bank_account_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		security_deposit: {
			allowNull: false,
			defaultValue: 0,
			type: DataTypes.INTEGER,
		},
		extend_period: {
			allowNull: true,
			type: DataTypes.INTEGER,
		},
		status: {
			allowNull: false,
			type: DataTypes.TINYINT,
			defaultValue: 1,
			comment: '1 = pending, 2 = activated',
		},
		created_by: DataTypes.INTEGER,
	},
	{
		freezeTableName: true,
		underscored: true,
	}
);

module.exports = ActivationData;
