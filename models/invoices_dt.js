const {Model, DataTypes} = require('sequelize');
const db = require('./dbConn');

const InvoicesDt = db.define(
	'invoices_dt',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		invoice_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		company_plan_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		product_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		product_name: DataTypes.STRING,
		product_price: DataTypes.FLOAT(4),
		price: DataTypes.DOUBLE(15, 2),
		pph_42: {
			type: DataTypes.DOUBLE(10, 2),
			allowNull: true,
			defaultValue: '0.00',
		},
		pph_23: {
			type: DataTypes.DOUBLE(10, 2),
			allowNull: true,
			defaultValue: '0.00',
		},
		vat: {
			type: DataTypes.DOUBLE(10, 2),
			allowNull: true,
			defaultValue: '0.00',
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = InvoicesDt;
